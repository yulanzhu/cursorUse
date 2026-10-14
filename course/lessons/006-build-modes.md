---
id: 06-build-modes
module: 全貌与环境
title: 调试、分析和发布
order: 6
---

# 总结

debug 打开断言，手机和桌面用 JIT。profile 接近发布时的性能，同时留下性能工具。release 在手机和桌面上是 AOT，体积小，没有断言。手机、桌面和 Web 共用框架，嵌入层不同。

<!-- section: 专业讲解 -->
## 三种产物

- debug：断言有效，手机和桌面用 JIT，方便调试和热重载
- profile：速度接近 release，断言关掉，追踪和性能工具还在
- release：手机和桌面走 AOT，体积更小，断言被拿掉
- 三端共用框架，嵌入层各自不同

<!-- section: 大白话 -->
## 大白话

- debug 是彩排，profile 是带计时的彩排，release 是正式演出

<!-- section: 怎么用 -->
## 怎么用

```dart
void check(String name) {
  assert(name.isNotEmpty);
}
```

- 这种断言只在 debug 里执行
- 看性能，用 `flutter run --profile`
- 交给别人的包，用 release

<!-- section: 再讲深一点 -->
## 再讲深一点

- profile 没有断言，断点那种调试也不在
- release 会把断言整段拿掉，连条件都不会执行
- 不要把必须发生的事写进 `assert`

<!-- section: 边界 -->
## 边界

- 网页的 debug 不是手机那套 JIT，发布编译也不是这条 AOT
- 在 debug 里觉得卡，不一定发布之后还卡

<!-- section: 收束 -->
## 留下这句

- 写功能用 debug，量性能用 profile，交付用 release

# 口播

## 开场

- tone: 平稳
  pause: 400
  say: 这节认识三种构建，debug、profile 和 release。

- tone: 放慢
  pause: 360
  say: 你写功能、量速度、交给别人，不该用同一种产物。

## 专业讲解

- tone: 平稳
  pause: 380
  say: debug 里断言是开的。手机和桌面用 JIT，方便热重载，也方便调试。

- tone: 加重
  pause: 400
  stress: 性能工具留着
  say: profile 把速度拉到接近发布，同时把性能工具留着。断言在这里是关的。

- tone: 平稳
  pause: 360
  say: release 在手机和桌面上走 AOT。体积更小，断言不会留下来。

- tone: 问句
  pause: 460
  say: 网页是不是也用这套 JIT 和 AOT？

- tone: 平稳
  pause: 340
  say: 不是。网页共用的是框架。编译路径不一样，嵌入层也各自不同。

## 大白话

- tone: 放慢
  pause: 400
  say: 你把 debug 当彩排。台词错了，可以当场停下来改。

- tone: 平稳
  pause: 360
  say: profile 像带计时的彩排，看的是节奏。release 是正式演出，断言不再上场。

## 怎么用

- tone: 平稳
  pause: 380
  say: 屏幕上的 `assert` 只在 debug 执行。名字是空字符串时，调试版会停，发布版不会。

- tone: 平稳
  pause: 340
  say: 想看接近真实的速度，执行 `flutter run --profile`。

- tone: 平稳
  pause: 300
  say: 要交出去的包用 release。不要拿 debug 的包当正式产物。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: profile 能看追踪，不要指望断点。它为了接近发布，把很多调试能力拿掉了。

- tone: 加重
  pause: 400
  say: release 里的断言不是关掉检查，而是整段都不存在。条件里的调用也不会发生。

- tone: 平稳
  pause: 320
  say: 所以真正要发生的事，不要写进 `assert`。

## 边界

- tone: 平稳
  pause: 380
  say: 网页的调试编译不是手机上的 JIT。不要把今天这张对应表，硬套到网页的每一个细节。

- tone: 平稳
  pause: 340
  say: 在 debug 里觉得卡，不一定发布后还卡。debug 本来就更慢。

## 收束

- tone: 收束
  pause: 460
  say: 写功能，用 debug。量性能，用 profile。

- tone: 收束
  pause: 500
  say: 交给别人的那一版，用 release。框架三端共用，嵌入层不同。

# 可以向老师问

- q: 想看真实速度该用哪种
  tone: 平稳
  pause: 320
  say: 用 profile。它接近 release 的性能，又留着性能工具。debug 太慢，说明不了正式表现。
- q: 为什么 release 里没有断言
  tone: 平稳
  pause: 320
  say: 断言是帮你在调试时把错停住。release 把它们拿掉，体积更小，也不会在用户那里停住。
