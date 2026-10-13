#!/usr/bin/env python3
"""把语调本编译出的 SSML 交给神经网络语音。

消费端目前不接受 phoneme、break、emphasis、lang 这些内层标签，
语速和音高仍由外层 prosody 控制。多音字和函数名保留在 SSML 里，
实际送去合成的是去掉标签后的句子：汉字留给声音模型按词读，
函数名用已经拆开的英语读法。句后停顿用静音拼上。
"""

from __future__ import annotations

import asyncio
import json
import shutil
import subprocess
import tempfile
from pathlib import Path

import edge_tts.communicate as edge_communicate
from edge_tts import Communicate
from edge_tts.constants import TRUSTED_CLIENT_TOKEN

ROOT = Path(__file__).resolve().parents[1]
COURSE = ROOT / "web" / "course-data.json"
CACHE = ROOT / "web" / "audio-cache"
VOICE = "zh-CN-XiaoxiaoNeural"

edge_communicate.WSS_URL = (
    "wss://api.msedgeservices.com/tts/cognitiveservices/websocket/v1"
    f"?Ocp-Apim-Subscription-Key={TRUSTED_CLIENT_TOKEN}"
)


def load_course() -> dict:
    if not COURSE.exists():
        raise SystemExit("还没有 course-data.json，先运行 node scripts/build-course.mjs")
    return json.loads(COURSE.read_text(encoding="utf-8"))


def silence(ms: int, dest: Path) -> None:
    seconds = max(ms, 0) / 1000
    subprocess.check_call(
        [
            "ffmpeg",
            "-y",
            "-f",
            "lavfi",
            "-i",
            "anullsrc=r=24000:cl=mono",
            "-t",
            f"{seconds:.3f}",
            "-c:a",
            "libmp3lame",
            "-b:a",
            "48k",
            str(dest),
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def concat(paths: list[Path], dest: Path) -> None:
    if len(paths) == 1:
        shutil.copyfile(paths[0], dest)
        return
    inputs: list[str] = []
    for path in paths:
        inputs.extend(["-i", str(path)])
    subprocess.check_call(
        [
            "ffmpeg",
            "-y",
            *inputs,
            "-filter_complex",
            f"concat=n={len(paths)}:v=0:a=1",
            "-c:a",
            "libmp3lame",
            "-b:a",
            "48k",
            str(dest),
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


async def synthesize_text(text: str, rate: str, pitch: str, dest: Path) -> None:
    communicate = Communicate(text, VOICE, rate=rate, pitch=pitch)
    await communicate.save(str(dest))


def synthesize_clip(clip: dict, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    parts = clip["parts"]
    with tempfile.TemporaryDirectory() as folder:
        folder_path = Path(folder)
        pieces: list[Path] = []
        index = 0
        for part in parts:
            if isinstance(part, str):
                text = part.strip()
                if not text:
                    continue
                piece = folder_path / f"part-{index}.mp3"
                asyncio.run(synthesize_text(text, clip["rate"], clip["pitch"], piece))
                pieces.append(piece)
            else:
                pause = int(part)
                if pause <= 0:
                    continue
                piece = folder_path / f"pause-{index}.mp3"
                silence(pause, piece)
                pieces.append(piece)
            index += 1
        if not pieces:
            raise RuntimeError("这句话没有可合成的内容")
        concat(pieces, dest)


def clip_path(digest: str) -> Path:
    return CACHE / f"{digest}.mp3"


def ensure_clip(clip: dict) -> Path:
    dest = clip_path(clip["hash"])
    if dest.exists() and dest.stat().st_size > 0:
        return dest
    temporary = dest.with_suffix(".tmp.mp3")
    synthesize_clip(clip, temporary)
    temporary.replace(dest)
    return dest


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser(description="按句子合成老师语音")
    parser.add_argument("--hash", help="只合成这一句")
    parser.add_argument("--lesson", help="合成某一节的全部句子")
    args = parser.parse_args()
    course = load_course()
    clips = course["clips"]
    if args.hash:
        ensure_clip(clips[args.hash])
        print(clip_path(args.hash))
        return
    if args.lesson:
        lesson = next(item for item in course["lessons"] if item["id"] == args.lesson)
        hashes = []
        for name in lesson["sectionOrder"]:
            hashes.extend(clip["hash"] for clip in lesson["sections"][name])
        hashes.extend(clip["hash"] for clip in lesson["questions"])
        hashes.append(lesson["hint"]["hash"])
        for digest in hashes:
            path = ensure_clip(clips[digest])
            print(path.name, clips[digest]["text"])
        return
    parser.error("请指定 --hash 或 --lesson")


if __name__ == "__main__":
    main()
