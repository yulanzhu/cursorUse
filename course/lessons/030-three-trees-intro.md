---
id: 30-three-trees-intro
module: Widget 心智
title: 三棵树先分工
order: 30
---

# 总结

`Widget` 是配置。`Element` 是树上的实例，`StatefulWidget` 的 `State` 放在对应的 `Element` 上。`RenderObject` 负责布局和绘制。这里只建立分工。

<!-- section: 专业讲解 -->
## 三份工作

- `Widget` 不可变，描述这里应该是什么样
- `Element` 站在树上，把配置和活着的实例连起来
- `State` 记在有状态的那个 `Element` 上，不记在 `Widget` 上
- `RenderObject` 接收约束、上报尺寸，并负责绘制
- `StatelessWidget` 和 `StatefulWidget` 自己没有 `RenderObject`

<!-- section: 大白话 -->
## 大白话

- 剧本、演员、舞台装置，各做一份工作
- 这节只认这三份工作，不把一整帧的工序走完

<!-- section: 怎么用 -->
## 怎么用

- 你平时新建和修改的是 `Widget`
- 框架替你保住 `Element`，有状态时也保住 `State`
- 量尺寸、画像素的是 `RenderObject`
- 先不要沿着源码把一帧从 `build` 追到上屏

<!-- section: 再讲深一点 -->
## 再讲深一点

- 类型和 `Key` 不变时，原来的 `Element` 留下，只换上新的 `Widget`
- `RenderObject` 很多时候是在更新原有对象
- 三棵树不是三份重复的业务数据

<!-- section: 边界 -->
## 边界

- 不是每个组件都有自己的 `RenderObject`
- 组合出来的组件，常常只更新配置和 `Element`

<!-- section: 收束 -->
## 留下这句

- 配置、实例、布局和绘制，先把三份工作分开

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节给三棵树分工，你先知道谁是配置，谁活在树上，谁负责画出来。
- tone: 平稳
  pause: 300
  say: 今天不把一帧里面的源码顺序走完。

## 专业讲解

- tone: 平稳
  pause: 340
  say: 你写出来的 `Widget` 是一份配置，字段定好以后就不要改，父级可以经常换一份新的。
- tone: 平稳
  pause: 360
  say: 框架在树上放一个 `Element`，让这份配置有一个活着的位置。
- tone: 加重
  pause: 400
  stress: 不是记在配置里
  say: 碰到 `StatefulWidget` 时，可变的 `State` 记在对应的 `Element` 上，不是记在配置里。
- tone: 平稳
  pause: 380
  say: `RenderObject` 才去处理约束、尺寸和绘制，它不是每个组件都有的。
- tone: 问句
  pause: 460
  say: 那 `StatelessWidget` 自己身上，有没有一个 `RenderObject`？

## 大白话

- tone: 放慢
  pause: 420
  say: 把它想成一出戏，剧本写这一场是什么样子，演员真的站在台上，舞台装置负责位置和怎么画。
- tone: 平稳
  pause: 320
  say: 你今天只要认出这三份工作，不用把整场演出的工序背下来。

## 怎么用

- tone: 平稳
  pause: 300
  say: 你改组件文件时，改的是剧本，也就是 `Widget`。
- tone: 平稳
  pause: 340
  say: 演员是 `Element`，有状态时台词本记在 `State` 上，布景和画布则是 `RenderObject`。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 类型和 `Key` 都没变时，原来的 `Element` 会留下，只是换上新的配置。
- tone: 放慢
  pause: 340
  say: 已经有的 `RenderObject` 很多时候也是被更新，而不是每次都拆掉重建。
- tone: 平稳
  pause: 300
  say: 所以这三棵树不是把同一份业务数据复制三遍。

## 边界

- tone: 平稳
  pause: 340
  say: `StatelessWidget` 和 `StatefulWidget` 只是组合层，它们自己不带 `RenderObject`。
- tone: 平稳
  pause: 320
  say: 真正去布局和绘制的，是里面那些渲染组件。

## 收束

- tone: 收束
  pause: 480
  say: `Widget` 是配置，`Element` 是实例并托着 `State`。
- tone: 收束
  pause: 520
  say: `RenderObject` 负责布局和绘制，这节先记住这三份分工。

# 可以向老师问

- q: `State` 放在 `Widget` 上吗
  tone: 平稳
  pause: 320
  say: 不放，可变的 `State` 放在对应的 `Element` 上，`Widget` 只是配置。
- q: 每个组件都有自己的 `RenderObject` 吗
  tone: 平稳
  pause: 340
  say: 不是，无状态和有状态组件自己没有，布局和绘制发生在里面的渲染对象上。
