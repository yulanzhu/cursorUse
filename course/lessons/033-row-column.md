---
id: 33-row-column
module: 布局
title: Row 与 Column
order: 33
---

# 总结

`Row` 的主轴是水平的，`Column` 的主轴是竖直的，另一条是交叉轴。`mainAxisAlignment` 管主轴怎么排，`crossAxisAlignment` 管交叉轴怎么齐。

<!-- section: 专业讲解 -->
## 两条轴

- 主轴是孩子排列的方向
- 交叉轴和主轴垂直
- `Column` 主轴竖直，交叉轴水平
- `Row` 正好反过来
- `mainAxisAlignment` 管靠起点、居中，还是把多余空间摊开
- `crossAxisAlignment` 管交叉轴上怎么对齐，`stretch` 会在交叉轴上拉满

<!-- section: 大白话 -->
## 大白话

- `Column` 像竖直排队，前后怎么分布看主轴
- 左右怎么对齐看交叉轴
- `Row` 把这两条轴换个方向

<!-- section: 怎么用 -->
## 怎么用

```dart
Column(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  crossAxisAlignment: CrossAxisAlignment.stretch,
  children: const [
    Text('top'),
    Text('bottom'),
  ],
)
```

- `spaceBetween` 把多余的竖直空间放在孩子之间
- `stretch` 让孩子在水平方向占满这一列的宽度

<!-- section: 再讲深一点 -->
## 再讲深一点

- 默认主轴对齐是起点，交叉轴对齐是居中，`mainAxisSize` 是 `max`
- `max` 在有界时尽量占满主轴，`min` 收缩到孩子需要的长度
- 从左到右时，`Row` 的起点在左边。竖直向下时，`Column` 的起点在上边

<!-- section: 边界 -->
## 边界

- `stretch` 要求交叉轴有上限，这一轴无界时会失败
- 主轴已经被占满时，`spaceBetween` 没有多余空间可以摊

<!-- section: 收束 -->
## 留下这句

- 先认哪条是主轴。`Column` 的主轴是竖直的

# 口播

## 开场

- tone: 放慢
  pause: 400
  say: 这节把 `Row` 和 `Column` 收成两条轴，你就知道对齐属性在管谁。
- tone: 平稳
  pause: 320
  say: 先认方向，再看两个对齐各管哪条轴。

## 专业讲解

- tone: 平稳
  pause: 340
  say: 主轴是孩子们排队的那条线，交叉轴是跟它垂直的另一条。
- tone: 加重
  pause: 380
  stress: 竖直的
  say: `Column` 的主轴是竖直的，它的交叉轴才是水平的。
- tone: 平稳
  pause: 320
  say: `Row` 正好反过来，主轴水平，交叉轴竖直。
- tone: 平稳
  pause: 360
  say: 主轴上靠起点、放在中间，还是把多余空间摊开，都交给 `mainAxisAlignment`。
- tone: 平稳
  pause: 340
  say: 交叉轴上怎么齐，交给 `crossAxisAlignment`，其中 `stretch` 会把孩子在这条轴上拉满。
- tone: 问句
  pause: 460
  say: 所以你想让一列里面的文字左右撑满，该动哪一个属性？

## 大白话

- tone: 放慢
  pause: 400
  say: 把 `Column` 想成竖直站着的一队人，谁在前谁在后，是主轴上的事。
- tone: 平稳
  pause: 340
  say: 每个人往左还是往右靠，那是交叉轴上的事，`Row` 只是把这两条轴转了个方向。

## 怎么用

- tone: 平稳
  pause: 340
  say: 这段 `Column` 用 `spaceBetween`，把多出来的竖直空间留在两段文字中间。
- tone: 平稳
  pause: 320
  say: `stretch` 则让它们在水平方向占满这一列拿到的宽度。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 你不写的时候，主轴从起点排，交叉轴居中，`mainAxisSize` 用 `max`，有界时会尽量把主轴占满。
- tone: 放慢
  pause: 340
  say: 改成 `min` 以后，它会收缩到孩子需要的长度，多余空间就不在它里面了。
- tone: 平稳
  pause: 340
  say: 从左到右阅读时，`Row` 的起点在左边，竖直向下时，`Column` 的起点在上边。

## 边界

- tone: 平稳
  pause: 340
  say: `stretch` 需要交叉轴有一个有限上限，这条轴如果无界，拉伸就会失败。
- tone: 平稳
  pause: 320
  say: 孩子已经把主轴占满时，`spaceBetween` 没有剩下的空间可以再摊。

## 收束

- tone: 收束
  pause: 460
  say: 排列看主轴，对齐看交叉轴。
- tone: 收束
  pause: 520
  say: 记住 `Column` 的主轴是竖直的，`Row` 的主轴是水平的。

# 可以向老师问

- q: `Column` 的 `mainAxisAlignment` 管的是左右吗
  tone: 平稳
  pause: 340
  say: 不是，`Column` 的主轴是竖直的，这个属性管的是上下怎么排。
- q: `crossAxisAlignment` 的 `stretch` 什么时候会失败
  tone: 平稳
  pause: 360
  say: 交叉轴没有有限上限的时候会失败，因为孩子会被要求拉到一个无穷的尺寸。
