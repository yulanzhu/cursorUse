---
id: 102-relayout
module: 框架原理
title: 布局边界和 ParentData
order: 102
---

# 总结

relayout boundary 让重新布局停在某一层，不再向上送。条件是父级不靠孩子的尺寸决定自己。`ParentData` 是父级存在孩子身上的额外信息，比如 `Flex` 的 `flex`，以及 `Stack` 里的位置。

<!-- section: 专业讲解 -->
## 往上走到哪停

- 孩子尺寸变了，父级若不使用这个尺寸，就可以不停祖先
- 视图本身就是一道边界
- `Expanded` 把 `flex` 写进 `ParentData`
- `Positioned` 把上下左右写进另一份 `ParentData`
- 换了一个不懂这份信息的父级，信息就没有意义

<!-- section: 大白话 -->
## 大白话

- 外套若不在乎里面那件的尺寸，里面改了，就不必把外套再量一次

<!-- section: 怎么用 -->
## 怎么用

- 看到 `Expanded`，就想到父级是 `Flex`
- 看到 `Positioned`，就想到父级是 `Stack`
- 便签是父级写的，不是孩子自己的字段

<!-- section: 再讲深一点 -->
## 再讲深一点

- 父级在布局前写好，布局时再读回去
- 约束仍然由父级给下来。停住的是向上的重新布局

<!-- section: 边界 -->
## 边界

- 你很少需要自己发明 `ParentData`
- 先会看现成父级留下的字段

<!-- section: 收束 -->
## 留下这句

- 父级不依赖孩子尺寸，重新布局就可以停。额外安排写在 `ParentData` 上

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节讲布局为什么有时不再向上送。
- tone: 平稳
  pause: 300
  say: 也讲父级写在孩子身上的那点额外信息。

## 专业讲解

- tone: 平稳
  pause: 400
  say: 布局边界的意思是，孩子的尺寸变了，若父级并不靠这个尺寸决定自己，重新布局就可以停在孩子这里。
- tone: 平稳
  pause: 320
  say: 脏标记往上走，走到这样的边界就停，不再把祖先全部标脏。
- tone: 加重
  pause: 400
  stress: 额外信息
  say: `ParentData` 是父级存放在孩子身上的额外信息。只有父级才懂这些字段。
- tone: 平稳
  pause: 340
  say: `Flex` 用它保存 `flex`。`Stack` 用它保存孩子的位置。`Expanded` 和 `Positioned` 就是在写这些信息。
- tone: 问句
  pause: 480
  say: 父级根本不看你的宽高，你的高度变了，祖父也要重新布局吗？

## 大白话

- tone: 放慢
  pause: 400
  say: 量衣服时，外套若不在乎里面那件有多大，里面改了，外套就不必再量。
- tone: 平稳
  pause: 320
  say: `ParentData` 像父母别在孩子身上的便签。便签写的是父母的安排，不是孩子自己的名字。

## 怎么用

- tone: 平稳
  pause: 300
  say: `Expanded` 出现时，父级就是 `Flex`。`flex` 写在孩子的 `ParentData` 上。
- tone: 平稳
  pause: 320
  say: `Positioned` 出现时，父级就是 `Stack`。上下左右写在另一份 `ParentData` 上。

## 再讲深一点

- tone: 平稳
  pause: 340
  say: 这种信息由父级在布局前写好，布局时父级再读回去。换了一个不懂这份便签的父级，便签就没有意义。
- tone: 放慢
  pause: 340
  say: 布局边界让局部的尺寸变化停在局部。内容很多的页面里，这是避免整棵都重新量的办法之一。

## 边界

- tone: 平稳
  pause: 300
  say: 自己发明 `ParentData` 的机会很少。先把现成父级留下的字段看懂。
- tone: 平稳
  pause: 340
  say: 边界没有取消约束。约束仍由父级给下来。停住的只是向上的重新布局。

## 收束

- tone: 收束
  pause: 500
  say: 父级不依赖孩子尺寸时，重新布局可以停在布局边界。
- tone: 收束
  pause: 480
  say: `ParentData` 是父级写在孩子身上的额外安排，比如伸缩和位置。

# 可以向老师问

- q: `Expanded` 的 `flex` 存在哪
  tone: 平稳
  pause: 300
  say: 存在孩子的 `ParentData` 里。那是 `Flex` 写给自己看的。
- q: 布局边界停住的是什么
  tone: 平稳
  pause: 360
  say: 停住向上的重新布局。父级不靠孩子尺寸做决定时，就不必把祖先都重新量一遍。
