---
id: 49-slivers
module: 滚动
title: Sliver 家族
order: 49
---

# 总结

`CustomScrollView` 让几种滚动效果共用一个滚动位置。`SliverList`、`SliverGrid`、`SliverAppBar`、`SliverToBoxAdapter` 各管一段。普通盒子不能直接放进 `CustomScrollView`。

<!-- section: 专业讲解 -->
## 共用一个偏移

- `CustomScrollView` 的 `slivers` 要的是片段，不是普通盒子
- `SliverList` 做纵向懒加载列表
- `SliverGrid` 做二维懒加载
- `SliverAppBar` 做能展开、能钉住、能浮回的顶栏
- `SliverToBoxAdapter` 把一个普通盒子适配成片段
- 直接放入 `Container` 或 `Column`，视口会收到 `RenderBox`，而它要的是 `RenderSliver`

<!-- section: 大白话 -->
## 大白话

- 像同一根卷轴上接了好几段不同的纸
- 普通的一张卡片不能直接粘上去，要先裱成卷轴能认识的那一截

<!-- section: 怎么用 -->
## 怎么用

```dart
CustomScrollView(
  slivers: [
    const SliverAppBar(
      title: Text('专辑'),
      pinned: true,
    ),
    SliverToBoxAdapter(child: HeaderInfo(album: album)),
    SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) => TrackTile(track: tracks[index]),
        childCount: tracks.length,
      ),
    ),
  ],
)
```

- 简介这种一整块，用适配器
- 曲目这种长列表，用 `SliverList`，不要塞进一个适配器

<!-- section: 再讲深一点 -->
## 再讲深一点

- `pinned` 是滑走后仍然钉在顶上，`floating` 是反向滑动时先浮回来
- `SliverToBoxAdapter` 里的孩子会整块建出来，没有按项懒加载
- 需要网格时用 `SliverGrid`，不要在适配器里再套一个自己滚动的 `GridView`

<!-- section: 边界 -->
## 边界

- 外面再包一个 `ListView`，就变成滚动套滚动，手势会抢
- 片段解决的是同一条偏移上的不同区域，不是新的盒子布局协议
- 适配器不是用来装一整份长列表的

<!-- section: 收束 -->
## 留下这句

- 多种滚动效果要共用一个位置，就用 `CustomScrollView`。普通盒子先用 `SliverToBoxAdapter` 裱进去

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节把几种滚动效果接到同一条偏移上。顶栏、简介和列表，可以一起滑。
- tone: 平稳
  pause: 320
  say: 你要记住一件硬规定。普通盒子不能直接丢进 `CustomScrollView`。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `CustomScrollView` 里面的 `slivers`，每一段都是一个滚动片段。它们共用这一个滚动位置。
- tone: 平稳
  pause: 340
  say: `SliverList` 负责懒加载的纵向列表。`SliverGrid` 负责二维的懒加载。需要按项出现的内容，走这两种。
- tone: 加重
  pause: 400
  stress: 普通盒子
  say: `SliverAppBar` 负责会展开、能钉住的顶栏。`SliverToBoxAdapter` 负责把一个普通盒子裱成片段。
- tone: 平稳
  pause: 360
  say: 你若把 `Container` 或 `Column` 直接放进去，视口收到的是 `RenderBox`。它要的是 `RenderSliver`，所以会失败。
- tone: 问句
  pause: 480
  say: 一整份长列表，你是裱进适配器，还是交给 `SliverList`？

## 大白话

- tone: 放慢
  pause: 420
  say: 把它想成同一根卷轴。上面接了大标题，中间接了一段简介，下面接了曲目。手拉动的是同一根轴。
- tone: 平稳
  pause: 340
  say: 普通卡片是平的纸。卷轴不认识它。你要先把它裱成卷轴能接住的那一截，这就是适配器。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上顶栏用 `SliverAppBar`，并且 `pinned` 打开，滑上去以后标题还是留在顶上。
- tone: 平稳
  pause: 320
  say: 专辑简介是一整块，所以放进 `SliverToBoxAdapter`。它不是一大串重复的项。
- tone: 加重
  pause: 380
  say: 曲目才是长列表。构建函数按附近的下标来，委托是 `SliverChildBuilderDelegate`。不要把所有曲目先做成一个巨大的 `Column`。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: `pinned` 是离开视口后仍然钉住。`floating` 是你往回滑时，顶栏先浮出来，不必等到滚回最顶。
- tone: 放慢
  pause: 400
  say: 适配器里的那一个孩子会整块建出来。你把长列表塞进它，懒加载就没了。项多的时候，仍然用 `SliverList` 或 `SliverGrid`。
- tone: 平稳
  pause: 340
  say: 不要在适配器里再放一个自己会滚动的 `GridView`。那样是两条滚动抢同一下手指。

## 边界

- tone: 平稳
  pause: 340
  say: 自定义滚动视图的外面，通常不要再包一个 `ListView`。滚动套滚动，手势会变乱。
- tone: 加重
  pause: 380
  say: 这些片段没有换掉盒子布局。每一项内部怎么排，还是原来的约束。片段只决定它在这条滚动里占哪一段。

## 收束

- tone: 收束
  pause: 480
  say: `CustomScrollView` 让顶栏、盒子和列表共用一个滚动位置。
- tone: 收束
  pause: 520
  say: 普通盒子不能直接放进去。先用 `SliverToBoxAdapter`，长列表再用 `SliverList`。

# 可以向老师问

- q: 为什么 Column 不能直接放进 slivers
  tone: 平稳
  pause: 380
  say: 因为视口的孩子必须是 `RenderSliver`。`Column` 是普通盒子。要用 `SliverToBoxAdapter` 把它裱成片段。
- q: 简介和曲目能放在同一个适配器里吗
  tone: 平稳
  pause: 360
  say: 简介可以。曲目这种长列表不要。适配器会把孩子整块建出来，列表要交给 `SliverList`。
