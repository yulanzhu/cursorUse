---
id: 36-boxes
module: 布局
title: 盒子家族
order: 36
---

# 总结

`Padding` 加内边距，`Align` 和 `Center` 负责摆放，`SizedBox` 规定宽高，`ConstrainedBox` 再加一道限制，`FittedBox` 负责缩放。`Container` 是好几个盒子的组合，不是布局原语。

<!-- section: 专业讲解 -->
## 各改一件事

- `Padding` 缩小交给孩子的约束，自身尺寸是孩子再加上这一圈
- `Align` 把孩子摆到对齐点，默认撑到父级允许的最大尺寸
- `Center` 就是居中的 `Align`
- `SizedBox` 规定宽度或高度，写了的那条轴变成紧约束
- `ConstrainedBox` 在父级约束上再加限制，冲突时父级上限仍然有效
- `FittedBox` 先按孩子本来的尺寸来排，再缩放进自己的盒子，父级必须有界
- `Container` 把边距、对齐、装饰和尺寸限制套在一起

<!-- section: 大白话 -->
## 大白话

- 不同的盒子改不同的事，不要用一个大盒子包打一切
- 只想留一圈空白，就用 `Padding`，不必请出 `Container`

<!-- section: 怎么用 -->
## 怎么用

```dart
const Padding(
  padding: EdgeInsets.all(8),
  child: Text('padded'),
)
```

```dart
Container(
  margin: const EdgeInsets.all(8),
  padding: const EdgeInsets.all(8),
  color: const Color(0xFFE3F2FD),
  child: const Text('box'),
)
```

- 第一段只改内边距
- 第二段同时有外边距、内边距和颜色，这才是组合

<!-- section: 再讲深一点 -->
## 再讲深一点

- 只放一个孩子、没有别的参数时，`Container` 会直接把孩子交回去
- `color` 和 `decoration` 不能同时写，颜色要放进 `BoxDecoration`
- `SizedBox.expand` 会要到父级的最大尺寸，`SizedBox.shrink` 则尽量变小

<!-- section: 边界 -->
## 边界

- `Center` 默认会把自己撑满，不是只把孩子挪到中间却保持孩子的尺寸
- `FittedBox` 的孩子如果自己也怕无界，缩放这一步同样会失败

<!-- section: 收束 -->
## 留下这句

- 先问你要改的是边距、对齐、尺寸、限制还是缩放，再选对应的盒子

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节把常用的盒子拆开，你就知道每一种到底改了哪一件事。
- tone: 平稳
  pause: 320
  say: `Container` 放在最后讲，因为它不是最底层的那一个。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `Padding` 加的是内边距，孩子拿到的约束会变小，外面的尺寸等于孩子再加上这一圈。
- tone: 平稳
  pause: 380
  say: `Align` 负责把孩子摆到某个对齐点，默认会把自己撑到父级允许的最大尺寸，孩子可以比这个盒子小。
- tone: 平稳
  pause: 300
  say: `Center` 就是对齐点放在正中的 `Align`。
- tone: 平稳
  pause: 340
  say: `SizedBox` 用来规定宽度或高度，你写了的那条轴会变成紧约束。
- tone: 平稳
  pause: 380
  say: `ConstrainedBox` 是在父级已经给的约束上再加一道限制，两边冲突时，父级的上限仍然有效。
- tone: 加重
  pause: 400
  stress: 父级必须有界
  say: `FittedBox` 先让孩子按本来的尺寸排，再缩放进自己的盒子，所以它的父级必须有界。
- tone: 问句
  pause: 460
  say: 那 `Container` 自己算不算一个布局原语？

## 大白话

- tone: 放慢
  pause: 400
  say: 把它想成不同的纸盒，有的只是垫一圈空白，有的负责把东西推到某个角上。
- tone: 平稳
  pause: 360
  say: 有的规定盒子必须多宽多高，有的再加一道不能越过的限制，有的把里面的东西缩小后放进去。

## 怎么用

- tone: 平稳
  pause: 320
  say: 第一段只想要内边距，所以直接用 `Padding`，没有再套别的盒子。
- tone: 平稳
  pause: 360
  say: 第二段又要外边距，又要内边距，又要一块颜色，这时才用 `Container` 把它们组合起来。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: `Container` 如果只放了一个孩子，没有边距、尺寸和装饰，它会直接把这个孩子交回去。
- tone: 放慢
  pause: 360
  say: `color` 和 `decoration` 不能一起写，你要颜色，就把它放进 `BoxDecoration`。
- tone: 平稳
  pause: 320
  say: `SizedBox.expand` 会去占父级的最大尺寸，`SizedBox.shrink` 则尽量缩到最小。

## 边界

- tone: 平稳
  pause: 380
  say: `Center` 默认也会把自己撑满父级给的最大尺寸，并不只是把孩子挪到正中。
- tone: 平稳
  pause: 360
  say: 如果你只想要孩子本身那么大，就不要随便套一个 `Center`。
- tone: 加重
  pause: 380
  say: `FittedBox` 自己要有界的父级，它的孩子如果也不能在无界约束下完成布局，这一步仍会失败。

## 收束

- tone: 收束
  pause: 480
  say: 边距、对齐、尺寸、额外限制和缩放，各有一个对应的盒子。
- tone: 收束
  pause: 520
  say: `Container` 是把好几样盒子组合起来的便利包装，不是布局的最小单元。

# 可以向老师问

- q: 只需要内边距时该用 `Container` 吗
  tone: 平稳
  pause: 320
  say: 不必，只改内边距就用 `Padding`，`Container` 是好几样盒子叠在一起的写法。
- q: `Center` 会不会把自身撑满
  tone: 平稳
  pause: 340
  say: 会，没有写宽高因子时，它会撑到父级允许的最大尺寸，孩子则可以比它小。
