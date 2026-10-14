---
id: 99-can-update
module: 框架原理
title: 三棵树与 canUpdate
order: 99
---

# 总结

三棵树是 `Widget`、`Element` 和 `RenderObject`。`canUpdate` 看 `runtimeType` 和 `key`。一样就更新原来的 `Element`，`State` 留下。不一样就拆掉重建。所以 `Widget` 可以每帧都是新的，状态仍在。

<!-- section: 专业讲解 -->
## 配置和活人

- `Widget` 是配置，常常整棵换新
- `Element` 挂在树上，`State` 住在里面
- `RenderObject` 负责布局和绘制
- 有的 `Element` 只组合孩子，自己没有单独的 `RenderObject`
- 两边都没有 `Key` 时，只要类型相同就算对上

<!-- section: 大白话 -->
## 大白话

- 说明书可以每帧重写。种类和名牌没变，岗位上的人就留任

<!-- section: 怎么用 -->
## 怎么用

```dart
static bool canUpdate(Widget oldWidget, Widget newWidget) {
  return oldWidget.runtimeType == newWidget.runtimeType
      && oldWidget.key == newWidget.key;
}
```

- 想保住 `State`，就不要随便改类型或 `Key`
- 想故意丢掉状态，换一个新的 `Key`
- 列表项用稳定的 `Key`，避免串项

<!-- section: 再讲深一点 -->
## 再讲深一点

- `canUpdate` 不比较字段内容
- 字段变了，只要类型和 `key` 相同，就走更新，再由 `build` 使用新字段

<!-- section: 边界 -->
## 边界

- 不要靠换一个匿名类型来碰运气
- 类型一对不上，状态就会丢

<!-- section: 收束 -->
## 留下这句

- 类型和 `key` 相同就更新。配置可以是新的，状态留在 `Element` 上

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节讲为什么每一帧都可以是新的 `Widget`，页面上的状态却仍留着。
- tone: 平稳
  pause: 300
  say: 关键在三棵树，以及 `canUpdate` 拿什么做比较。

## 专业讲解

- tone: 平稳
  pause: 380
  say: 配置是 `Widget`，它常常整棵都是新的。挂在树上的是 `Element`。要布局、要绘制的是 `RenderObject`。
- tone: 加重
  pause: 400
  stress: 两件事
  say: `canUpdate` 只看两件事：`runtimeType` 一样，`key` 也一样。
- tone: 平稳
  pause: 340
  say: 一样，就更新原来的 `Element`。若它带着 `State`，这份 `State` 留下，不会新建。
- tone: 平稳
  pause: 320
  say: 不一样，旧的卸掉，按新的配置重新建一份。
- tone: 问句
  pause: 480
  say: 类型没变、`key` 也没变，只是构造出一个新的 `Widget`，`State` 会丢掉吗？

## 大白话

- tone: 放慢
  pause: 400
  say: `Widget` 像每一帧重新写的说明书。`Element` 像一直站在岗位上的人。
- tone: 平稳
  pause: 320
  say: 说明书的种类和名牌没变，人就留任，只把新说明接过来。种类或名牌变了，就换人。

## 怎么用

- tone: 平稳
  pause: 320
  say: 想保住 `State`，就不要随便改组件的类型，也不要随便改 `Key`。
- tone: 平稳
  pause: 300
  say: 想故意丢掉状态，就换一个新的 `Key`。列表里每一项用稳定的 `Key`，避免串项。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: `StatefulWidget` 自己每次都可以是新对象。保住状态的是 `Element` 里的 `State`，不是那个配置对象。
- tone: 放慢
  pause: 340
  say: 有的 `Element` 只负责组合孩子，自己没有单独的 `RenderObject`。第三棵树是给要布局、要绘制的那些对象准备的。

## 边界

- tone: 平稳
  pause: 360
  say: `canUpdate` 不比较你的字段内容。字段变了，只要类型和 `key` 相同，就走更新，然后 `build` 再用新字段。
- tone: 平稳
  pause: 300
  say: 别靠临时换一个匿名类型来碰运气。类型一旦对不上，原来的状态就丢了。

## 收束

- tone: 收束
  pause: 480
  say: 类型和 `key` 相同，就更新，`State` 留下。
- tone: 收束
  pause: 520
  say: 所以 `Widget` 可以每帧都是新的，状态仍然在原来的 `Element` 上。

# 可以向老师问

- q: 为什么 `Widget` 可以每帧都新建
  tone: 平稳
  pause: 360
  say: 因为它只是配置。能匹配上的 `Element` 会留下，`State` 也就留下。
- q: 换了 `Key` 以后状态为什么没了
  tone: 平稳
  pause: 340
  say: 因为 `canUpdate` 认为这不是同一个位置。旧 `Element` 被卸掉，新的会重新创建。
