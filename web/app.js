const course = window.COURSE;
const state = {
  lesson: null,
  flat: [],
  index: 0,
  audio: null,
  paused: true,
  recognition: null,
};

const summary = document.querySelector("#summary");
const title = document.querySelector("#title");
const moduleName = document.querySelector("#module");
const caption = document.querySelector("#caption");
const tone = document.querySelector("#tone");
const heard = document.querySelector("#heard");
const playButton = document.querySelector("#play");
const toc = document.querySelector("#toc");
const sidebar = document.querySelector("#sidebar");

const commands = [
  { keys: ["说得简单点", "简单点", "大白话"], section: "大白话" },
  { keys: ["再详细一点", "讲深一点", "详细一点"], section: "再讲深一点" },
  { keys: ["专业一点", "专业讲解"], section: "专业讲解" },
  { keys: ["举个例子", "怎么用"], section: "怎么用" },
  { keys: ["边界是什么", "边界"], section: "边界" },
  { keys: ["这节讲了什么", "总结一下"], section: "收束" },
  { keys: ["再说一遍", "重复"], action: "again" },
  { keys: ["上一句"], action: "prev" },
  { keys: ["下一句"], action: "next" },
  { keys: ["上一节"], action: "prevLesson" },
  { keys: ["下一节"], action: "nextLesson" },
  { keys: ["暂停", "停下"], action: "pause" },
  { keys: ["继续", "播放", "开始"], action: "play" },
];

function flatten(lesson) {
  const list = [];
  for (const name of lesson.sectionOrder) {
    for (const clip of lesson.sections[name]) list.push({ ...clip, section: name });
  }
  return list;
}

function renderToc() {
  const groups = new Map();
  for (const lesson of course.lessons) {
    if (!groups.has(lesson.module)) groups.set(lesson.module, []);
    groups.get(lesson.module).push(lesson);
  }
  toc.innerHTML = "";
  for (const [name, lessons] of groups) {
    const block = document.createElement("div");
    block.className = "module-block";
    const heading = document.createElement("h2");
    heading.textContent = name;
    block.append(heading);
    for (const lesson of lessons) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "toc-button";
      button.dataset.id = lesson.id;
      button.textContent = lesson.title;
      button.addEventListener("click", () => openLesson(lesson.id, 0, false));
      block.append(button);
    }
    toc.append(block);
  }
}

function markToc() {
  for (const button of toc.querySelectorAll(".toc-button")) {
    button.classList.toggle("current", button.dataset.id === state.lesson.id);
  }
}

function openLesson(id, index = 0, autoplay = false) {
  stopAudio();
  state.lesson = course.lessons.find((lesson) => lesson.id === id) || course.lessons[0];
  state.flat = flatten(state.lesson);
  state.index = Math.min(index, Math.max(state.flat.length - 1, 0));
  title.textContent = state.lesson.title;
  moduleName.textContent = state.lesson.module;
  summary.innerHTML = state.lesson.summaryHtml;
  markToc();
  sidebar.classList.remove("open");
  showClip(state.flat[state.index], false);
  saveProgress();
  if (autoplay) playCurrent();
}

