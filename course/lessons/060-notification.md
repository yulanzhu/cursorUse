---
id: 60-notification
module: 状态
title: Notification 向上冒泡
order: 60
---

# 总结

子组件用 `Notification` 往上扔事件，祖先用 `NotificationListener` 接住。它和 `InheritedWidget` 方向相反。`ScrollNotification` 就是这个机制。

<!-- section: 专业讲解 -->
## 向上的事件

- 子组件调用 `dispatch`，事件沿着元素树往上走
- `NotificationListener` 按类型接住。回调返回 `true` 就停止，返回 `false` 就继续
- 它不是一份可以以后再读的状态，而是一次性的事件
- `ScrollStartNotification`、`ScrollUpdateNotification`、`ScrollEndNotification` 都从滚动视图往上冒
- 父级可以没有 `ScrollController`，仍然听见滚动
- 方向和 `InheritedWidget` 相反：一个向下提供数据，一个向上抛事件

<!-- section: 大白话 -->
## 大白话

- 像孩子在楼下喊一声。楼上的人可以接住，也可以让喊声再往上走
- 公告是贴在墙上等人来看的。喊声是已经发生的那一下，过后不再挂着

<!-- section: 怎么用 -->
## 怎么用

```dart
class Saved extends Notification {
  const Saved(this.id);
  final String id;
}

Saved(id).dispatch(context);

NotificationListener<Saved>(
  onNotification: (notification) {
    showSaved(notification.id);
    return true;
  },
  child: const Editor(),
)
```

- 返回 `true` 之前，确认上面没有别人也要听
- 听滚动时，把 `NotificationListener<ScrollNotification>` 放在滚动视图的祖先上

<!-- section: 再讲深一点 -->
## 再讲深一点

- `ScrollUpdateNotification` 会很勤。回调里不要做很费事的工作，也不要因此 `setState` 出一整页
- 返回 `false` 让更外层继续听，适合既要自己反应、又要交给上面的情况
- 通知不保存当前滚动位置。要随时读偏移，仍然用 `ScrollController`
- 不要用它传递一份要一直留着的模型。模型用向下的数据或你自己的状态

<!-- section: 边界 -->
## 边界

- 在中间返回 `true`，上面就收不到同一次事件
- 它不代替 `ChangeNotifier`。一个是冒泡的事件，一个是可订阅的值
- `dispatch` 用的 `context` 必须在监听者的下面，不然没有路可走

<!-- section: 收束 -->
## 留下这句

- 通知向上冒泡，`InheritedWidget` 向下提供数据。滚动的那些通知，就是这套机制

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 上一节的数据是从上往下交。这节反过来，子组件把一件事往上扔。
- tone: 平稳
  pause: 320
  say: 名字叫 `Notification`。祖先用 `NotificationListener` 接。滚动自己就在用它。

## 专业讲解

- tone: 平稳
  pause: 360
  say: 子组件创建一条通知，调用 `dispatch`。它沿着组件树往上冒，而不是去找一个全局的邮箱。
- tone: 平稳
  pause: 340
  say: 祖先的 `NotificationListener` 按类型接住。回调返回 `true`，冒泡停止。返回 `false`，更上面的人仍然能听见。
- tone: 加重
  pause: 400
  stress: 方向相反
  say: 这和 `InheritedWidget` 方向相反。一个向下提供数据，一个向上抛事件。你不要用同一套心里模型去套。
- tone: 平稳
  pause: 360
  say: `ScrollNotification` 就是例子。滚动开始、更新、结束，都会往上冒。父级即使没有 `ScrollController`，也能听见。
- tone: 问句
  pause: 480
  say: 这种喊声过去以后，你能不能再把它当成当前的滚动位置来读？

## 大白话

- tone: 放慢
  pause: 420
  say: 像孩子在楼下喊一声。最近的楼上的人可以接住，也可以让喊声继续往上走。
- tone: 平稳
  pause: 340
  say: 墙上的公告是等人来看的，看的人要先登记。喊声是已经发生的一下，喊完就不挂在那里了。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的 `Saved` 带着一个 id。编辑器里 `dispatch`，外层的监听者接到以后返回 `true`，表示这件事就停在这里。
- tone: 平稳
  pause: 320
  say: 你要听滚动，就把 `NotificationListener` 的类型写成 `ScrollNotification`，放在滚动视图的祖先上。
- tone: 加重
  pause: 380
  say: 返回 `true` 之前先想一层。上面如果还有人要知道保存完成了，你把冒泡截住，他们就聋了。这里改成返回 `false`，让它继续走。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 滚动更新的通知非常勤。回调里做很费事的工作，或者因此把整页 `setState`，会把滑动拖卡。
- tone: 放慢
  pause: 400
  say: 通知里没有一份可以以后再读的当前位置。你要随时知道偏移，还是用 `ScrollController`。通知只告诉你这一下发生了。
- tone: 平稳
  pause: 340
  say: 不要用它传递一份要一直留着的模型。那种数据走 `InheritedWidget`，或者走你自己的状态。通知是事件。

## 边界

- tone: 加重
  pause: 400
  say: `dispatch` 用的 `context` 必须在监听者下面。你在监听者的外面喊，上面没有路，谁也接不住。
- tone: 平稳
  pause: 340
  say: 它也不是 `ChangeNotifier`。那边是一份会留着的值，这边是一声喊完就走的事件。

## 收束

- tone: 收束
  pause: 480
  say: 子组件用通知往上扔，祖先用 `NotificationListener` 接住。
- tone: 收束
  pause: 520
  say: 方向和 `InheritedWidget` 相反。`ScrollNotification` 就是这套机制。

# 可以向老师问

- q: 返回 true 和 false 有什么差别
  tone: 平稳
  pause: 360
  say: 返回 `true` 停止冒泡，更外层听不见。返回 `false` 让事件继续往上。你确定只有自己要处理时，才返回 `true`。
- q: 没有 ScrollController 能听滚动吗
  tone: 平稳
  pause: 360
  say: 能。在滚动视图的祖先上放 `NotificationListener<ScrollNotification>`。要随时读偏移，控制器仍然更直接。
