---
id: 02-three-layers
module: 全貌与环境
title: Framework、Engine 和 Embedder
order: 2
---

# 总结

Flutter 分成三层。你写的界面在最上面，绘制引擎在中间，平台嵌入在最下面。

<!-- section: 专业讲解 -->
## 三层

- `Framework`：组件、布局、手势、状态
- `Engine`：绘制、文字、图片这些重活
- `Embedder`：把引擎嵌进各个操作系统

<!-- section: 大白话 -->
## 大白话

- 剧本、舞台机械、剧场大门，各管一摊

<!-- section: 怎么用 -->
## 怎么用

- 每天改的组件文件，都在 `Framework`
- `Engine` 和 `Embedder` 跟着工具链走，一般不用手写

<!-- section: 再讲深一点 -->
## 再讲深一点

- 热重载能只换你改过的那一层，是因为三层没有焊死
- 改一行界面描述，不必把整个程序重新编出来

<!-- section: 边界 -->
## 边界

- 分层是为了判断问题该看框架还是引擎
- 这不表示你要去改引擎源码

<!-- section: 收束 -->
## 留下这句

- 先记住三层的名字和分工

# 口播

## 开场

- tone: 平稳
  pause: 400
  say: 这节把 Flutter 拆成三层，你就知道改界面时到底在跟谁说话。

## 专业讲解

- tone: 平稳
  pause: 320
  say: 最上面一层叫 `Framework`，你写的组件、布局和手势都在这里。
- tone: 加重
  pause: 360
  stress: 重活
  say: 中间是 `Engine`，它把绘制、文字和图片这些重活接过去。
- tone: 平稳
  pause: 320
  say: 最下面是 `Embedder`，负责把引擎嵌进手机、桌面或网页。
- tone: 问句
  pause: 460
  say: 那你平时写的代码，到底落在哪一层？

## 大白话

- tone: 放慢
  pause: 400
  say: 你可以把它想成一出戏。剧本是框架，舞台机械是引擎，剧场大门是嵌入层。
- tone: 平稳
  pause: 300
  say: 你平时改的是剧本，不必每次都去拆大门。

## 怎么用

- tone: 平稳
  pause: 300
  say: 新建项目时你改的那些组件文件，都落在 `Framework` 这一层。
- tone: 平稳
  pause: 280
  say: `Engine` 和 `Embedder` 跟着工具链走，一般不用你手写。

## 再讲深一点

- tone: 加重
  pause: 380
  say: 三层分开，热重载才能只换你改过的那一层脚本。
- tone: 平稳
  pause: 340
  say: 如果三层焊死，改一行字就要把整个程序重新编出来。

## 边界

- tone: 平稳
  pause: 320
  say: 知道分层，是为了出问题时能判断该看框架还是引擎。
- tone: 平稳
  pause: 280
  say: 它不表示你要去改引擎源码。

## 收束

- tone: 收束
  pause: 500
  say: 记住这三层的名字和分工，后面讲绘制和线程时会用到。

# 可以向老师问

- q: 我写的组件算哪一层
  tone: 平稳
  pause: 300
  say: 算 `Framework`。组件、布局、状态，都在这一层。
- q: 引擎和嵌入层谁跟平台打交道
  tone: 平稳
  pause: 340
  say: `Embedder` 跟平台打交道，`Engine` 负责绘制这些重活。
