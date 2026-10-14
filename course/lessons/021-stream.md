---
id: 21-stream
module: 异步与并发
title: Stream 的单订阅和广播
order: 21
---

# 总结

`Stream` 是一串异步事件。单订阅只能有一个听众，广播可以有多个。`listen` 得到的订阅要记得取消。`async*` 用 `yield` 把事件送出来。

<!-- section: 专业讲解 -->
## 两种流

- 单订阅只能 `listen` 一次，再听会报错
- 有人听了以后，单订阅才开始把事件送出来
- 广播可以同时有多个听众
- 后到的听众收不到已经发出的事件
- `async*` 默认做出单订阅流
- `yield` 送出一个事件，`yield*` 接上另一条流

<!-- section: 大白话 -->
## 大白话

- 一个听众和多个听众，不是同一种流
- 晚来的人收不到已经播过的事件

<!-- section: 怎么用 -->
## 怎么用

```dart
Stream<int> count() async* {
  for (var i = 1; i <= 3; i++) {
    yield i;
  }
}

StreamSubscription<int> bind(Stream<int> stream) {
  return stream.listen((value) {
    print(value);
  });
}
```

- 每次调用 `count`，得到一条新的单订阅流
- `bind` 把订阅交回来，不用时要 `cancel`

<!-- section: 再讲深一点 -->
## 再讲深一点

- `await for` 也在听，循环结束时会取消订阅
- `StreamController` 默认单订阅，要广播就用 `broadcast`
- 单订阅取消后，同一条流不能再听

<!-- section: 边界 -->
## 边界

- 广播不会把旧事件补发给新听众
- `listen` 没有 `onError` 时，流里的错误也可能没人处理

<!-- section: 收束 -->
## 留下这句

- 先分清能有几个听众，再把订阅取消掉

# 口播

## 开场

- tone: 放慢
  pause: 400
  say: 这节分清单订阅和广播，你就知道一条流能给几个人听。
- tone: 平稳
  pause: 320
  say: 听上之后要记得收尾，订阅不取消会一直留着。

## 专业讲解

- tone: 平稳
  pause: 340
  say: 单订阅的流只允许一个听众，你再 `listen` 一次，就会报已经有人在听。
- tone: 平稳
  pause: 340
  say: 这种流在有人来听之前，通常不会提前把事件生产出来。
- tone: 平稳
  pause: 320
  say: 广播流则可以同时挂上多个 `listen`。
- tone: 加重
  pause: 380
  stress: 此前已经送出
  say: 晚一步才 `listen` 的人，收不到此前已经送出的事件。
- tone: 平稳
  pause: 360
  say: `async*` 写出来的流默认就是单订阅，`yield` 每走一次就送出一个事件。
- tone: 问句
  pause: 460
  say: 你看出来这两种流的差别了吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 单订阅像一条只许一个人接的电话，第二个人接不上。
- tone: 平稳
  pause: 360
  say: 广播像电台，谁正在听谁就能收到，晚打开的人听不到已经播过的那段。

## 怎么用

- tone: 平稳
  pause: 340
  say: `count` 每被调用一次，就给出一条新的流，里面用 `yield` 送出三个数字。
- tone: 平稳
  pause: 340
  say: `bind` 里的 `listen` 把订阅交回来，页面不要它的时候要 `cancel`。

## 再讲深一点

- tone: 平稳
  pause: 340
  say: 你用 `await for` 去听时，循环一退出，订阅也会被取消。
- tone: 平稳
  pause: 320
  say: 自己创建 `StreamController` 时，不写 `broadcast` 就是单订阅。
- tone: 放慢
  pause: 360
  say: 单订阅取消之后，同一条不能再听，要再听就再要一条新的流。

## 边界

- tone: 平稳
  pause: 320
  say: 不要指望广播会把错过的事件补回来。
- tone: 加重
  pause: 380
  say: 流上的错误如果 `listen` 时没有 `onError`，也可能变成没人处理的异步错误。

## 收束

- tone: 收束
  pause: 480
  say: 先看清这条流是给一个人听，还是给很多人同时听。
- tone: 收束
  pause: 520
  say: 听的时候留下的订阅，不用了就取消，`yield` 则是生产端把事件交出来的写法。

# 可以向老师问

- q: 单订阅的流能不能 `listen` 两次
  tone: 平稳
  pause: 360
  say: 不能，第二次会报错，取消之后同一条也不能再听，要再听需要一条新的流。
- q: 广播流后订阅，能收到之前的事件吗
  tone: 平稳
  pause: 340
  say: 不能，广播只发给当前正在听的人，之前已经发出的事件不会补上。
