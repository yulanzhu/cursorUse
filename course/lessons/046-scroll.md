---
id: 46-scroll
module: 滚动
title: 滚动协议和 ScrollController
order: 46
---

# 总结

`Scrollable` 把超出视口的内容，按偏移挪进窗口。`ScrollController` 用来读位置、跳转和监听。用完要 `dispose`。

<!-- section: 专业讲解 -->
## 位置从哪来

- 滚动协议的核心是 `Scrollable`，视口只显示其中一段
- 偏移越大，窗口越往内容的尾部看
- `ScrollController` 能读 `offset`，能 `jumpTo`，能 `animateTo`
- `addListener` 在偏移变化时被调用
- 控制器在 `State` 里创建，在 `dispose` 里放掉
- 不要在 `build` 里新造控制器，否则每次重建都丢掉位置

<!-- section: 大白话 -->
## 大白话

- 像从一扇小窗看一张很长的纸，你挪的是纸，不是墙
- 控制器是你手里的尺，页拆了就要把尺放下

<!-- section: 怎么用 -->
## 怎么用

```dart
class LogPage extends StatefulWidget {
  const LogPage({super.key});

  @override
  State<LogPage> createState() => _LogPageState();
}

class _LogPageState extends State<LogPage> {
  final controller = ScrollController();

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ListView(
      controller: controller,
      children: const [Text('记录')],
    );
  }
}
```

- `jumpTo` 立刻改偏移，`animateTo` 用一段时间和一条曲线走过去
- 挂上滚动视图之前，不要读 `offset`

<!-- section: 再讲深一点 -->
## 再讲深一点

- 一个控制器挂上两个滚动视图时，读 `offset` 会失败，要改看 `positions`
- 竖向主滚动视图默认可能使用 `PrimaryScrollController`
- 你自己传入控制器，就把那份主控制器换掉了

<!-- section: 边界 -->
## 边界

- 控制器不创建子组件，也不决定懒加载
- 它只掌握位置。列表怎么建，是下一节的事
- 没挂上视图就 `jumpTo`，运行时会失败

<!-- section: 收束 -->
## 留下这句

- `Scrollable` 负责把超出的内容挪进视口。控制器读位置、跳转、监听，用完要放掉

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节讲滚动协议本身。先不管列表怎么懒加载，先看内容是怎么挪进窗口的。
- tone: 平稳
  pause: 320
  say: 接下来再认识一把尺，也就是 `ScrollController`。这把尺用完要放掉。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `Scrollable` 是这套协议的核心。内容比视口大出来的部分，靠一个偏移量挪进窗口。
- tone: 平稳
  pause: 320
  say: 偏移越大，你看到的位置越靠近尾部。窗口本身不会变高，动的是里面的内容。
- tone: 加重
  pause: 400
  stress: 用完要放掉
  say: `ScrollController` 能读当前偏移，能立刻跳，也能做一段动画跳，也能用监听知道偏移变了。用完要放掉。
- tone: 平稳
  pause: 340
  say: 它挂着位置和监听。页面拆掉之后如果不 `dispose`，这些监听仍然留着。
- tone: 问句
  pause: 480
  say: 你如果在 `build` 里每次都新造一个控制器，位置会保住吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 把它想成一扇小窗，后面贴着一张很长的纸。你挪的是纸，墙并没有变高。
- tone: 平稳
  pause: 340
  say: 控制器像你手里的尺。这一页拆掉时，要把尺放下，不然尺仍然挂在已经不在的那一页上。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的控制器是 `State` 里的字段。`build` 只是把它交给 `ListView`，不是在那里新造。
- tone: 平稳
  pause: 320
  say: `dispose` 里先放控制器，再调用 `super.dispose`。顺序不要反。
- tone: 加重
  pause: 380
  say: 在它真正挂上滚动视图之前，不要读 `offset`，也不要 `jumpTo`。那时并没有位置可读。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 同一把控制器如果挂了两个滚动视图，单独读 `offset` 会失败。你要看 `positions`，或者不要共享。
- tone: 放慢
  pause: 400
  say: 竖向的主滚动视图，可能去用祖先提供的 `PrimaryScrollController`。你自己传入一把，就把那份换掉了。
- tone: 平稳
  pause: 320
  say: 这只影响谁在管位置，不影响子组件是一次建完，还是按可见范围来建。

## 边界

- tone: 平稳
  pause: 340
  say: 控制器不负责造列表项，也不负责把看不见的项省掉。那是列表组件的策略。
- tone: 加重
  pause: 380
  say: 没挂上视图就去跳，运行时会直接失败。先有滚动视图，再谈偏移。

## 收束

- tone: 收束
  pause: 480
  say: `Scrollable` 把超出视口的内容挪进窗口。
- tone: 收束
  pause: 520
  say: `ScrollController` 读位置、跳转、监听。用完一定要 `dispose`。

# 可以向老师问

- q: 为什么不能在 build 里创建控制器
  tone: 平稳
  pause: 360
  say: 因为 `build` 会反复执行。每次新造，旧的位置和监听都丢了，而且旧控制器往往没被放掉。
- q: 两个列表能共用一个控制器吗
  tone: 平稳
  pause: 360
  say: 能挂上，但不要再读单个 `offset`。多个位置时用 `positions`。更省事的做法是各用各的控制器。
