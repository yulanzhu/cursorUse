const course = window.COURSE;
const state = { lesson: null, audio: null };

const summary = document.querySelector("#summary");
const title = document.querySelector("#title");
const moduleName = document.querySelector("#module");
const caption = document.querySelector("#caption");
const playButton = document.querySelector("#play");
const toc = document.querySelector("#toc");
const sidebar = document.querySelector("#sidebar");

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
      button.addEventListener("click", () => openLesson(lesson.id, false));
      block.append(button);
    }
    toc.append(block);
  }
}

function lessonIndex() {
  return course.lessons.findIndex((lesson) => lesson.id === state.lesson.id);
}

function warm(lesson) {
  if (!lesson) return;
  fetch(`/api/audio/${lesson.narration.hash}.mp3`).catch(() => {});
}

function stopAudio() {
  if (state.audio) {
    state.audio.pause();
    state.audio.src = "";
    state.audio = null;
  }
  playButton.textContent = "播放";
}

function openLesson(id, autoplay) {
  stopAudio();
  state.lesson = course.lessons.find((lesson) => lesson.id === id) || course.lessons[0];
  title.textContent = state.lesson.title;
  moduleName.textContent = state.lesson.module;
  summary.innerHTML = state.lesson.summaryHtml;
  caption.textContent = "点播放，老师会把这一节连续讲完。";
  for (const button of toc.querySelectorAll(".toc-button")) {
    button.classList.toggle("current", button.dataset.id === state.lesson.id);
  }
  sidebar.classList.remove("open");
  localStorage.setItem("flutter-teacher-progress", JSON.stringify({ lessonId: state.lesson.id }));
  warm(state.lesson);
  warm(course.lessons[lessonIndex() + 1]);
  if (autoplay) play();
}

function play() {
  const lesson = state.lesson;
  if (state.audio && !state.audio.ended && state.audio.paused && state.audio.currentTime > 0) {
    state.audio.play();
    playButton.textContent = "暂停";
    return;
  }
  stopAudio();
  caption.textContent = "正在准备这一节，准备好就连续讲完。";
  const audio = new Audio(`/api/audio/${lesson.narration.hash}.mp3`);
  audio.preload = "auto";
  state.audio = audio;
  audio.addEventListener("playing", () => {
    caption.textContent = "正在连续讲这一节。";
    playButton.textContent = "暂停";
  });
  audio.addEventListener("ended", () => {
    caption.textContent = "这一节讲完了。";
    playButton.textContent = "播放";
  });
  audio.addEventListener("error", () => {
    caption.textContent = "这一节没有准备好。看一下终端里的原因。";
    playButton.textContent = "播放";
  });
  audio.play().catch(() => {
    playButton.textContent = "播放";
  });
}

document.querySelector("#play").addEventListener("click", () => {
  if (state.audio && !state.audio.paused) {
    state.audio.pause();
    playButton.textContent = "播放";
    return;
  }
  play();
});

document.querySelector("#prev-lesson").addEventListener("click", () => {
  const previous = course.lessons[lessonIndex() - 1];
  if (previous) openLesson(previous.id, Boolean(state.audio && !state.audio.paused));
});

document.querySelector("#next-lesson").addEventListener("click", () => {
  const next = course.lessons[lessonIndex() + 1];
  if (next) openLesson(next.id, Boolean(state.audio && !state.audio.paused));
});

document.querySelector("#menu").addEventListener("click", () => sidebar.classList.toggle("open"));

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    document.querySelector("#play").click();
  }
});

renderToc();
const saved = JSON.parse(localStorage.getItem("flutter-teacher-progress") || "null");
openLesson(saved?.lessonId || course.lessons[0].id, false);
