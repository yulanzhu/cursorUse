---
id: 87-channels
module: 平台通道
title: 三种 Channel
order: 87
---

# 总结

`MethodChannel` 是一问一答。`EventChannel` 是持续事件。`BasicMessageChannel` 是编过码的原始消息，不规定方法名。这节只讲差别，不写原生侧的实现步骤。

<!-- section: 专业讲解 -->
## 三种对话

- 一问一答：带上方法名和参数，拿回结果或错误
- 持续事件：新数据会一次次送过来
- 原始消息：两边都可以发，信封里放什么由双方约定
- 三者都要经过消息编码

<!-- section: 大白话 -->
## 大白话

- 打电话是一问一答。收音机开着，是持续事件

<!-- section: 怎么用 -->
## 怎么用

- 要一个结果，用 `MethodChannel`
- 要一条流，比如电量或播放进度，用 `EventChannel`
- 只交换一块数据、没有方法名这层约定时，用 `BasicMessageChannel`

<!-- section: 再讲深一点 -->
## 再讲深一点

- 常见编码能带走数字、字符串和列表
- 差别在对话方式，不在于谁的名字听起来更快

<!-- section: 边界 -->
## 边界

- 原生工程里怎么挂上通道，这节不写步骤
- 不要用一问一答去模拟高频事件，那会变成每一次都重新问

<!-- section: 收束 -->
## 留下这句

- 先对上三种对话：一次结果、一直听、一块原始消息

# 口播

## 开场

- tone: 放慢
  pause: 400
  say: 这节只讲三种通道的差别。
- tone: 平稳
  pause: 280
  say: 系统语言里怎样注册，这里不展开。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `MethodChannel` 是一问一答。你带上方法名和参数叫一次，将来拿回一个结果，或一个错误。
- tone: 加重
  pause: 380
  stress: 持续
  say: `EventChannel` 是持续事件。电量、播放进度这种，会一次次把新数据送过来。
- tone: 平稳
  pause: 340
  say: `BasicMessageChannel` 交换的是编过码的消息本身。两边都可以发，它不给你规定方法名。
- tone: 问句
  pause: 480
  say: 电量这种过一会儿就变一次的数据，你选一问一答，还是持续事件？

## 大白话

- tone: 放慢
  pause: 400
  say: 一问一答像打电话。你问一句，对方答一句。
- tone: 平稳
  pause: 320
  say: 持续事件像对方把收音机开着，有新消息就说一声。原始消息则是你们自己约定信封里放什么。

## 怎么用

- tone: 平稳
  pause: 300
  say: 你只要一次结果，就选 `MethodChannel`。你要一直听下去，就选 `EventChannel`。
- tone: 平稳
  pause: 340
  say: 双方只是交换一块数据，没有方法名这层约定时，再用 `BasicMessageChannel`。

## 再讲深一点

- tone: 平稳
  pause: 340
  say: 三种通道都要过消息编码。常见的是把 `Dart` 的数字、字符串和列表，编成另一侧能读的格式。
- tone: 放慢
  pause: 320
  say: 它们的差别在对话方式。先看你是要一次结果，还是要一直听，再决定用哪一种。

## 边界

- tone: 平稳
  pause: 320
  say: 这节停在 `Dart` 这一侧的差别。原生工程里怎么挂上这些通道，不在这里写步骤。
- tone: 平稳
  pause: 340
  say: 不要用一问一答去模拟一直在变的事件。那样每一次都要你重新问一次。

## 收束

- tone: 收束
  pause: 460
  say: 一问一答、持续事件、原始消息，先对上这三种对话。
- tone: 收束
  pause: 500
  say: 实现步骤留在平台工程里，这里只记差别。

# 可以向老师问

- q: `EventChannel` 和 `MethodChannel` 的差别在哪
  tone: 平稳
  pause: 320
  say: 前者会持续把事件送过来，后者是你问一次、答一次。
- q: 什么时候用 `BasicMessageChannel`
  tone: 平稳
  pause: 340
  say: 两边只想传递一块编过码的消息，又不想套方法名的时候。
