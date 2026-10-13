---
id: 16-equality
module: Dart 语言
title: 相等与 identical
order: 16
---

# 总结

`==` 比较的是值，你可以重写它。`identical` 比较是不是同一个对象。重写了 `==`，就要一起重写 `hashCode`。值相同的 `const` 对象，`identical` 会是真。

<!-- section: 专业讲解 -->
## 值和身份

- 没有重写时，`==` 看的就是是不是同一个对象
- `identical` 不能被重写
- 两个对象相等时，`hashCode` 也必须相同
- `Set` 和 `Map` 会用到这一对
- 值相同的 `const` 对象是同一个实例，所以 `identical` 是真

<!-- section: 大白话 -->
## 大白话

- 模样一样，不等于就是同一个人。`identical` 认人，`==` 认你定义的值

<!-- section: 怎么用 -->
## 怎么用

```dart
class Point {
  const Point(this.x, this.y);
  final int x;
  final int y;

  @override
  bool operator ==(Object other) =>
      other is Point && other.x == x && other.y == y;

  @override
  int get hashCode => Object.hash(x, y);
}
```

- 相等看 `x` 和 `y`
- `Object.hash` 把字段收成 `hashCode`
- 漏掉 `hashCode`，放进 `Set` 会找错

<!-- section: 再讲深一点 -->
## 再讲深一点

- 两个分别创建的点，可以 `==`，但 `identical` 是假
- 两个 `const Point(1, 2)`，`identical` 是真
- 普通 `List` 的 `==` 并不按元素比较。`const` 列表值相同，才会是同一个实例

<!-- section: 边界 -->
## 边界

- 只重写 `==`、不重写 `hashCode`，这一对是坏的
- 业务上的相等写 `==`。是不是同一个对象，才用 `identical`

<!-- section: 收束 -->
## 留下这句

- 值用 `==`，身份用 `identical`。动了 `==`，一定要动 `hashCode`

# 口播

## 开场

- tone: 平稳
  pause: 400
  say: 这节分清两种一样。值一样，和根本就是同一个对象。

- tone: 放慢
  pause: 340
  say: 你重写其中一个时，不要把另一个忘了。

## 专业讲解

- tone: 平稳
  pause: 380
  say: `==` 可以重写。你不重写，它就和 `identical` 一样，看是不是同一个对象。

- tone: 加重
  pause: 400
  stress: 不能重写
  say: `identical` 问的是，是不是同一份对象。这个判断不能重写。

- tone: 平稳
  pause: 360
  say: 你如果让两个对象相等，它们的 `hashCode` 也必须一样。

- tone: 问句
  pause: 440
  say: 为什么 `Set` 会在意这件事？

- tone: 平稳
  pause: 380
  say: 它先用 `hashCode` 找位置，再用 `==` 确认。哈希对不上，相等的对象也会像丢了一样。

## 大白话

- tone: 放慢
  pause: 440
  say: 两个人模样一样，你可以规定在业务上算同一个人。这是 `==`。

- tone: 平稳
  pause: 400
  say: `identical` 不听你的规定。它只认是不是同一个人。你改了认值的规则，门牌 `hashCode` 也要一起改。

## 怎么用

- tone: 平稳
  pause: 400
  say: 屏幕上的 `Point` 按 `x` 和 `y` 判断相等，并用 `Object.hash` 做出 `hashCode`。

- tone: 平稳
  pause: 360
  say: 两个分别创建出来的点，值可以相等。`identical` 仍然是假。

- tone: 平稳
  pause: 360
  say: 两个 `const Point(1, 2)` 不只值相等。它们就是同一个实例，`identical` 也是真。

## 再讲深一点

- tone: 平稳
  pause: 400
  say: 普通列表即使元素一样，`==` 默认也不按元素比。你不要凭感觉假设它会。

- tone: 加重
  pause: 400
  say: `const` 列表不一样。值相同的那两份会是同一个实例，所以 `identical` 和 `==` 都是真。

## 边界

- tone: 平稳
  pause: 380
  say: 只改 `==` 是不完整的。放进 `Set` 或拿去当 `Map` 的键，会表现得像没放进去。

- tone: 平稳
  pause: 340
  say: 业务上的相等，写 `==`。是不是同一个对象，才用 `identical`。不要用反了。

## 收束

- tone: 收束
  pause: 480
  say: `==` 比值，可以重写。`identical` 认是不是同一个对象。

- tone: 收束
  pause: 520
  say: 重写了 `==`，就要一起重写 `hashCode`。`const` 值相同，常常就是同一个实例。

# 可以向老师问

- q: 重写了 `==` 为什么还要改 `hashCode`
  tone: 平稳
  pause: 320
  say: `Set` 和 `Map` 先用 `hashCode` 分桶。相等的对象如果哈希不同，会找错地方，看起来像丢了。
- q: `identical` 和 `==` 有什么差别
  tone: 平稳
  pause: 320
  say: `identical` 看是不是同一个对象，而且不能重写。`==` 看值，可以重写。`const` 值相同的时候，两者常常都是真。
