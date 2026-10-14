---
id: 56-inputs
module: 手势与表单
title: 选择控件和键盘遮挡
order: 56
---

# 总结

`Checkbox`、`Switch`、`Radio`、`Slider` 都是受控组件。值从外面来，变化用回调告诉外面。键盘弹出时，用 `viewInsets` 把输入框顶上去。

<!-- section: 专业讲解 -->
## 值和遮挡

- 这些控件不在内部私藏一份真实值。`value` 由外面传入
- `onChanged` 设成 `null` 就是禁用
- 外面在回调里改自己的状态，再重建，控件才会变
- 一组单选用 `RadioGroup` 收起 `groupValue` 和 `onChanged`
- 每个 `Radio` 只留自己的 `value`。写在单个 `Radio` 上的旧字段已经过时
- `viewInsets` 的底部是被挡住的高度，常见来源是键盘
- `Scaffold` 默认会按这个高度缩短 `body`。再加一遍，就会垫两次

<!-- section: 大白话 -->
## 大白话

- 受控像墙上的开关接在外面的灯上。墙自己不记灯亮了没有
- 键盘像从下面升起来的一块板。你不把输入框让上去，字就被板挡住

<!-- section: 怎么用 -->
## 怎么用

```dart
Checkbox(
  value: agreed,
  onChanged: (next) => setState(() => agreed = next ?? false),
)

Switch(
  value: enabled,
  onChanged: (next) => setState(() => enabled = next),
)

RadioGroup<String>(
  groupValue: size,
  onChanged: (next) => setState(() => size = next),
  child: Column(
    children: [
      RadioListTile<String>(value: 's', title: Text('小')),
      RadioListTile<String>(value: 'm', title: Text('中')),
    ],
  ),
)

Slider(
  value: volume,
  onChanged: (next) => setState(() => volume = next),
)
```

- 骨架已经在缩短 `body` 时，不要再用同样的 `viewInsets` 加一层内边距
- 输入框放进能滚动的区域，需要时用 `Scrollable.ensureVisible`

<!-- section: 再讲深一点 -->
## 再讲深一点

- `MediaQuery.viewInsetsOf` 只订这一方面，比把整个 `MediaQuery` 都订下来更省重建
- `viewPadding` 是系统自己的安全边，不等于键盘高度
- 旧的 `Radio.groupValue` 和 `Radio.onChanged` 仍能看见，新代码用 `RadioGroup`
- 单选的 `value` 类型要一致，字符串和数字不要混在同一组

<!-- section: 边界 -->
## 边界

- 把 `value` 写死，回调里又不改外面的状态，用户会看到点了没反应
- 不要在控件内部再存一份“真正的值”，两份会打架
- `viewInsets` 不会替你滚动。视口缩短了，焦点那一项仍可能在视口外

<!-- section: 收束 -->
## 留下这句

- 选择控件的值在外面，变化靠回调。键盘高度看 `viewInsets`，不要和骨架的缩短垫两次

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节讲两类事。一类是勾选、开关、单选和滑条，它们的值放在哪。一类是键盘起来以后，输入框怎么不被挡住。
- tone: 平稳
  pause: 320
  say: 两边的共同点是，都不要在控件自己肚子里私藏一份真相。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `Checkbox`、`Switch`、`Radio`、`Slider` 都是受控的。当前值从外面传入，用户一改，回调把新值告诉外面。
- tone: 平稳
  pause: 340
  say: 外面再 `setState`，控件才会变成新的样子。你把 `value` 写死，回调里什么都不改，看起来就像点了没反应。
- tone: 加重
  pause: 400
  stress: RadioGroup
  say: 一组单选现在用 `RadioGroup` 把选中值和回调收在一起。每个 `Radio` 只声明自己的 `value`。
- tone: 平稳
  pause: 360
  say: 键盘弹出时，看 `viewInsets` 的底部。这个高度就是被挡住的那一截。`Scaffold` 默认会据此把 `body` 缩短。
- tone: 问句
  pause: 480
  say: 骨架已经缩短过一次，你再按同样的底部高度加内边距，会不会垫两次？

## 大白话

- tone: 放慢
  pause: 420
  say: 受控像墙上的开关接着外面的灯。墙不记住灯现在亮不亮，亮不亮写在外面的账上。
- tone: 平稳
  pause: 340
  say: 键盘像从下面升起来的一块板。你不把输入框让上去，人就只能对着板子找字。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的勾选、开关和滑条，都在回调里 `setState`。值存在外面的字段里。
- tone: 平稳
  pause: 360
  say: 单选外面是 `RadioGroup`。里面的 `RadioListTile` 只写 `value`，不再各自带一份选中值。
- tone: 加重
  pause: 380
  say: 输入框要放在能滚动的区域里。骨架没有帮你缩短时，才用 `viewInsets` 去加底部间距。需要的话再 `Scrollable.ensureVisible`。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: `MediaQuery.viewInsetsOf` 只关心这一方面。你若 `MediaQuery.of` 把整个媒体查询都订上，别的变化也会牵着你重建。
- tone: 放慢
  pause: 400
  say: `viewPadding` 是系统自己占掉的边，比如顶部的状态区域。它不是键盘升起来的那一截。两套不要混着加。
- tone: 平稳
  pause: 340
  say: 单个 `Radio` 上的 `groupValue` 已经过时。你在旧代码里看见它，新写的一组改用 `RadioGroup`。

## 边界

- tone: 加重
  pause: 400
  say: 控件内部不要再存一份真正的值。外面一份、里面一份，用户看到的和你提交的会不一致。
- tone: 平稳
  pause: 340
  say: `viewInsets` 只告诉你被挡住多少。它不会自动把焦点那一项滚进视口。滚动仍然要你来安排。

## 收束

- tone: 收束
  pause: 480
  say: 选择控件的值从外面来，变化用回调告诉外面。
- tone: 收束
  pause: 520
  say: 键盘高度看 `viewInsets`。骨架已经缩短过，就不要再垫一次。

# 可以向老师问

- q: onChanged 设成 null 会怎样
  tone: 平稳
  pause: 320
  say: 控件变成禁用，点下去没有回调。这和按钮把 `onPressed` 设成 `null` 是同一类约定。
- q: 为什么输入框被键盘挡住两次
  tone: 平稳
  pause: 380
  say: 多半是 `Scaffold` 已经按 `viewInsets` 缩短了 `body`，你又加了一层同样的内边距。只留一种。
