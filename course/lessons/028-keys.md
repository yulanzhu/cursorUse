---
id: 28-keys
module: Widget 心智
title: 四类 Key
order: 28
---

# 总结

`ValueKey` 按值是否相等来认，`ObjectKey` 按是不是同一个对象来认。`UniqueKey` 只等于它自己。`GlobalKey` 在整棵树里唯一，能碰到 `State`，但很贵，别到处用。列表重新排列时，`Key` 帮助框架留下对的 `State`。

<!-- section: 专业讲解 -->
## 四种钥匙

- 局部 `Key` 只在同一组兄弟之间比较
- `ValueKey` 看值的 `==`
- `ObjectKey` 看 `identical`，认准那个实例
- `UniqueKey` 和任何别的实例都不相等
- `GlobalKey` 全局唯一，可以拿到 `currentState` 和 `currentContext`
- 没有 `Key` 时，同类型孩子按位置匹配，`State` 可能串到别的项上

<!-- section: 大白话 -->
## 大白话

- 没有姓名牌，东西会按旧座位发错人
- 工号、同一个对象、每次换新牌、全公司只此一张，是四种牌

<!-- section: 怎么用 -->
## 怎么用

```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    final item = items[index];
    return ListTile(
      key: ValueKey<String>(item.id),
      title: Text(item.name),
    );
  },
)
```

- 用稳定的 `id`，不要用会变的下标
- `GlobalKey` 放在 `State` 字段里，不要在每次 `build` 里新造

<!-- section: 再讲深一点 -->
## 再讲深一点

- `String` 和 `int` 用 `ValueKey` 就够
- 对象如果重写了 `==`，`ValueKey` 看相等，`ObjectKey` 仍看实例
- `GlobalKey` 可以把原来的元素挪到新父级下面，`State` 跟着走

<!-- section: 边界 -->
## 边界

- `build` 里直接写 `UniqueKey()`，每次重建都会扔掉原来的 `State`
- `GlobalKey` 重复会报错，不要到处挂

<!-- section: 收束 -->
## 留下这句

- 列表会重新排列时用稳定的 `Key`，`GlobalKey` 不要到处用

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节认识四种 `Key`，你就知道框架靠什么把 `State` 认回来。
- tone: 平稳
  pause: 300
  say: 接着看列表重新排列的时候，谁该留下。

## 专业讲解

- tone: 平稳
  pause: 340
  say: `ValueKey`、`ObjectKey` 和 `UniqueKey` 都是局部的，只和同一父级下的兄弟比较。
- tone: 平稳
  pause: 320
  say: `ValueKey` 用值的相等来认，同一个 `id` 就会被当成同一项。
- tone: 平稳
  pause: 340
  say: `ObjectKey` 不看内容等不等，它认的是是不是同一个对象实例。
- tone: 平稳
  pause: 320
  say: `UniqueKey` 每一次新造出来都只等于它自己。
- tone: 加重
  pause: 400
  stress: 按位置对上
  say: 你什么 `Key` 都不给，同类型的孩子就按位置对上，`State` 会串到另一项上。
- tone: 问句
  pause: 480
  say: 那 `GlobalKey` 和这三种局部钥匙，差别在哪里？

## 大白话

- tone: 放慢
  pause: 400
  say: 把它想成座位上的姓名牌，没有牌子，礼物就按原来的座位发，人已经换了也会发错。
- tone: 平稳
  pause: 360
  say: 工号、盯住某一个对象、每次都换新牌，还有全公司不能重复的证件，是四种不同的牌。

## 怎么用

- tone: 平稳
  pause: 340
  say: 列表里用 `ValueKey` 装上不会变的 `id`，重新排列以后，`State` 可以跟着原来那一项。
- tone: 平稳
  pause: 340
  say: `GlobalKey` 要存在 `State` 的字段里，每次 `build` 都新造一把，框架就认不出旧的那一个。

## 再讲深一点

- tone: 平稳
  pause: 320
  say: 标识如果是 `String` 或 `int`，用 `ValueKey` 就够了。
- tone: 平稳
  pause: 380
  say: 对象自己重写了 `==` 时，`ValueKey` 会按相等来认，`ObjectKey` 仍然只看是不是同一个实例。
- tone: 放慢
  pause: 360
  say: `GlobalKey` 也可以把原来的元素带到新的父级下面，`State` 不用重新创建。

## 边界

- tone: 加重
  pause: 380
  say: 在 `build` 里写 `UniqueKey()`，每次重建都像换了一张新牌，原来的 `State` 会被丢掉。
- tone: 平稳
  pause: 340
  say: 两个位置使用同一把 `GlobalKey` 会直接报错，所以别到处发这种钥匙。

## 收束

- tone: 收束
  pause: 480
  say: 列表会动的时候，给每一项一个稳定的 `Key`，让对的 `State` 留下。
- tone: 收束
  pause: 520
  say: `GlobalKey` 能跨父级保住状态，可是它贵，不要到处用。

# 可以向老师问

- q: 列表重新排列时为什么需要 `ValueKey`
  tone: 平稳
  pause: 380
  say: 因为没有 `Key` 时，框架按位置匹配同类型的孩子，`State` 会留在旧位置上，跟错项。
- q: `GlobalKey` 可以每个组件都挂一把吗
  tone: 平稳
  pause: 340
  say: 不要，它要在全局表里查找，重复的时候会报错，只在确实要保住并挪动 `State` 时再用。
