---
id: 07-var-final-const-late
module: Dart 语言
title: var、final、const 和 late
order: 7
---

# 总结

`var` 按初值推断类型。`final` 只能赋值一次。`const` 是编译期常量。`late` 把初始化延后，读到才算。值相同的 `const` 对象，可以是同一个实例。

<!-- section: 专业讲解 -->
## 四种声明

- `var` 不是类型。右边是什么，推断完就固定成什么
- `final` 可以在运行时赋值，但只有一次
- `const` 必须在编译期定下来，它也是 `final`
- 带初值的 `late`，第一次读才执行，算完会记住
- 值相同的 `const` 对象，在同一次运行里是同一个实例

<!-- section: 大白话 -->
## 大白话

- `var` 看右边写菜名，`final` 写上就锁，`const` 开印前铸好，`late` 先占位子

<!-- section: 怎么用 -->
## 怎么用

```dart
var count = 1;
final title = 'Ada';
const limit = 3;
late final String body = load();

String load() => 'Hi';
```

- `count` 的类型是 `int`，不能再改成别的类型
- 第一次读 `body`，才调用 `load`

<!-- section: 再讲深一点 -->
## 再讲深一点

- `DateTime.now()` 这种要运行才知道的值，可以给 `final`，不能给 `const`
- `late final` 算完就不许再改
- 没有初值的 `late`，是你答应稍后赋值，不是延迟计算

<!-- section: 边界 -->
## 边界

- `var` 不是 `dynamic`。不是什么类型都能装
- 没有初值的 `late` 如果读早了，运行时抛 `LateInitializationError`
- 它不可以一直空着

<!-- section: 收束 -->
## 留下这句

- 推断用 `var`，锁定用 `final`，编译期用 `const`，推迟用 `late`

# 口播

## 开场

- tone: 平稳
  pause: 380
  say: 这节看四个声明。它们管的是，值怎么来，还能不能改。

- tone: 放慢
  pause: 340
  say: 你别把它们当成同一种变量的四种拼写。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `var` 自己不表示类型。编译器看右边，推断完成，类型就定了。

- tone: 平稳
  pause: 340
  say: `final` 只能赋值一次。这一次可以发生在运行时。

- tone: 加重
  pause: 400
  stress: 编译期
  say: `const` 必须在编译期就算出来。它同样只能赋值一次。

- tone: 平稳
  pause: 380
  say: 带初值的 `late` 是延迟。读到的时候才执行，不是声明的时候就执行。

- tone: 问句
  pause: 480
  say: 两个值一样的 `const` 对象，会是两个实例吗？

- tone: 平稳
  pause: 340
  say: 不会。同一次运行里，它们就是同一个实例。

## 大白话

- tone: 放慢
  pause: 440
  say: `var` 像看菜单写菜名。菜名由那道菜决定，写完不能改成另一类。

- tone: 平稳
  pause: 400
  say: `final` 像钢笔写下的一笔，可以现场写，但不能涂了重写。`const` 像开印前铸好的铅字。

- tone: 平稳
  pause: 340
  say: `late` 像格子先留着。有人读到了，才去填。

## 怎么用

- tone: 平稳
  pause: 360
  say: 屏幕上 `count` 用 `var`，类型是 `int`。你再给它装字符串，编译器不会答应。

- tone: 平稳
  pause: 340
  say: `title` 用 `final`，赋值一次。`limit` 用 `const`，编译的时候就已经有了。

- tone: 平稳
  pause: 360
  say: `body` 是 `late final`。第一次有人读它，才去调用 `load`。

## 再讲深一点

- tone: 平稳
  pause: 400
  say: `DateTime.now()` 要运行才知道。这种值可以给 `final`，不能给 `const`。

- tone: 加重
  pause: 360
  say: `late` 的初值算完会记住，不是每次去读都重算。

- tone: 平稳
  pause: 320
  say: 值相同的 `const` 对象会收成同一个实例。后面比身份时还会用到。

## 边界

- tone: 平稳
  pause: 340
  say: 你要是什么类型都能装，那是 `dynamic`，别写成 `var`。

- tone: 平稳
  pause: 400
  say: 没有初值的 `late`，你要是提前读，运行时会抛 `LateInitializationError`。它不能一直空着。

## 收束

- tone: 收束
  pause: 480
  say: `var` 负责推断，`final` 负责只写一次。

- tone: 收束
  pause: 520
  say: `const` 负责编译期，`late` 负责读到再算。值相同的 `const` 对象，是同一个实例。

# 可以向老师问

- q: `var` 之后还能换成别的类型吗
  tone: 平稳
  pause: 320
  say: 不能。`var` 只让编译器推断，推断完类型就定了。它不是什么都能装。
- q: `const` 和 `final` 有什么差别
  tone: 平稳
  pause: 320
  say: `final` 在运行时赋值一次。`const` 在编译期定死。值相同的 `const` 对象，还会是同一个实例。
