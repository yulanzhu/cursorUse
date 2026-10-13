---
id: 48-grid-page
module: 滚动
title: GridView 和 PageView
order: 48
---

# 总结

`GridView` 用来做二维的懒加载。`PageView` 一页一页滑。它们都是滚动，不是新的布局协议。

<!-- section: 专业讲解 -->
## 两种滚动

- `GridView.builder` 按可见范围建格子，配合 `gridDelegate` 决定列或最大宽度
- `SliverGridDelegateWithFixedCrossAxisCount` 固定交叉轴上有几格
- `SliverGridDelegateWithMaxCrossAxisExtent` 按一格最多有多宽来排
- 直接把全部子组件塞进 `GridView`，就不是懒加载
- `PageView` 按页吸附。`PageView.builder` 在页很多时按需创建
- 底下仍然是 `Scrollable`。格子内部和每一页内部，还是普通盒子约束

<!-- section: 大白话 -->
## 大白话

- 网格像一扇窗后面的瓷砖墙，你上下挪，才看见更多瓷砖
- 分页像一叠卡片，一次只看最上面那一张

<!-- section: 怎么用 -->
## 怎么用

```dart
GridView.builder(
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 3,
  ),
  itemCount: photos.length,
  itemBuilder: (context, index) => PhotoTile(photo: photos[index]),
)

PageView.builder(
  controller: pageController,
  itemCount: pages.length,
  itemBuilder: (context, index) => pages[index],
)
```

- 只有四个固定格子、又不滚动时，用 `Row` 和 `Column` 更直接
- `PageController` 能指定当前页，`viewportFraction` 能让一页占视口的一部分

<!-- section: 再讲深一点 -->
## 再讲深一点

- `GridView.count` 这类直接收子组件的构造，会一次建完
- 页很少时，`PageView` 也可以直接给子组件
- 页一多，就改 `PageView.builder`，和长列表是同一个道理
- 分页的物理效果会吸附到整页，这是滚动物理，不是另一种布局

<!-- section: 边界 -->
## 边界

- 不要用 `GridView` 代替一小块静态排版
- 不要用 `PageView` 做左右并排的两栏。那是 `Row`
- 格子里面的组件，仍然要自己处理文字溢出和图片尺寸

<!-- section: 收束 -->
## 留下这句

- `GridView` 是二维懒加载，`PageView` 是按页滚动。它们不是新的布局协议

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节加两种滚动。一个是格子，一个是一页一页滑。
- tone: 平稳
  pause: 320
  say: 你先记住，它们没有发明新的布局协议。里面的孩子，仍然是普通的盒子。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `GridView.builder` 做二维的懒加载。你再给一个 `gridDelegate`，告诉它一排有几格，或者一格最多有多宽。
- tone: 平稳
  pause: 340
  say: 列要固定下来时，用 `SliverGridDelegateWithFixedCrossAxisCount`。按最大宽度去换行，用 `SliverGridDelegateWithMaxCrossAxisExtent`。
- tone: 加重
  pause: 400
  stress: 一页一页滑
  say: `PageView` 不是把几块内容并排放好。它一页一页滑，松手后吸附到整页。
- tone: 平稳
  pause: 340
  say: 页很多时用 `PageView.builder`。页很少时，直接给子组件也可以。
- tone: 问句
  pause: 480
  say: 四个图标要并排，而且不用滚动，你还是会去建一个 `GridView` 吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 网格像窗后的一堵瓷砖墙。窗只有那么大，你上下挪，才看见更多瓷砖。
- tone: 平稳
  pause: 340
  say: 分页像一叠卡片。你一次看最上面那张，滑一下，才换成下一张。不是把一叠同时摊开。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的网格固定成三列，只给附近的照片调用构建函数。
- tone: 平稳
  pause: 320
  say: `PageView` 拿着自己的 `PageController`。你要跳到某一页，走控制器，而不是自己去改一个和滚动无关的布局。
- tone: 加重
  pause: 380
  say: `viewportFraction` 可以让一页只占视口的一部分，旁边露出下一页。这仍然是滚动，不是 `Row`。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: `GridView.count` 如果把子组件一次性塞满，懒加载就没有了。名字里有网格，不表示它一定是懒的。
- tone: 放慢
  pause: 400
  say: 分页吸附靠的是滚动的物理效果。你并没有因此多出一种新的按页布局。布局协议还是原来的约束。
- tone: 平稳
  pause: 320
  say: 每一页内部怎么排，仍然用 `Column`、`Stack` 这些你已经会的工具。

## 边界

- tone: 平稳
  pause: 340
  say: 一小块不滚动的宫格，用 `Row` 和 `Column` 就够。上了 `GridView`，你就引入了滚动，也要处理它的控制器和物理效果。
- tone: 加重
  pause: 380
  say: `PageView` 也不拿来做左右两栏。两栏是并排布局。分页是先后出现的两页。

## 收束

- tone: 收束
  pause: 480
  say: `GridView` 是二维懒加载，`PageView` 是一页一页的滚动。
- tone: 收束
  pause: 520
  say: 它们都是滚动，不是一套新的布局协议。

# 可以向老师问

- q: GridView.count 是懒的吗
  tone: 平稳
  pause: 340
  say: 你把子组件直接塞进去时，不是懒的。要按可见范围建，用 `GridView.builder`。
- q: PageView 能不能代替 Row
  tone: 平稳
  pause: 340
  say: 不能。`Row` 是并排布局。`PageView` 是滚动，一次主要看一页。
