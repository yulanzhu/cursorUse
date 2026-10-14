---
id: 41-buttons
module: 界面组件
title: 按钮
order: 41
---

# 总结

按重要程度选按钮。`FilledButton` 给这一页最需要被看见的动作，`ElevatedButton` 给需要浮起来的动作，`OutlinedButton` 给次一级，`TextButton` 给更轻的动作，`IconButton` 给只有图标的动作。`onPressed` 设成 `null` 就是禁用。不要用 `GestureDetector` 冒充按钮。

<!-- section: 专业讲解 -->
## 五种按钮

- `FilledButton`：主动作，铺上主色
- `FilledButton.tonal`：仍然重要，但不是唯一的主动作
- `ElevatedButton`：需要阴影，浮在忙碌的背景上
- `OutlinedButton`：描边，放在主动作旁边
- `TextButton`：最轻，常见于对话框里的取消
- `IconButton`：只有图标，配上 `tooltip`
- `onPressed` 设成 `null` 时禁用，样式、语义和点击一起变

<!-- section: 大白话 -->
## 大白话

- 按钮像门口的牌子，字样已经告诉你哪一扇最该推
- 自己用盒子装一个点击，牌子上的禁用和读屏都丢了

<!-- section: 怎么用 -->
## 怎么用

```dart
FilledButton(
  onPressed: ready ? submit : null,
  child: const Text('提交'),
)

OutlinedButton(
  onPressed: saveDraft,
  child: const Text('存草稿'),
)

IconButton(
  tooltip: '分享',
  onPressed: share,
  icon: const Icon(Icons.share),
)
```

- 不要写成 `onPressed: () {}` 来假装禁用，那仍然会响应
- 取消这类轻动作用 `TextButton`，不要和主动作抢同一档

<!-- section: 再讲深一点 -->
## 再讲深一点

- 这些按钮带最小点击区域、焦点、悬停和按钮语义
- `IconButton` 没有可见文字时，`tooltip` 就是读屏要念的名字
- 一页里主动作通常只有一个，其余用描边或文字

<!-- section: 边界 -->
## 边界

- `GestureDetector` 能收到点击，但没有禁用态，也没有按钮语义
- 它也不保证键盘能聚焦、能用按键触发
- 真的只是一张图要被点，可以后面再讲波纹。这里要的是按钮，就用按钮

<!-- section: 收束 -->
## 留下这句

- 按重要程度选按钮。`onPressed` 设成 `null` 就是禁用，别用 `GestureDetector` 冒充

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节不把按钮当成一种样子，而是按它有多重要来选。
- tone: 平稳
  pause: 320
  say: 选完再学会禁用。禁用的写法，和一个什么都不做的回调，不是一回事。

## 专业讲解

- tone: 平稳
  pause: 360
  say: 这一页最该被看见的动作，用 `FilledButton`。它铺着主色，用户一眼知道按哪里。
- tone: 平稳
  pause: 340
  say: 动作需要浮在忙碌的背景上，用 `ElevatedButton`，它带着阴影。旁边的备选，用描边的 `OutlinedButton`。
- tone: 平稳
  pause: 320
  say: 更轻的动作，比如对话框里的取消，用 `TextButton`。只有一个图标时，用 `IconButton`，并写上 `tooltip`。
- tone: 加重
  pause: 400
  stress: 设成 `null`
  say: 这些按钮的 `onPressed` 一旦设成 `null`，就是禁用。颜色会变淡，点击不会进去，读屏也知道它不可用。
- tone: 问句
  pause: 480
  say: 如果你只是写一个什么都不做的回调，按钮看起来还是能按的，那算禁用吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 把它想成门口的几块牌子。主色那块是最该推的门，描边是旁边的门，只有字的那块是顺手的小动作。
- tone: 平稳
  pause: 340
  say: 你自己拿盒子装一个点击，牌子上的字没有了。别人不知道这扇门现在锁了没有。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的提交按钮，在 `ready` 是真时才把 `submit` 交出去。没准备好，就交给 `null`。
- tone: 平稳
  pause: 320
  say: 存草稿是次一级，所以用描边，不和提交抢同一档。
- tone: 加重
  pause: 380
  say: 分享只有图标。`tooltip` 写着分享，读屏才有名字可念。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 材料按钮自己带一块够大的点击区域，也带焦点和悬停。用户用键盘时，焦点会落到按钮上。
- tone: 放慢
  pause: 400
  say: `FilledButton.tonal` 是中间一档。它仍然重要，但不是这一页唯一的主动作。不要把每一颗都做成实心主色。
- tone: 平稳
  pause: 320
  say: 一页里真正的主动作，通常只留一个。其余的放到描边或文字那一档。

## 边界

- tone: 加重
  pause: 400
  say: `GestureDetector` 能接点击，却没有禁用时的样子，也没有按钮语义。键盘不一定能聚焦到它，更不一定能用按键触发。
- tone: 平稳
  pause: 340
  say: 所以别用它冒充按钮。你丢掉的是状态和语义，不只是少了一圈阴影。

## 收束

- tone: 收束
  pause: 480
  say: 按重要程度选这几种按钮，主动作、描边、文字和图标各有位置。
- tone: 收束
  pause: 520
  say: `onPressed` 设成 `null` 才是禁用。别用一个手势探测器冒充按钮。

# 可以向老师问

- q: 什么都不做的回调算不算禁用
  tone: 平稳
  pause: 340
  say: 不算。什么都不做的函数仍然会被调用，按钮看起来也能按。禁用是把 `onPressed` 设成 `null`。
- q: 只有图标时为什么要 tooltip
  tone: 平稳
  pause: 360
  say: 因为旁边没有可见的文字。`tooltip` 让读屏和悬停知道这颗 `IconButton` 是做什么的。
