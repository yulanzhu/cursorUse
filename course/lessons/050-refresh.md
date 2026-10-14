---
id: 50-refresh
module: 滚动
title: 刷新、分页和列表 Key
order: 50
---

# 总结

`RefreshIndicator` 是下拉刷新的壳。分页是滚到尾部再要下一页，不要一次拿完。列表项自己有状态时，用稳定的 `Key`，避免状态串位。

<!-- section: 专业讲解 -->
## 三件分开的事

- `RefreshIndicator` 包住可滚动组件，松手后等待 `onRefresh` 返回的 `Future`
- 内容短到不能滚动时，下拉可能拉不出来，要配 `AlwaysScrollableScrollPhysics`
- 分页在接近尾部时再请求下一页，并挡住重复请求
- 最后一页不要继续要
- 刷新成功后换上第一页的数据，并把页码回到开始
- 有状态的列表项用 `ValueKey` 这类稳定 id，不要用下标

<!-- section: 大白话 -->
## 大白话

- 下拉像把窗帘拉下来看一眼有没有新的
- 分页像一页一页添纸，不是一次把整本搬来
- `Key` 像每张纸上的名字，不然洗牌以后字仍然写在原来的位置上

<!-- section: 怎么用 -->
## 怎么用

```dart
RefreshIndicator(
  onRefresh: reloadFirstPage,
  child: ListView.builder(
    physics: const AlwaysScrollableScrollPhysics(),
    itemCount: items.length + (hasMore ? 1 : 0),
    itemBuilder: (context, index) {
      if (index == items.length) {
        return const LoadingMore();
      }
      return ItemTile(
        key: ValueKey(items[index].id),
        item: items[index],
      );
    },
  ),
)
```

- 接近尾部且没有在加载时，才要下一页
- `Key` 放在 `itemBuilder` 返回的、真正持有状态的那一层

<!-- section: 再讲深一点 -->
## 再讲深一点

- 没有 `Key` 时，框架按位置和类型对上 `Element`。插入一项后，状态会留在旧位置
- 用下标做 `Key`，插入和删除之后仍然对不上数据
- `Dismissible` 也要求稳定的 `Key`。滑走后必须从数据里删掉该项
- 尾部加载用一个进行中的标记，避免同一次滚动打出好几次请求

<!-- section: 边界 -->
## 边界

- 指示器转完，不表示数据已经换成第一页。那是你的 `onRefresh` 要做的
- `Key` 放在没有状态的内层叶子上，串位照样发生
- 不要一次把后面所有页都请求回来，再假装自己做了分页

<!-- section: 收束 -->
## 留下这句

- 下拉刷新是壳，分页是快到尾部再要，有状态的项用稳定 `Key`

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节把三件事分开。下拉刷新、滚到尾部再要下一页，还有列表项上的 `Key`。
- tone: 平稳
  pause: 320
  say: 它们都出现在长列表里，但解决的不是同一个问题。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `RefreshIndicator` 是下拉刷新的壳。它包住一个能滚动的组件，你松手以后，它去等 `onRefresh` 交回的 `Future`。
- tone: 平稳
  pause: 340
  say: 分页不是一次把后面所有页拿完。滚到尾部附近，再要下一页。已经在要的时候，不要再发一次。
- tone: 加重
  pause: 400
  stress: 稳定的 id
  say: 列表项自己有状态时，给它一个稳定的 id 做 `Key`。不要用下标。不然插入之后，状态会串到别的项上。
- tone: 平稳
  pause: 340
  say: 刷新成功，要把列表换成第一页，页码也回到开始。只让指示器转完，数据不会自己变对。
- tone: 问句
  pause: 480
  say: 列表短到根本滑不动时，下拉能被拉出来吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 下拉像把窗帘拉下来，看一眼外面有没有新的内容。窗帘是壳，新内容要你自己去取。
- tone: 平稳
  pause: 360
  say: 分页像往本子后面一页一页添纸。`Key` 则是每张纸上的名字。没有名字，洗牌以后，字仍然停在原来的格子上。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的刷新回调叫 `reloadFirstPage`。它应该把第一页换上来，而不是在旧列表后面再贴一截。
- tone: 平稳
  pause: 360
  say: 还有更多页时，`itemCount` 多留一格给尾部的加载提示。没有更多时，就不要多留这一格。
- tone: 加重
  pause: 380
  say: 每一项的 `Key` 用 `ValueKey` 包住 `id`。这个 `Key` 放在 `ItemTile` 上，也就是持有状态的那一层。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 没有 `Key` 时，框架按位置把旧的 `Element` 对上新的组件。你在最前面插入一条，原来第一项的状态可能仍然贴在第一格。
- tone: 放慢
  pause: 400
  say: 内容如果短到不能滚动，下拉可能没有那种拉过头的手势。把物理效果设成 `AlwaysScrollableScrollPhysics`，短列表也能拉。
- tone: 平稳
  pause: 340
  say: 尾部请求要有一个进行中的标记。滚动位置抖一下，不该把同一页要上好几次。最后一页到了，就停。

## 边界

- tone: 加重
  pause: 400
  say: `RefreshIndicator` 不替你把分页进度清掉。`Future` 完成只说明等待结束。列表变成什么样，是回调里的代码决定的。
- tone: 平稳
  pause: 340
  say: `Key` 放错层也没用。它要放在会把状态留住的那个组件上，不要放在一个没有状态的内层图标上。

## 收束

- tone: 收束
  pause: 480
  say: 下拉刷新只是一层壳。分页是快到尾部再要下一页，不要一次拿完。
- tone: 收束
  pause: 520
  say: 列表项有状态时，用稳定的 `Key`，避免状态串到别的位置。

# 可以向老师问

- q: 短列表为什么拉不出刷新
  tone: 平稳
  pause: 360
  say: 因为默认要能滚过头，指示器才出来。内容短到滚不动时，给 `AlwaysScrollableScrollPhysics`，让它即使很短也能拉。
- q: 用下标当 Key 为什么会串
  tone: 平稳
  pause: 380
  say: 因为插入或删除以后，同一个下标已经是另一条数据。`Key` 要用不会跟着位置变的 id，比如 `ValueKey`。
