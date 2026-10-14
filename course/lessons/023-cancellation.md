---
id: 23-cancellation
module: 异步与并发
title: 取消和超时
order: 23
---

# 总结

`Future` 不会因为页面没了就停。超时只是不再等待。要停掉真正的请求，用令牌或请求库的 `cancel`。`dispose` 之后不要再 `setState`。

<!-- section: 专业讲解 -->
## 不会自动停

- `Future` 的寿命没有和 `State` 绑在一起
- `dispose` 不会自动取消它
- `timeout` 到点抛出 `TimeoutException`
- 超时不等于原来的工作已经停掉
- 令牌用来标记这单工作已取消
- 请求库的 `cancel` 才会把网络请求停掉
- `mounted` 是假的时候，不能 `setState`

<!-- section: 大白话 -->
## 大白话

- 人离开了，已经点的外卖不会自己取消
- 要么说一个最晚时间，要么告诉店家不要了

<!-- section: 怎么用 -->
## 怎么用

```dart
Future<void> load() async {
  try {
    final text = await fetchText().timeout(const Duration(seconds: 8));
    if (!mounted) return;
    setState(() {
      label = text;
    });
  } on TimeoutException {
    if (!mounted) return;
    setState(() {
      label = 'timeout';
    });
  }
}
```

- 成功和超时两条路，写回界面前都要看 `mounted`
- 这里的 `timeout` 没有取消 `fetchText`

<!-- section: 再讲深一点 -->
## 再讲深一点

- `onTimeout` 可以改成返回备用值，而不是抛错
- 令牌没有连到真正的请求上时，后台仍可能继续跑
- `Timer` 和流订阅也要在 `dispose` 里取消

<!-- section: 边界 -->
## 边界

- 只检查 `mounted` 能躲开错误的 `setState`，停不掉已经发出的请求
- `Future` 自己没有 `cancel`

<!-- section: 收束 -->
## 留下这句

- 页面走了也不要假设工作会停，离开之后别再 `setState`

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节讲一件容易漏的事，界面没了，你发出的 `Future` 不会跟着停。
- tone: 平稳
  pause: 320
  say: 你要自己决定等到何时，以及离开之后哪些回调仍然可以碰界面。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `await` 尚未结束的时候，用户可能已经把页面关掉，框架不会因此取消这个 `Future`。
- tone: 平稳
  pause: 340
  say: `timeout` 只给等待加上一个时限，到点就抛出 `TimeoutException`。
- tone: 加重
  pause: 400
  stress: 不会把它停掉
  say: 原来那次请求如果已经发出去，超时本身不会把它停掉。
- tone: 平稳
  pause: 360
  say: 想真正停掉，就要有一个取消令牌，或者调用请求库给你的 `cancel`。
- tone: 平稳
  pause: 340
  say: 页面 `dispose` 走完以后，`mounted` 变成假，这时再 `setState` 就会报错。
- tone: 问句
  pause: 460
  say: 从 `await` 回来以后，第一件要看的是什么？

## 大白话

- tone: 放慢
  pause: 400
  say: 人起身离开了，已经点出去的外卖不会自己取消。
- tone: 平稳
  pause: 340
  say: 你要么跟店家说最多等到几点，要么明确告诉他们这单不要了。

## 怎么用

- tone: 平稳
  pause: 340
  say: 这段 `load` 最多等八秒，成功或超时之后都先看 `mounted`。
- tone: 平稳
  pause: 320
  say: 是假的就返回，避免在页面离开之后再 `setState`。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: `timeout` 也可以配 `onTimeout`，改成给出一个备用结果，而不是抛错。
- tone: 放慢
  pause: 380
  say: 令牌如果没有连到真正的请求上，你只是自己不再等，网络那头可能仍在跑。
- tone: 平稳
  pause: 320
  say: 页面上的 `Timer` 和流订阅，也要在 `dispose` 里一并取消。

## 边界

- tone: 平稳
  pause: 360
  say: 只在 `setState` 前看 `mounted`，能躲开报错，但停不掉已经发出的请求。
- tone: 加重
  pause: 360
  say: `Future` 本身没有一个叫 `cancel` 的方法，别到它身上找取消。

## 收束

- tone: 收束
  pause: 480
  say: 界面销毁不会顺便取消你正在等的 `Future`。
- tone: 收束
  pause: 520
  say: 用超时限制等待，用令牌或请求库的 `cancel` 停掉工作，离开之后不要再 `setState`。

# 可以向老师问

- q: `timeout` 会把原来的请求停掉吗
  tone: 平稳
  pause: 360
  say: 不会，它只是让你这边停止等待，原来的工作要靠令牌或请求库的 `cancel` 才会停。
- q: `dispose` 之后为什么不能 `setState`
  tone: 平稳
  pause: 360
  say: 因为这时 `mounted` 已经是假的，`State` 不会再 `build`，再 `setState` 就是错误。
