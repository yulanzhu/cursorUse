import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, readFile, readdir, rm, writeFile, copyFile, access, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { checkAgainstSyllabus, parseCourse } from "./course-format.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "content");
const courseDir = path.join(root, "course");
const distDir = path.join(root, "dist");
const cacheDir = path.join(root, ".tts-cache");
const manifestPath = path.join(cacheDir, "manifest.json");
const VOICE = "zh-CN-XiaoxiaoNeural";
const RATE = "-10%";

const checkOnly = process.argv.includes("--check");

const names = (await readdir(contentDir)).filter((name) => name.endsWith(".md")).sort();
const files = [];
for (const name of names) {
  files.push({ filename: name, source: await readFile(path.join(contentDir, name), "utf8") });
}
const course = parseCourse(files);
const stats = checkAgainstSyllabus(course);
console.log(`课文检查通过：${stats.modules} 个模块，${stats.lessons} 课，${stats.segments} 句`);
if (checkOnly) process.exit(0);

await mkdir(cacheDir, { recursive: true });
await mkdir(distDir, { recursive: true });
let manifest = { voice: VOICE, rate: RATE, items: {} };
try {
  manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  if (manifest.voice !== VOICE || manifest.rate !== RATE) manifest = { voice: VOICE, rate: RATE, items: {} };
} catch {
  manifest = { voice: VOICE, rate: RATE, items: {} };
}

const jobs = [];
for (const mod of course.modules) {
  for (const lesson of mod.lessons) {
    lesson.segments.forEach((segment, index) => {
      const key = `${lesson.id}/${String(index).padStart(2, "0")}`;
      const digest = createHash("sha256").update(`${VOICE}\n${RATE}\n${segment.text}`).digest("hex");
      const file = `${key}.mp3`;
      segment.audio = `audio/${file}`;
      const cached = path.join(cacheDir, file);
      const previous = manifest.items[key];
      if (previous?.hash === digest) {
        jobs.push({ key, file, cached, digest, skip: true });
      } else {
        jobs.push({
          key,
          file,
          cached,
          digest,
          skip: false,
          path: cached,
          text: segment.text,
          lesson: lesson.title,
          role: segment.role,
        });
      }
    });
  }
}

const pending = jobs.filter((job) => !job.skip);
console.log(`需要合成 ${pending.length} 句，已缓存 ${jobs.length - pending.length} 句`);
if (pending.length) {
  try {
    await runTts(pending);
  } catch (error) {
    await rememberFinished(pending);
    throw error;
  }
  await rememberFinished(pending);
}

await rm(path.join(distDir, "audio"), { recursive: true, force: true });
for (const job of jobs) {
  try {
    await access(job.cached);
  } catch {
    throw new Error(`缺少音频文件：${job.file}`);
  }
  const target = path.join(distDir, "audio", job.file);
  await mkdir(path.dirname(target), { recursive: true });
  await copyFile(job.cached, target);
}

for (const asset of ["index.html", "player.css", "player.js", "visuals.js"]) {
  await copyFile(path.join(courseDir, asset), path.join(distDir, asset));
}

const payload = {
  title: course.title,
  voice: course.voice,
  modules: course.modules.map((mod) => ({
    id: mod.id,
    title: mod.title,
    lessons: mod.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      segments: lesson.segments.map((segment) => ({
        role: segment.role,
        text: segment.text,
        visual: segment.visual,
        caption: segment.caption,
        points: segment.points,
        headers: segment.headers,
        mode: segment.mode,
        left: segment.left,
        right: segment.right,
        code: segment.code,
        lang: segment.lang,
        audio: segment.audio,
      })),
    })),
  })),
};
await writeFile(path.join(distDir, "course.json"), JSON.stringify(payload));
console.log(`已写出 ${path.join(distDir, "course.json")}`);

async function rememberFinished(pendingJobs) {
  let changed = false;
  for (const job of pendingJobs) {
    try {
      const info = await stat(job.cached);
      if (info.size >= 800) {
        manifest.items[job.key] = { hash: job.digest, file: job.file };
        changed = true;
      }
    } catch {
      // 这一句还没有落地，下次构建会重试。
    }
  }
  if (changed) await writeFile(manifestPath, JSON.stringify(manifest));
}

function runTts(pendingJobs) {
  return new Promise((resolve, reject) => {
    const child = spawn("python3", [path.join(root, "scripts", "tts.py")], {
      stdio: ["pipe", "inherit", "inherit"],
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`语音合成退出码 ${code}`));
    });
    child.stdin.write(JSON.stringify(pendingJobs));
    child.stdin.end();
  });
}
