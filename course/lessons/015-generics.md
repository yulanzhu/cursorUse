---
id: 15-generics
module: Dart 语言
title: 泛型
order: 15
---

# 总结

泛型把类型参数留到用它的地方再定。`List` 的元素类型就靠这个参数。`T extends User` 这种约束，限制你能调用哪些方法。

<!-- section: 专业讲解 -->
## 类型先留白

- 类和函数都可以带类型参数
- `List<String>` 表示元素是 `String`
- 很多时候，类型参数能从传入的值推断出来
- `T extends User` 之后，只能调用 `User` 承诺过的方法
- 运行时类型参数还在，`is List<String>` 可以检查

<!-- section: 大白话 -->
## 大白话

- 盒子先不印死装什么。用的时候再贴标签
- 标签有上限。上限之内的方法，才敢调用

<!-- section: 怎么用 -->
## 怎么用

```dart
class User {
  User(this.name);
  final String name;
}

String label<T extends User>(T user) {
  return user.name;
}
```

- `user.name` 安全，是因为 `T` 至少是 `User`
- `User` 没承诺的方法，这里不能调用

<!-- section: 再讲深一点 -->
## 再讲深一点

- 调用时常常可以不把类型参数写出来
- `names is List<String>` 在这门语言里是有效检查，类型参数不会在运行时消失

<!-- section: 边界 -->
## 边界

- 约束写成 `Object`，里面几乎不能调用业务方法
- 约束太窄，调用的地方会被绑死
- 按你真正要调用的方法来写上限

<!-- section: 收束 -->
## 留下这句

- 类型参数把具体类型留给使用的地方。约束决定里面能调用什么

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节讲泛型。类型先留出一个位子，用的时候再填。

- tone: 平稳
  pause: 300
  say: 你再听约束。约束决定，填进去之后能调用什么。

## 专业讲解

- tone: 平稳
  pause: 360
  say: 类型参数写在类名或函数名后面。真正的类型，留给用到它的地方。

- tone: 平稳
  pause: 340
  say: `List<String>` 里，元素类型就是 `String`。你往里面放别的，编译器会拒绝。

- tone: 加重
  pause: 400
  stress: 承诺过的方法
  say: `T extends User` 是约束。在函数里面，你只能调用 `User` 承诺过的方法。

- tone: 问句
  pause: 440
  say: 调用的时候，一定要把类型参数写全吗？

- tone: 平稳
  pause: 360
  say: 不一定。你传入一个 `User`，编译器常常能自己推断。推断不了，再自己写上。

## 大白话

- tone: 放慢
  pause: 420
  say: 你做一批盒子，先不要在盒子上印死只能装某一种东西。

- tone: 平稳
  pause: 380
  say: 可是盒子如果什么都能装，你在里面就不敢调用任何具体的方法。

- tone: 平稳
  pause: 320
  say: 约束像一句上限。至少是 `User`，那 `name` 就一定在。

## 怎么用

- tone: 平稳
  pause: 380
  say: 屏幕上的 `label`，类型参数被约束成 `User`。所以 `user.name` 是安全的。

- tone: 平稳
  pause: 360
  say: 你要是想调用 `User` 根本没有的方法，编译器不会让你过。

- tone: 平稳
  pause: 340
  say: 很多时候，调用的地方连类型参数都不必写，推断就够了。

## 再讲深一点

- tone: 加重
  pause: 420
  say: 这门语言的类型参数，在运行时还保留着。`names is List<String>` 能真正检查。

- tone: 平稳
  pause: 340
  say: 你不要把 `List<String>` 随便当成另一种列表用。对不上，就让编译器说不。

## 边界

- tone: 平稳
  pause: 400
  say: 约束写成 `Object`，里面几乎不能调用业务方法。约束写成很窄的子类，调用的地方又会绑死。

- tone: 平稳
  pause: 320
  say: 按你真正要调用的方法来写上限，两边都别走极端。

## 收束

- tone: 收束
  pause: 480
  say: 类型参数把具体类型留给使用的地方。

- tone: 收束
  pause: 500
  say: `List` 靠它确定元素。`extends` 决定你能调用哪些方法。

# 可以向老师问

- q: 不写类型参数会怎样
  tone: 平稳
  pause: 320
  say: 很多时候，编译器能从你传入的值推断。推断不了，你就要自己把类型参数写上。
- q: `T extends User` 以后能调用什么
  tone: 平稳
  pause: 320
  say: 能调用 `User` 上有的方法。`T` 没有承诺的方法，不能调用。
