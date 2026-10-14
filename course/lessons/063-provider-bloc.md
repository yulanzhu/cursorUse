---
id: 63-provider-bloc
module: 状态
title: Provider、Bloc 和释放
order: 63
---

# 总结

`provider` 这个包，本质上是 `InheritedWidget` 的包装。Bloc 强调事件进、状态出。小范围用框架自带，应用级用 Riverpod，事件流很复杂时再看 Bloc。订阅、控制器和动画都要在 `dispose` 里放掉。

<!-- section: 专业讲解 -->
## 怎么选

- `provider` 包把 `ChangeNotifierProvider` 放在树上，子组件靠 `BuildContext` 的 `watch` 来听
- 离开这棵树，就读不到。它和 Riverpod 不是同一个库
- Bloc 让界面把事件送进去，新状态从另一头出来。界面不要直接改内部字段
- 事件种类不多时，同一套库里的 `Cubit` 更轻：方法进、状态出
- 小范围用 `setState` 和 `ValueNotifier`。应用级用 Riverpod
- 事件种类很多、转移要写清楚时，再看 Bloc
- `StreamSubscription` 要 `cancel`，控制器和 `AnimationController` 要 `dispose`，最后调用 `super.dispose`

<!-- section: 大白话 -->
## 大白话

- `provider` 包像把公告贴在这棵树上，你要站在树下才能看见
- Bloc 像窗口。你递进一张单子，窗口再递出一张新的状态，你不把手伸进去改账本
- 用完的订阅和控制器，像借来的工具，离开时要放回去

<!-- section: 怎么用 -->
## 怎么用

```dart
@override
void dispose() {
  subscription.cancel();
  controller.dispose();
  animation.dispose();
  super.dispose();
}
```

```dart
on<Increment>((event, emit) {
  emit(state + 1);
});
```

- 界面用 `BlocBuilder` 听状态，用 `add` 把事件送进去
- 不是你创建的控制器，不要在这里放掉

<!-- section: 再讲深一点 -->
## 再讲深一点

- `provider` 包的 `watch` 会登记依赖，所以祖先一通知，听的人会重建
- Bloc 的好处是事件和状态都留有痕迹，复杂转移不容易在回调里散掉
- `Cubit` 没有单独的事件类。只有几种方法时，它比完整的 Bloc 少一层
- 动画控制器如果不放，时钟会在页面离开后继续走

<!-- section: 边界 -->
## 边界

- 不要因为名字里都有 provider，就把 `provider` 包和 Riverpod 装混
- 放掉两次，或放掉别人的对象，运行时会报错
- 事件流并不复杂时，不要为了架构完整上完整的 Bloc

<!-- section: 收束 -->
## 留下这句

- 小范围用框架自带，应用级用 Riverpod，事件流很复杂再看 Bloc。创建的订阅和控制器，在 `dispose` 里放掉

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节把另外两条路说清楚，再给一个怎么选的办法。最后记住，借来的东西要放回。
- tone: 平稳
  pause: 320
  say: 一条是 `provider` 这个包，一条是 Bloc。它们和上一节的 Riverpod 不是一回事。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `provider` 这个包，本质上是 `InheritedWidget` 的包装。你把 `ChangeNotifierProvider` 放在树上，子组件靠上下文的 `watch` 来听。
- tone: 平稳
  pause: 340
  say: 离开这棵树就读不到。所以它仍然要 `BuildContext`。这和 Riverpod 用 `ref` 去读，不是同一条路。
- tone: 加重
  pause: 420
  stress: 事件进、状态出
  say: Bloc 强调事件进、状态出。界面把事件送进去，新状态从另一头出来。你不要直接改里面的字段。
- tone: 平稳
  pause: 360
  say: 怎么选很具体。小范围用 `setState` 和 `ValueNotifier`。应用级用 Riverpod。事件种类很多、转移要写清楚时，再看 Bloc。
- tone: 问句
  pause: 480
  say: 如果只是几个方法在改状态，你一定要先写事件类吗？

## 大白话

- tone: 放慢
  pause: 420
  say: `provider` 包像把公告贴在这棵树上。你要站在树下面，才能看见那张公告。
- tone: 平稳
  pause: 360
  say: Bloc 像一个窗口。你递进一张单子，窗口递出一张新的状态。你不把手伸进去改账本。用完的订阅和控制器，离开时要放回去。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的 `dispose` 先取消订阅，再放掉控制器和动画，最后才是 `super.dispose`。
- tone: 平稳
  pause: 320
  say: Bloc 那段是事件进来以后 `emit` 一个新状态。界面用 `BlocBuilder` 来听，用 `add` 把事件送进去。
- tone: 加重
  pause: 380
  say: 父级交进来的控制器，应该由父级放掉。你在子级再放一次，后面用到它的人会碰到一个已经放掉的对象。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 同一套库里还有 `Cubit`。它是方法进、状态出，没有单独的事件类。事件种类不多时，它更轻。
- tone: 放慢
  pause: 400
  say: Bloc 的好处是每一种进来的事、每一种出去的状态都能写清楚。复杂转移不容易散落在各种回调里。
- tone: 平稳
  pause: 340
  say: `AnimationController` 如果不放，页面离开以后时钟仍然可能在走。所以它和文字控制器一样，要进 `dispose`。

## 边界

- tone: 加重
  pause: 400
  say: `provider` 包和 Riverpod 不是同一个库。名字都带 provider，别装错，也别混用两套上下文。
- tone: 平稳
  pause: 340
  say: 事件流并不复杂的时候，不要为了看起来完整就上完整的 Bloc。小范围的开关，框架自带就够。

## 收束

- tone: 收束
  pause: 480
  say: 小范围用框架自带，应用级用 Riverpod，事件流很复杂时再看 Bloc。
- tone: 收束
  pause: 520
  say: 订阅、控制器和动画，都在 `dispose` 里放掉。不是你创建的，就不要放。

# 可以向老师问

- q: provider 包和 Riverpod 是一个库吗
  tone: 平稳
  pause: 360
  say: 不是。`provider` 包是 `InheritedWidget` 的包装，读取靠 `BuildContext`。Riverpod 用 `ref`，不靠这棵组件树才能读到数据。
- q: 什么时候才需要 Bloc
  tone: 平稳
  pause: 380
  say: 事件种类很多，而且每次转移都要写清楚的时候。只有几个方法在改状态，可以看更轻的 `Cubit`，或者继续用框架自带的写法。
