(function () {
  const storageKey = "flutter-voice-course-v1";
  const audio = new Audio();
  audio.preload = "auto";

  const app = document.querySelector("#app");
  const progressLabel = document.querySelector("#progress-label");
  const catalogNav = document.querySelector("#catalog-nav");
  const moduleLabel = document.querySelector("#module-label");
  const lessonTitle = document.querySelector("#lesson-title");
  const segmentCount = document.querySelector("#segment-count");
  const banner = document.querySelector("#banner");
  const stage = document.querySelector("#stage");
  const transcript = document.querySelector("#transcript");
  const playButton = document.querySelector("#play");
  const navNote = document.querySelector("#nav-note");
  const prevLessonButton = document.querySelector("#prev-lesson");
  const nextLessonButton = document.querySelector("#next-lesson");

  const state = {
    course: null,
    flat: [],
    lessonIndex: 0,
    segmentIndex: 0,
    playing: false,
    rate: 1,
    completed: new Set(),
    loadedSrc: "",
    loadGeneration: 0,
    catalogReady: false,
  };

  function currentEntry() {
    return state.flat[state.lessonIndex];
  }
  function currentLesson() {
    return currentEntry().lesson;
  }
  function currentSegment() {
    return currentLesson().segments[state.segmentIndex];
  }

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  }

  function saveProgress() {
    const lesson = state.flat.length ? currentLesson() : null;
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        lessonId: lesson ? lesson.id : "",
        segmentIndex: state.segmentIndex,
        rate: state.rate,
        completed: [...state.completed],
      }),
    );
  }

  function showError(text) {
    banner.hidden = false;
    banner.textContent = text;
  }
  function clearError() {
    banner.hidden = true;
    banner.textContent = "";
  }

  function failAudio() {
    state.playing = false;
    const lesson = currentLesson();
    const segment = currentSegment();
    const excerpt = segment.text.replace(/\s+/g, "").slice(0, 36);
    showError(`这一句的语音没有加载成功。课：${lesson.title}。句：${segment.role}。${excerpt}`);
    playButton.textContent = "播放";
  }

  function highlight(code) {
    return escapeHtml(code).replace(
      /(\/\/.*$)|(\b(?:abstract|async|await|class|const|else|enum|extends|factory|final|if|implements|import|late|new|required|return|static|void|while|with)\b)|('(?:\\'|[^'])*'|"(?:\\"|[^"])*")/gm,
      (match, comment, keyword, string) => {
        if (comment) return `<span class="tok-c">${comment}</span>`;
        if (keyword) return `<span class="tok-k">${keyword}</span>`;
        if (string) return `<span class="tok-s">${string}</span>`;
        return match;
      },
    );
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]));
  }

  function renderCatalog() {
    if (!state.catalogReady) {
      catalogNav.innerHTML = state.course.modules
        .map((mod) => {
          const lessons = mod.lessons
            .map((lesson) => {
              return `<button class="lesson-link" type="button" data-lesson="${escapeHtml(lesson.id)}">
                <span class="mark" aria-hidden="true"></span>
                <span class="lesson-name">${escapeHtml(lesson.title)}</span>
              </button>`;
            })
            .join("");
          return `<section class="module-block"><h3 class="module-name">${escapeHtml(mod.title)}</h3>${lessons}</section>`;
        })
        .join("");
      state.catalogReady = true;
    }
    const currentId = currentLesson().id;
    catalogNav.querySelectorAll(".lesson-link").forEach((button) => {
      const id = button.dataset.lesson;
      button.classList.toggle("is-current", id === currentId);
      button.classList.toggle("is-done", state.completed.has(id));
      if (id === currentId) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
    progressLabel.textContent = `已听完 ${state.completed.size} / ${state.flat.length} 课`;
  }

  function renderTranscript() {
    const lesson = currentLesson();
    transcript.innerHTML = lesson.segments
      .map((segment, index) => {
        const code = segment.code
          ? `<pre><button class="copy" type="button" data-copy="${index}">复制</button><code>${highlight(segment.code)}</code></pre>`
          : "";
        return `<article class="segment${index === state.segmentIndex ? " is-active" : ""}">
          <button class="jump" type="button" data-segment="${index}">
            <span class="role">${escapeHtml(segment.role)}</span>
            <p>${escapeHtml(segment.text)}</p>
          </button>
          ${code}
        </article>`;
      })
      .join("");
    const active = transcript.querySelector(".segment.is-active");
    if (active) active.scrollIntoView({ block: "nearest" });
  }

  function render() {
    const entry = currentEntry();
    const lesson = entry.lesson;
    const segment = currentSegment();
    const isLast = state.lessonIndex === state.flat.length - 1;
    const isFirst = state.lessonIndex === 0;
    moduleLabel.textContent = entry.module.title;
    lessonTitle.textContent = lesson.title;
    document.title = `${lesson.title} · Flutter 全量语音教程`;
    segmentCount.textContent = `${state.segmentIndex + 1} / ${lesson.segments.length}`;
    navNote.textContent = isLast ? "这是最后一课" : "";
    prevLessonButton.disabled = isFirst;
    nextLessonButton.disabled = isLast;
    window.FlutterVisuals.render(stage, segment);
    renderTranscript();
    renderCatalog();
    playButton.textContent = state.playing ? "暂停" : "播放";
    document.querySelectorAll(".speeds button").forEach((button) => {
      button.setAttribute("aria-pressed", Number(button.dataset.rate) === state.rate ? "true" : "false");
    });
    saveProgress();
  }

  function loadSegmentAudio() {
    const segment = currentSegment();
    if (!segment.audio) {
      failAudio();
      return false;
    }
    if (state.loadedSrc !== segment.audio) {
      state.loadedSrc = segment.audio;
      state.loadGeneration += 1;
      audio.src = segment.audio;
    }
    audio.playbackRate = state.rate;
    return true;
  }

  function playCurrent() {
    if (!loadSegmentAudio()) return;
    clearError();
    if (!state.playing) {
      audio.pause();
      return;
    }
    const generation = state.loadGeneration;
    audio.play().catch((error) => {
      if (generation !== state.loadGeneration) return;
      if (error && error.name === "AbortError") return;
      failAudio();
    });
  }

  function stepSegment(delta) {
    const lesson = currentLesson();
    const next = state.segmentIndex + delta;
    if (next >= 0 && next < lesson.segments.length) {
      state.segmentIndex = next;
    } else if (delta > 0 && state.lessonIndex < state.flat.length - 1) {
      state.lessonIndex += 1;
      state.segmentIndex = 0;
    } else if (delta < 0 && state.segmentIndex === 0 && state.lessonIndex > 0) {
      state.lessonIndex -= 1;
      state.segmentIndex = currentLesson().segments.length - 1;
    } else if (delta > 0) {
      navNote.textContent = "这是最后一课";
      return;
    }
    render();
    playCurrent();
  }

  function goLesson(index) {
    if (index < 0 || index >= state.flat.length) return;
    state.lessonIndex = index;
    state.segmentIndex = 0;
    render();
    playCurrent();
    if (window.matchMedia("(max-width: 900px)").matches) app.classList.remove("catalog-open");
  }

  function toggle() {
    state.playing = !state.playing;
    playButton.textContent = state.playing ? "暂停" : "播放";
    if (state.playing) playCurrent();
    else audio.pause();
  }

  audio.addEventListener("ended", () => {
    const lesson = currentLesson();
    if (state.segmentIndex < lesson.segments.length - 1) {
      state.segmentIndex += 1;
      render();
      playCurrent();
      return;
    }
    state.completed.add(lesson.id);
    if (state.lessonIndex < state.flat.length - 1) {
      state.lessonIndex += 1;
      state.segmentIndex = 0;
      render();
      playCurrent();
      return;
    }
    state.playing = false;
    render();
    navNote.textContent = "这是最后一课";
  });

  audio.addEventListener("error", () => {
    const generation = state.loadGeneration;
    const src = state.loadedSrc;
    window.setTimeout(() => {
      if (generation !== state.loadGeneration || state.loadedSrc !== src) return;
      if (audio.error && audio.error.code === 1) return;
      const segment = state.flat.length ? currentSegment() : null;
      if (!segment || !audio.src.endsWith(segment.audio)) return;
      failAudio();
    }, 80);
  });
  audio.addEventListener("canplay", () => {
    const segment = state.flat.length ? currentSegment() : null;
    if (segment && audio.src.endsWith(segment.audio)) clearError();
  });

  document.querySelector("#play").addEventListener("click", toggle);
  document.querySelector("#prev-segment").addEventListener("click", () => stepSegment(-1));
  document.querySelector("#next-segment").addEventListener("click", () => stepSegment(1));
  prevLessonButton.addEventListener("click", () => goLesson(state.lessonIndex - 1));
  nextLessonButton.addEventListener("click", () => {
    if (state.lessonIndex >= state.flat.length - 1) {
      navNote.textContent = "这是最后一课";
      return;
    }
    goLesson(state.lessonIndex + 1);
  });
  document.querySelector(".speeds").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-rate]");
    if (!button) return;
    state.rate = Number(button.dataset.rate);
    audio.playbackRate = state.rate;
    saveProgress();
    document.querySelectorAll(".speeds button").forEach((item) => {
      item.setAttribute("aria-pressed", Number(item.dataset.rate) === state.rate ? "true" : "false");
    });
  });
  catalogNav.addEventListener("click", (event) => {
    const button = event.target.closest(".lesson-link");
    if (!button) return;
    const index = state.flat.findIndex((entry) => entry.lesson.id === button.dataset.lesson);
    if (index >= 0) goLesson(index);
  });
  transcript.addEventListener("click", async (event) => {
    const copyButton = event.target.closest(".copy");
    if (copyButton) {
      const segment = currentLesson().segments[Number(copyButton.dataset.copy)];
      try {
        await navigator.clipboard.writeText(segment.code);
      } catch {
        const area = document.createElement("textarea");
        area.value = segment.code;
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      copyButton.textContent = "已复制";
      window.setTimeout(() => {
        copyButton.textContent = "复制";
      }, 1200);
      return;
    }
    const jump = event.target.closest("[data-segment]");
    if (!jump) return;
    state.segmentIndex = Number(jump.dataset.segment);
    render();
    playCurrent();
  });
  document.querySelector("#catalog-open").addEventListener("click", () => app.classList.add("catalog-open"));
  document.querySelector("#catalog-close").addEventListener("click", () => app.classList.remove("catalog-open"));
  document.addEventListener("keydown", (event) => {
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (event.key === " ") {
      event.preventDefault();
      toggle();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepSegment(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      stepSegment(1);
    }
  });

  fetch("./course.json")
    .then((response) => {
      if (!response.ok) throw new Error(`课程清单加载失败（${response.status}）`);
      return response.json();
    })
    .then((course) => {
      state.course = course;
      state.flat = [];
      course.modules.forEach((mod) => {
        mod.lessons.forEach((lesson) => state.flat.push({ module: mod, lesson }));
      });
      const saved = loadProgress();
      state.rate = [0.75, 1, 1.25, 1.5].includes(Number(saved.rate)) ? Number(saved.rate) : 1;
      state.completed = new Set(Array.isArray(saved.completed) ? saved.completed : []);
      const savedIndex = state.flat.findIndex((entry) => entry.lesson.id === saved.lessonId);
      if (savedIndex >= 0) {
        state.lessonIndex = savedIndex;
        const max = state.flat[savedIndex].lesson.segments.length - 1;
        state.segmentIndex = Math.min(Math.max(Number(saved.segmentIndex) || 0, 0), max);
      }
      render();
      loadSegmentAudio();
    })
    .catch((error) => {
      lessonTitle.textContent = "课程没有加载";
      showError(error.message || "课程清单加载失败");
    });
})();
