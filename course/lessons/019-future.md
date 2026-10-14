---
id: 19-future
module: 异步与并发
title: Future 和错误传播
order: 19
---

# 总结

`Future` 代表以后才会到来的一个值。`async` 和 `await` 是写法。错误沿着这条 `Future` 往上走，没人接住，就会变成未处理的异步错误。

<!-- section: 专业讲解 -->
## 值与错误

- `Future<T>` 以后给出一个值，或者带上一个错误
- `async` 函数返回的就是 `Future`
- `await` 等到错误时，会把错误抛出来
- `try` / `catch` 和 `catchError` 负责接住
- 完全不接，就成为未处理的异步错误

<!-- section: 大白话 -->
## 大白话

- 先拿到取件单，包裹以后才到
- 失败写在单上，不去看就没人认领

<!-- section: 怎么用 -->
## 怎么用

```dart
Future<String> loadName() async {
  try {
    final name = await fetchName();
    return name;
  } catch (error) {
    return 'unknown';
  }
}
```

- `await` 放在 `try` 里，`catch` 才能接住
- 故意不等时，错误也要另接，不能把返回值丢开

<!-- section: 再讲深一点 -->
## 再讲深一点

- 第一个 `await` 之前抛出的错，也会收进返回的 `Future`
- `then` 的回调再抛错，新的 `Future` 会带着它
- `Future.wait` 里有一个失败，整组默认也失败

<!-- section: 边界 -->
## 边界

- `unawaited` 只说明故意不等，并不接错误
- 超时和取消以后再讲

<!-- section: 收束 -->
## 留下这句

- 值在将来，错误要有人沿着 `Future` 接住

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节把 `Future` 讲明白，你就知道异步结果以后从哪来。
- tone: 平稳
  pause: 320
  say: 更要紧的是出错以后往哪走，它不会自己消失。

## 专业讲解

- tone: 平稳
  pause: 340
  say: `Future` 装的不是眼前就能用的结果，而是过一会儿才落到你手里的那个值。
- tone: 平稳
  pause: 360
  say: 函数标上 `async`，调用时马上给你一个 `Future`。
- tone: 平稳
  pause: 340
  say: 函数体先同步执行，直到碰到第一个 `await`。
- tone: 加重
  pause: 400
  stress: 抛出来
  say: 你用 `await` 去等，如果等来的是错误，它就在这里抛出来。
- tone: 平稳
  pause: 320
  say: 包进 `try` 和 `catch` 可以接住，`catchError` 也是在接同一类错。
- tone: 问句
  pause: 480
  say: 调用之后既不等待，也不接错误，这个错最后会去哪？

## 大白话

- tone: 放慢
  pause: 400
  say: 把它想成取快递，你手里先有一张单，包裹仍在路上。
- tone: 平稳
  pause: 340
  say: 运送失败会写在这张单上，你要是不看，就没有人来处理这件事。

## 怎么用

- tone: 平稳
  pause: 320
  say: 这段写法是在等一个名字，失败了就改返回一个备用名字。
- tone: 平稳
  pause: 340
  say: `await` 要放在 `try` 里面，下面的 `catch` 才能接到刚刚抛出的错。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 就算错发生在第一个 `await` 之前，`async` 也会把它收进返回的 `Future`，调用那一下不会同步炸开。
- tone: 放慢
  pause: 360
  say: 改用 `then` 往下写时，回调里再抛错，新返回的 `Future` 会继续带着它。
- tone: 平稳
  pause: 340
  say: 几个 `Future` 交给 `Future.wait`，其中一个失败，整组默认也以失败结束。

## 边界

- tone: 平稳
  pause: 340
  say: `unawaited` 只是告诉分析器你故意不等，它不会替你把错误接住。
- tone: 加重
  pause: 380
  say: 所以故意不等的时候，仍然要给这条 `Future` 准备好错误处理。

## 收束

- tone: 收束
  pause: 480
  say: `Future` 是以后才来的值，`async` 和 `await` 只是等待它的写法。
- tone: 收束
  pause: 520
  say: 你要么等它，要么用回调接住，不然这个错就会变成没人处理的异步错误。

# 可以向老师问

- q: `await` 等来的错误能不能用 `try` 接住
  tone: 平稳
  pause: 340
  say: 能，`await` 会把 `Future` 里的错误抛出来，包在 `try` 里就能被 `catch` 接住。
- q: 调用了 `async` 函数却不看结果，错误会消失吗
  tone: 平稳
  pause: 360
  say: 不会，没有 `await`，也没有 `catchError`，它就会变成未处理的异步错误。
