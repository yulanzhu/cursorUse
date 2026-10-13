import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: "new",
  args: ["--no-sandbox", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage();
const audioUrls = [];
page.on("request", (request) => {
  if (request.url().includes("/api/audio/")) audioUrls.push(new URL(request.url()).pathname);
});
const checks = [];
const expect = (name, ok) => checks.push(`${ok ? "ok" : "FAIL"} ${name}`);

await page.goto("http://127.0.0.1:4173", { waitUntil: "domcontentloaded" });
expect("目录有 111 节", (await page.$$eval(".toc-button", (nodes) => nodes.length)) === 111);
const summary = await page.$eval("#summary", (node) => node.innerText);
const body = await page.$eval("body", (node) => node.innerText);
expect("总结在讲声明式", summary.includes("声明式"));
expect("总结不是口播稿", !summary.includes("省掉什么麻烦"));
expect("页面没有测验", !body.includes("测验") && !body.includes("打分"));
expect("没有一句一句的按钮", !body.includes("上一句") && !body.includes("说得简单点"));
await page.click("#play");
await page.waitForFunction(() => document.querySelector("#caption").textContent.includes("准备") || document.querySelector("#caption").textContent.includes("连续讲"), { timeout: 8000 });
expect("播放会连续讲", true);
await page.click("#next-lesson");
await page.waitForFunction(() => document.querySelector("#title").textContent.includes("Embedder"), { timeout: 8000 });
expect("下一节进入第二课", true);
await page.reload({ waitUntil: "domcontentloaded" });
expect("刷新后还停在第二节", (await page.$eval("#title", (node) => node.textContent)).includes("Embedder"));
const hashes = new Set(audioUrls.map((path) => path.split("/").pop()));
expect("同一节只请求一条音频", hashes.size <= 3);
console.log(checks.join("\n"));
console.log("audio", [...hashes]);
if (checks.some((line) => line.startsWith("FAIL"))) process.exit(1);
await browser.close();
