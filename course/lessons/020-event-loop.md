---
id: 20-event-loop
module: 异步与并发
title: 事件循环
order: 20
---

# 总结

一个 isolate 里，同步代码先跑完。接着把微任务队列全部做完，再取一个普通事件。`scheduleMicrotask` 比普通事件更早。

<!-- section: 专业讲解 -->
## 队列顺序

- 当前这段同步代码先走完
- 微任务队列里还有任务，就一直取，新排进来的也算
- 微任务全部做完，才从事件队列取一个
- 点击、计时器、输入输出，都进事件队列
- `scheduleMicrotask` 和 `Future.microtask` 进微任务队列

<!-- section: 大白话 -->
## 大白话

- 先把插进来的小条全部办完，再叫下一个号
- 小条里又塞进新小条，新的也要办完才能叫号

<!-- section: 怎么用 -->
## 怎么用

```dart
void demo() {
  Future<void>(() {
    print('event');
  });
  scheduleMicrotask(() {
    print('micro');
  });
  print('sync');
}
```

- 打印顺序是 `sync`，然后 `micro`，然后 `event`
- `Future` 的这种构造，把回调放进事件队列

<!-- section: 再讲深一点 -->
## 再讲深一点

- 已经完成的 `Future`，它的 `then` 回调会排成微任务
- 一个事件里的很长同步计算，不会被从中切开
- `Zone` 能把异步错误和任务排队包在同一个范围里

<!-- section: 边界 -->
## 边界

- 微任务太多，会把事件和界面帧往后推
- 微任务适合短的收尾，不要塞进重活

<!-- section: 收束 -->
## 留下这句

- 同步代码之后，先做完微任务，再取一个事件

# 口播

## 开场

- tone: 放慢
  pause: 400
  say: 这节看事件循环，你就明白两件排队的事谁先谁后。
- tone: 平稳
  pause: 300
  say: 先记住顺序，暂时不要钻进框架源码。

## 专业讲解

- tone: 平稳
  pause: 340
  say: 你眼前这段同步代码会先走完，循环不会插进来把你切断。
- tone: 加重
  pause: 400
  stress: 全部做完
  say: 接着它把微任务队列全部做完，队列里新加的微任务也要一起跑掉。
- tone: 平稳
  pause: 340
  say: 微任务全部做完以后，才从事件队列里取一个出来执行。
- tone: 平稳
  pause: 320
  say: 点击、计时器、输入输出，这些都算普通事件。
- tone: 平稳
  pause: 340
  say: 你用 `scheduleMicrotask` 放进去的回调，就排在微任务队列里。
- tone: 问句
  pause: 460
  say: 所以它会比点击这种普通事件更早，对吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 把它想成窗口办事，别人插进来的条子要先一张张办完，才轮到后面的号。
- tone: 平稳
  pause: 320
  say: 办到一半又来了新条子，新来的也要办完，才能去叫号。

## 怎么用

- tone: 平稳
  pause: 300
  say: 这段先后排了一个事件回调、一个微任务，最后还有一句同步打印。
- tone: 加重
  pause: 360
  stress: 同步打印
  say: 你真的跑一下，会先看见同步打印，再看见微任务，最后才是那个事件。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 一个已经完成的 `Future`，你再给它 `then`，那个回调会作为微任务排进来。
- tone: 放慢
  pause: 380
  say: 如果一个事件里写了很长的同步计算，这段计算要整段算完，后面的微任务和下一个事件都只能等。
- tone: 平稳
  pause: 340
  say: 这里只补一句，`Zone` 可以把异步错误以及这些任务何时去跑圈在同一个范围里，内部怎么做先放下。

## 边界

- tone: 平稳
  pause: 340
  say: 微任务如果多到停不下来，点击和界面帧都会被往后推。
- tone: 平稳
  pause: 300
  say: 所以微任务适合短的收尾，不适合把重活塞在里面。

## 收束

- tone: 收束
  pause: 480
  say: 顺序就是同步代码之后，先把微任务全部做完。
- tone: 收束
  pause: 520
  say: 然后才取一个普通事件，`scheduleMicrotask` 因此比普通事件更早。

# 可以向老师问

- q: `Future.microtask` 和 `Future` 构造函数谁先跑
  tone: 平稳
  pause: 360
  say: `Future.microtask` 进微任务队列，那种带计算的 `Future` 构造进事件队列，所以微任务先跑。
- q: 一个事件里写很长的循环，界面会怎样
  tone: 平稳
  pause: 340
  say: 这段同步计算不会被切开，算完之前，后面的事件和界面帧都只能等。
