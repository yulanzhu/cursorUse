---
id: 05-hot-reload
module: 全貌与环境
title: 热重载和热重启
order: 5
---

# 总结

热重载把新代码注入正在运行的程序，并留下已有的 `State`。热重启会重新执行 `main`，状态清掉。改初始化、改枚举值、改 `main` 的签名、改全局变量初值，热重载都不够。

<!-- section: 专业讲解 -->
## 两种更新

- 热重载注入新代码，保留 `State`，界面按新代码重建
- 热重启重新执行 `main`，状态清掉
- 热重载不够的情况：初始化、枚举值、`main` 签名、全局变量初值

<!-- section: 大白话 -->
## 大白话

- 热重载像换台词，演员还在
- 热重启像整场重来，刚才的状态不算

<!-- section: 怎么用 -->
## 怎么用

```dart
int seed = 1;

void main() {
  runApp(const MyApp());
}
```

- 把 `seed` 改成 2，热重载后还是 1
- 已有的 `State` 会留下，`initState` 不会重新执行

<!-- section: 再讲深一点 -->
## 再讲深一点

- 已经创建的对象，字段初值不会重算
- 静态字段的初值，和全局变量一样，热重载不重跑
- `main` 里面的语句也不会在热重载时重新走进去

<!-- section: 边界 -->
## 边界

- 改 `android/` 或 `ios/` 里的原生代码，两种都不够，要重新编译嵌入层
- 热重载报错时，先做 `hot restart`，不要连续猜

<!-- section: 收束 -->
## 留下这句

- 小改界面用热重载。改了入口、初值或枚举，就整场重来

# 口播

## 开场

- tone: 平稳
  pause: 400
  say: 这节分清两件事，改完代码之后，状态还在不在。

- tone: 放慢
  pause: 360
  say: 快的那种会留状态。彻底的那种会把状态清掉。

## 专业讲解

- tone: 平稳
  pause: 380
  say: 热重载把新代码送进正在运行的虚拟机。已经存在的 `State` 还留着，界面会按新代码重建。

- tone: 加重
  pause: 400
  stress: 重新执行
  say: 另一种会重新执行 `main`。内存里的状态会被清掉。

- tone: 平稳
  pause: 320
  say: 它在工具里的名字，叫 `hot restart`。

- tone: 问句
  pause: 460
  say: 是不是所有改动，热重载都吃得下？

- tone: 平稳
  pause: 340
  say: 不是。有几类改动，它不会替你重跑已经走过的初始化。

## 大白话

- tone: 放慢
  pause: 420
  say: 热重载像只换台词。演员还站在台上，人没有换。

- tone: 平稳
  pause: 360
  say: `hot restart` 像整场重来。戏重新开，刚才台上的状态就不算了。

## 怎么用

- tone: 平稳
  pause: 380
  say: 屏幕上的 `seed` 是全局初值。你把它从 1 改成 2，热重载之后还是 1。

- tone: 平稳
  pause: 340
  say: 因为这段初值不会再执行。`main` 也不会重新走进去。

- tone: 平稳
  pause: 360
  say: 已经活着的 `State` 会留着。可 `initState` 不会再被调用。

## 再讲深一点

- tone: 加重
  pause: 400
  say: 你改枚举的值，或者改了 `main` 的签名，热重载同样接不住。

- tone: 平稳
  pause: 360
  say: 静态字段的初值也一样。它和全局变量是同一类问题，都不会重算。

## 边界

- tone: 平稳
  pause: 400
  say: `android/` 和 `ios/` 里的原生代码，热重载和 `hot restart` 都碰不到。那要重新编译嵌入层。

- tone: 平稳
  pause: 340
  say: 热重载如果报错，不要连着试。先 `hot restart`，还不行再完整运行一次。

## 收束

- tone: 收束
  pause: 480
  say: 改界面描述，用热重载，`State` 还在。

- tone: 收束
  pause: 520
  say: 改了初始化、枚举、`main` 或全局初值，用 `hot restart`，让程序重新执行。

# 可以向老师问

- q: 热重载会重新执行 `main` 吗
  tone: 平稳
  pause: 320
  say: 不会。热重载留下原来的 `State`。要重新执行 `main`，用 `hot restart`。
- q: 全局变量改了初值为什么还是旧的
  tone: 平稳
  pause: 320
  say: 初值那段代码不会再跑。热重载只换后面还会执行的新代码。做一次 `hot restart`，才会用上新初值。
