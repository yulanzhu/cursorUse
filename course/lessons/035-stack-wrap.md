---
id: 35-stack-wrap
module: 布局
title: Stack 与 Wrap
order: 35
---

# 总结

`Stack` 把孩子叠在一起，后放的画在上面。`Positioned` 按父级的边来定位。`Wrap` 这一排放不下就换行。不要用 `Row` 硬塞一排会溢出的标签。

<!-- section: 专业讲解 -->
## 叠放和换行

- 不写 `Positioned` 的孩子按 `alignment` 摆，`Stack` 默认包住它们
- 孩子全是 `Positioned` 时，`Stack` 尽量要父级的最大尺寸，该轴要有界
- `Positioned` 用四条边相对 `Stack` 定位
- 左右都写上时，宽度由父级决定，这一轴必须有界
- `Wrap` 沿主轴一个个放，放不下就换行

<!-- section: 大白话 -->
## 大白话

- `Stack` 像一叠透明片，后放的盖在上面
- `Wrap` 像排队，这一排满了就换行
- 会溢出的标签不要硬放进 `Row`

<!-- section: 怎么用 -->
## 怎么用

```dart
Stack(
  children: const [
    Text('back'),
    Positioned(
      top: 4,
      left: 4,
      child: Text('badge'),
    ),
  ],
)
```

```dart
Wrap(
  spacing: 8,
  runSpacing: 8,
  children: const [
    Text('one'),
    Text('two'),
    Text('three'),
  ],
)
```

- `Positioned` 用父级的上边和左边来钉住角标
- `Wrap` 用间距把标签排开，不够放就换行

<!-- section: 再讲深一点 -->
## 再讲深一点

- `spacing` 是同一排里的间距，`runSpacing` 是排与排之间的间距
- 单个孩子比 `Wrap` 的最大宽度更大，仍会溢出
- 只写 `left`、不写 `right` 时，宽度由孩子自己决定

<!-- section: 边界 -->
## 边界

- `Wrap` 不是 `Flex`，里面不要放 `Expanded`
- `Stack` 不会在空间不够时自动换行

<!-- section: 收束 -->
## 留下这句

- 要叠就用 `Stack`，一排放不下就换行，不要硬塞进 `Row`

# 口播

## 开场

- tone: 放慢
  pause: 400
  say: 这节看两种和 `Row` 不同的排法，一种叠在一起，一种放不下就换行。
- tone: 平稳
  pause: 320
  say: 标签如果会溢出，就不要再硬塞进 `Row`。

## 专业讲解

- tone: 平稳
  pause: 340
  say: `Stack` 按孩子的先后叠放，后写的画在先写的上面。
- tone: 平稳
  pause: 360
  say: 没有 `Positioned` 的孩子按 `alignment` 摆，`Stack` 默认把自己收成能包住这些孩子的尺寸。
- tone: 平稳
  pause: 380
  say: 如果孩子全都写了 `Positioned`，它会尽量去要父级允许的最大尺寸，所以那条轴必须有界。
- tone: 加重
  pause: 380
  stress: 相对父级
  say: `Positioned` 的 `top`、`right`、`bottom`、`left` 都是相对父级来定位的。
- tone: 平稳
  pause: 340
  say: `Wrap` 则沿主轴往下排，这一排放不下，就换行继续。
- tone: 问句
  pause: 460
  say: 一排标签已经宽过父级时，继续用 `Row` 硬放，会发生什么？

## 大白话

- tone: 放慢
  pause: 400
  say: `Stack` 像一叠透明片，你后放上去的那一张，盖住下面的内容。
- tone: 平稳
  pause: 360
  say: `Wrap` 像窗口前排队，这一排站满了就换到后面一排，而不是把人挤出框外。

## 怎么用

- tone: 平稳
  pause: 340
  say: 第一段用 `Positioned` 把角标钉在离上边和左边各四个单位的位置。
- tone: 平稳
  pause: 340
  say: 第二段用 `Wrap` 排标签，同一排和排与排之间都留了间距，不够就换行。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: `spacing` 管同一排内部的间隔，`runSpacing` 管排与排之间的距离。
- tone: 放慢
  pause: 340
  say: 就算换行，单个孩子如果比 `Wrap` 的最大宽度更大，它自己仍会溢出。
- tone: 平稳
  pause: 320
  say: `Positioned` 只写左边、不写右边时，宽度就由孩子自己来定。

## 边界

- tone: 平稳
  pause: 320
  say: `Wrap` 不是 `Flex`，不要把 `Expanded` 放进去。
- tone: 平稳
  pause: 340
  say: `Stack` 只负责叠放，空间不够时它不会自动换行。

## 收束

- tone: 收束
  pause: 480
  say: 需要叠在一起，就用 `Stack`，再用 `Positioned` 按父级定位。
- tone: 收束
  pause: 520
  say: 一排标签放不下，就换成 `Wrap`，不要用 `Row` 硬塞到溢出。

# 可以向老师问

- q: `Positioned` 的距离是相对谁的
  tone: 平稳
  pause: 320
  say: 相对包着它的那个 `Stack`，也就是它的父级。
- q: 标签太多时为什么不要用 `Row`
  tone: 平稳
  pause: 360
  say: 因为 `Row` 不会换行，排不下就会溢出，`Wrap` 则会在放不下时换到下一排。
