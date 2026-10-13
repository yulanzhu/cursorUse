---
id: 69-async-builders
module: 数据
title: FutureBuilder 与 StreamBuilder
order: 69
---

# 总结

不要在 `build` 里创建新的 `Future`，否则每次重建都重新请求。把 `Future` 存在 `State` 里，或者由外面传入。`StreamBuilder` 同样不要在 `build` 里换一条新的流再听。

<!-- section: 专业讲解 -->
## 不要在 build 里重新开始

- `FutureBuilder` 看到的 `future` 若每次都是新的，就会重新等待，加载状态会闪一下
- 在 `initState` 里创建，或由父级创建好再传入
- 输入变了，在 `didUpdateWidget` 里换一份新的 `Future`，仍然不要在 `build` 里换
- `snapshot.hasError` 表示失败。`hasData` 在数据是 `null` 时是假
- `StreamBuilder` 在 `stream` 实例变化时，会取消旧订阅再订新的
- 在 `build` 里每次调用一个会返回新流的函数，事件可能漏，也可能重复

<!-- section: 大白话 -->
## 大白话

- 像每次重新看这一页，都重新去柜台要一份新的单据
- 单据应该先放在抽屉里。看页面只是看抽屉，不是每次都重新下单

<!-- section: 怎么用 -->
## 怎么用

```dart
class UserPanel extends StatefulWidget {
  const UserPanel({super.key, required this.userId});
  final String userId;

  @override
  State<UserPanel> createState() => _UserPanelState();
}

class _UserPanelState extends State<UserPanel> {
  late Future<User> future;

  @override
  void initState() {
    super.initState();
    future = fetchUser(widget.userId);
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<User>(
      future: future,
      builder: (context, snapshot) {
        if (snapshot.hasError) return const Text('加载失败');
        if (!snapshot.hasData) return const CircularProgressIndicator();
        return Text(snapshot.data!.name);
      },
    );
  }
}
```

- `StreamBuilder` 也把 `stream` 存在 `State` 或外面
- 结果回来以后，若要 `setState`，先看 `mounted`

<!-- section: 再讲深一点 -->
## 再讲深一点

- `FutureBuilder` 不会因为页面 `dispose` 就把 `Future` 取消。请求可能仍在进行
- 接口若真的以 `null` 表示一种成功，不要只靠 `hasData` 判断
- `connectionState` 能区分正在等待，还是已经结束
- 流如果不是广播流，重复听会失败。创建一次，让构建器自己订阅

<!-- section: 边界 -->
## 边界

- 构建器不负责分层，也不负责把 JSON 译成模型
- 它只是按一份已经存在的 `Future` 或 `Stream` 来画界面
- 取消请求要你自己在 `dispose` 里安排，构建器不会替你取消

<!-- section: 收束 -->
## 留下这句

- `Future` 和 `Stream` 不要在 `build` 里重新创建。放在 `State` 里，或从外面传入

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节讲两个构建器最容易写错的位置。错不在界面怎么画，而在你把 `Future` 或流放在了哪。
- tone: 平稳
  pause: 320
  say: 放在 `build` 里，每次重建都会重新开始。这是要先改掉的习惯。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `FutureBuilder` 只是观察你交给它的那一份 `Future`。你若在 `build` 里调用 `fetchUser`，父级每次重建，它都看到一份新的，于是重新请求。
- tone: 平稳
  pause: 340
  say: 加载状态会闪一下，请求也会重复。把 `Future` 存在 `State` 里，在 `initState` 创建，或者由外面创建好再传入。
- tone: 加重
  pause: 400
  stress: 同样不要
  say: `StreamBuilder` 同样不要在 `build` 里重新听一条新的流。流的实例一换，它会取消旧订阅再订新的，事件可能漏，也可能重复。
- tone: 平稳
  pause: 340
  say: `userId` 变了，要在 `didUpdateWidget` 里换一份新的 `Future`。这仍然不是在 `build` 里换。
- tone: 问句
  pause: 480
  say: 数据本身可以是 `null` 的时候，你能不能只靠 `hasData` 判断成功吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 像你每次重新看这一页，都跑去柜台重新要一份单据。柜台会认为你要了很多份。
- tone: 平稳
  pause: 340
  say: 单据应该先放进抽屉。`build` 只是打开抽屉看，不是每次都重新下单。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的 `future` 是 `State` 的字段。`initState` 里按 `userId` 去取，`build` 里只把它交给 `FutureBuilder`。
- tone: 平稳
  pause: 320
  say: 有错误就显示加载失败。尚未有数据就显示进度。有了 `User`，再显示名字。
- tone: 加重
  pause: 380
  say: 流也一样。不要在 `build` 里写一个每次都返回新 `Stream` 的调用。创建一次，让 `StreamBuilder` 自己去听。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 页面 `dispose` 以后，`Future` 仍可能在进行。它不会自己取消。结果回来若要改界面，先看 `mounted`。
- tone: 放慢
  pause: 400
  say: `hasData` 只表示 `data` 不是 `null`。你的接口如果用 `null` 表示一种正常结果，这个判断会把成功看成仍在等。
- tone: 平稳
  pause: 340
  say: 普通的单订阅流不能被听两次。所以更不要在每次 `build` 里重新创建、重新订阅。

## 边界

- tone: 平稳
  pause: 340
  say: 这两个构建器不负责把链接拼出来，也不负责把 JSON 译成类。它们只消费已经开始的那一份异步结果。
- tone: 加重
  pause: 380
  say: 真要取消，在 `dispose` 里自己取消。构建器卸下订阅，不表示底下的请求已经停了。

## 收束

- tone: 收束
  pause: 480
  say: 不要在 `build` 里创建新的 `Future`，也不要在 `build` 里重新听一条流。
- tone: 收束
  pause: 520
  say: 把它们放在 `State` 里，或者从外面传入。输入变了，再在 `didUpdateWidget` 里换。

# 可以向老师问

- q: 为什么加载会一直闪
  tone: 平稳
  pause: 360
  say: 多半是 `build` 里每次都创建了新的 `Future`。父级一重建，`FutureBuilder` 就重新等待。把那份 `Future` 存进 `State`。
- q: FutureBuilder 会取消请求吗
  tone: 平稳
  pause: 340
  say: 不会。页面卸掉以后请求仍可能在进行。回来以后先看 `mounted`。需要取消时，在 `dispose` 里自己取消。
