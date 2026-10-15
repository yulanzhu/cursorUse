#!/usr/bin/env python3
"""用晓晓神经语音把课文逐句合成 mp3。失败时打印课名和句子并退出。"""

import asyncio
import json
import os
import sys

import edge_tts

VOICE = "zh-CN-XiaoxiaoNeural"
RATE = "-10%"


async def synth(job, sem):
    path = job["path"]
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + ".part"
    last = None
    for attempt in range(4):
        try:
            async with sem:
                communicate = edge_tts.Communicate(job["text"], VOICE, rate=RATE)
                await communicate.save(tmp)
            size = os.path.getsize(tmp)
            if size < 800:
                raise RuntimeError(f"音频过小（{size} 字节）")
            os.replace(tmp, path)
            return None
        except Exception as error:  # noqa: BLE001 - 需要把服务端错误带回构建日志
            last = error
            if os.path.exists(tmp):
                os.remove(tmp)
            await asyncio.sleep(1.6 * (attempt + 1))
    return last


async def main():
    jobs = json.loads(sys.stdin.read() or "[]")
    if not jobs:
        return
    sem = asyncio.Semaphore(4)
    failures = []
    done = 0

    async def run(job):
        nonlocal done
        error = await synth(job, sem)
        done += 1
        if done % 20 == 0 or done == len(jobs):
            print(f"语音进度 {done}/{len(jobs)}", file=sys.stderr, flush=True)
        if error is not None:
            failures.append((job, error))

    await asyncio.gather(*(run(job) for job in jobs))
    if failures:
        job, error = failures[0]
        print("语音生成失败", file=sys.stderr)
        print(f"课：{job.get('lesson')}", file=sys.stderr)
        print(f"句：{job.get('role')}", file=sys.stderr)
        print(f"原因：{error}", file=sys.stderr)
        print(f"正文：{job.get('text', '')[:120]}", file=sys.stderr)
        print(f"另有 {len(failures) - 1} 句失败", file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    asyncio.run(main())
