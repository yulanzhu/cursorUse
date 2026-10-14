---
id: 54-focus
module: 手势与表单
title: 焦点和键盘
order: 54
---

# 总结

`FocusNode` 决定谁在接收键盘。用完要 `dispose`。桌面上，焦点顺序比手机更重要。

<!-- section: 专业讲解 -->
## 谁在听键盘

- 输入框聚焦以后，手机上的软键盘才会出来
- `requestFocus` 把焦点交给这个节点，`unfocus` 把键盘收起
- 节点在 `State` 里创建，不要在 `build` 里新造
- `dispose` 里放掉，否则它仍然挂在焦点系统上
- 桌面用 Tab 在控件之间移动，顺序就是用户能走到的路径
- 手机上直接点，顺序不那么显眼，外接键盘和读屏仍然走这套顺序

<!-- section: 大白话 -->
## 大白话

- 焦点像话筒。只有拿到话筒的人，才能听见键盘在说什么
- 桌面上大家靠 Tab 递话筒，顺序乱了，人就走到不该去的控件

<!-- section: 怎么用 -->
## 怎么用

```dart
class NameField extends StatefulWidget {
  const NameField({super.key});

  @override
  State<NameField> createState() => _NameFieldState();
}

class _NameFieldState extends State<NameField> {
  final focusNode = FocusNode();

  @override
  void dispose() {
    focusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(focusNode: focusNode);
  }
}
```

- `focusNode.requestFocus` 让它开始接收键盘
- `autofocus` 只适合这一页确实该先输入的那一个

<!-- section: 再讲深一点 -->
## 再讲深一点

- 不把 `FocusNode` 交进去时，`TextField` 会自己建一个，你就不好从外面移动焦点
- `FocusTraversalGroup` 可以把一块区域的 Tab 顺序收拢
- 一页里不要让好几个输入框同时抢 `autofocus`
- 焦点不负责把输入框从键盘后面顶上来，那是滚动和 `viewInsets` 的事

<!-- section: 边界 -->
## 边界

- 节点不校验文字，也不提交表单
- 父级交进来的节点，不要在子级里 `dispose`
- 手机上不显眼，不表示可以忽略顺序

<!-- section: 收束 -->
## 留下这句

- `FocusNode` 决定谁接收键盘。用完放掉。桌面上把 Tab 顺序当成正事

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节讲键盘事件交给谁。手机上你看见的是软键盘，桌面上你更该关心 Tab 往哪走。
- tone: 平稳
  pause: 320
  say: 管这件事的是 `FocusNode`。它和滚动控制器一样，用完要放掉。

## 专业讲解

- tone: 平稳
  pause: 360
  say: 输入框拿到焦点，手机上的软键盘才会出来。你调用 `requestFocus` 把焦点交给它，调用 `unfocus` 把键盘收起。
- tone: 平稳
  pause: 340
  say: 节点要放在 `State` 里。放进 `build`，每次重建都是新节点，焦点会丢，旧的也可能没被放掉。
- tone: 加重
  pause: 400
  stress: 更重要
  say: 在桌面上，用户靠 Tab 从一个控件走到下一个。焦点顺序比手机更重要。走错了，人会认为这个界面没法用键盘。
- tone: 平稳
  pause: 340
  say: 手机上大家直接点，顺序不那么显眼。外接键盘和读屏仍然按这套顺序走。
- tone: 问句
  pause: 460
  say: 一页上有三个输入框，你能让它们同时 `autofocus` 吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 焦点像一只话筒。只有拿到话筒的控件，才接收键盘说的话。
- tone: 平稳
  pause: 340
  say: 桌面上，Tab 就是把话筒递出去。顺序如果乱，话筒会递到一个用户根本不想去的控件。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的 `FocusNode` 是 `State` 的字段。`TextField` 用 `focusNode` 接上它。
- tone: 平稳
  pause: 320
  say: `dispose` 里先放节点，再调用 `super.dispose`。不要只放别的控制器，把焦点忘了。
- tone: 加重
  pause: 380
  say: 需要它马上能打字时，再调用 `requestFocus`。`autofocus` 留给这一页确实该先输入的那一个。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 你不把节点交进去，`TextField` 会自己造一个。那样你很难从按钮里把焦点移到下一个输入框。
- tone: 放慢
  pause: 400
  say: `FocusTraversalGroup` 可以把一块区域的 Tab 顺序收在一起。表单很长时，这比让焦点满屏乱走更清楚。
- tone: 平稳
  pause: 320
  say: 焦点不管输入框会不会被键盘挡住。挡住的问题，用滚动和 `viewInsets` 去顶，下一节也会再讲选择控件时一起看见。

## 边界

- tone: 平稳
  pause: 340
  say: 节点不校验文字，也不替你提交。它只回答：现在的键盘事件给谁。
- tone: 加重
  pause: 380
  say: 父级交进来的 `FocusNode`，不要在子级 `dispose`。谁创建，谁放掉。放掉别人的，后面的页面会坏。

## 收束

- tone: 收束
  pause: 480
  say: `FocusNode` 决定谁在接收键盘，用完要 `dispose`。
- tone: 收束
  pause: 520
  say: 桌面上，焦点顺序比手机更重要。Tab 要能走通。

# 可以向老师问

- q: 为什么软键盘不出来
  tone: 平稳
  pause: 340
  say: 先看输入框有没有焦点。没有的话，调用它的 `FocusNode.requestFocus`。节点若在每次 `build` 里新造，焦点也会丢。
- q: 手机上要不要管 Tab 顺序
  tone: 平稳
  pause: 360
  say: 要。直接点的时候不显眼，外接键盘和读屏仍然按这个顺序走。桌面上就更不能忽略。
