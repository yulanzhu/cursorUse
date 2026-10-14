#!/usr/bin/env python3
"""打开课程页面。声音在后台准备，请求不会一直挂着。"""

from __future__ import annotations

import json
import mimetypes
import socket
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from queue import Empty, Queue
from urllib.parse import unquote, urlparse

from speak import CACHE, COURSE, clip_path, ensure_clip, load_course

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "web"
PORT = 4173
LOCKS: dict[str, threading.Lock] = {}
GUARD = threading.Lock()
QUEUED: set[str] = set()
ERRORS: dict[str, str] = {}
URGENT: Queue = Queue()
BACKGROUND: Queue = Queue()


def lock_for(digest: str) -> threading.Lock:
    with GUARD:
        if digest not in LOCKS:
            LOCKS[digest] = threading.Lock()
        return LOCKS[digest]


def ready_path(digest: str) -> Path | None:
    path = clip_path(digest)
    if path.exists() and path.stat().st_size > 0:
        return path
    return None


def run_clip(clip: dict) -> None:
    digest = clip["hash"]
    try:
        with lock_for(digest):
            if ready_path(digest) is None:
                ensure_clip(clip)
        ERRORS.pop(digest, None)
    except Exception as error:  # noqa: BLE001
        ERRORS[digest] = str(error)
    finally:
        with GUARD:
            QUEUED.discard(digest)


def prepare(clip: dict, urgent: bool = False) -> None:
    digest = clip["hash"]
    with GUARD:
        if ready_path(digest):
            return
        if digest not in QUEUED:
            QUEUED.add(digest)
            (URGENT if urgent else BACKGROUND).put(clip)
        elif urgent:
            URGENT.put(clip)


def pump() -> None:
    while True:
        try:
            clip = URGENT.get_nowait()
        except Empty:
            try:
                clip = BACKGROUND.get(timeout=0.3)
            except Empty:
                continue
        run_clip(clip)


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    course = None

    def log_message(self, fmt: str, *args) -> None:
        print(f"[{self.address_string()}] {fmt % args}")

    def end_headers(self) -> None:
        self.send_header("Connection", "close")
        self.close_connection = True
        super().end_headers()

    def course_data(self) -> dict:
        if Handler.course is None:
            Handler.course = load_course()
        return Handler.course

    def send_file(self, path: Path, content_type: str | None = None) -> None:
        data = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type or mimetypes.guess_type(path.name)[0] or "application/octet-stream")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Connection", "close")
        self.end_headers()
        self.close_connection = True
        try:
            self.wfile.write(data)
        except BrokenPipeError:
            return

    def do_GET(self) -> None:  # noqa: N802
        parsed = urlparse(self.path)
        path = unquote(parsed.path)
        if path in ("/", "/index.html"):
            self.send_file(WEB / "index.html", "text/html; charset=utf-8")
            return
        if path.startswith("/api/audio/"):
            digest = path.removeprefix("/api/audio/").removesuffix(".mp3")
            clip = self.course_data()["clips"].get(digest)
            if clip is None:
                self.send_error(404, "没有这一节")
                return
            audio = ready_path(digest)
            if audio is not None:
                self.send_file(audio, "audio/mpeg")
                return
            error = ERRORS.get(digest)
            if error and digest not in QUEUED:
                ERRORS.pop(digest, None)
                message = f"合成失败：{error}".encode("utf-8")
                self.send_response(502)
                self.send_header("Content-Type", "text/plain; charset=utf-8")
                self.send_header("Content-Length", str(len(message)))
                self.send_header("Connection", "close")
                self.end_headers()
                try:
                    self.wfile.write(message)
                except BrokenPipeError:
                    return
                return
            prepare(clip, urgent=True)
            body = b'{"ready":false}'
            self.send_response(202)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Retry-After", "1")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Connection", "close")
            self.end_headers()
            try:
                self.wfile.write(body)
            except BrokenPipeError:
                return
            return
        if path == "/api/health":
            body = json.dumps(
                {"ok": COURSE.exists(), "cache": str(CACHE), "voice": "zh-CN-XiaoxiaoNeural"},
                ensure_ascii=False,
            ).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        relative = path.lstrip("/")
        file_path = (WEB / relative).resolve()
        if not str(file_path).startswith(str(WEB.resolve())) or not file_path.is_file():
            self.send_error(404)
            return
        self.send_file(file_path)


class Server(ThreadingHTTPServer):
    address_family = socket.AF_INET6
    allow_reuse_address = True

    def server_bind(self) -> None:
        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        super().server_bind()


def main() -> None:
    if not COURSE.exists():
        raise SystemExit("还没有 course-data.json，先运行 node scripts/build-course.mjs")
    course = load_course()
    Handler.course = course
    threading.Thread(target=pump, daemon=True).start()
    for lesson in course["lessons"]:
        prepare(lesson["narration"])
    server = Server(("::", PORT), Handler)
    print(f"课程已打开：http://127.0.0.1:{PORT} 和 http://[::1]:{PORT}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()
