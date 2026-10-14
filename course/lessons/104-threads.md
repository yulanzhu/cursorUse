---
id: 104-threads
module: 框架原理
title: 四条线程
order: 104
---

# 总结

UI 线程跑 `Dart`，并做构建、布局和绘制记录。`Raster` 线程把图层变成像素。`IO` 线程处理图片解码。`Platform` 线程跟操作系统打交道。不要在 UI 线程做重活。

<!-- section: 专业讲解 -->
## 四个人的分工

- 你的 `build` 在 UI 线程
- `Raster` 不跑业务 `Dart`
- 图片解码走 `IO`，避免堵在 UI 线程
- 平台通道的系统侧，很多时候要经过 `Platform` 线程
- 另开的 `isolate` 不能直接碰 UI 线程上的 `Widget`

<!-- section: 大白话 -->
## 大白话

- 写剧本的人若去做重活，整场戏都会停

<!-- section: 怎么用 -->
## 怎么用

- 界面和轻量状态留在 UI 线程
- 很大的计算丢到别的 `isolate`，结果送回来再改界面
- 图片解码交给框架

<!-- section: 再讲深一点 -->
## 再讲深一点

- UI 线程产出图层树，`Raster` 线程消费它
- 两边通过图层交接，不是共享一块可以随便改的界面对象
- 平台线程被堵住时，系统交互会迟钝

<!-- section: 边界 -->
## 边界

- 引擎里另外还有辅助线程。先记住这四条
- 这节不写系统侧的实现步骤

<!-- section: 收束 -->
## 留下这句

- `Dart` 在 UI，像素在 `Raster`，解码在 `IO`，系统在 `Platform`。重活离开 UI 线程

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节讲四条你该记住的线程。
- tone: 平稳
  pause: 280
  say: 记住它们，是为了知道重活不能放在哪一条上。

## 专业讲解

- tone: 平稳
  pause: 340
  say: UI 线程跑 `Dart`，也做构建、布局和绘制记录。你的 `build` 在这里。
- tone: 平稳
  pause: 320
  say: `Raster` 线程把图层变成像素。它不跑你的业务 `Dart`。
- tone: 平稳
  pause: 300
  say: `IO` 线程处理图片解码，避免把解码放在 UI 线程上。
- tone: 加重
  pause: 380
  stress: 重活
  say: 跟操作系统沟通的是 `Platform` 线程。重活不要堆到 UI 线程上。
- tone: 问句
  pause: 480
  say: 你在 UI 线程里解析一份很大的 `JSON`，`Raster` 线程能替你把这件事做掉吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 四个人分工。一个写剧本并做分镜，一个把分镜画成像素，一个去处理图片，一个在门口跟系统沟通。
- tone: 平稳
  pause: 320
  say: 负责写剧本的人一旦去做重活，整场戏就停了。重活交给别人，或另开一条 `isolate`。

## 怎么用

- tone: 平稳
  pause: 280
  say: 轻量的状态和界面更新，留在 UI 线程上做。
- tone: 平稳
  pause: 320
  say: 很大的计算丢到别的 `isolate`。图片解码交给框架，它会走 `IO` 线程。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: UI 线程交出图层树，`Raster` 线程把它变成像素。你不能拿一块界面对象在两条线程上随便改。
- tone: 放慢
  pause: 340
  say: `Platform` 线程若被堵住，点系统菜单也会迟。所以那边的重活也不该堆在这条线程上。这里只记分工。

## 边界

- tone: 平稳
  pause: 300
  say: 引擎里另外还有辅助线程。你先记住这四条就够用。
- tone: 平稳
  pause: 320
  say: 另开 `isolate` 以后，不能直接碰 UI 线程上的 `Widget`。结果要送回来再改界面。

## 收束

- tone: 收束
  pause: 500
  say: `Dart` 和构建在 UI，像素在 `Raster`，图片解码在 `IO`，系统在 `Platform`。
- tone: 收束
  pause: 460
  say: 重活不要放在 UI 线程。

# 可以向老师问

- q: 图片解码应该在哪条线程
  tone: 平稳
  pause: 300
  say: 在 `IO` 线程。不要让 UI 线程去做这种重活。
- q: `Raster` 线程跑 `build` 吗
  tone: 平稳
  pause: 320
  say: 不跑。`build` 在 UI 线程。`Raster` 线程负责把图层变成像素。