function showClip(clip, scrolling = true) {
  if (!clip) return;
  caption.textContent = clip.text.replace(/`/g, "");
  tone.textContent = clip.tone || "";
  for (const node of summary.querySelectorAll("[data-section]")) {
    node.classList.toggle("is-current", node.dataset.section === clip.section);
  }
  const current = summary.querySelector(`[data-section="${clip.section}"]`);
  if (scrolling && current) current.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function saveProgress() {
  localStorage.setItem(
    "flutter-teacher-progress",
    JSON.stringify({ lessonId: state.lesson.id, index: state.index }),
  );
}

function stopAudio() {
  if (state.audio) {
    state.audio.pause();
    state.audio.src = "";
    state.audio = null;
  }
  state.paused = true;
  playButton.textContent = "播放";
}

function playCurrent() {
  const clip = state.flat[state.index];
  if (!clip) return;
  showClip(clip);
  const sameParagraph = state.audio && state.paragraphHash === clip.paragraphHash && state.audio.src;
  if (sameParagraph && Number.isFinite(state.audio.duration)) {
    state.audio.currentTime = clip.startRatio * state.audio.duration;
    if (state.audio.paused) state.audio.play();
    state.paused = false;
    playButton.textContent = "暂停";
    saveProgress();
    return;
  }
  stopAudio();
  showClip(clip);
  const audio = new Audio(`/api/audio/${clip.paragraphHash}.mp3`);
  audio.playbackRate = Number(document.querySelector("#speed").value);
  state.audio = audio;
  state.paragraphHash = clip.paragraphHash;
  state.paused = false;
  playButton.textContent = "暂停";
  let followCaption = clip.startRatio < 0.02;
  audio.addEventListener("loadedmetadata", () => {
    if (clip.startRatio > 0.01 && Number.isFinite(audio.duration)) {
      audio.currentTime = clip.startRatio * audio.duration;
    } else {
      followCaption = true;
    }
  });
  audio.addEventListener("seeked", () => {
    followCaption = true;
  });
  audio.addEventListener("timeupdate", () => {
    if (!followCaption || !audio.duration) return;
    const ratio = audio.currentTime / audio.duration;
    const hit = state.flat.findIndex(
      (item) => item.paragraphHash === clip.paragraphHash && ratio >= item.startRatio && ratio < item.endRatio + 0.004,
    );
    if (hit >= 0 && hit !== state.index) {
      state.index = hit;
      showClip(state.flat[hit]);
      saveProgress();
    }
  });
  audio.addEventListener("ended", () => {
    if (state.paused) return;
    let next = state.index + 1;
    while (next < state.flat.length && state.flat[next].paragraphHash === clip.paragraphHash) next += 1;
    if (next < state.flat.length) {
      state.index = next;
      saveProgress();
      playCurrent();
    } else {
      state.paused = true;
      playButton.textContent = "播放";
    }
  });
  audio.addEventListener("error", () => {
    caption.textContent = "这一句没有合成出来。请看终端里的原因。";
    playButton.textContent = "播放";
  });
  audio.play().catch(() => {
    playButton.textContent = "播放";
  });
  const nextParagraph = state.flat.find((item) => item.paragraphHash !== clip.paragraphHash && state.flat.indexOf(item) > state.index);
  if (nextParagraph) fetch(`/api/audio/${nextParagraph.paragraphHash}.mp3`);
  saveProgress();
}

function jumpSection(name) {
  const index = state.flat.findIndex((clip) => clip.section === name);
  if (index < 0) return;
  state.index = index;
  playCurrent();
}

function playClipObject(clip) {
  stopAudio();
  caption.textContent = clip.text.replace(/`/g, "");
  tone.textContent = clip.tone || "";
  const audio = new Audio(`/api/audio/${clip.hash}.mp3`);
  audio.playbackRate = Number(document.querySelector("#speed").value);
  state.audio = audio;
  state.paused = false;
  playButton.textContent = "暂停";
  audio.addEventListener("ended", () => {
    state.paused = true;
    playButton.textContent = "播放";
  });
  audio.play();
}

