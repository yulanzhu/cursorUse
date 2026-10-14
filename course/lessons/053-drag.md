---
id: 53-drag
module: 手势与表单
title: 拖拽和滑动删除
order: 53
---

# 总结

`Draggable` 和 `DragTarget` 是拖走再放下。`Dismissible` 是滑出去。列表项要有稳定的 `Key`。

<!-- section: 专业讲解 -->
## 两种手势

- `Draggable` 开始拖以后，`feedback` 跟着指针，`data` 才是交出去的数据
- `DragTarget` 用 `onWillAcceptWithDetails` 决定能不能放
- `onAcceptWithDetails` 在放下之后拿到 `details.data`
- `Dismissible` 把列表项滑出屏幕，不是拖到另一个目标
- 它要求 `Key`。滑完要在 `onDismissed` 里把该项从数据中删掉
- 不删的话，一个已经滑走的项仍然留在树上，框架会报错

<!-- section: 大白话 -->
## 大白话

- 拖拽像把纸条从这一格拿到另一格，目标决定收不收
- 滑动删除像把纸条推出桌面，推出以后名单里也不能再留它

<!-- section: 怎么用 -->
## 怎么用

```dart
Dismissible(
  key: ValueKey(item.id),
  onDismissed: (_) => remove(item.id),
  child: ItemTile(item: item),
)

Draggable<String>(
  data: item.id,
  feedback: const Icon(Icons.drag_handle),
  child: ItemTile(item: item),
)
```

```dart
DragTarget<String>(
  onWillAcceptWithDetails: (details) => details.data != here,
  onAcceptWithDetails: (details) => accept(details.data),
  builder: (context, candidate, rejected) {
    return const DropArea();
  },
)
```

- `feedback` 只是跟着指针的样子，目标收到的是 `data`
- `confirmDismiss` 可以在真正删掉之前返回 `false` 来拦住

<!-- section: 再讲深一点 -->
## 再讲深一点

- `childWhenDragging` 可以在原位置留下一个让出来的样子，它仍然不是 `data`
- 列表顺序变了之后，`Key` 让状态跟着 id 走，而不是跟着下标走
- 拖拽和滑动删除不要绑在同一个孩子上硬抢。两个识别器会进同一个竞技场
- 旧的 `onWillAccept`、`onAccept` 已经让位给带 `Details` 的回调

<!-- section: 边界 -->
## 边界

- 放下以后改不改数据，是 `onAcceptWithDetails` 里的事。飞着的图标不会自己改列表
- `Dismissible` 的 `Key` 要用稳定 id，不要在 `build` 里用会变的 `UniqueKey`
- 只改界面、不改名单，下一次构建该项会再出现

<!-- section: 收束 -->
## 留下这句

- 拖走再放下，用 `Draggable` 和 `DragTarget`。滑出去用 `Dismissible`，并且给稳定的 `Key`

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节分两种手。一种是拖到另一个位置再放下，一种是直接滑出列表。
- tone: 平稳
  pause: 320
  say: 两种都容易忘 `Key`。有状态的项，或会滑走的项，都要用稳定的 id。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `Draggable` 被拖起来以后，`feedback` 跟着指针走。你真正交出去的是 `data`，不是那个飞着的图标。
- tone: 平稳
  pause: 340
  say: `DragTarget` 先用 `onWillAcceptWithDetails` 决定这一次允不允许放。放下之后，`onAcceptWithDetails` 才拿到数据。
- tone: 加重
  pause: 400
  stress: 滑出去
  say: `Dismissible` 是另一件事。它把列表项滑出去，不是拖到另一个目标上。滑出去以后，名单里必须删掉它。
- tone: 平稳
  pause: 360
  say: 它要求有 `Key`。这个 `Key` 用 `ValueKey` 包住 id。滑完却不删数据，框架会看到一个已经离开的项仍然留在树上。
- tone: 问句
  pause: 480
  say: 飞在手指上的 `feedback`，和目标最后收到的 `data`，是同一个东西吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 拖拽像把纸条从这一格拿到另一格。另一格可以拒绝。拒绝了，纸条不该算已经归它。
- tone: 平稳
  pause: 340
  say: 滑动删除像把纸条推出桌面。推出以后，桌上的名单也要把这一条划掉，不然下次整理也会看见它。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的 `Dismissible` 用 `item.id` 做 `Key`。`onDismissed` 里调用 `remove`，把这条从数据里拿掉。
- tone: 平稳
  pause: 340
  say: 拖拽那一段，`data` 也是 id。跟着指针的只是一个图标，目标不要去读图标。
- tone: 加重
  pause: 380
  say: `DragTarget` 如果发现 `data` 就是自己，就拒绝。接受时，用 `details.data`，不要自己再猜是哪一项。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: `confirmDismiss` 可以在动画结束前拦住，返回 `false` 就不删。真正改名单，仍然看 `onDismissed`。
- tone: 放慢
  pause: 400
  say: `childWhenDragging` 只是原位置上留给眼睛的样子。它不是交出去的数据，也不是目标会收到的那一份。
- tone: 平稳
  pause: 340
  say: 不要把滑动删除和拖放绑在同一个孩子上硬抢。两个识别器进同一个竞技场，胜负会难猜。

## 边界

- tone: 加重
  pause: 400
  say: 在 `build` 里写 `UniqueKey`，每次重建都是新的，列表会乱。稳定的是业务 id，不是一个临时造出来的钥匙。
- tone: 平稳
  pause: 340
  say: 只把界面上的组件拿掉、名单不改，下一次构建它又会回来。删除要看数据。

## 收束

- tone: 收束
  pause: 480
  say: 拖走再放下，用 `Draggable` 和 `DragTarget`。
- tone: 收束
  pause: 520
  say: 滑出去用 `Dismissible`。别忘了给列表项一个稳定的 `Key`。

# 可以向老师问

- q: feedback 和 data 有什么差别
  tone: 平稳
  pause: 340
  say: `feedback` 是跟着指针的样子。`data` 才是放下时目标拿到的数据。两者可以完全不同。
- q: 滑走了为什么又出现
  tone: 平稳
  pause: 360
  say: 因为 `onDismissed` 里没有把该项从数据中删掉。界面只是动画，名单仍然在，构建时它就会再回来。
