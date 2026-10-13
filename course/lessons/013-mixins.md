---
id: 13-mixins
module: Dart 语言
title: 继承、接口、mixin 和 extension
order: 13
---

# 总结

一个类只能继承一个父类。类本身也是接口。`mixin` 把能力拼进来，线性化时靠后的同名方法会盖住前面的。`extension` 给已有类型加方法，但不改原类。`extension type` 是零成本包装，先知道即可。

<!-- section: 专业讲解 -->
## 能力从哪来

- `extends` 只能有一个父类
- `implements` 只拿接口，不拿现成的方法体
- `with A, B` 时，`B` 更靠后，同名方法用 `B` 的
- `mixin` 可以用 `on` 限制能混进什么类
- `extension` 按静态类型生效，不能加真正的字段
- `extension type` 在运行时就是底层那个值，不额外造对象

<!-- section: 大白话 -->
## 大白话

- 继承是一条血脉。`mixin` 是往身上加能力。`extension` 是在外面贴一张用法说明

<!-- section: 怎么用 -->
## 怎么用

```dart
class Bird {
  void fly() {}
}

mixin Walker {
  void walk() {}
}

class Duck extends Bird with Walker {}

extension Blank on String {
  bool get isBlank => trim().isEmpty;
}
```

- `Duck` 继承 `Bird`，同时混入 `Walker`
- `isBlank` 只在静态类型是 `String` 时才能调用

<!-- section: 再讲深一点 -->
## 再讲深一点

- 线性化是一条查找链。先找靠后的 `mixin`，再找靠前的，最后找父类
- 把字符串装进 `Object`，就叫不到扩展方法
- `on` 用来声明，这个 `mixin` 只能混进某种父类

<!-- section: 边界 -->
## 边界

- `mixin` 不是第二个父类
- `extension` 不能给对象加存储
- `extension type` 今天知道有它就可以，先别拿它扛业务

<!-- section: 收束 -->
## 留下这句

- 继承只留一条。能力用 `mixin` 拼，并且记住顺序。方法可以外挂，原类不动

# 口播

## 开场

- tone: 平稳
  pause: 400
  say: 这节看一个类还能从哪里获得能力。

- tone: 放慢
  pause: 360
  say: 继承、接口、`mixin`、`extension`，四件事不要混成一件。

## 专业讲解

- tone: 平稳
  pause: 320
  say: 一个类只能 `extends` 一个父类。这就是单继承。

- tone: 加重
  pause: 420
  stress: 不会跟着过来
  say: 每个类也同时是一份接口。`implements` 只承诺方法在，原来的方法体不会跟着过来。

- tone: 平稳
  pause: 400
  say: `mixin` 用 `with` 把能力混进来。`with A, B` 这种顺序里，`B` 更靠后，同名方法由 `B` 提供。

- tone: 问句
  pause: 460
  say: 那 `extension` 是不是也把方法装进了原来的类？

- tone: 平稳
  pause: 360
  say: 没有。它不改原类。只在编译器看得见的静态类型上，多给你一个方法。

## 大白话

- tone: 放慢
  pause: 400
  say: 继承像血脉，你只能有一个直接的父类。

- tone: 平稳
  pause: 420
  say: `mixin` 像学会走路、学会游泳。后贴上的同名本事，会盖住先贴的。

- tone: 平稳
  pause: 340
  say: `extension` 像一张外挂说明。对象本身没有变，你这个文件里多了一种叫法。

## 怎么用

- tone: 平稳
  pause: 400
  say: 屏幕上 `Duck` 继承 `Bird`，再混入 `Walker`。能飞，是因为父类。能走，是因为 `mixin`。

- tone: 平稳
  pause: 380
  say: 底下的 `extension` 给 `String` 加了 `isBlank`。空白字符串上它会是真。`String` 的源码一行都没动。

## 再讲深一点

- tone: 加重
  pause: 400
  say: 线性化就是这条查找链。找方法时先到靠后的 `mixin`，再到靠前的，最后到父类。

- tone: 平稳
  pause: 380
  say: `extension` 不参与这条链。你把字符串放进 `Object`，就叫不到 `isBlank`。

- tone: 平稳
  pause: 320
  say: `mixin` 还可以用 `on` 说，它只能混进某种父类。

## 边界

- tone: 平稳
  pause: 320
  say: 不要把 `mixin` 当成第二个父类。`extends` 仍然只能写一个。

- tone: 平稳
  pause: 400
  say: `extension type` 是零成本包装，运行时没有多出来的对象。今天知道有这种写法就可以。

## 收束

- tone: 收束
  pause: 480
  say: 单继承不要破。接口用 `implements`，能力用 `mixin`，记住谁在后。

- tone: 收束
  pause: 500
  say: `extension` 只加方法，不改原来的类。

# 可以向老师问

- q: `mixin` 算不算第二个父类
  tone: 平稳
  pause: 320
  say: 不算。你仍然只 `extends` 一个类。`mixin` 是把能力混进来。同名方法谁生效，看 `with` 里谁更靠后。
- q: `extension` 里能加字段吗
  tone: 平稳
  pause: 320
  say: 不能。它只加方法，不改原类，也不在对象上多出存储。要多一块真正的数据，还是写类。