function normalize(text) {
  return text.replace(/[\s，。！？、,.!?"“”]/g, "");
}

function handleUtterance(text) {
  const cleaned = normalize(text);
  heard.textContent = text ? `听到：${text}` : "";
  const sorted = [...commands].sort((a, b) => b.keys[0].length - a.keys[0].length);
  for (const command of sorted) {
    if (command.keys.some((key) => cleaned.includes(normalize(key)))) {
      runCommand(command);
      return;
    }
  }
  const question = state.lesson.questions
    .map((item) => ({ item, score: overlap(cleaned, normalize(item.q)) }))
    .sort((a, b) => b.score - a.score)[0];
  if (question && question.score >= 4) {
    playClipObject(question.item);
    return;
  }
  playClipObject(state.lesson.hint);
}

function overlap(heardText, question) {
  if (!heardText || !question) return 0;
  if (heardText.includes(question) || question.includes(heardText)) return Math.min(heardText.length, question.length);
  let score = 0;
  for (let size = 4; size >= 2; size -= 1) {
    for (let i = 0; i <= question.length - size; i += 1) {
      if (heardText.includes(question.slice(i, i + size))) score += size;
    }
  }
  return score;
}

function runCommand(command) {
  if (command.section) {
    jumpSection(command.section);
    return;
  }
  if (command.action === "again") {
    playCurrent();
    return;
  }
  if (command.action === "prev") {
    state.index = Math.max(0, state.index - 1);
    playCurrent();
    return;
  }
  if (command.action === "next") {
    state.index = Math.min(state.flat.length - 1, state.index + 1);
    playCurrent();
    return;
  }
  if (command.action === "pause") {
    if (state.audio) state.audio.pause();
    state.paused = true;
    playButton.textContent = "播放";
    return;
  }
  if (command.action === "play") {
    if (state.audio && state.audio.paused && state.audio.src) {
      state.paused = false;
      state.audio.play();
      playButton.textContent = "暂停";
      return;
    }
    playCurrent();
    return;
  }
  if (command.action === "nextLesson" || command.action === "prevLesson") {
    const index = course.lessons.findIndex((lesson) => lesson.id === state.lesson.id);
    const next = course.lessons[index + (command.action === "nextLesson" ? 1 : -1)];
    if (next) openLesson(next.id, 0, true);
  }
}

function setupMic() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const button = document.querySelector("#mic");
  if (!Recognition) {
    button.disabled = true;
    button.textContent = "无法语音";
    return;
  }
  const recognition = new Recognition();
  recognition.lang = "zh-CN";
  recognition.interimResults = false;
  state.recognition = recognition;
  let holding = false;
  const start = (event) => {
    event.preventDefault();
    holding = true;
    button.classList.add("live");
    try { recognition.start(); } catch { /* already started */ }
  };
  const stop = () => {
    if (!holding) return;
    holding = false;
    button.classList.remove("live");
    try { recognition.stop(); } catch { /* already stopped */ }
  };
  button.addEventListener("pointerdown", start);
  button.addEventListener("pointerup", stop);
  button.addEventListener("pointerleave", stop);
  recognition.addEventListener("result", (event) => {
    handleUtterance(event.results[0][0].transcript);
  });
  recognition.addEventListener("error", () => {
    heard.textContent = "没有听清。可以直接打字。";
  });
}

document.querySelector("#play").addEventListener("click", () => {
  if (state.audio && !state.audio.paused) {
    runCommand({ action: "pause" });
  } else if (state.audio && state.audio.paused && state.audio.currentTime > 0) {
    runCommand({ action: "play" });
  } else {
    playCurrent();
  }
});

for (const button of document.querySelectorAll("[data-command]")) {
  button.addEventListener("click", () => handleUtterance(button.dataset.command));
}

document.querySelector("#ask-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#ask");
  handleUtterance(input.value);
  input.value = "";
});

document.querySelector("#speed").addEventListener("input", (event) => {
  if (state.audio) state.audio.playbackRate = Number(event.target.value);
});

document.querySelector("#menu").addEventListener("click", () => sidebar.classList.toggle("open"));

document.addEventListener("keydown", (event) => {
  if (event.target.matches("input, textarea")) return;
  if (event.code === "Space") {
    event.preventDefault();
    document.querySelector("#play").click();
  }
  if (event.key === "ArrowRight") handleUtterance("下一句");
  if (event.key === "ArrowLeft") handleUtterance("上一句");
});

renderToc();
setupMic();
const saved = JSON.parse(localStorage.getItem("flutter-teacher-progress") || "null");
if (saved && course.lessons.some((lesson) => lesson.id === saved.lessonId)) {
  openLesson(saved.lessonId, saved.index || 0, false);
} else {
  openLesson(course.lessons[0].id, 0, false);
}
