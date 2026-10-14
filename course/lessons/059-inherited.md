---
id: 59-inherited
module: 状态
title: InheritedWidget 与 InheritedModel
order: 59
---

# 总结

`InheritedWidget` 把数据交给下面的子树。子树用 `dependOnInheritedWidgetOfExactType` 登记依赖。`updateShouldNotify` 决定要不要通知。`InheritedModel` 可以只订阅其中一个方面。

<!-- section: 专业讲解 -->
## 向下的数据

- 子组件在 `build` 里依赖祖先，祖先更新后，依赖者按规则重建
- `updateShouldNotify` 返回假，依赖者不会因为这次更新重建
- 包一个 `of` 方法，让调用的人走会登记依赖的查找
- `getInheritedWidgetOfExactType` 只取一次，不登记依赖
- `InheritedModel` 用方面来区分。`inheritFrom` 可以只订一个方面
- `updateShouldNotifyDependent` 按这个依赖关心的方面决定要不要通知它
- `MediaQuery.sizeOf` 和 `MediaQuery.viewInsetsOf` 就是按方面订阅

<!-- section: 大白话 -->
## 大白话

- 像教室墙上的公告。你登记过要看，公告换了你才会被叫去再读
- 只关心日期的人，不必因为公告上的天气变了就重新站起来

<!-- section: 怎么用 -->
## 怎么用

```dart
class Accent extends InheritedWidget {
  const Accent({
    required this.color,
    required super.child,
    super.key,
  });

  final Color color;

  static Accent? maybeOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<Accent>();
  }

  @override
  bool updateShouldNotify(Accent oldWidget) => color != oldWidget.color;
}
```

```dart
final width = MediaQuery.sizeOf(context).width;
final inset = MediaQuery.viewInsetsOf(context).bottom;
```

- 不要在 `initState` 里依赖。那时登记不稳定，放到 `didChangeDependencies` 或 `build`
- `MediaQuery.of` 会订上所有方面，重建更勤

<!-- section: 再讲深一点 -->
## 再讲深一点

- `dependOnInheritedWidgetOfExactType` 的 `aspect` 只对支持方面的子类有意义，比如 `InheritedModel`
- 只查找、不依赖，适合事件回调里读一次。不要把结果存起来当成一直有效的真相
- 祖先不存在时，`of` 要有明确的失败，不要返回一个假装有效的默认值来掩盖
- 数据向下走。子组件要向上报告一件事，用下一节的通知，不要硬用这套

<!-- section: 边界 -->
## 边界

- 每次 `build` 都依赖一个经常变的祖先，整条链会跟着勤重建
- `updateShouldNotify` 永远返回真，等于放弃了这层过滤
- 它不适合装一个巨大的、什么都往里放的对象

<!-- section: 收束 -->
## 留下这句

- `InheritedWidget` 向下提供数据，依赖要登记，通知要比较。`InheritedModel` 让你只订一个方面

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节讲数据怎么从祖先交到下面。不是看见了就算完，看见了也要登记。
- tone: 平稳
  pause: 320
  say: 登记了，祖先变了才来找你。你也可以只关心其中一个方面。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `InheritedWidget` 把数据放在祖先上。子树用 `dependOnInheritedWidgetOfExactType` 来取，同时把自己登记成依赖。
- tone: 平稳
  pause: 340
  say: 祖先更新时，`updateShouldNotify` 返回真，依赖者才重建。返回假，这次就放过它们。
- tone: 加重
  pause: 420
  stress: 只订一个方面
  say: `InheritedModel` 更细。子组件可以只订一个方面。你关心宽度，就不必因为别的方面变了而被拉去重建。只订一个方面。
- tone: 平稳
  pause: 360
  say: 框架里的 `MediaQuery` 就是这样。`sizeOf` 和 `viewInsetsOf` 各订各的。`MediaQuery.of` 会把所有方面都订上。
- tone: 问句
  pause: 480
  say: 如果查找时不带 depend，数据后来变了，你会被带着重建吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 把它想成教室墙上的公告。你在名单上登记过，公告换了，才会有人来叫你再读一遍。
- tone: 平稳
  pause: 340
  say: 你若只关心日期，天气那一栏变了，就不该把你叫起来。这就是只订一个方面。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的 `Accent` 在 `maybeOf` 里做依赖查找。颜色和旧的不一样，`updateShouldNotify` 才返回真。
- tone: 平稳
  pause: 320
  say: 下面这两句是框架自带的例子。宽度走 `sizeOf`，键盘那一截走 `viewInsetsOf`，不要为了读一个高度把整个 `MediaQuery` 都订下来。
- tone: 加重
  pause: 380
  say: 这种依赖不要写在 `initState` 里。放到 `build`，或放到 `didChangeDependencies`。构造的时候，依赖关系并未安稳。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: `getInheritedWidgetOfExactType` 能取到祖先，但不会登记。事件回调里读一次可以。不要把取到的值存下来，当成以后都会自动更新的真相。
- tone: 放慢
  pause: 400
  say: `InheritedModel.inheritFrom` 才是按方面订阅的入口。对应的比较方法是 `updateShouldNotifyDependent`。它看的是这个依赖登记过的那些方面。
- tone: 平稳
  pause: 340
  say: 方向是向下的。子组件要向上扔一件一次性的事，不要塞进这套数据里。那是通知要做的。

## 边界

- tone: 平稳
  pause: 340
  say: `updateShouldNotify` 如果永远返回真，依赖者就会每次都重建。比较要看数据是不是真的换了。
- tone: 加重
  pause: 380
  say: 不要把临时输入、登录用户和网络结果塞进同一个巨大的 `InheritedWidget`。向下的通道适合一份清楚的、稳定的数据。

## 收束

- tone: 收束
  pause: 480
  say: `InheritedWidget` 把数据交给下面，依赖要用 depend 登记。
- tone: 收束
  pause: 520
  say: `updateShouldNotify` 决定通知谁。`InheritedModel` 让你只订阅其中一个方面。

# 可以向老师问

- q: of 和 getInheritedWidgetOfExactType 的差别
  tone: 平稳
  pause: 400
  say: 会登记依赖的查找，数据变了你才会重建。`getInheritedWidgetOfExactType` 只取一次，不登记，所以后面的变化不会来找你。
- q: 为什么不要总用 MediaQuery.of
  tone: 平稳
  pause: 360
  say: 因为它订的是所有方面。你只读宽度，就用 `MediaQuery.sizeOf`。键盘高度用 `viewInsetsOf`。这样别的方面变了，你不必跟着重建。
