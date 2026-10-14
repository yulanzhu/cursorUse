---
id: 76-explicit
module: 动画与绘制
title: AnimationController 和 vsync
order: 76
---

# 总结

`AnimationController` 的时间要你自己推进。`Ticker` 跟着帧走。`vsync` 接上 `SingleTickerProviderStateMixin`，页面看不见时就不再要帧。用完调用 `dispose`。

<!-- section: 专业讲解 -->
## 谁在推时间

- 控制器负责向前、向后、重复或停住
- `Ticker` 每次屏幕要准备一帧，就推进一步
- 一个控制器用 `SingleTickerProviderStateMixin`
- 页面不在眼前时，节拍停掉

<!-- section: 大白话 -->
## 大白话

- 节拍器跟着屏幕敲，没人看就停下

<!-- section: 怎么用 -->
## 怎么用

```dart
class _BoxState extends State<Box> with SingleTickerProviderStateMixin {
  late final AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
    );
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}
```

- 在 `initState` 里创建，把 `vsync` 设成 `this`
- 离开这个 `State` 时一定 `dispose`

<!-- section: 再讲深一点 -->
## 再讲深一点

- 值通常从零走到一，监听者再用它算角度或位置
- 两个以上的控制器，改用 `TickerProviderStateMixin`

<!-- section: 边界 -->
## 边界

- 创建完不会自动播放，除非你调用向前、向后或重复
- 忘了 `dispose`，节拍会留在登记里

<!-- section: 收束 -->
## 留下这句

- 时间你来推，节拍跟着帧，走时要卸掉

# 口播

## 开场

- tone: 平稳
  pause: 400
  say: 上一节的时间藏在组件里。这节的时间要你亲手推。
- tone: 放慢
  pause: 340
  say: 推时间的人叫 `AnimationController`，给它打节拍的叫 `Ticker`。

## 专业讲解

- tone: 加重
  pause: 380
  stress: 自己推进
  say: 显式动画里，进度要你自己推进，你可以向前、向后，或停在某个值。
- tone: 平稳
  pause: 340
  say: `Ticker` 跟着屏幕刷新被叫一次，控制器就把进度往前挪一点。
- tone: 平稳
  pause: 360
  say: `vsync` 接在 `State` 上。只有一个控制器时，混入 `SingleTickerProviderStateMixin`。
- tone: 平稳
  pause: 340
  say: 这个页面不在眼前时，混入会把节拍停掉，不再为了没人看的画面继续要帧。
- tone: 问句
  pause: 460
  say: 页面已经被盖住了，节拍还是继续敲，有什么好处？

## 大白话

- tone: 放慢
  pause: 400
  say: 把 `Ticker` 想成节拍器。屏幕每准备一帧，就敲你一下。
- tone: 平稳
  pause: 300
  say: 观众离场以后，节拍器就停，不必对着已经没有观众的座位继续敲。

## 怎么用

- tone: 平稳
  pause: 320
  say: 在 `initState` 里创建控制器，`vsync` 写成 `this`，并给它一段用时。
- tone: 加重
  pause: 360
  say: 这个 `State` 离开时调用 `dispose`，把节拍从登记里卸下来。

## 再讲深一点

- tone: 平稳
  pause: 340
  say: 控制器的值大多从零走到一。别的组件监听它，再去算旋转、位移或透明度。
- tone: 平稳
  pause: 320
  say: 只挂一个控制器，用名字里带 Single 的那个混入。要两个以上，换成 `TickerProviderStateMixin`。

## 边界

- tone: 平稳
  pause: 300
  say: 控制器不会自己开始。你要调用向前、向后或重复，它才动。
- tone: 平稳
  pause: 340
  say: 重复会一直要帧。页面拆掉时若忘了卸，这个节拍就变成泄漏。

## 收束

- tone: 收束
  pause: 480
  say: 显式动画的时间在你手里，节拍跟着屏幕走。
- tone: 收束
  pause: 520
  say: 用 `vsync` 把节拍和页面是否可见绑在一起，离开时一定卸掉。

# 可以向老师问

- q: 为什么 `vsync` 不能省
  tone: 平稳
  pause: 340
  say: 为了让节拍跟着屏幕刷新，并且在页面看不见时停下来。
- q: 忘了 `dispose` 会怎样
  tone: 平稳
  pause: 320
  say: `Ticker` 会留在登记里，这个 `State` 就卸不完。
