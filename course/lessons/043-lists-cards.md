---
id: 43-lists-cards
module: 界面组件
title: 列表项和卡片
order: 43
---

# 总结

`ListTile` 负责一条列表项的结构。`Card` 负责把相关内容放在同一张视觉表面上。卡片是视觉分组，不是数据模型。

<!-- section: 专业讲解 -->
## 各管一件事

- `ListTile` 有 `leading`、`title`、`subtitle`、`trailing`
- `onTap` 让整条可以被点，它自己不是业务对象
- `Card` 提供形状、表面和边距，用来把一块内容收成一组
- 订单、商品是你自己的类。`Card` 里可以没有任何业务字段
- 列表项可以放进卡片，两件事仍然分开

<!-- section: 大白话 -->
## 大白话

- 列表项像表格里已经画好的一行格子
- 卡片像一张垫纸，垫纸不是纸上写的那笔账

<!-- section: 怎么用 -->
## 怎么用

```dart
Card(
  child: ListTile(
    leading: const Icon(Icons.receipt),
    title: Text(order.name),
    subtitle: Text(order.whenLabel),
    trailing: const Icon(Icons.chevron_right),
    onTap: () => open(order.id),
  ),
)
```

- `order` 是你的数据，`Card` 只是包在外面的表面
- 不需要整条结构时，不要为了阴影硬套 `ListTile`

<!-- section: 再讲深一点 -->
## 再讲深一点

- `Card` 自己不接收点击。要整张能点并带波纹，再在里面加点击层
- `ListTile` 适合比较短的标准项，通常是一句到三句文字，不是任意复杂布局的容器
- 主题会给卡片形状和表面颜色，不必每张都手写一遍阴影

<!-- section: 边界 -->
## 边界

- 卡片有默认边距。塞进已经很紧的列表时，上下会多出间距
- 不要把类命名成卡片来表示“这是一条订单”
- 没有分组需要时，就不要加 `Card`

<!-- section: 收束 -->
## 留下这句

- `ListTile` 管一条的结构，`Card` 管视觉分组。数据模型是你自己的类

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节把列表项和卡片拆开。它们经常挨在一起，职责却不是一个。
- tone: 平稳
  pause: 300
  say: 你要能指出，谁在管一条的结构，谁只是在做视觉上的分组。

## 专业讲解

- tone: 平稳
  pause: 340
  say: `ListTile` 是一条标准的列表项。前面可以放图标，中间是标题和副标题，后面可以放一个动作。
- tone: 平稳
  pause: 320
  say: 整条都能点时，把回调放在 `onTap`。这条组件描述的是排布，不是订单本身。
- tone: 加重
  pause: 400
  stress: 视觉分组
  say: `Card` 给一块内容形状和表面，让人看出这些东西是一组。这是视觉分组。
- tone: 平稳
  pause: 340
  say: 订单、商品，那些字段在你自己的类里。卡片里可以什么业务字段都没有。
- tone: 问句
  pause: 460
  say: 一条列表项放进一张卡片里，是不是就变成了业务数据本身？

## 大白话

- tone: 放慢
  pause: 420
  say: 列表项像表格里已经画好的一行格子，标题放哪、图标放哪，格子先定了。
- tone: 平稳
  pause: 340
  say: 卡片像垫在下面的一张纸。纸不是账本身。账仍然是你写下来的那笔数据。

## 怎么用

- tone: 平稳
  pause: 320
  say: 屏幕上的 `order` 是你的对象。名字和时间文案从它身上取，再放进 `ListTile`。
- tone: 平稳
  pause: 340
  say: `Card` 只是包在外面。点这一条时，交出去的是 `order.id`，不是卡片自己。
- tone: 加重
  pause: 360
  say: 如果这条不需要前面、标题、后面这一套，就不要为了有个阴影硬套 `ListTile`。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: `Card` 自己没有点击回调。你要整张能点，并且带上水波纹，就要在卡片里面再加一层点击。那是后面手势那一节的事，这里先别把卡片当成按钮。
- tone: 放慢
  pause: 400
  say: `ListTile` 适合比较规整的一项，通常是一句到三句文字。里面要放很复杂的布局时，它就不够用了。
- tone: 平稳
  pause: 320
  say: 主题已经给了卡片的形状和表面。不必每张都重新写一遍阴影数字。

## 边界

- tone: 平稳
  pause: 340
  say: 卡片带着默认边距。列表本来已经很紧，再套上去，上下会多出一截间距。
- tone: 加重
  pause: 380
  say: 不要因为想要这层表面，就把业务类起名成卡片。没有分组需要时，这一层可以不加。

## 收束

- tone: 收束
  pause: 480
  say: `ListTile` 管一条列表项怎么排，`Card` 管这一块看起来是不是一组。
- tone: 收束
  pause: 520
  say: 卡片是视觉分组，不是数据模型。模型永远是你自己的类。

# 可以向老师问

- q: 卡片能不能表示一条订单
  tone: 平稳
  pause: 340
  say: 不能。订单是你的数据类。`Card` 只决定这块内容有没有一张共同的表面。
- q: ListTile 是不是必须包在 Card 里
  tone: 平稳
  pause: 340
  say: 不是。列表项可以单独放。只有你真的要把几样东西视觉上分成一组时，才套 `Card`。
