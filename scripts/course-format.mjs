import { ROLES, SYLLABUS, VISUALS, flattenLessons } from "./syllabus.mjs";

const META_KEYS = ["visual", "caption", "points", "mode", "left", "right", "lang", "headers"];

export function parseCourse(files) {
  const modules = [];
  const seen = new Set();
  for (const file of files) {
    const mod = parseModule(file.filename, file.source);
    for (const lesson of mod.lessons) {
      if (seen.has(lesson.id)) {
        throw new Error(`重复的课程 id：${lesson.id}（${file.filename}）`);
      }
      seen.add(lesson.id);
    }
    modules.push(mod);
  }
  return { title: "Flutter 全量语音教程", voice: "zh-CN-XiaoxiaoNeural", modules };
}

export function parseModule(filename, source) {
  const lines = source.split(/\r?\n/);
  let moduleTitle = "";
  let lesson = null;
  let segment = null;
  let inFence = false;
  const lessons = [];

  const flushSegment = () => {
    if (!segment) return;
    lesson.segments.push(finalizeSegment(lesson, segment));
    segment = null;
  };
  const flushLesson = () => {
    flushSegment();
    if (!lesson) return;
    lessons.push(lesson);
    lesson = null;
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.startsWith("```")) inFence = !inFence;
    if (!inFence && line.startsWith("# ")) {
      if (!moduleTitle) moduleTitle = line.slice(2).trim();
      continue;
    }
    if (!inFence && line.startsWith("## lesson ")) {
      flushLesson();
      const id = line.slice("## lesson ".length).trim();
      lesson = { id, title: "", segments: [], line: i + 1, file: filename };
      continue;
    }
    if (!inFence && lesson && !lesson.title && line.startsWith("title:")) {
      lesson.title = line.slice("title:".length).trim();
      continue;
    }
    if (!inFence && line.startsWith("### ")) {
      if (!lesson) throw new Error(`${filename}:${i + 1} 段落出现在课程之前`);
      flushSegment();
      segment = { role: line.slice(4).trim(), lines: [], line: i + 1 };
      continue;
    }
    if (segment) segment.lines.push(line);
  }
  flushLesson();

  if (!moduleTitle) throw new Error(`${filename} 缺少模块标题`);
  const id = filename.replace(/^\d+-/, "").replace(/\.md$/, "");
  return { id, title: moduleTitle, file: filename, lessons };
}

function finalizeSegment(lesson, segment) {
  const where = `${lesson.file}:${segment.line} ${lesson.id} / ${segment.role}`;
  if (!ROLES.includes(segment.role)) {
    throw new Error(`${where} 段落名必须是：${ROLES.join("、")}`);
  }
  const meta = {};
  const body = [];
  let metaOpen = true;
  for (const line of segment.lines) {
    const matched = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (metaOpen && matched && META_KEYS.includes(matched[1])) {
      meta[matched[1]] = matched[2].trim();
      continue;
    }
    if (metaOpen && line.trim() === "") continue;
    metaOpen = false;
    body.push(line);
  }
  const raw = body.join("\n");
  const codes = [];
  const speech = raw
    .replace(/```([A-Za-z0-9_-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
      codes.push({ lang: lang || meta.lang || "dart", code: code.replace(/\s+$/, "") });
      return "\n";
    })
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (!meta.visual) throw new Error(`${where} 缺少 visual`);
  if (!VISUALS.includes(meta.visual)) throw new Error(`${where} 不认识的图示 ${meta.visual}`);
  if (!meta.caption) throw new Error(`${where} 缺少 caption`);
  if (speech.length < 40) throw new Error(`${where} 口播太短（${speech.length} 字）`);
  const points = splitList(meta.points);
  const headers = splitList(meta.headers);
  return {
    role: segment.role,
    text: speech,
    visual: meta.visual,
    caption: meta.caption,
    points,
    headers,
    mode: meta.mode || "",
    left: meta.left || "",
    right: meta.right || "",
    code: codes[0]?.code || "",
    lang: codes[0]?.lang || meta.lang || "",
  };
}

function splitList(value) {
  if (!value) return [];
  return value.split("|").map((item) => item.trim()).filter(Boolean);
}

export function checkAgainstSyllabus(course) {
  const errors = [];
  if (course.modules.length !== SYLLABUS.length) {
    errors.push(`模块数量是 ${course.modules.length}，应为 ${SYLLABUS.length}`);
  }
  const expected = flattenLessons();
  const actual = [];
  course.modules.forEach((mod, index) => {
    const spec = SYLLABUS[index];
    if (!spec) return;
    if (mod.id !== spec.id) errors.push(`第 ${index + 1} 个模块 id 是 ${mod.id}，应为 ${spec.id}`);
    if (mod.title !== spec.title) errors.push(`模块 ${mod.id} 标题是「${mod.title}」，应为「${spec.title}」`);
    if (mod.file !== spec.file) errors.push(`模块 ${mod.id} 文件是 ${mod.file}，应为 ${spec.file}`);
    mod.lessons.forEach((lesson) => {
      actual.push({ lesson, moduleTitle: mod.title });
    });
  });
  if (actual.length !== expected.length) {
    errors.push(`课程数量是 ${actual.length}，应为 ${expected.length}`);
  }
  const count = Math.min(actual.length, expected.length);
  for (let i = 0; i < count; i += 1) {
    const got = actual[i].lesson;
    const spec = expected[i];
    const where = `${spec.file} ${spec.id}`;
    if (got.id !== spec.id) errors.push(`${where} 实际 id 为 ${got.id}`);
    if (got.title !== spec.title) errors.push(`${where} 标题是「${got.title}」，应为「${spec.title}」`);
    if (got.segments.length !== ROLES.length) {
      errors.push(`${where} 有 ${got.segments.length} 段，应为 ${ROLES.length}`);
    }
    ROLES.forEach((role, roleIndex) => {
      const segment = got.segments[roleIndex];
      if (segment && segment.role !== role) errors.push(`${where} 第 ${roleIndex + 1} 段是 ${segment?.role}`);
    });
    const mechanism = got.segments.find((segment) => segment.role === "机制");
    if (mechanism) {
      if (mechanism.visual !== spec.visual) {
        errors.push(`${where} 机制图示是 ${mechanism.visual}，应为 ${spec.visual}`);
      }
      if (spec.mode && mechanism.mode !== spec.mode) {
        errors.push(`${where} 机制 mode 是 ${mechanism.mode || "空"}，应为 ${spec.mode}`);
      }
      if (spec.headers) {
        const joined = mechanism.headers.join("|");
        const want = spec.headers.join("|");
        if (joined !== want) errors.push(`${where} 机制 headers 是「${joined}」，应为「${want}」`);
      }
    }
    const example = got.segments.find((segment) => segment.role === "示例");
    if (example && !example.code) errors.push(`${where} 示例缺少 Dart 代码`);
    const closing = got.segments.find((segment) => segment.role === "收束");
    const next = expected[i + 1];
    if (closing && next && !closing.text.includes(next.title)) {
      errors.push(`${where} 收束没有提到下一课「${next.title}」`);
    }
    if (closing && !next && !closing.text.includes("练习")) {
      errors.push(`${where} 最后一课的收束要落到练习`);
    }
  }
  if (errors.length) {
    throw new Error(errors.slice(0, 40).join("\n"));
  }
  return { modules: course.modules.length, lessons: actual.length, segments: actual.length * ROLES.length };
}
