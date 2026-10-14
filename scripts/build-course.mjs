import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const lessonDir = path.join(root, "course", "lessons");
const webDir = path.join(root, "web");
const voice = "zh-CN-XiaoxiaoNeural";

const POLY = new Set("行重了还为长得地差调数传处乐干降强空蒙");
const TONES = {
  平稳: { rate: "-3%", pitch: "+0Hz" },
  放慢: { rate: "-6%", pitch: "+0Hz" },
  加重: { rate: "-3%", pitch: "+1Hz" },
  问句: { rate: "-2%", pitch: "+1Hz" },
  收束: { rate: "-4%", pitch: "+0Hz" },
};
const PARAGRAPH_VOICE = { rate: "+0%", pitch: "+0Hz" };
const SECTIONS = ["开场", "专业讲解", "大白话", "怎么用", "再讲深一点", "边界", "收束"];
const SECTION_JUMP = {
  说得简单点: "大白话",
  专业一点: "专业讲解",
  举个例子: "怎么用",
  再详细一点: "再讲深一点",
  边界是什么: "边界",
  这节讲了什么: "收束",
};
const EXPECTED = [
  ["全貌与环境", 6],
  ["Dart 语言", 12],
  ["异步与并发", 5],
  ["Widget 心智", 7],
  ["布局", 8],
  ["界面组件", 7],
  ["滚动", 5],
  ["手势与表单", 6],
  ["状态", 7],
  ["导航", 5],
  ["数据", 6],
  ["动画与绘制", 6],
  ["主题与适配", 5],
  ["平台通道", 4],
  ["测试", 4],
  ["性能", 5],
  ["框架原理", 6],
  ["编译与热重载", 3],
  ["工程与发布", 4],
];

