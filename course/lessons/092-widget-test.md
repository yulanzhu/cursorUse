---
id: 92-widget-test
module: 测试
title: Widget 测试
order: 92
---

# 总结

`pumpWidget` 把组件画进测试环境。`find` 找组件，`tap` 点击，`pump` 再走一帧。`pumpAndSettle` 等动画结束。没有结束条件时不要用它。

<!-- section: 专业讲解 -->
## 在测试里走一帧

- `pumpWidget` 让组件走一遍构建
- `find` 可以按文字、类型或 `Key`
- 点击之后要 `pump`，新界面才会出现
- 一直重复的动画没有安静下来的那一帧

<!-- section: 大白话 -->
## 大白话

- 测试环境是一个没有真机外壳的小舞台。点完要再喊一帧

<!-- section: 怎么用 -->
## 怎么用

```dart
await tester.pumpWidget(const MaterialApp(home: Counter()));
await tester.tap(find.byIcon(Icons.add));
await tester.pump();
expect(find.text('1'), findsOneWidget);
```

- 先确认能找到，再点
- 只有动画一定会结束时，才 `pumpAndSettle`

<!-- section: 再讲深一点 -->
## 再讲深一点

- `pump` 可以带上一段时间，那段时间里的动画会往前
- `pumpAndSettle` 会一直推进，直到超时

<!-- section: 边界 -->
## 边界

- 这里没有系统弹窗，也没有真实网络
- 那些属于集成测试

<!-- section: 收束 -->
## 留下这句

- 画出来，找到，点下去，再走一帧。不停的动画不要等它停

# 口播

## 开场

- tone: 放慢
  pause: 400
  say: 这节讲怎样在测试里把组件画出来。
- tone: 平稳
  pause: 280
  say: 画出来以后，时间要再往前走一帧，你才能看见变化。

## 专业讲解

- tone: 平稳
  pause: 320
  say: `pumpWidget` 把组件放进测试环境，让它走一遍构建。
- tone: 平稳
  pause: 300
  say: `find` 按文字、类型或 `Key` 去找。`tap` 在找到的位置上点一下。
- tone: 加重
  pause: 380
  stress: 再走一帧
  say: `pump` 让测试再走一帧。你不推这一帧，就看不见点击之后的界面。
- tone: 平稳
  pause: 360
  say: `pumpAndSettle` 会一直推进，直到没有等待中的动画。没有结束条件时，它等不到头。
- tone: 问句
  pause: 480
  say: 一个一直在转的进度圈，你用 `pumpAndSettle` 去等它结束，这一等有头吗？

## 大白话

- tone: 放慢
  pause: 400
  say: 测试环境像一个没有真机外壳的小舞台。你把组件请上台。
- tone: 平稳
  pause: 300
  say: 你点一下，接着让它再走一帧，新样子才会摆出来。

## 怎么用

- tone: 平稳
  pause: 300
  say: 先 `pumpWidget`，再用 `find.text` 确认字在不在。
- tone: 平稳
  pause: 320
  say: `tap` 之后调用 `pump`。只有动画一定会结束时，才用 `pumpAndSettle`。

## 再讲深一点

- tone: 平稳
  pause: 320
  say: `pump` 可以带上一段时间。那段时间里的动画会跟着往前。
- tone: 放慢
  pause: 300
  say: 一直在重复的动画，没有会安静下来的那一帧，所以 `pumpAndSettle` 会等到超时。

## 边界

- tone: 平稳
  pause: 300
  say: 这里没有真机的系统弹窗，也没有真实网络。那些属于集成测试。
- tone: 平稳
  pause: 320
  say: 找不到组件就不要点。先看是没画出来，还是文字和你找的不一样。

## 收束

- tone: 收束
  pause: 460
  say: 先画到测试环境里，再找到它，点下去，然后推进一帧。
- tone: 收束
  pause: 500
  say: 会停的动画才等它停。不停的，不要用 `pumpAndSettle`。

# 可以向老师问

- q: `pump` 和 `pumpAndSettle` 的差别在哪
  tone: 平稳
  pause: 340
  say: `pump` 推进一帧或一段用时。`pumpAndSettle` 要等到动画都结束。
- q: 无限循环的动画为什么不能 `pumpAndSettle`
  tone: 平稳
  pause: 340
  say: 因为它没有结束的那一帧，测试会一直等，直到超时。
