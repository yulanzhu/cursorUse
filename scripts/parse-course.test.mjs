import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { checkAgainstSyllabus, parseCourse, parseModule } from "./course-format.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const sample = `# 认识 Flutter

## lesson what-flutter-solves
title: Flutter 解决什么问题

### 定义
visual: concept
caption: 一套界面描述

Flutter 用一份界面描述画到多个平台。你写的是屏幕上有什么，绘制交给框架。

### 类比
visual: compare
left: 多份菜谱
right: 一份菜谱
caption: 菜谱只写一次

每个平台各画一遍，就像每换一个厨房就重写菜谱。一份界面描述可以在手机和网页上反复使用。

### 机制
visual: concept
caption: 描述和绘制分开

你的代码停在描述这一层。框架再把同一棵界面树画成像素，平台差异留在框架内部处理。

### 示例
visual: code
caption: 最小启动

\`\`\`dart
void main() {
  runApp(const Text('你好'));
}
\`\`\`

runApp 把这棵很小的界面树交给框架。以后项目变大，启动方式仍然从这里开始。

### 你会看到
visual: phone
caption: 一行字

跑起来之后，屏幕上会出现一行字。没有按钮，也没有第二页，它只说明界面已经画出来了。

### 常见坑
visual: warning
caption: 语言和框架

只把 Dart 语法学完，仍然不会做排版。语法负责把想法写出来，界面和布局要靠框架。

### 收束
visual: path
caption: 下一课

先记住它是负责绘制界面的框架。下一课再看跨平台怎么做到一套代码，那一课会把平台差异讲开。
`;

test("解析一课的七段、代码和口播", () => {
  const mod = parseModule("01-intro.md", sample);
  assert.equal(mod.id, "intro");
  assert.equal(mod.title, "认识 Flutter");
  assert.equal(mod.lessons.length, 1);
  const lesson = mod.lessons[0];
  assert.equal(lesson.segments.length, 7);
  assert.equal(lesson.segments[3].code.includes("runApp"), true);
  assert.equal(lesson.segments[3].text.includes("```"), false);
  assert.equal(lesson.segments[3].text.includes("runApp"), true);
});

test("代码块里的标题不会把课程拆开", () => {
  const source = sample.replace(
    "void main() {",
    "void main() {\n// ### 定义\n// ## lesson fake",
  );
  const mod = parseModule("01-intro.md", source);
  assert.equal(mod.lessons.length, 1);
  assert.equal(mod.lessons[0].segments.length, 7);
});

test("缺图示会失败", () => {
  assert.throws(() => parseModule("01-intro.md", sample.replace("visual: concept\n", "")), /缺少 visual/);
});

test("全量课文和课程清单一致", async () => {
  const contentDir = path.join(root, "content");
  let names = [];
  try {
    names = (await readdir(contentDir)).filter((name) => name.endsWith(".md")).sort();
  } catch {
    names = [];
  }
  if (names.length === 0) return;
  const files = [];
  for (const name of names) {
    files.push({ filename: name, source: await readFile(path.join(contentDir, name), "utf8") });
  }
  const course = parseCourse(files);
  const stats = checkAgainstSyllabus(course);
  assert.equal(stats.lessons, 124);
  assert.equal(stats.segments, 868);
});