function parseYaml(text) {
  const rootObj = {};
  const stack = [{ indent: -1, obj: rootObj }];
  for (const raw of text.split(/\n/)) {
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    const indent = raw.match(/^ */)[0].length;
    const line = raw.trim();
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1].obj;
    const match = line.match(/^([^:]+):\s*(.*)$/);
    if (!match) throw new Error(`无法解析读音表：${line}`);
    const key = match[1].trim().replace(/^["']|["']$/g, "");
    const value = match[2].trim().replace(/^["']|["']$/g, "");
    if (!value) {
      parent[key] = {};
      stack.push({ indent, obj: parent[key] });
    } else {
      parent[key] = value;
    }
  }
  return rootObj;
}

function readingOf(word, value, where) {
  const parts = value.trim().split(/\s+/);
  if ([...word].length !== parts.length) {
    throw new Error(`${where}「${word}」有 ${[...word].length} 个字，拼音是 ${parts.length} 个`);
  }
  for (const part of parts) {
    if (!/^[a-z]+[1-5]$/.test(part)) throw new Error(`${where}「${word}」的拼音无效：${part}`);
  }
  return parts;
}

function loadLexicon() {
  const ident = parseYaml(fs.readFileSync(path.join(root, "course/pronunciation/identifiers.yaml"), "utf8"));
  const poly = parseYaml(fs.readFileSync(path.join(root, "course/pronunciation/polyphones.yaml"), "utf8"));
  const acronyms = ident.acronyms || {};
  const words = ident.words || {};
  const dictionary = new Map();
  for (const [word, value] of Object.entries(poly.words || {})) {
    dictionary.set(word, readingOf(word, value, "词表"));
  }
  const defaults = {};
  for (const [char, value] of Object.entries(poly.defaults || {})) {
    if ([...char].length !== 1) throw new Error(`默认读音必须是单字：${char}`);
    defaults[char] = readingOf(char, value, "默认读音")[0];
  }
  return { acronyms, words, dictionary, defaults };
}

function spokenIdent(raw, lexicon) {
  if (lexicon.words[raw]) return lexicon.words[raw];
  if (!/[A-Za-z]/.test(raw)) {
    throw new Error(`符号「${raw}」没有读法，请写进 identifiers.yaml 的 words`);
  }
  const pieces = raw.split(/[^A-Za-z0-9]+/).filter(Boolean);
  const spoken = pieces.map((piece) => speakToken(piece, lexicon)).join(" ").trim();
  if (!spoken) throw new Error(`标识符「${raw}」没有读法`);
  return spoken;
}

function speakToken(token, lexicon) {
  if (lexicon.words[token]) return lexicon.words[token];
  const upper = token.toUpperCase();
  const uniformCase = token === token.toUpperCase() || token === token.toLowerCase();
  if (uniformCase && lexicon.acronyms[upper] && upper.length <= 5 && !lexicon.words[token.toLowerCase()]) {
    return lexicon.acronyms[upper];
  }
  if (token === token.toUpperCase() && lexicon.acronyms[token]) return lexicon.acronyms[token];
  const split = token
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/\s+/)
    .filter(Boolean);
  return split
    .map((part) => (part === part.toUpperCase() && lexicon.acronyms[part] ? lexicon.acronyms[part] : part.toLowerCase()))
    .join(" ");
}

function matchWord(text, index, maps) {
  for (const map of maps) {
    let best = null;
    for (const [word, reading] of map) {
      if (text.startsWith(word, index) && (!best || word.length > best.length)) best = word;
    }
    if (best) return { word: best, reading: map.get(best) };
  }
  return null;
}

function compileParts(raw, lexicon, localWords, file, label) {
  const errors = [];
  const pieces = [];
  let i = 0;
  const maps = [localWords, lexicon.dictionary];
  while (i < raw.length) {
    const start = i;
    if (raw[i] === "`") {
      const end = raw.indexOf("`", i + 1);
      if (end < 0) {
        errors.push(`${file} ${label} 的反引号没有闭合`);
        break;
      }
      const ident = raw.slice(i + 1, end);
      try {
        pieces.push({ kind: "lang", text: spokenIdent(ident, lexicon), start, end: end + 1 });
      } catch (error) {
        errors.push(`${file} ${label}：${error.message}`);
      }
      i = end + 1;
      continue;
    }
    const english = raw.slice(i).match(/^[A-Za-z][A-Za-z0-9]*/);
    if (english && english[0].length >= 2) {
      pieces.push({ kind: "lang", text: spokenIdent(english[0], lexicon), start, end: i + english[0].length });
      i += english[0].length;
      continue;
    }
    const matched = matchWord(raw, i, maps);
    if (matched) {
      const chars = [...matched.word];
      chars.forEach((char, offset) => {
        if (POLY.has(char)) pieces.push({ kind: "phoneme", char, py: matched.reading[offset], start: i + offset, end: i + offset + 1 });
        else pieces.push({ kind: "text", text: char, start: i + offset, end: i + offset + 1 });
      });
      i += matched.word.length;
      continue;
    }
    const char = raw[i];
    if (POLY.has(char)) {
      if (lexicon.defaults[char]) pieces.push({ kind: "phoneme", char, py: lexicon.defaults[char], start, end: i + 1 });
      else errors.push(`${file} ${label} 的「${char}」没有标音，上下文：${raw.slice(Math.max(0, i - 4), i + 5)}`);
    }
    pieces.push(POLY.has(char) && lexicon.defaults[char] ? null : { kind: "text", text: char, start, end: i + 1 });
    if (POLY.has(char) && lexicon.defaults[char]) pieces.pop();
    i += 1;
  }
  return { pieces: pieces.filter(Boolean), errors };
}

function escapeXml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sapi(py) {
  return py.replace(/([a-z]+)([1-5])/, "$1 $2");
}

function applyStress(pieces, raw, stress, file, label) {
  if (!stress) return { pieces, error: "" };
  const at = raw.indexOf(stress);
  if (at < 0) return { pieces, error: `${file} ${label} 找不到要重读的「${stress}」` };
  const end = at + stress.length;
  return { pieces: pieces.map((piece) => ({ ...piece, emph: piece.start >= at && piece.start < end })), error: "" };
}

function piecesToSsml(pieces, tone, pause) {
  let body = "";
  let plain = "";
  let open = false;
  const close = () => {
    if (open) {
      body += "</emphasis>";
      open = false;
    }
  };
  for (const piece of pieces) {
    if (piece.emph && !open) {
      body += "<emphasis level='moderate'>";
      open = true;
    }
    if (!piece.emph && open) close();
    if (piece.kind === "text") {
      body += escapeXml(piece.text);
      plain += piece.text;
    } else if (piece.kind === "phoneme") {
      body += `<phoneme alphabet='sapi' ph='${sapi(piece.py)}'>${escapeXml(piece.char)}</phoneme>`;
      plain += piece.char;
    } else if (piece.kind === "lang") {
      body += `<lang xml:lang='en-US'>${escapeXml(piece.text)}</lang>`;
      plain += piece.text;
    }
  }
  close();
  const prosody = TONES[tone];
  const gap = Math.min(pause, 120);
  const ssml =
    `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='zh-CN'>` +
    `<voice name='${voice}'><prosody rate='${prosody.rate}' pitch='${prosody.pitch}'>` +
    `${body}<break time='${gap}ms'/></prosody></voice></speak>`;
  return { ssml, plain, rate: prosody.rate, pitch: prosody.pitch, parts: [plain, gap] };
}

function makeParagraph(clips) {
  const pieces = clips.map((clip) => {
    const text = clip.parts[0].trim();
    return /[。！？…]$/.test(text) ? text : `${text}。`;
  });
  const joined = pieces.join("");
  let cursor = 0;
  for (let index = 0; index < clips.length; index += 1) {
    const length = pieces[index].length;
    clips[index].startRatio = cursor / joined.length;
    clips[index].endRatio = (cursor + length) / joined.length;
    cursor += length;
  }
  const ssml =
    `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='zh-CN'>` +
    `<voice name='${voice}'><prosody rate='${PARAGRAPH_VOICE.rate}' pitch='${PARAGRAPH_VOICE.pitch}'>` +
    `${escapeXml(joined)}</prosody></voice></speak>`;
  const hash = hashOf(ssml);
  for (const clip of clips) clip.paragraphHash = hash;
  return {
    hash,
    text: joined,
    tone: "平稳",
    pause: 0,
    ssml,
    rate: PARAGRAPH_VOICE.rate,
    pitch: PARAGRAPH_VOICE.pitch,
    parts: [joined, 0],
  };
}

function makeNarration(paragraphs) {
  const joined = SECTIONS.map((name) => paragraphs[name]?.text || "").join("");
  const ssml =
    `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='zh-CN'>` +
    `<voice name='${voice}'><prosody rate='+0%' pitch='+0Hz'>${escapeXml(joined)}</prosody></voice></speak>`;
  return {
    hash: hashOf(`narration\n${ssml}`),
    text: joined,
    tone: "平稳",
    pause: 0,
    ssml,
    rate: "+0%",
    pitch: "+0Hz",
    parts: [joined, 0],
  };
}

function hashOf(ssml) {
  return crypto.createHash("sha256").update(ssml).digest("hex").slice(0, 20);
}

function parseFrontmatter(text, file) {
  if (!text.startsWith("---\n")) throw new Error(`${file} 缺少开头的 ---`);
  const end = text.indexOf("\n---\n", 4);
  if (end < 0) throw new Error(`${file} 的头部没有结束`);
  const meta = {};
  for (const line of text.slice(4, end).split("\n")) {
    if (!line.trim()) continue;
    const match = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (!match) throw new Error(`${file} 头部无法解析：${line}`);
    meta[match[1]] = match[2].trim();
  }
  for (const key of ["id", "module", "title", "order"]) {
    if (!meta[key]) throw new Error(`${file} 缺少 ${key}`);
  }
  meta.order = Number(meta.order);
  return { meta, body: text.slice(end + 5) };
}

function parseFields(block, file) {
  const fields = {};
  for (const line of block.split("\n")) {
    const match = line.match(/^\s*(?:-\s*)?([A-Za-z]+):\s*(.*)$/);
    if (!match) continue;
    fields[match[1]] = match[2].trim();
  }
  return fields;
}

function parseSayBlocks(sectionText, file, title) {
  const chunks = sectionText.split(/\n(?=-\s+tone:)/).map((chunk) => chunk.trim()).filter(Boolean);
  if (!chunks.length) throw new Error(`${file} 的「${title}」没有句子`);
  return chunks.map((chunk) => {
    const fields = parseFields(chunk, file);
    if (!TONES[fields.tone]) throw new Error(`${file}「${title}」的语调无效：${fields.tone || "空"}`);
    if (!/^\d+$/.test(fields.pause || "")) throw new Error(`${file}「${title}」缺少 pause`);
    if (!fields.say) throw new Error(`${file}「${title}」缺少 say`);
    return {
      tone: fields.tone,
      pause: Number(fields.pause),
      stress: fields.stress || "",
      phones: fields.phones || "",
      say: fields.say,
    };
  });
}

function localWordMap(phones, file, label) {
  const map = new Map();
  if (!phones) return map;
  for (const item of phones.split(",")) {
    const [word, reading] = item.split("=").map((part) => part.trim());
    if (!word || !reading) throw new Error(`${file} ${label} 的 phones 格式应为 词=pin1 yin1`);
    map.set(word, readingOf(word, reading, `${file} ${label}`));
  }
  return map;
}

function compileSentence(sentence, lexicon, file, label) {
  const localWords = localWordMap(sentence.phones, file, label);
  const compiled = compileParts(sentence.say, lexicon, localWords, file, label);
  if (compiled.errors.length) return { errors: compiled.errors };
  const stressed = applyStress(compiled.pieces, sentence.say, sentence.stress, file, label);
  if (stressed.error) return { errors: [stressed.error] };
  const spoken = piecesToSsml(stressed.pieces, sentence.tone, sentence.pause);
  return {
    errors: [],
    clip: {
      hash: hashOf(spoken.ssml),
      text: sentence.say,
      tone: sentence.tone,
      pause: sentence.pause,
      ssml: spoken.ssml,
      rate: spoken.rate,
      pitch: spoken.pitch,
      parts: spoken.parts,
    },
  };
}

function renderInline(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderSummary(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").trim().split("\n");
  let html = "";
  let list = false;
  let paragraph = [];
  let pendingSection = "";
  const flushParagraph = () => {
    if (!paragraph.length) return;
    const attrs = pendingSection ? ` data-section="${pendingSection}"` : "";
    pendingSection = "";
    html += `<p${attrs}>${renderInline(paragraph.join(""))}</p>`;
    paragraph = [];
  };
  const closeList = () => {
    if (list) {
      html += "</ul>";
      list = false;
    }
  };
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const section = line.match(/^<!--\s*section:\s*(.+?)\s*-->$/);
    if (section) {
      flushParagraph();
      closeList();
      pendingSection = section[1];
      continue;
    }
    if (line.startsWith("```")) {
      flushParagraph();
      closeList();
      const language = line.slice(3).trim();
      const buffer = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        buffer.push(lines[index]);
        index += 1;
      }
      const attrs = pendingSection ? ` data-section="${pendingSection}"` : "";
      pendingSection = "";
      html += `<pre${attrs}><code class="lang-${escapeHtml(language)}">${escapeHtml(buffer.join("\n"))}</code></pre>`;
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      closeList();
      continue;
    }
    const heading = line.match(/^(#{2,3})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const tag = heading[1].length === 2 ? "h2" : "h3";
      const attrs = pendingSection ? ` data-section="${pendingSection}"` : "";
      pendingSection = "";
      html += `<${tag}${attrs}>${renderInline(heading[2])}</${tag}>`;
      continue;
    }
    if (line.trim().startsWith("- ")) {
      flushParagraph();
      if (!list) {
        const attrs = pendingSection ? ` data-section="${pendingSection}"` : "";
        pendingSection = "";
        html += `<ul${attrs}>`;
        list = true;
      }
      html += `<li>${renderInline(line.trim().slice(2))}</li>`;
      continue;
    }
    closeList();
    paragraph.push(line.trim());
  }
  flushParagraph();
  closeList();
  return html;
}

function splitH1(body, file) {
  const summaryAt = body.indexOf("# 总结");
  const speechAt = body.indexOf("# 口播");
  const askAt = body.indexOf("# 可以向老师问");
  if (summaryAt < 0 || speechAt < 0 || askAt < 0) throw new Error(`${file} 必须包含「总结」「口播」「可以向老师问」`);
  return {
    summary: body.slice(summaryAt + "# 总结".length, speechAt).trim(),
    speech: body.slice(speechAt + "# 口播".length, askAt).trim(),
    ask: body.slice(askAt + "# 可以向老师问".length).trim(),
  };
}

function splitH2(text) {
  const sections = new Map();
  const parts = text.split(/^## /m).filter(Boolean);
  for (const part of parts) {
    const newline = part.indexOf("\n");
    const title = (newline < 0 ? part : part.slice(0, newline)).trim();
    const body = newline < 0 ? "" : part.slice(newline + 1);
    sections.set(title, body.trim());
  }
  return sections;
}

function buildLesson(file, text, lexicon) {
  const { meta, body } = parseFrontmatter(text, file);
  const blocks = splitH1(body, file);
  const speech = splitH2(blocks.speech);
  const errors = [];
  const sections = {};
  const paragraphs = {};
  for (const name of SECTIONS) {
    if (!speech.has(name)) errors.push(`${file} 缺少口播段落「${name}」`);
  }
  if (errors.length) return { errors };
  for (const name of SECTIONS) {
    const sentences = parseSayBlocks(speech.get(name), file, name);
    sections[name] = [];
    for (const sentence of sentences) {
      const compiled = compileSentence(sentence, lexicon, file, name);
      errors.push(...compiled.errors);
      if (compiled.clip) sections[name].push(compiled.clip);
    }
    if (sections[name].length) paragraphs[name] = makeParagraph(sections[name]);
  }
  const parsedQuestions = blocks.ask
    .split(/\n(?=-\s+q:)/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => parseFields(chunk, file));
  if (parsedQuestions.length < 2) errors.push(`${file} 至少要有两个可以向老师问的问题`);
  const questionClips = [];
  for (const question of parsedQuestions) {
    if (!question.q || !question.say) errors.push(`${file} 的提问缺少 q 或 say`);
    if (!TONES[question.tone]) errors.push(`${file} 的提问「${question.q || ""}」语调无效`);
    if (!/^\d+$/.test(question.pause || "")) errors.push(`${file} 的提问「${question.q || ""}」缺少 pause`);
    if (question.q && question.say && TONES[question.tone] && /^\d+$/.test(question.pause || "")) {
      const compiled = compileSentence(
        { tone: question.tone, pause: Number(question.pause), stress: question.stress || "", phones: question.phones || "", say: question.say },
        lexicon,
        file,
        `提问「${question.q}」`,
      );
      errors.push(...compiled.errors);
      if (compiled.clip) questionClips.push({ q: question.q, ...compiled.clip });
    }
  }
  const hintText = `你要是想换个听法，直接跟我说就行。你也可以问我：${parsedQuestions.map((item) => item.q).filter(Boolean).join("；")}。`;
  const hintCompiled = compileSentence({ tone: "平稳", pause: 280, stress: "", phones: "", say: hintText }, lexicon, file, "提示");
  errors.push(...hintCompiled.errors);
  if (errors.length) return { errors };
  return {
    errors: [],
    lesson: {
      id: meta.id,
      module: meta.module,
      title: meta.title,
      order: meta.order,
      summaryHtml: renderSummary(blocks.summary),
      summaryText: blocks.summary,
      sections,
      paragraphs,
      narration: makeNarration(paragraphs),
      sectionOrder: SECTIONS,
      questions: questionClips,
      hint: hintCompiled.clip,
    },
  };
}

function curriculumMarkdown(lessons) {
  const groups = new Map();
  for (const lesson of lessons) {
    if (!groups.has(lesson.module)) groups.set(lesson.module, []);
    groups.get(lesson.module).push(lesson);
  }
  const lines = ["# Flutter 老师讲解课", "", "屏幕上是知识点总结。老师用另一套口语讲，带语调、多音字和函数名读音。没有测验。", "", "建议按下面的顺序听。", ""];
  let index = 1;
  for (const [module, items] of groups) {
    lines.push(`## ${module}`, "");
    for (const lesson of items) {
      lines.push(`${index}. ${lesson.title}`);
      index += 1;
    }
    lines.push("");
  }
  return lines.join("\n");
}

function assertComplete(lessons) {
  const counts = new Map();
  for (const lesson of lessons) counts.set(lesson.module, (counts.get(lesson.module) || 0) + 1);
  const problems = [];
  for (const [module, count] of EXPECTED) {
    if (counts.get(module) !== count) problems.push(`${module} 应为 ${count} 节，实际 ${counts.get(module) || 0} 节`);
  }
  const known = new Set(EXPECTED.map(([module]) => module));
  for (const module of counts.keys()) {
    if (!known.has(module)) problems.push(`未知模块：${module}`);
  }
  if (problems.length) {
    throw new Error(`课程还没写全：\n${problems.join("\n")}`);
  }
}

function main() {
  const lexicon = loadLexicon();
  const files = fs.readdirSync(lessonDir).filter((name) => name.endsWith(".md")).sort();
  if (!files.length) throw new Error("course/lessons 里还没有讲稿");
  const lessons = [];
  const errors = [];
  for (const name of files) {
    const built = buildLesson(name, fs.readFileSync(path.join(lessonDir, name), "utf8"), lexicon);
    errors.push(...built.errors);
    if (built.lesson) lessons.push(built.lesson);
  }
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
  lessons.sort((a, b) => a.order - b.order);
  const orders = new Set();
  for (const lesson of lessons) {
    if (orders.has(lesson.order)) throw new Error(`课序重复：${lesson.order}`);
    orders.add(lesson.order);
  }
  if (process.argv.includes("--complete")) assertComplete(lessons);
  const clips = {};
  for (const lesson of lessons) {
    for (const name of lesson.sectionOrder) {
      for (const clip of lesson.sections[name]) clips[clip.hash] = clip;
      const paragraph = lesson.paragraphs[name];
      if (paragraph) clips[paragraph.hash] = paragraph;
    }
    for (const clip of lesson.questions) clips[clip.hash] = clip;
    clips[lesson.hint.hash] = lesson.hint;
    if (lesson.narration) clips[lesson.narration.hash] = lesson.narration;
  }
  const course = { voice, sectionJump: SECTION_JUMP, lessons, clips };
  fs.mkdirSync(webDir, { recursive: true });
  fs.writeFileSync(path.join(webDir, "course-data.json"), JSON.stringify(course));
  const browserCourse = {
    lessons: lessons.map((lesson) => ({
      id: lesson.id,
      module: lesson.module,
      title: lesson.title,
      order: lesson.order,
      summaryHtml: lesson.summaryHtml,
      narration: { hash: lesson.narration.hash },
    })),
  };
  fs.writeFileSync(path.join(webDir, "course-data.js"), `window.COURSE = ${JSON.stringify(browserCourse)};\n`);
  fs.writeFileSync(path.join(root, "course/curriculum.md"), curriculumMarkdown(lessons));
  const sample = Object.values(clips).map((clip) => clip.ssml);
  const joined = sample.join("\n");
  if (!joined.includes("<phoneme")) throw new Error("样课语音标记里没有多音字");
  if (!joined.includes("<lang xml:lang='en-US'>")) throw new Error("样课语音标记里没有英语读音");
  if (!joined.includes("set state") && !joined.includes("run app")) {
    throw new Error("样课还没有函数名的真人读法");
  }
  const rates = new Set(Object.values(clips).map((clip) => clip.rate));
  if (rates.size < 2) throw new Error("语调没有变成不同的语速");
  console.log(`已编译 ${lessons.length} 节，${Object.keys(clips).length} 句`);
}

main();
