---
id: 25-stateless-stateful
module: Widget 心智
title: Stateless 与 Stateful
order: 25
---

# 总结

`StatelessWidget` 没有自己的可变状态。`StatefulWidget` 把可变部分放在 `State` 里，它自己仍是不可变配置。`Widget` 可以换成新的，类型和 `Key` 不变时，`State` 可以留下。

<!-- section: 专业讲解 -->
## 配置和可变部分

- `StatelessWidget` 没有 `State`，也没有跨 `build` 留下的可变字段
- 父级重建或继承数据变化时，它仍会再次 `build`
- `StatefulWidget` 的字段同样是 `final`
- `createState` 在元素第一次上树时调用
- 可变字段放在 `State` 里，用 `setState` 再请框架 `build`
- 新配置会挂到留下的 `State.widget` 上

<!-- section: 大白话 -->
## 大白话

- 无状态像印好的卡片，改字就换一张
- 有状态像卡片下夹着草稿纸，卡片可以换，草稿纸仍留着

<!-- section: 怎么用 -->
## 怎么用

```dart
class Hello extends StatelessWidget {
  const Hello({super.key, required this.name});

  final String name;

  @override
  Widget build(BuildContext context) => Text(name);
}

class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => CounterState();
}

class CounterState extends State<Counter> {
  int count = 0;

  void inc() => setState(() => count += 1);

  @override
  Widget build(BuildContext context) => Text('$count');
}
```

- `Hello` 只根据传入的 `name` 来画
- `Counter` 的数字活在 `State` 里

<!-- section: 再讲深一点 -->
## 再讲深一点

- 运行时类型和 `Key` 相同，元素留下，`State` 不重新创建
- 类型或 `Key` 变了，旧 `State` 会 `dispose`
- 通过 `widget` 读到的是最新那份配置

<!-- section: 边界 -->
## 边界

- 不要把想留下的可变数据写在 `StatelessWidget` 的字段上
- 数据可以放在上层 `State`，作为参数传入无状态子组件

<!-- section: 收束 -->
## 留下这句

- 没有自己的可变状态就用 `StatelessWidget`，要留下的变化放进 `State`

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节分开两种组件，一种没有自己的可变数据，一种把可变数据放在旁边的 `State` 里。
- tone: 平稳
  pause: 340
  say: 不要把 `StatefulWidget` 本身当成可以随手改字段的对象。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `StatelessWidget` 不会带着一个 `State`，构造参数就是它能用的输入。
- tone: 平稳
  pause: 380
  say: 父级重建，或者它依赖的继承数据变了，它的 `build` 仍会再走，只是它自己不能 `setState`。
- tone: 平稳
  pause: 360
  say: `StatefulWidget` 这份配置一样不能改字段，可变的那一部分活在 `createState` 造出来的对象里。
- tone: 加重
  pause: 400
  stress: 不会反复创建
  say: `createState` 只在这个元素第一次进入树时走，父级反复 `build` 不会反复创建 `State`。
- tone: 平稳
  pause: 340
  say: 你在 `State` 里改字段，然后调用 `setState`，框架才会再 `build`。
- tone: 平稳
  pause: 340
  say: 类型和 `Key` 都没变时，原来的 `State` 会留下，新配置挂到 `widget` 上。
- tone: 问句
  pause: 460
  say: 要是类型或者 `Key` 变了，原来的 `State` 会留下吗？

## 大白话

- tone: 放慢
  pause: 400
  say: 无状态像一张印好的卡片，字要改，就换一张新卡片。
- tone: 平稳
  pause: 360
  say: 有状态像卡片下面另夹着草稿纸，上面的卡片可以换，草稿纸可以继续用。

## 怎么用

- tone: 平稳
  pause: 320
  say: `Hello` 只是把传入的名字画出来，它自己没有要保存的那个值。
- tone: 平稳
  pause: 340
  say: `Counter` 的数字放在 `State` 里，`inc` 通过 `setState` 让界面跟上。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 运行时类型或 `Key` 一旦变了，旧的 `State` 会被 `dispose`，不会留到新的元素上。
- tone: 平稳
  pause: 340
  say: 两者都没变时，你可以在 `State` 里读到最新的 `widget`。
- tone: 放慢
  pause: 340
  say: 所以配置可以一次次换新，可变部分却可以留在原来的 `State` 上。

## 边界

- tone: 平稳
  pause: 380
  say: 你若在 `StatelessWidget` 上放一个可变字段，下一次父级 `build` 往往会换一个新实例，那个修改就丢了。
- tone: 平稳
  pause: 360
  say: 可变数据放在上层 `State`，作为参数传入下层，下层就可以继续是无状态的。

## 收束

- tone: 收束
  pause: 460
  say: `StatelessWidget` 自己不保存可变状态。
- tone: 收束
  pause: 520
  say: 需要留下来的变化放在 `State` 里，`Widget` 配置则可以一次次换成新的。

# 可以向老师问

- q: `StatelessWidget` 的 `build` 会不会再次执行
  tone: 平稳
  pause: 380
  say: 会，父级重建或者它依赖的继承数据变了，都会让它再 `build`，只是它没有 `setState`。
- q: 父级重建时 `State` 一定会重新创建吗
  tone: 平稳
  pause: 360
  say: 不一定，运行时类型和 `Key` 都没变时，原来的 `State` 会留下。
