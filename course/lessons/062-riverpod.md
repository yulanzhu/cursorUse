---
id: 62-riverpod
module: 状态
title: Riverpod 这条写法
order: 62
---

# 总结

应用级状态可以用 Riverpod 来写。`Provider` 提供依赖，`Notifier` 管可变状态，`AsyncNotifier` 管异步结果。读取不靠 `BuildContext`。这里讲角色，不把每个函数念完。

<!-- section: 专业讲解 -->
## 三种角色

- `Provider` 提供一个依赖，比如客户端或仓库。它默认不是让界面随便改内部
- `Notifier` 管会变的状态。方法里改 `state`，听众就更新
- `AsyncNotifier` 的 `build` 交出 `Future`，界面看到加载、数据或错误
- 一个提供者可以在自己的 `build` 里用 `ref` 读另一个，不必拿着 `BuildContext`
- 测试里可以用容器直接读。界面用 `ConsumerWidget` 上的 `ref`
- 根上要有 `ProviderScope`，否则没有容器

<!-- section: 大白话 -->
## 大白话

- `Provider` 像工具架，上面放好别人要用的工具
- `Notifier` 像一块可以改的白板。`AsyncNotifier` 像一块正在等结果的白板
- 你不必站在某一面墙前面，才能从架子上把工具拿下来

<!-- section: 怎么用 -->
## 怎么用

```dart
final catalog = Provider<Catalog>((ref) => Catalog());

class Cart extends Notifier<List<String>> {
  @override
  List<String> build() => const <String>[];

  void add(String id) => state = [...state, id];
}

final cart = NotifierProvider<Cart, List<String>>(Cart.new);
```

- 界面里订阅变化用 `ref.watch`
- 按钮回调里只读一次，可以用 `ref.read`
- 在 `build` 里只 `read` 不 `watch`，这次不会订阅，以后的变化你看不见

<!-- section: 再讲深一点 -->
## 再讲深一点

- `AsyncNotifier` 让加载、数据和错误留在同一条异步结果里，不必自己再拼三个布尔
- 代码生成只是少写样板。角色仍然是依赖、可变状态、异步结果
- 旧资料里的 `StateNotifier` 留在兼容入口，不在现在的主路径上
- 新的可变状态用 `Notifier`，异步用 `AsyncNotifier`

<!-- section: 边界 -->
## 边界

- 一个只在这一页用的开关，仍然用 `setState`，不要搬进这套库
- 不要把每个函数名都背下来。先认清这三个角色
- 没有 `ProviderScope`，`ref` 就没有容器可用

<!-- section: 收束 -->
## 留下这句

- `Provider` 给依赖，`Notifier` 管可变状态，`AsyncNotifier` 管异步结果。读它们不靠 `BuildContext`

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 应用级状态，这门课把 Riverpod 当作推荐的写法。你要先认角色，而不是把每个函数都背完。
- tone: 平稳
  pause: 320
  say: 三个角色就够开始。依赖、会变的状态、还有异步结果。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `Provider` 提供依赖。一个客户端、一个仓库，这种创建出来给别人用的对象，放在这里。界面默认不是去改它的内部。
- tone: 平稳
  pause: 340
  say: `Notifier` 管会变的状态。你在方法里改 `state`，听着它的界面就更新。不要从外面把内部字段直接改掉。
- tone: 加重
  pause: 420
  stress: 不靠 `BuildContext`
  say: `AsyncNotifier` 管异步结果。`build` 交出一个 `Future`。这些读取不靠 `BuildContext`。一个提供者可以用 `ref` 去读另一个。
- tone: 平稳
  pause: 340
  say: 界面才使用 `ConsumerWidget` 上的 `ref`。测试里可以用容器直接读，不必先造出一个组件树。
- tone: 问句
  pause: 480
  say: 所以它和必须靠上下文往下找的数据，差别在哪？

## 大白话

- tone: 放慢
  pause: 420
  say: `Provider` 像工具架，工具先放好。`Notifier` 像一块能改的白板。`AsyncNotifier` 像这块白板正在等结果。
- tone: 平稳
  pause: 340
  say: 你不必站在某一面墙前面，才能把工具拿下来。这就是它不靠 `BuildContext` 的意思。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的 `catalog` 是一个 `Provider`，它把 `Catalog` 交出去。`Cart` 是 `Notifier`，`add` 里换成一份新的列表。
- tone: 平稳
  pause: 320
  say: `cart` 用 `NotifierProvider` 把这个 `Notifier` 交到外面。界面要跟着变，就 `ref.watch`。
- tone: 加重
  pause: 380
  say: 按钮回调里如果只读一次，可以用 `ref.read`。你在 `build` 里只读不订，这次不会订阅，以后的变化你看不见。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: `AsyncNotifier` 把加载、数据和错误收成同一种异步结果。你不必自己再拼三个容易互相打架的布尔。
- tone: 放慢
  pause: 400
  say: 代码生成只是少写样板，角色不变。旧资料里的 `StateNotifier` 留在兼容入口，不在现在的主路径上。新代码用 `Notifier`。
- tone: 平稳
  pause: 340
  say: 根上要有 `ProviderScope`。没有这层，就没有容器，`ref` 就挂不住。

## 边界

- tone: 平稳
  pause: 340
  say: 只在这一页用的开关，仍然用 `setState`。不要为了看起来整齐，把所有东西都搬进提供者。
- tone: 加重
  pause: 380
  say: 也不必把每个修饰、每种构造函数都念完。你能说出这三个角色，就够在应用级状态里选对工具。

## 收束

- tone: 收束
  pause: 480
  say: `Provider` 提供依赖，`Notifier` 管可变状态，`AsyncNotifier` 管异步结果。
- tone: 收束
  pause: 520
  say: 读它们不靠 `BuildContext`。小范围的开关，仍然留在 `setState`。

# 可以向老师问

- q: 为什么说它不靠 BuildContext
  tone: 平稳
  pause: 380
  say: 因为一个提供者可以用 `ref` 读另一个，测试里也可以用容器读。界面上的 `ConsumerWidget` 用的是 `ref`，不是靠 `InheritedWidget` 那种向下查找。
- q: StateNotifier 现在该不该用
  tone: 平稳
  pause: 360
  say: 它留在兼容入口里，不在现在的主路径上。新的可变状态用 `Notifier`，异步结果用 `AsyncNotifier`。
