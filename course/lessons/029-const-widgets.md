---
id: 29-const-widgets
module: Widget 心智
title: const 组件
order: 29
---

# 总结

`const` 构造出的组件，重建时可以被认成同一个对象，从而少做更新。构造参数也必须是 `const`。它不是万能的性能开关。

<!-- section: 专业讲解 -->
## 同一份配置

- `const` 在编译期做出规范实例
- `Widget` 是否相等，看是不是同一个对象
- 父级再 `build` 时，孩子如果还是同一个实例，可以跳过对这个孩子的更新
- 运行时才有的值，或现写的回调，做不成 `const`
- 父级自己的 `build` 仍会执行

<!-- section: 大白话 -->
## 大白话

- 像同一枚印章，再次见到就不用重新刻
- 印章省不掉整栋房子要改建的那一步

<!-- section: 怎么用 -->
## 怎么用

```dart
@override
Widget build(BuildContext context) {
  return const Padding(
    padding: EdgeInsets.all(12),
    child: Text('hello'),
  );
}
```

- `EdgeInsets.all` 和这段文字都是编译期常量，外面才能写 `const`
- `Text(name)` 随字段变化，不能 `const`

<!-- section: 再讲深一点 -->
## 再讲深一点

- 跳过的是父级更新这个孩子的那一步
- 继承数据变了，依赖它的元素仍会 `build`
- `const` 不会把 `build` 的输出永久存起来

<!-- section: 边界 -->
## 边界

- 到处写 `const` 不会自动让整页变快
- 带新建回调的组件，通常做不成 `const`

<!-- section: 收束 -->
## 留下这句

- 不变的子树做成 `const`，让框架少做工作，但它不是总开关

# 口播

## 开场

- tone: 放慢
  pause: 400
  say: 这节讲 `const` 组件到底帮框架省了哪一步。
- tone: 平稳
  pause: 300
  say: 先把能省的说清，再把做不到的边界说清。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `const` 构造函数会在编译期做出一份规范实例，同样的参数不会再造出一个新对象。
- tone: 平稳
  pause: 340
  say: `Widget` 比较相等时，看的是是不是同一个对象，不是把字段逐个比一遍。
- tone: 加重
  pause: 400
  stress: 跳过这个孩子
  say: 父级再次 `build`，发现孩子还是同一个实例，就可以跳过这个孩子的更新。
- tone: 平稳
  pause: 360
  say: 参数里只要有运行时才知道的值，或者一个现写的回调，这段就写不成 `const`。
- tone: 问句
  pause: 460
  say: 那是不是父级一 `setState`，这些 `const` 孩子的 `build` 都不会再走？

## 大白话

- tone: 放慢
  pause: 400
  say: 把它想成一枚印章，下次再看到同一枚，就不用重新刻一遍。
- tone: 平稳
  pause: 340
  say: 房子如果要改建，印章省不掉改建本身。

## 怎么用

- tone: 平稳
  pause: 340
  say: 这里的内边距和文字在编译期就定了，所以整段 `Padding` 可以写成 `const`。
- tone: 平稳
  pause: 320
  say: 一旦文字换成字段 `name`，它就不再是编译期常量。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 父级自己的 `build` 还是会执行，`const` 省下的是往这个孩子下面继续更新的工作。
- tone: 放慢
  pause: 360
  say: 要是这个元素依赖的继承数据变了，它自己被标脏，`build` 仍会再走。
- tone: 平稳
  pause: 320
  say: 所以 `const` 不是把某一次 `build` 的结果永远存起来。

## 边界

- tone: 平稳
  pause: 340
  say: 看见什么都加上 `const`，不会自动变成一个更快的页面。
- tone: 加重
  pause: 360
  say: 按钮如果每次都新写一个 `onPressed`，这个回调不是常量，组件也就做不成 `const`。

## 收束

- tone: 收束
  pause: 480
  say: 不变的子树做成 `const`，框架才能认出同一份配置并少做更新。
- tone: 收束
  pause: 520
  say: 把它当成少做工作的机会，而不是一个万能开关。

# 可以向老师问

- q: 构造参数里有变量，可以写成 `const` 吗
  tone: 平稳
  pause: 340
  say: 不能，`const` 要求构造参数在编译期就定下来，运行时的变量不行。
- q: 父级 `setState` 之后，`const` 子组件的 `build` 一定不走吗
  tone: 平稳
  pause: 380
  say: 不一定，父级更新时同一实例可以跳过，可是继承数据变了，依赖它的元素仍会 `build`。
