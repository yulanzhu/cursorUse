---
id: 88-pigeon
module: 平台通道
title: 线程与 Pigeon
order: 88
---

# 总结

从界面发起的平台调用，回调回到 `Dart` 时落在 UI `isolate`。要改 `Widget`，就在这条上改。`Pigeon` 用接口定义生成两边的代码，少写容易写错的字符串方法名。

<!-- section: 专业讲解 -->
## 回调落在哪

- 改界面的那条，是 UI `isolate`
- 别的 `isolate` 上的结果，要送回来才能碰界面
- `Pigeon` 按接口生成带类型的调用
- 生成的仍是通道，不是另一套运行时

<!-- section: 大白话 -->
## 大白话

- 信从系统回来，先送到能摆弄界面的那条线上

<!-- section: 怎么用 -->
## 怎么用

```dart
@HostApi()
abstract class HostCounter {
  int increment();
}
```

- 收到回调时，直接在 UI `isolate` 上改状态
- 方法一多，就让 `Pigeon` 生成，不要手写一串魔法字符串

<!-- section: 再讲深一点 -->
## 再讲深一点

- 重活若卡在 UI `isolate`，帧会停
- 生成帮你管的是名字和类型，调用本身仍然要过通道

<!-- section: 边界 -->
## 边界

- 平台侧该在哪条线程碰它自己的界面，这节不写步骤
- 只有一次调用、名字也简单时，手写 `MethodChannel` 仍然可行

<!-- section: 收束 -->
## 留下这句

- 回调回到 UI `isolate`。名字容易写错时，用接口生成两边的代码

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节讲平台那边的回应，回到 `Dart` 时落在哪。
- tone: 平稳
  pause: 300
  say: 也讲怎样少写那些一不小心就会写错的方法名。

## 专业讲解

- tone: 加重
  pause: 400
  stress: 回调回到
  say: 你从界面发起的平台调用，回调回到 `Dart` 时，默认落在 UI `isolate`。
- tone: 平稳
  pause: 340
  say: 改 `Widget` 就在这条上做。别的 `isolate` 不能直接改界面。
- tone: 平稳
  pause: 340
  say: 你若把结果先送到别的 `isolate` 去算，算完要送回来，才能碰界面。
- tone: 平稳
  pause: 360
  say: `Pigeon` 让你用接口把方法和数据结构写下来，再生成两边的代码。调用带着类型。
- tone: 问句
  pause: 480
  say: 回调已经在 UI `isolate` 上了，你为什么不能在这里做很久的重活？

## 大白话

- tone: 放慢
  pause: 400
  say: UI `isolate` 是唯一可以摆弄界面的那条。信从系统回来，先送到这里。
- tone: 平稳
  pause: 340
  say: `Pigeon` 像双方先签一份清单，再按清单印表格，而不是每次口头说一个容易听错的名字。

## 怎么用

- tone: 平稳
  pause: 300
  say: 收到平台回调时，直接在 UI `isolate` 上改状态。
- tone: 平稳
  pause: 340
  say: 新的通道先写 `Pigeon` 的接口，让它生成两侧的方法，不要再手写一串魔法字符串。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 重活若卡在 UI `isolate`，帧就会停。算完的数据再送回这条 `isolate`，界面才更新。
- tone: 放慢
  pause: 320
  say: 生成出来的仍是通道，不是另一套运行时。它帮你管的是名字和类型。

## 边界

- tone: 平稳
  pause: 340
  say: 生成不能代替你安排线程。平台侧若在错误的线程碰它自己的界面，那是平台的规则，这节不写那边的步骤。
- tone: 平稳
  pause: 320
  say: 简单的一次调用，手写 `MethodChannel` 仍然可行。名字一多，就改用生成。

## 收束

- tone: 收束
  pause: 480
  say: 回调回到 UI `isolate`，界面只在这里改。
- tone: 收束
  pause: 500
  say: `Pigeon` 用接口生成两边的代码，把容易写错的字符串名字收起来。

# 可以向老师问

- q: 平台回调默认进入哪条 `isolate`
  tone: 平稳
  pause: 300
  say: 进入 UI `isolate`。要改 `Widget`，就在这条上改。
- q: `Pigeon` 主要少掉了什么错误
  tone: 平稳
  pause: 340
  say: 少掉手写方法名时写错字符串的那一类。两边按同一份接口生成。
