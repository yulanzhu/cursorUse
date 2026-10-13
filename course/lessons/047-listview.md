---
id: 47-listview
module: 滚动
title: ListView 懒加载
order: 47
---

# 总结

`ListView` 直接接收子组件时，会一次把它们都建出来。`ListView.builder` 只建视口附近的项。长列表用 `builder`。`itemExtent` 能让滚动更稳。

<!-- section: 专业讲解 -->
## 一次建完和按需来建

- 普通 `ListView` 走 `SliverChildListDelegate`，子组件在构建时就全部存在
- `ListView.builder` 走 `SliverChildBuilderDelegate`，只给附近的下标调用 `itemBuilder`
- 滑出缓存范围的项可以被拆掉
- 条目已知时传入 `itemCount`
- 各项在滚动方向上同样高时，设置 `itemExtent`
- 有了固定尺寸，偏移可以用下标算出来，不必先布局每一项

<!-- section: 大白话 -->
## 大白话

- 一次建完，像把整本书的每一页都摊在桌上
- `builder` 像只翻开你正在看的那几页

<!-- section: 怎么用 -->
## 怎么用

```dart
ListView.builder(
  itemCount: items.length,
  itemExtent: 72,
  itemBuilder: (context, index) {
    return RowItem(item: items[index]);
  },
)
```

- 短列表可以直接给 `children`
- 长列表不要 `children: items.map(...).toList()`
- `itemExtent` 的方向是滚动方向，不是交叉方向

<!-- section: 再讲深一点 -->
## 再讲深一点

- 滑远之后，那一项的 `State` 默认会丢掉
- 项里的输入或勾选若要留住，把状态拿到项的外面，或使用 `AutomaticKeepAliveClientMixin`
- 平常的长列表不要让每一项都保持存活
- `cacheExtent` 决定视口外再提前建多远

<!-- section: 边界 -->
## 边界

- `shrinkWrap: true` 为了算出自身高度，会把子组件都布局一遍
- 长列表上不要开 `shrinkWrap`
- 漏掉 `itemCount` 时，`itemBuilder` 返回 `null` 才表示结束，容易多建

<!-- section: 收束 -->
## 留下这句

- 长列表用 `ListView.builder`。各项同样高时加上 `itemExtent`，滚动更稳

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节只抓一个差别。列表是一次把孩子都建出来，还是只建你能看见的附近。
- tone: 平稳
  pause: 320
  say: 长列表要走后面那条。另外，项的高度若能事先知道，滚动会更稳。

## 专业讲解

- tone: 平稳
  pause: 360
  say: 你把一组子组件直接交给 `ListView` 时，这些组件在这一次构建里就会全部出现。屏幕外的也已经在了。
- tone: 平稳
  pause: 340
  say: 背后是 `SliverChildListDelegate`。它保存的是已经建好的那一份列表，不是一个按需调用的函数。
- tone: 加重
  pause: 400
  stress: 只建附近
  say: `ListView.builder` 换成 `SliverChildBuilderDelegate`。它只给视口附近的下标调用 `itemBuilder`，只建附近。
- tone: 平稳
  pause: 340
  say: 滑远的项可以被拆掉。所以长列表要用 `builder`，不要先 `map` 成一个巨大的组件列表。
- tone: 问句
  pause: 480
  say: 如果每一项在滚动方向上高度相同，你为什么要让框架一项一项去量？

## 大白话

- tone: 放慢
  pause: 420
  say: 一次建完，像把整本书每一页都摊在桌上。你只读一页，桌上却已经铺满了。
- tone: 平稳
  pause: 340
  say: `builder` 像只翻开眼前这几页。翻过去的可以合上，后面的先不印。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的 `itemCount` 就是已知的条目上限。构建函数不会被叫到这个范围外面。
- tone: 平稳
  pause: 320
  say: `itemExtent` 写成 72，表示滚动方向上每一项都是这个高度。跳转时可以用下标直接算。
- tone: 加重
  pause: 380
  say: 只有十几项的短列表，直接给 `children` 很清楚。变成一份长列表以后，再改成 `builder`。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 项滑出缓存之后，里面的 `State` 默认会丢掉。输入框里打的字、项上的勾选，滑回来可能丢掉。
- tone: 放慢
  pause: 400
  say: 要留住，就把这份状态拿到列表外面，或者让这一项保持存活。不要让长列表的每一项都这么做，那又回到一次留住全部了。
- tone: 平稳
  pause: 320
  say: `cacheExtent` 是视口外面再提前准备的距离。它变大，滚动更不容易露白，建出来的项也更多。

## 边界

- tone: 加重
  pause: 400
  say: `shrinkWrap` 设成 `true` 时，列表为了知道自己有多高，会把子组件都布局一遍。长列表上不要这么用。
- tone: 平稳
  pause: 340
  say: 条目已知却不给出 `itemCount`，构建函数要靠返回 `null` 来收尾，很容易多建出一段。

## 收束

- tone: 收束
  pause: 480
  say: 直接塞子组件的 `ListView`，会一次建完。
- tone: 收束
  pause: 520
  say: 长列表用 `builder`。再加上 `itemExtent`，滚动会更稳。

# 可以向老师问

- q: 短列表能不能直接给 children
  tone: 平稳
  pause: 320
  say: 能。项很少时，一次建完更直白。改成一份长列表，再换成 `ListView.builder`。
- q: 滑走以后输入框里的字为什么没了
  tone: 平稳
  pause: 380
  say: 因为那一项的 `State` 离开缓存后被拆掉了。把输入存到列表外面，或者让该项保持存活。长列表不要项项都留。
