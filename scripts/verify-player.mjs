import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: "new",
  args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage();
const audioUrls = [];
page.on("request", (request) => {
  if (request.url().includes("/api/audio/")) audioUrls.push(request.url());
});
const checks = [];
const expect = (name, ok) => {
  checks.push(`${ok ? "ok" : "FAIL"} ${name}`);
};
await page.goto("http://127.0.0.1:4173", { waitUntil: "domcontentloaded" });
const lessonCount = await page.$$eval(".toc-button", (nodes) => nodes.length);
expect("目录有 111 节", lessonCount === 111);
const summary = await page.$eval("#summary", (node) => node.innerText);
const body = await page.$eval("body", (node) => node.innerText);
expect("总结在讲声明式", summary.includes("声明式"));
expect("总结不是口播稿", !summary.includes("省掉什么麻烦"));
expect("页面没有测验", !body.includes("测验") && !body.includes("打分") && !body.includes("答错"));
await page.click("[data-command='说得简单点']");
await page.waitForFunction(() => document.querySelector("#caption").textContent.includes("点菜"), { timeout: 8000 });
expect("说得简单点切到口语", true);
await page.click("[data-command='举个例子']");
await page.waitForFunction(() => document.querySelector("#caption").textContent.includes("交接"), { timeout: 8000 });
expect("举个例子切到怎么用", true);
await page.click("#next-sentence");
await page.type("#ask", "下一节");
await page.click("#ask-form button[type='submit']");
await page.waitForFunction(() => document.querySelector("#title").textContent.includes("Embedder"), { timeout: 8000 });
expect("下一节进入第二课", true);
await page.reload({ waitUntil: "domcontentloaded" });
const restored = await page.$eval("#title", (node) => node.textContent);
expect("刷新后还停在第二节", restored.includes("Embedder"));
await page.$eval(".toc-button[data-id='62-riverpod']", (node) => node.click());
await page.waitForFunction(() => document.querySelector("#title").textContent.includes("Riverpod"));
const riverpodSummary = await page.$eval("#summary", (node) => node.innerText);
expect("Riverpod 总结提到 Notifier", riverpodSummary.includes("Notifier"));
await page.click("[data-command='说得简单点']");
await page.waitForFunction(() => document.querySelector("#caption").textContent.includes("白板"));
const riverpodCaption = await page.$eval("#caption", (node) => node.textContent);
expect("Riverpod 口语不是总结原句", !riverpodSummary.includes(riverpodCaption));
await page.setViewport({ width: 390, height: 844 });
await page.screenshot({ path: "/tmp/course-mobile.png" });
await page.setViewport({ width: 1280, height: 800 });
await page.screenshot({ path: "/tmp/course-desktop.png" });
expect("发出了老师音频请求", audioUrls.length > 0);
console.log(checks.join("\n"));
console.log("audio", audioUrls.length);
if (checks.some((line) => line.startsWith("FAIL"))) process.exit(1);
await browser.close();
