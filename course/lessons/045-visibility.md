---
id: 45-visibility
module: 界面组件
title: Opacity、Offstage 和 IgnorePointer
order: 45
---

# 总结

`Opacity` 仍然参与布局和命中，半透明时可能多出一层合成。`Offstage` 不画，也不占位置。`IgnorePointer` 能看见，但不接收指针。`Visibility` 把这些开关组合在一起。

<!-- section: 专业讲解 -->
## 四个开关

- `Opacity` 把子组件变透明。子组件仍然占布局，并且仍然能被点到
- 透明度不是 0 也不是 1 时，会先画进中间缓冲，多一层合成
- 透明度是 0 时不画，但命中仍在。读屏默认会跳过，除非打开 `alwaysIncludeSemantics`
- `Offstage` 打开时不画、不命中、不占父级的位置。状态留在树上
- `IgnorePointer` 照常显示，指针不进子树，事件可以落到更下面
- `AbsorbPointer` 把指针吃掉，下面也收不到
- `Visibility` 用 `visible`、`maintainState`、`maintainSize` 选择上面的做法

<!-- section: 大白话 -->
## 大白话

- 变淡像玻璃纸，东西仍在原位，手也仍然能碰到
- 挪到台下，观众看不见，台上也不留位置
- 装一块透明挡板，眼睛能看见，手却按不下去

<!-- section: 怎么用 -->
## 怎么用

```dart
Opacity(
  opacity: 0.4,
  child: const Text('淡一些'),
)

Offstage(
  offstage: hidden,
  child: const HeavyChart(),
)

IgnorePointer(
  ignoring: locked,
  child: const Pad(),
)

Visibility(
  visible: showExtra,
  maintainState: true,
  child: const ExtraPanel(),
)
```

- 只是为了不让人点，用 `IgnorePointer`，不要把透明度设成 0 来凑合
- `visible` 关掉且不维持状态时，子组件会换成 `replacement`，`State` 会被丢掉

<!-- section: 再讲深一点 -->
## 再讲深一点

- 单独的 `Offstage` 不会把里面的动画时钟停掉
- `Visibility` 在不维持动画时，会用 `TickerMode` 把时钟停住
- `maintainSize` 会连状态和动画一起留下，并继续占住原来的位置
- 完全透明仍要让读屏读到时，打开 `alwaysIncludeSemantics`，并用 `IgnorePointer` 挡住点击

<!-- section: 边界 -->
## 边界

- `Opacity` 不是隐藏方案。它贵在合成，也挡不住点击
- 从树上直接拿掉组件，状态会 `dispose`。`Offstage` 和 `maintainState` 不会
- 不要用透明度 0 假装禁用按钮。禁用要用按钮自己的 `onPressed`

<!-- section: 收束 -->
## 留下这句

- 变淡仍占位置也会被点到。不占位置用 `Offstage`，不接指针用 `IgnorePointer`。`Visibility` 是这些开关的组合

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节讲藏和挡。看起来没了，不表示布局、点击和状态也一起没了。
- tone: 平稳
  pause: 320
  say: 四个名字要分开。变淡、挪走、挡住指针，还有一个把它们收成开关的组件。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `Opacity` 让子组件变透明。子组件仍然参加布局，位置一寸都不会让出来。
- tone: 加重
  pause: 420
  stress: 仍然能点到
  say: 就算透明度是 0，命中也仍在。用户看不见，手却仍然能点到。这很容易让人认为那一块没有东西。
- tone: 平稳
  pause: 360
  say: 透明度落在 0 和 1 之间时，它会先把子组件画进一层中间缓冲，再合成回去。这一层不便宜。
- tone: 平稳
  pause: 340
  say: `Offstage` 把子组件挪到台下。不画，不参加命中，也不在父级里占位置。组件留在树上，所以状态留着。
- tone: 问句
  pause: 480
  say: 如果只是能看见、却不让人按，你该用 `IgnorePointer`，还是把透明度拧成 0？

## 大白话

- tone: 放慢
  pause: 440
  say: 变淡像盖了一张玻璃纸。东西仍在原位，手伸过去也仍然能碰到。
- tone: 平稳
  pause: 360
  say: 挪到台下，观众看不见，台上也不给你留位置。再加一块挡板，就是眼睛能看见、手按不下去。

## 怎么用

- tone: 平稳
  pause: 320
  say: 屏幕上第一段只是把文字淡到四成。它仍然占着原来的高度，也能被点到。
- tone: 平稳
  pause: 340
  say: `hidden` 打开时，图表不画也不占位置。`locked` 打开时，那一块能看见，指针进不去。
- tone: 加重
  pause: 380
  say: 最后的 `Visibility` 关掉时仍然维持状态。你要是不写 `maintainState`，子组件会被替身换掉，里面的 `State` 就丢了。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 单独用 `Offstage`，里面的动画时钟可能继续在走。`Visibility` 可以连时钟一起停，那要靠它不去维持动画。
- tone: 放慢
  pause: 400
  say: `maintainSize` 这一档会继续占住位置，状态和动画也留下。它更接近透明，而不是挪到台下。
- tone: 平稳
  pause: 360
  say: 透明度是 0 时，读屏默认会跳过它。你仍然希望被读到，就打开 `alwaysIncludeSemantics`，并用 `IgnorePointer` 把点击挡住。

## 边界

- tone: 加重
  pause: 400
  say: 不要用 `Opacity` 做隐藏。合成可能更贵，点击也仍在。想不占位置，用 `Offstage`。想不接收指针，用 `IgnorePointer`。
- tone: 平稳
  pause: 340
  say: 直接从树上拿掉，状态会跟着 `dispose`。你只是暂时不看，又要留住输入，就不要把它整段删掉。

## 收束

- tone: 收束
  pause: 500
  say: `Opacity` 仍然参与布局和命中，半透明时可能多出一层合成。
- tone: 收束
  pause: 520
  say: `Offstage` 不画也不占位置，`IgnorePointer` 能看见但不接收指针，`Visibility` 是这些开关的组合。

# 可以向老师问

- q: 透明度设成 0 为什么仍能点到
  tone: 平稳
  pause: 380
  say: 因为 `Opacity` 不取消命中。看不见只是不画。不想让人点，再包一层 `IgnorePointer`。
- q: Offstage 会不会把 State 丢掉
  tone: 平稳
  pause: 360
  say: 不会。它把子组件留在树上，只是不画、不占位置、不参加命中。`Visibility` 默认反而会换成替身，那才会把 `State` 丢掉。
