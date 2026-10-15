(function () {
  const style = document.createElement("style");
  style.textContent = `
    .fv { position: relative; min-height: 260px; height: 100%; padding: 18px 20px 16px; color: #f6f1e8; overflow: hidden; }
    .fv-kicker { margin: 0; color: #e7a27a; font-size: 12px; letter-spacing: 0.14em; }
    .fv-caption { margin: 4px 0 14px; font-family: "Iowan Old Style", Palatino, "Songti SC", serif; font-size: 28px; line-height: 1.25; font-weight: 640; }
    .fv-row { display: flex; gap: 10px; align-items: stretch; }
    .fv-chip, .fv-point { border-radius: 12px; background: rgba(246, 241, 232, 0.08); }
    .fv-point { margin: 0; padding: 10px 12px; list-style: none; }
    .fv-points { display: grid; gap: 8px; margin: 0; padding: 0; }
    .fv-point { animation: fv-rise 0.6s ease both; }
    .fv-point:nth-child(2) { animation-delay: 0.15s; }
    .fv-point:nth-child(3) { animation-delay: 0.3s; }
    .fv-point:nth-child(4) { animation-delay: 0.45s; }
    @keyframes fv-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
    .fv-layers, .fv-cols, .fv-flow, .fv-shelves { display: grid; gap: 10px; }
    .fv-layers { grid-template-columns: 1fr; }
    .fv-plate, .fv-col, .fv-node, .fv-box, .fv-card, .fv-shelf {
      border-radius: 14px;
      background: rgba(246, 241, 232, 0.08);
      border: 1px solid rgba(246, 241, 232, 0.12);
    }
    .fv-plate { padding: 12px 14px; animation: fv-rise 0.7s ease both; }
    .fv-plate strong, .fv-col h4, .fv-shelf h4, .fv-card h4 { display: block; margin: 0 0 4px; color: #f0b429; }
    .fv-plate span, .fv-col p, .fv-shelf p, .fv-card p { margin: 0; color: #d9d0c4; }
    .fv-cols { grid-template-columns: repeat(3, minmax(0, 1fr)); position: relative; }
    .fv-col { padding: 12px; }
    .fv-node { margin-top: 8px; padding: 8px 10px; background: rgba(31, 122, 109, 0.35); }
    .fv-travel {
      position: absolute; top: 46%; width: 14px; height: 14px; border-radius: 50%;
      background: #f0b429; animation: fv-travel 3.4s ease-in-out infinite;
    }
    @keyframes fv-travel { 0% { left: 10%; } 50% { left: 46%; } 100% { left: 78%; } }
    .fv-constraints { display: grid; grid-template-columns: 180px 1fr; gap: 12px; align-items: center; }
    .fv-parent { height: 180px; border: 2px dashed rgba(246, 241, 232, 0.45); border-radius: 16px; position: relative; }
    .fv-child {
      position: absolute; left: 28px; width: 96px; height: 64px; border-radius: 12px; background: #1f7a6d;
      animation: fv-child 4s ease-in-out infinite;
    }
    @keyframes fv-child {
      0%, 20% { top: 70px; height: 48px; }
      45%, 70% { top: 36px; height: 96px; }
      100% { top: 24px; height: 96px; left: 48px; }
    }
    .fv-arrow-label { color: #f0b429; font-size: 14px; margin: 6px 0; }
    .fv-boxes { display: flex; gap: 10px; min-height: 150px; align-items: stretch; }
    .fv-boxes[data-mode="column"] { flex-direction: column; max-width: 220px; }
    .fv-boxes[data-mode="wrap"] { flex-wrap: wrap; max-width: 280px; }
    .fv-boxes[data-mode="cycle"] { animation: fv-axis 6s linear infinite; }
    @keyframes fv-axis { 0%, 40% { flex-direction: row; } 55%, 90% { flex-direction: column; max-width: 220px; } 100% { flex-direction: row; max-width: none; } }
    .fv-box { flex: 1; min-width: 72px; min-height: 64px; display: grid; place-items: center; padding: 8px; text-align: center; }
    .fv-box:nth-child(1) { background: #1f7a6d; }
    .fv-box:nth-child(2) { background: #d85a1a; }
    .fv-box:nth-child(3) { background: #315f8a; }
    .fv-box:nth-child(4) { background: #8a5a2b; }
    .fv-stack-wrap { position: relative; height: 180px; }
    .fv-stack-wrap .fv-box { position: absolute; width: 58%; height: 72px; }
    .fv-stack-wrap .fv-box:nth-child(1) { left: 8%; top: 18px; }
    .fv-stack-wrap .fv-box:nth-child(2) { left: 22%; top: 58px; }
    .fv-stack-wrap .fv-box:nth-child(3) { left: 36%; top: 98px; }
    .fv-scroll-window { height: 150px; overflow: hidden; mask-image: linear-gradient(#000 70%, transparent); }
    .fv-scroll-track { display: flex; flex-direction: column; gap: 8px; animation: fv-scroll 5s linear infinite; }
    @keyframes fv-scroll { from { transform: translateY(0); } to { transform: translateY(-50%); } }
    .fv-tree { display: flex; gap: 16px; align-items: flex-start; }
    .fv-hot { animation: fv-flash 2.4s ease-in-out infinite; }
    @keyframes fv-flash { 0%, 35% { background: rgba(246, 241, 232, 0.08); } 50%, 75% { background: #d85a1a; } 100% { background: rgba(246, 241, 232, 0.08); } }
    .fv-routes { position: relative; height: 180px; }
    .fv-screen { position: absolute; inset: 10px 30% 10px 8%; border-radius: 16px; padding: 16px; background: #243140; }
    .fv-screen.next { inset: 10px 8% 10px 28%; background: #1f7a6d; animation: fv-push 4.2s ease-in-out infinite; }
    @keyframes fv-push { 0%, 12% { transform: translateX(120%); } 32%, 68% { transform: translateX(0); } 88%, 100% { transform: translateX(120%); } }
    .fv-shelves { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .fv-shelf { min-height: 120px; padding: 12px; }
    .fv-token { width: 18px; height: 18px; border-radius: 50%; background: #f0b429; margin-top: 18px; animation: fv-token 3.6s ease-in-out infinite; }
    @keyframes fv-token { 0%, 20% { transform: translateX(0); } 45%, 70% { transform: translateX(calc(100% + 40px)); } 100% { transform: translateX(0); } }
    .fv-future { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .fv-future article { padding: 14px; border-radius: 14px; background: rgba(246, 241, 232, 0.06); }
    .fv-future .is-hot { animation: fv-flash 2.8s ease-in-out infinite; }
    .fv-spinner { width: 22px; height: 22px; border-radius: 50%; border: 3px solid rgba(246,241,232,0.25); border-top-color: #f0b429; animation: fv-spin 0.8s linear infinite; }
    @keyframes fv-spin { to { transform: rotate(360deg); } }
    .fv-tracks { display: grid; gap: 14px; }
    .fv-track { height: 28px; border-radius: 999px; background: rgba(246,241,232,0.08); overflow: hidden; position: relative; }
    .fv-fill { height: 100%; width: 40%; background: #1f7a6d; animation: fv-fill 3s ease-in-out infinite; }
    .fv-fill.playhead { width: 16px; border-radius: 999px; background: #f0b429; animation: fv-head 3s linear infinite; }
    @keyframes fv-fill { 0% { width: 8%; } 70%, 100% { width: 100%; } }
    @keyframes fv-head { 0% { transform: translateX(0); } 100% { transform: translateX(280px); } }
    .fv-phone { width: 180px; height: 250px; margin-left: 8px; border-radius: 28px; padding: 14px 12px; background: #0c1218; border: 3px solid #d9d0c4; box-shadow: inset 0 0 0 2px #121a22; }
    .fv-phone header { height: 28px; border-radius: 8px; background: #1f7a6d; display: grid; place-items: center; font-size: 12px; }
    .fv-phone li { margin-top: 8px; padding: 8px; border-radius: 8px; background: rgba(246,241,232,0.08); font-size: 13px; }
    .fv-split { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .fv-card { padding: 14px; min-height: 140px; }
    .fv-card:last-child { background: rgba(31, 122, 109, 0.28); }
    .fv-form { display: grid; gap: 8px; max-width: 320px; }
    .fv-field { height: 36px; border-radius: 8px; background: rgba(246,241,232,0.1); }
    .fv-error { color: #ffb4a2; animation: fv-rise 0.4s ease both 0.8s; }
    .fv-ok { color: #9ddeb5; animation: fv-rise 0.4s ease both 1.6s; }
    .fv-swatches { display: flex; gap: 8px; }
    .fv-swatch { width: 56px; height: 72px; border-radius: 12px; animation: fv-rise 0.5s ease both; }
    .fv-channel { display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; align-items: center; }
    .fv-packet { width: 54px; height: 28px; border-radius: 999px; background: #f0b429; animation: fv-packet 2.4s ease-in-out infinite; }
    @keyframes fv-packet { 0%, 15% { transform: translateX(0); } 50%, 70% { transform: translateX(8px); } 100% { transform: translateX(0); } }
    .fv-pyramid { display: grid; justify-items: center; gap: 8px; }
    .fv-level { height: 36px; border-radius: 8px; display: grid; place-items: center; background: #1f7a6d; }
    .fv-codebox { margin: 0; padding: 12px 14px; border-radius: 12px; background: #0c1218; overflow: auto; font-family: ui-monospace, monospace; font-size: 13px; line-height: 1.5; }
    .fv-warning { border: 1px solid rgba(216, 90, 26, 0.8); background: rgba(216, 90, 26, 0.12); }
    .fv-steps { display: flex; gap: 8px; flex-wrap: wrap; }
    .fv-step { padding: 10px 12px; border-radius: 999px; background: rgba(246,241,232,0.08); animation: fv-rise 0.5s ease both; }
    @media (max-width: 700px) {
      .fv-caption { font-size: 22px; }
      .fv-cols, .fv-split, .fv-shelves, .fv-future, .fv-constraints { grid-template-columns: 1fr; }
      .fv-channel { grid-template-columns: 1fr; }
    }
    @media (prefers-reduced-motion: reduce) {
      .fv-travel, .fv-child, .fv-boxes[data-mode="cycle"], .fv-scroll-track, .fv-hot, .fv-screen.next,
      .fv-token, .fv-future .is-hot, .fv-spinner, .fv-fill, .fv-packet, .fv-point, .fv-plate, .fv-step { animation: none; }
    }
  `;
  document.head.appendChild(style);

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]));
  }

  function list(items) {
    return `<ul class="fv-points">${items.map((item) => `<li class="fv-point">${esc(item)}</li>`).join("")}</ul>`;
  }

  function shell(segment, body, extra) {
    return `<div class="fv ${extra || ""}">
      <p class="fv-kicker">${esc(segment.role || "")}</p>
      <h3 class="fv-caption">${esc(segment.caption || "")}</h3>
      ${body}
    </div>`;
  }

  function headersOf(segment, fallback) {
    return segment.headers && segment.headers.length ? segment.headers : fallback;
  }

  function pointsOf(segment, fallback) {
    return segment.points && segment.points.length ? segment.points : fallback;
  }

  const scenes = {
    concept(segment) {
      return shell(segment, list(pointsOf(segment, ["先看定义", "再看例子", "最后记住坑"])));
    },
    layers(segment) {
      const headers = headersOf(segment, ["Framework", "Engine", "Embedder"]);
      const points = pointsOf(segment, ["你在这里描述界面", "排版并绘制像素", "交给各个操作系统"]);
      const plates = headers
        .map((header, index) => `<article class="fv-plate" style="animation-delay:${index * 0.15}s"><strong>${esc(header)}</strong><span>${esc(points[index] || "")}</span></article>`)
        .join("");
      return shell(segment, `<div class="fv-layers">${plates}</div>`);
    },
    trees(segment) {
      const headers = headersOf(segment, ["Widget", "Element", "RenderObject"]);
      const points = pointsOf(segment, ["不可变的配置", "树上的实例", "负责布局和绘制"]);
      const cols = headers
        .map((header, index) => `<article class="fv-col"><h4>${esc(header)}</h4><p>${esc(points[index] || "")}</p><div class="fv-node">上层</div><div class="fv-node">中层</div><div class="fv-node">叶子</div></article>`)
        .join("");
      return shell(segment, `<div class="fv-cols">${cols}<span class="fv-travel" aria-hidden="true"></span></div>`);
    },
    constraints(segment) {
      const points = pointsOf(segment, ["约束向下", "尺寸向上", "父级决定位置"]);
      return shell(
        segment,
        `<div class="fv-constraints">
          <div class="fv-parent"><div class="fv-child"></div></div>
          <div>${points.map((item) => `<p class="fv-arrow-label">${esc(item)}</p>`).join("")}</div>
        </div>`,
      );
    },
    boxes(segment) {
      const mode = segment.mode || "row";
      const points = pointsOf(segment, ["甲", "乙", "丙"]);
      const boxes = points.map((item) => `<div class="fv-box">${esc(item)}</div>`).join("");
      if (mode === "stack") return shell(segment, `<div class="fv-stack-wrap">${boxes}</div>`);
      if (mode === "scroll") {
        return shell(segment, `<div class="fv-scroll-window"><div class="fv-scroll-track">${boxes}${boxes}</div></div>`);
      }
      return shell(segment, `<div class="fv-boxes" data-mode="${esc(mode)}">${boxes}</div>`);
    },
    rebuild(segment) {
      return shell(
        segment,
        `<div class="fv-tree">
          <article class="fv-col"><h4>保持不动</h4><div class="fv-node">页头</div><div class="fv-node">标题</div></article>
          <article class="fv-col"><h4>setState</h4><div class="fv-node fv-hot">计数 ${esc((segment.points || [])[0] || "子树")}</div><div class="fv-node fv-hot">${esc((segment.points || [])[1] || "按钮")}</div></article>
        </div>`,
      );
    },
    routes(segment) {
      const points = pointsOf(segment, ["列表页", "详情页"]);
      return shell(
        segment,
        `<div class="fv-routes">
          <article class="fv-screen"><h4>${esc(points[0])}</h4><p>栈底还在</p></article>
          <article class="fv-screen next"><h4>${esc(points[1] || "新页面")}</h4><p>${esc(points[2] || "push 进来，pop 离开")}</p></article>
        </div>`,
      );
    },
    state(segment) {
      const headers = headersOf(segment, ["临时状态", "页面状态", "应用状态"]);
      const points = pointsOf(segment, ["输入框、动画", "这一页的数据", "登录、主题"]);
      const shelves = headers
        .map((header, index) => `<article class="fv-shelf"><h4>${esc(header)}</h4><p>${esc(points[index] || "")}</p>${index === 0 ? '<div class="fv-token" aria-hidden="true"></div>' : ""}</article>`)
        .join("");
      return shell(segment, `<div class="fv-shelves">${shelves}</div>`);
    },
    future(segment) {
      const mode = segment.mode || "cycle";
      const cards = [
        ["等待", "请求还在路上"],
        ["成功", "拿到数据后再画"],
        ["失败", "超时或状态码不对"],
      ];
      const hot = mode === "error" ? 2 : mode === "success" ? 1 : 0;
      const body = cards
        .map((card, index) => {
          const mark = index === 0 ? '<div class="fv-spinner"></div>' : "";
          const klass = mode === "cycle" || index === hot ? "is-hot" : "";
          return `<article class="${klass}"><strong>${card[0]}</strong><p>${card[1]}</p>${mark}</article>`;
        })
        .join("");
      return shell(segment, `<div class="fv-future">${body}</div>`);
    },
    timeline(segment) {
      const headers = headersOf(segment, ["隐式动画", "显式控制器"]);
      return shell(
        segment,
        `<div class="fv-tracks">
          <div><p class="fv-arrow-label">${esc(headers[0] || "")}</p><div class="fv-track"><div class="fv-fill"></div></div></div>
          <div><p class="fv-arrow-label">${esc(headers[1] || "")}</p><div class="fv-track"><div class="fv-fill playhead"></div></div></div>
        </div>`,
      );
    },
    phone(segment) {
      const points = pointsOf(segment, ["标题", "正文", "操作"]);
      return shell(
        segment,
        `<div class="fv-phone"><header>${esc(segment.caption || "预览")}</header><ul class="fv-points">${points
          .map((item) => `<li>${esc(item)}</li>`)
          .join("")}</ul></div>`,
      );
    },
    warning(segment) {
      return shell(segment, list(pointsOf(segment, ["这里容易错"])), "fv-warning");
    },
    path(segment) {
      const points = pointsOf(segment, ["当前", "下一步"]);
      return shell(
        segment,
        `<div class="fv-steps">${points
          .map((item, index) => `<span class="fv-step" style="animation-delay:${index * 0.15}s">${index + 1}. ${esc(item)}</span>`)
          .join("")}</div>`,
      );
    },
    code(segment) {
      const code = segment.code || (segment.points || []).join("\n") || segment.caption || "";
      return shell(segment, `<pre class="fv-codebox">${esc(code)}</pre>`);
    },
    compare(segment) {
      const points = segment.points || [];
      const mid = Math.ceil(points.length / 2) || 1;
      const left = points.slice(0, mid);
      const right = points.slice(mid);
      return shell(
        segment,
        `<div class="fv-split">
          <article class="fv-card"><h4>${esc(segment.left || "这边")}</h4>${list(left.length ? left : ["左边"])}</article>
          <article class="fv-card"><h4>${esc(segment.right || "那边")}</h4>${list(right.length ? right : ["右边"])}</article>
        </div>`,
      );
    },
    form(segment) {
      const points = pointsOf(segment, ["名字还空着", "邮箱格式对了"]);
      return shell(
        segment,
        `<div class="fv-form">
          <div class="fv-field"></div><p class="fv-error">${esc(points[0])}</p>
          <div class="fv-field"></div><p class="fv-ok">${esc(points[1] || "通过")}</p>
        </div>`,
      );
    },
    theme(segment) {
      const dark = segment.mode === "dark";
      const colors = dark ? ["#101418", "#d85a1a", "#9ddeb5", "#f6f1e8"] : ["#f6f1e8", "#1f7a6d", "#d85a1a", "#1d1914"];
      return shell(
        segment,
        `<div class="fv-swatches">${colors.map((color) => `<span class="fv-swatch" style="background:${color}"></span>`).join("")}</div>${list(pointsOf(segment, ["种子色", "颜色方案", "文字样式"]))}`,
      );
    },
    channel(segment) {
      const headers = headersOf(segment, ["Dart", "平台"]);
      return shell(
        segment,
        `<div class="fv-channel">
          <article class="fv-card"><h4>${esc(headers[0])}</h4><p>${esc((segment.points || [])[0] || "invokeMethod")}</p></article>
          <div class="fv-packet" aria-hidden="true"></div>
          <article class="fv-card"><h4>${esc(headers[1])}</h4><p>${esc((segment.points || [])[1] || "原生来处理")}</p></article>
        </div>`,
      );
    },
    pyramid(segment) {
      const headers = headersOf(segment, ["集成测试", "Widget 测试", "单元测试"]);
      const widths = ["42%", "68%", "100%"];
      return shell(
        segment,
        `<div class="fv-pyramid">${headers
          .map((header, index) => `<div class="fv-level" style="width:${widths[index] || "100%"}">${esc(header)}</div>`)
          .join("")}</div>`,
      );
    },
    flow(segment) {
      const headers = headersOf(segment, ["界面", "状态", "仓库", "网络"]);
      const points = pointsOf(segment, []);
      const steps = headers
        .map((header, index) => `<article class="fv-plate" style="animation-delay:${index * 0.12}s"><strong>${esc(header)}</strong><span>${esc(points[index] || "")}</span></article>`)
        .join("");
      return shell(segment, `<div class="fv-flow">${steps}</div>`);
    },
  };

  function render(host, segment) {
    const draw = scenes[segment.visual] || scenes.concept;
    host.innerHTML = draw(segment);
  }

  window.FlutterVisuals = { render };
})();
