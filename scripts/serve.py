#!/usr/bin/env python3
"""打开课程页面，并在第一次听到某句时合成老师的声音。"""

from __future__ import annotations

import json
import mimetypes
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

from speak import CACHE, COURSE, ensure_clip, load_course

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "web"
PORT = 4173
LOCKS: dict[str, threading.Lock] = {}
GUARD = threading.Lock()


def lock_for(digest: str) -> threading.Lock:
    with GUARD:
        if digest not in LOCKS:
            LOCKS[digest] = threading.Lock()
        return LOCKS[digest]


class Handler(BaseHTTPRequestHandler):
    course = None

    def log_message(self, fmt: str, *args) -> None:
        print(f"[{self.address_string()}] {fmt % args}")

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
        self.end_headers()
        self.wfile.write(data)

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
                self.send_error(404, "没有这一句")
                return
            try:
                with lock_for(digest):
                    audio = ensure_clip(clip)
            except Exception as error:  # noqa: BLE001
                message = f"合成失败：{error}".encode("utf-8")
                self.send_response(502)
                self.send_header("Content-Type", "text/plain; charset=utf-8")
                self.send_header("Content-Length", str(len(message)))
                self.end_headers()
                self.wfile.write(message)
                return
            self.send_file(audio, "audio/mpeg")
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


def main() -> None:
    if not COURSE.exists():
        raise SystemExit("还没有 course-data.json，先运行 node scripts/build-course.mjs")
    server = ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(f"课程已打开：http://127.0.0.1:{PORT}")
    server.serve_forever()


if __name__ == "__main__":
    main()
