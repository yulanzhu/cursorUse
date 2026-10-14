---
id: 95-build-work
module: 性能
title: build 里不该做的事
order: 95
---

# 总结

`build` 只描述这一帧的界面，而且一帧里可能走很多次。不要在里面发请求、解析很大的 `JSON`，或创建控制器。很长的列表用带 `builder` 的滚动组件，只建能看见的项。

<!-- section: 专业讲解 -->
## 点名可能重复

- 父级、主题或媒体信息变了，都可能再走进 `build`
- 请求放在 `initState` 或用户事件里
- 控制器作为 `State` 的字段，在 `dispose` 里卸掉
- `ListView.builder` 不会给没进入视野的项创建孩子

<!-- section: 大白话 -->
## 大白话

- 点名可能重复。你不能每次点名都去仓库领一次货

<!-- section: 怎么用 -->
## 怎么用

- 很短的纯计算可以留在 `build`，重活不行
- 列表用 `ListView.builder`
- 不要用缓存把发请求这件事藏回 `build`

<!-- section: 再讲深一点 -->
## 再讲深一点

- 多次构建是框架在把几种变化收拢
- 你的代码要允许被重复执行
- 项的数量很大时，建不建看不见的项，差别非常明显

<!-- section: 边界 -->
## 边界

- 这不是禁止所有计算，是禁止副作用和重活
- 请求的时机错了，加缓存也仍然错

<!-- section: 收束 -->
## 留下这句

- `build` 只描述界面。请求、大段解析、控制器和很长的列表，都不要整份塞进去

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节讲 `build` 会走很多次，所以有些事不能放进去。
- tone: 平稳
  pause: 280
  say: 它的工作是描述这一帧的界面，不是去干活。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `build` 可能因为父级、主题或媒体信息，在一帧里走不止一次。
- tone: 加重
  pause: 380
  stress: 发多次
  say: 不要在 `build` 里发请求。一走多次，请求就会发多次。
- tone: 平稳
  pause: 360
  say: 也不要在这里解析很大的 `JSON`，或创建控制器。控制器应在 `initState` 里创建，在 `dispose` 里卸掉。
- tone: 平稳
  pause: 340
  say: 很长的列表用带 `builder` 的滚动组件，只给能看见的那几项创建孩子。
- tone: 问句
  pause: 480
  say: 你把请求写进 `build`，父级若在这一帧重建两次，请求会发几次？

## 大白话

- tone: 放慢
  pause: 400
  say: `build` 像点名。点名可能重复，你不能每次点名都去仓库领一次货。
- tone: 平稳
  pause: 300
  say: 很长的名单不要一次印出来。翻到哪一段，再印哪一段。

## 怎么用

- tone: 平稳
  pause: 320
  say: 请求放在事件里，或放在 `initState` 这种不会跟着每次构建重复的位置。
- tone: 平稳
  pause: 300
  say: 滚动列表用 `ListView.builder`。控制器放在 `State` 的字段上，不要写进 `build`。

## 再讲深一点

- tone: 平稳
  pause: 340
  say: 一帧里可能多次走进 `build`。框架是在把变化收拢，所以这段代码要允许重复执行。
- tone: 放慢
  pause: 320
  say: `builder` 的意义是，看不见的项先不建。项的数量很大时，这一差别非常明显。

## 边界

- tone: 平稳
  pause: 300
  say: 很短的纯计算可以留在 `build`。重活不行。
- tone: 平稳
  pause: 320
  say: 不要用缓存把错误的请求藏在 `build` 里。请求的时机仍然是错的。

## 收束

- tone: 收束
  pause: 480
  say: `build` 只描述界面，而且可能重复。
- tone: 收束
  pause: 520
  say: 请求、大段解析、控制器和很长的列表，都不要按整份塞进 `build`。

# 可以向老师问

- q: 为什么控制器不能建在 `build` 里
  tone: 平稳
  pause: 360
  say: 因为 `build` 会重复。每重复一次就可能新建一个，旧的来不及卸掉。
- q: 什么列表该用 `builder`
  tone: 平稳
  pause: 320
  say: 很长的列表。只把进入视野的项建出来，而不是一次建完全部。
