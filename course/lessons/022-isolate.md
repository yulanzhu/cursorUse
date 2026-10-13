---
id: 22-isolate
module: 异步与并发
title: Isolate 与 compute
order: 22
---

# 总结

Dart 没有共享内存的线程。`Isolate` 各自有内存和事件循环，靠消息传递协作。`compute` 把一段重活放到另一个 isolate，避免堵住界面。

<!-- section: 专业讲解 -->
## 各自的内存

- 不能直接改另一个 isolate 里的变量
- 消息按可发送的规则送过去
- 界面跑在主 isolate 上
- 很长的同步计算会挡住帧
- 手机和桌面上，`compute` 另开 isolate 并把结果送回
- 网页上，`compute` 仍跑在当前事件循环里

<!-- section: 大白话 -->
## 大白话

- 两间办公室，桌子不共用
- 协作就递纸条，算完再把结果递回来

<!-- section: 怎么用 -->
## 怎么用

```dart
int square(int value) {
  return value * value;
}

Future<int> runSquare(int value) {
  return compute(square, value);
}
```

- `square` 不抓外面的变量
- `compute` 把传入的值送走，再把结果包成 `Future`

<!-- section: 再讲深一点 -->
## 再讲深一点

- 在原生平台上，`compute` 和 `Isolate.run` 是同一类事
- 回调、传入的消息和返回值都要能送过 isolate
- 闭包可以送，但可能把多余状态一起带走

<!-- section: 边界 -->
## 边界

- 只有很短的小活时，启动 isolate 的开销可能更大
- 另一个 isolate 里不能碰 `BuildContext`

<!-- section: 收束 -->
## 留下这句

- 重活离开界面这条线，结果用消息送回来

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节说明 Dart 为什么不用共享内存的线程来做并发。
- tone: 平稳
  pause: 320
  say: 你要挪走的，是会堵住界面的那段重活。

## 专业讲解

- tone: 平稳
  pause: 360
  say: 每个 `Isolate` 都有自己的内存和自己的事件循环，不能直接改对方的变量。
- tone: 平稳
  pause: 340
  say: 两边要协作，就把消息送过去，不要把它当成同一块内存。
- tone: 加重
  pause: 400
  stress: 很长的同步计算
  say: 界面框架跑在主 isolate 上，你在这里写很长的同步计算，帧就排不上。
- tone: 平稳
  pause: 380
  say: 手机和桌面上，`compute` 会把回调放到另一个 isolate，算完再把结果送回来。
- tone: 问句
  pause: 480
  say: 你觉得这种送走的方式，和开一条共享内存的线程一样吗？

## 大白话

- tone: 放慢
  pause: 400
  say: 把它想成两间办公室，每人一张桌子，纸不放在一起用。
- tone: 平稳
  pause: 340
  say: 要对方算一笔账，就把题目写在纸条上送过去，结果再送回来。

## 怎么用

- tone: 平稳
  pause: 320
  say: `square` 只使用传入的那个值，不碰外面的界面。
- tone: 平稳
  pause: 340
  say: `compute` 负责把这个值送走，并把算好的结果包成 `Future`。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 在手机和桌面上，`await compute` 和 `Isolate.run` 做的是同一类事。
- tone: 平稳
  pause: 360
  say: 回调、传入的消息、返回的结果，都要是能送过 isolate 的对象。
- tone: 放慢
  pause: 380
  say: 闭包也能送，可是它可能抓住外面很多变量，重活函数尽量别这么写。

## 边界

- tone: 加重
  pause: 400
  say: 网页上没有同样的 isolate，`compute` 会改在当前事件循环里跑，界面仍可能被堵住。
- tone: 平稳
  pause: 340
  say: 活如果只有很短一会儿，来回启动 isolate 的开销可能比活本身更大。

## 收束

- tone: 收束
  pause: 480
  say: 不要在界面这条线上做很长的同步重活。
- tone: 收束
  pause: 520
  say: 把它送到另一个 isolate，用消息把结果接回来。

# 可以向老师问

- q: `compute` 在网页上也会开新 isolate 吗
  tone: 平稳
  pause: 360
  say: 不会，网页上它跑在当前事件循环里，手机和桌面才会放到另一个 isolate。
- q: 能不能在 `compute` 的回调里用 `BuildContext`
  tone: 平稳
  pause: 340
  say: 不能，另一个 isolate 碰不到界面上的这些对象，回调里不要抓 `context`。
