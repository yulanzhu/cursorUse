---
id: 77-hero
module: 动画与绘制
title: Hero 和页面过渡
order: 77
---

# 总结

两个页面上 `tag` 相同的 `Hero`，过渡时看起来像从旧位置飞到新位置。飞的那一份画在 `Overlay` 上。整页怎么进来，可以换 `PageRoute` 的动画。同一个页面里 `tag` 要唯一。

<!-- section: 专业讲解 -->
## 两件事

- 相同 `tag` 的两块，在路由过渡时配对
- 配对的那一份放到 `Overlay`，盖在两个页面上面
- 来源和目标上原来的那一块，在这段时间里先藏起来
- 整页滑入属于 `PageRoute`，不属于 `Hero`

<!-- section: 大白话 -->
## 大白话

- 人眼看见一张卡在动，过渡那一下其实是盖在上面的另一层

<!-- section: 怎么用 -->
## 怎么用

```dart
Hero(
  tag: noteId,
  child: const CircleAvatar(),
)
```

- 列表和详情写同一个 `tag`，比如这条数据的编号
- 同一页不要把这个 `tag` 用第二次

<!-- section: 再讲深一点 -->
## 再讲深一点

- `MaterialPageRoute` 和 `CupertinoPageRoute` 自带不同的整页动画
- 只换一块的移动用 `Hero`，换整页方式用 `PageRouteBuilder` 或主题里的页面过渡

<!-- section: 边界 -->
## 边界

- `tag` 在它所属的 `Navigator` 里配对
- 飞的那一块要已经有尺寸，才有起点和终点

<!-- section: 收束 -->
## 留下这句

- 相同标记负责那一块的移动，路由负责整页

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节讲两页之间，一块界面怎样看起来飞过去。
- tone: 平稳
  pause: 300
  say: 另外再把整页滑入的动画，和这一块分开。

## 专业讲解

- tone: 平稳
  pause: 340
  say: 来源页和目标页各放一个 `Hero`，`tag` 写成同一个。
- tone: 加重
  pause: 400
  stress: 两个页面上面
  say: 路由开始过渡时，框架把飞过去的那一份放进 `Overlay`，让它盖在两个页面上面。
- tone: 平稳
  pause: 340
  say: 两边原来的那一块先藏起来，由覆盖层上的这一份，从旧位置走到新位置。
- tone: 平稳
  pause: 320
  say: 整页怎么滑进来，是 `PageRoute` 的事。你可以换 `PageRouteBuilder`，也可以在主题里改页面过渡。
- tone: 问句
  pause: 460
  say: 两个 `Hero` 的 `tag` 没有对上，这段移动会发生吗？

## 大白话

- tone: 放慢
  pause: 400
  say: 把它想成同一张卡片，从列表里的位置滑到详情里的位置。
- tone: 平稳
  pause: 320
  say: 眼睛看见的是一张卡。过渡的那一下，是盖在页面上的另一层在画。

## 怎么用

- tone: 平稳
  pause: 300
  say: 列表项和详情头使用同一个 `tag`，用这条数据的编号就很合适。
- tone: 平稳
  pause: 320
  say: 同一页里不要把这个标记用第二次，第二个会和第一个抢配对。

## 再讲深一点

- tone: 平稳
  pause: 340
  say: `MaterialPageRoute` 和 `CupertinoPageRoute` 的整页动画本来就不一样。
- tone: 放慢
  pause: 320
  say: 想换的若只是那一块，动 `Hero`。想换的是整页进来的方式，就去改路由自己的过渡。

## 边界

- tone: 平稳
  pause: 340
  say: 标记只在它所属的 `Navigator` 里配对。嵌套导航时，别让它串到另一棵导航上。
- tone: 平稳
  pause: 300
  say: 那一块要先有尺寸。尺寸尚未算出来，就没有起点，也没有终点。

## 收束

- tone: 收束
  pause: 480
  say: 你要留住的是，相同标记的那一块，画在覆盖层上飞过去。
- tone: 收束
  pause: 500
  say: 整页怎么进来是另一件事，不要和这一块混成一个动画。

# 可以向老师问

- q: `Hero` 飞的时候画在哪
  tone: 平稳
  pause: 300
  say: 画在 `Overlay` 上，所以它能盖过下面的两个页面。
- q: 同一页两个相同 `tag` 会怎样
  tone: 平稳
  pause: 340
  say: 框架无法决定谁和下一页配对，运行时会直接报错。
