---
id: 94-rebuild
module: 性能
title: 重建、const 和拆 Widget
order: 94
---

# 总结

`setState` 标脏的是它所在的那一块 `State`，范围越小越好。`const` 子树在父级重建时可以跳过。把不变的那一块拆出去，才更容易写成 `const`。拆出去本身不保证跳过。

<!-- section: 专业讲解 -->
## 让重建停住

- 状态越靠下，跟着重建的子树越小
- `const` 在多次构建之间是同一个实例
- 框架发现实例没换，就可以不走进那段 `build`
- 每次都新造出来的子组件，`build` 仍可能走

<!-- section: 大白话 -->
## 大白话

- 只换了一盏灯，不必把整栋楼的灯都检查一遍

<!-- section: 怎么用 -->
## 怎么用

```dart
Column(
  children: const [
    Text('今日记录'),
  ],
)
```

- 会变的状态放进更小的 `StatefulWidget`
- 不变的标题和图标，能 `const` 就 `const`

<!-- section: 再讲深一点 -->
## 再讲深一点

- 保住状态靠的是 `Element`，不是配置对象本身每次相同
- 这里说的跳过，是构建可以停。和后面的重绘边界不是同一件事

<!-- section: 边界 -->
## 边界

- 不要为了少重建，把该变的界面也标成 `const`
- 拆分是为了边界清楚，不是把每一行文字都拆成一个文件

<!-- section: 收束 -->
## 留下这句

- `setState` 只碰到会变的那一块。不变的子树用 `const` 停住

# 口播

## 开场

- tone: 放慢
  pause: 400
  say: 这节讲重建可以小到什么程度。
- tone: 平稳
  pause: 280
  say: 也讲 `const` 怎样让一整段构建被跳过。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `setState` 标脏的是这个 `State` 所在的那一块。范围越小，跟着重建的子树越小。
- tone: 加重
  pause: 400
  stress: 同一个实例
  say: 子组件若是 `const`，父级重建时往往能对上同一个实例，于是整段构建可以跳过。
- tone: 平稳
  pause: 340
  say: 把不会变的那一块拆成别的 `Widget`。能写成 `const` 的，就写成 `const`。
- tone: 问句
  pause: 460
  say: 只是一个数字变了，整页都包在同一个 `setState` 里，合适吗？

## 大白话

- tone: 放慢
  pause: 400
  say: 只是换了屋里的一盏灯，用不着把整栋楼都巡一遍。
- tone: 平稳
  pause: 300
  say: 不变的家具可以标成固定的。检查的人看见这个标记，就直接走过去。

## 怎么用

- tone: 平稳
  pause: 320
  say: 会变的那点状态，放进更小的 `StatefulWidget`，外层的壳就可以少走构建。
- tone: 平稳
  pause: 280
  say: 标题和图标若不会变，就标成 `const`。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 拆出去本身不保证跳过。新的 `Widget` 若每次都是新对象，子级的 `build` 仍可能走。
- tone: 放慢
  pause: 320
  say: `const` 让这个对象在多次构建之间保持同一个。框架发现没有换，就可以停。

## 边界

- tone: 平稳
  pause: 340
  say: 为了少重建就把会变的界面也标成 `const`，数据变了，屏幕却不动。
- tone: 平稳
  pause: 300
  say: 拆开是为了让边界清楚。不必把每一行文字都拆成单独的文件。

## 收束

- tone: 收束
  pause: 480
  say: 让 `setState` 只碰到会变的那一块。
- tone: 收束
  pause: 500
  say: 不变的子树用 `const`，重建就可以在那里停住。

# 可以向老师问

- q: `const` 为什么能跳过重建
  tone: 平稳
  pause: 360
  say: 因为多次构建拿到的是同一个实例，框架可以判定这里不用再走进去。
- q: 把 `Widget` 拆出去就一定不重建吗
  tone: 平稳
  pause: 340
  say: 不一定。只有它不再被标脏，或它是可以跳过的 `const`，构建才会停。
