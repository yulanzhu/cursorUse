---
id: 27-build-context
module: Widget 心智
title: BuildContext
order: 27
---

# 总结

`BuildContext` 是组件在树上的位置。查找往祖先走。跨过一层 `builder` 之后，内层 `context` 才能看见外层刚刚放上的 `InheritedWidget`。不要在 `initState` 里直接依赖会变的继承数据。

<!-- section: 专业讲解 -->
## 树上的位置

- `Element` 实现了 `BuildContext`
- `of` 从当前位置向上找祖先
- `build` 拿到的 `context` 在它返回的子树之上
- 本方法里新放的 `InheritedWidget`，外层 `context` 看不见
- `Builder` 造出的内层 `context` 在那一层下面，才能看见
- `initState` 里不要依赖会变的继承数据

<!-- section: 大白话 -->
## 大白话

- 像门牌号，查通知只往上看
- 刚贴在下级的通知，要走到它下面才能看见

<!-- section: 怎么用 -->
## 怎么用

```dart
@override
Widget build(BuildContext context) {
  return Theme(
    data: ThemeData.dark(),
    child: Builder(
      builder: (inner) {
        final brightness = Theme.of(inner).brightness;
        return Text('$brightness');
      },
    ),
  );
}
```

- `Theme.of(inner)` 看见的是刚刚套上的深色主题
- 外层 `Theme.of(context)` 看见的是更上面的主题

<!-- section: 再讲深一点 -->
## 再讲深一点

- `LayoutBuilder` 和 `itemBuilder` 也会给你更靠下的 `context`
- `await` 之后再用 `context`，先看 `context.mounted`
- `Scaffold.of` 同样要求这个 `context` 位于 `Scaffold` 之下

<!-- section: 边界 -->
## 边界

- 祖先里本来就有的 `InheritedWidget`，外层 `context` 也能看见
- 只为了看见自己刚刚插入的那一层，才需要更靠下的 `context`

<!-- section: 收束 -->
## 留下这句

- `context` 是位置。新插入的继承数据，要到它下面才能看见

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节把 `BuildContext` 说成你在组件树上的位置，而不是组件自己。
- tone: 平稳
  pause: 320
  say: 位置不同，向上能看见的祖先就不同。

## 专业讲解

- tone: 平稳
  pause: 340
  say: 树上的 `Element` 就是 `BuildContext`，查找时从这里往祖先走。
- tone: 平稳
  pause: 360
  say: `build` 收到的那个 `context`，站在你即将返回的子树上方。
- tone: 加重
  pause: 400
  stress: 看不见
  say: 所以你在这个方法里刚刚放上的 `InheritedWidget`，这个外层 `context` 看不见。
- tone: 平稳
  pause: 380
  say: 中间再隔一个 `Builder`，内层回调拿到的 `context` 位于那一层下面，才能看见它。
- tone: 平稳
  pause: 340
  say: `initState` 里也不要直接依赖会变的继承数据，那时依赖订不上。
- tone: 问句
  pause: 460
  say: 如果外层 `context` 明明写在同一个方法里，为什么会看不见刚刚放上的主题？

## 大白话

- tone: 放慢
  pause: 400
  say: 把它想成门牌号，你要查一张通知，只能往自己的楼上找。
- tone: 平稳
  pause: 360
  say: 你刚把通知贴在下级门口，要走进那一扇门，才能看见这张新通知。

## 怎么用

- tone: 平稳
  pause: 360
  say: 这段 `build` 先套了一层深色 `Theme`，再把真正的查找放进 `Builder`。
- tone: 平稳
  pause: 340
  say: `inner` 能读到这层深色主题，外层的 `context` 读到的仍是更上面的那一份。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 不只是名叫 `Builder` 的组件，`LayoutBuilder` 和列表的 `itemBuilder` 也会给你一个更靠下的位置。
- tone: 放慢
  pause: 360
  say: 过了 `await` 以后如果继续使用这个位置，先看 `context.mounted`，离开了就不要再查找。
- tone: 平稳
  pause: 340
  say: `Scaffold.of` 也是向上找，所以要用位于 `Scaffold` 下面的那个 `context`。

## 边界

- tone: 平稳
  pause: 360
  say: 祖先里早就放好的继承数据，不需要再套 `Builder`，外层位置也能看见。
- tone: 平稳
  pause: 340
  say: 只有为了看见自己刚刚插入的那一层，才需要跨过这层 `builder`。

## 收束

- tone: 收束
  pause: 480
  say: `BuildContext` 代表的是树上的一个位置。
- tone: 收束
  pause: 520
  say: 新放上的继承数据，要等走到它下面的位置才能看见。

# 可以向老师问

- q: 同一个 `build` 里新套的 `Theme`，为什么外层 `context` 看不见
  tone: 平稳
  pause: 380
  say: 因为外层 `context` 是这层组件自己的位置，新 `Theme` 在它下面，查找不会往下走。
- q: `initState` 里可以依赖会变的继承数据吗
  tone: 平稳
  pause: 340
  say: 不要依赖，那时订阅没有接上，放到 `didChangeDependencies` 里再读。
