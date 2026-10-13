---
id: 14-enums-sealed
module: Dart 语言
title: 枚举和 sealed
order: 14
---

# 总结

增强枚举可以有字段和方法。`sealed` 类把子类封在同一个库里，`switch` 就能做穷尽检查。两种都适合表示加载、成功、失败这种有限状态。

<!-- section: 专业讲解 -->
## 有限的几种

- 枚举值在编译期定死，构造必须是 `const`
- 可以有字段和方法，字段不能之后再改
- `sealed` 的直接子类必须写在同一个库
- 子类写全的 `switch` 可以没有兜底
- 以后在这个库里多一个子类，旧的 `switch` 会编译失败，这是好处

<!-- section: 大白话 -->
## 大白话

- 状态只有几格，就不要用一堆布尔值去凑
- 格子本身够用，用枚举。每格还要带不同的数据，用 `sealed`

<!-- section: 怎么用 -->
## 怎么用

```dart
enum Phase {
  loading(false),
  success(true),
  failure(true);

  const Phase(this.settled);
  final bool settled;

  String text() {
    if (settled) return 'done';
    return 'wait';
  }
}
```

```dart
sealed class Result {}

final class Loading extends Result {}

final class Success extends Result {
  Success(this.value);
  final String value;
}

final class Failure extends Result {
  Failure(this.reason);
  final String reason;
}
```

- `Phase` 的每个值带一个字段，还有方法
- 成功才有 `value`，失败才有 `reason`，避免半截字段空着

<!-- section: 再讲深一点 -->
## 再讲深一点

- 子类标成 `final`，外面就不能再继承这条分支
- 别的库里的 `switch` 也能穷尽，因为名单在编译期是闭合的
- 枚举的 `switch` 同样可以穷尽。少写一个值，编译器会报

<!-- section: 边界 -->
## 边界

- 情况会不断增长，或者根本不是封闭名单，就不要塞进枚举或 `sealed`
- `sealed` 管的是谁能当子类，不是运行时再去拦一个新类型

<!-- section: 收束 -->
## 留下这句

- 有限的几种情况，用增强枚举或 `sealed`，让 `switch` 帮你看有没有写漏

# 口播

## 开场

- tone: 平稳
  pause: 380
  say: 这节讲两种有限状态。一种是枚举，一种是 `sealed` 类。

- tone: 放慢
  pause: 360
  say: 你要学会让编译器帮你看，有没有漏掉一种情况。

## 专业讲解

- tone: 平稳
  pause: 360
  say: 增强枚举不再只是几个名字。它可以有字段，也可以有方法。

- tone: 平稳
  pause: 360
  say: 这些值在编译期就全部定下来。所以构造是 `const`，字段之后不能改。

- tone: 加重
  pause: 400
  stress: 全部可能
  say: `sealed` 类把子类封在同一个库里。编译器因此知道全部可能。

- tone: 问句
  pause: 440
  say: 这和普通的类继承，有什么差别？

- tone: 平稳
  pause: 400
  say: 普通父类，外面还能再继承。`sealed` 不行。`switch` 把已知子类都写上，就可以不写兜底。

## 大白话

- tone: 放慢
  pause: 440
  say: 加载、成功、失败，就像三格灯。灯只有这几格，不要用一堆开关去凑一个含义。

- tone: 平稳
  pause: 400
  say: 格子本身够用，就用枚举。每格还要带不同的数据，用 `sealed` 的子类更合适。

## 怎么用

- tone: 平稳
  pause: 380
  say: 屏幕上的 `Phase`，每个值都带着 `settled`。`text` 靠这个字段决定说什么。

- tone: 平稳
  pause: 380
  say: `Result` 把加载、成功、失败拆成三个类。成功才有 `value`，失败才有 `reason`。

- tone: 平稳
  pause: 320
  say: 你写 `switch` 时三种都接住，就不必再写一个含糊的兜底。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 子类写成 `final`，是在说这条分支到这里停，外面不要再继承。

- tone: 加重
  pause: 420
  say: 就算 `switch` 写在别的库里，只要父类是 `sealed`，编译器仍然知道有哪些子类。

- tone: 平稳
  pause: 320
  say: 枚举也是同一件事。你少写一个枚举值，`switch` 也会报。

## 边界

- tone: 平稳
  pause: 400
  say: 情况会不断增长，或者根本不是一个封闭名单，就不要塞进枚举或 `sealed`。

- tone: 平稳
  pause: 340
  say: 它们帮你的是编译期的封闭。运行时不会因此冒出新的子类。

## 收束

- tone: 收束
  pause: 460
  say: 格子有限，就用增强枚举或 `sealed`。

- tone: 收束
  pause: 520
  say: `switch` 写全，编译器才会在你漏掉一种时拦住你。

# 可以向老师问

- q: 枚举的构造为什么必须是 `const`
  tone: 平稳
  pause: 320
  say: 枚举值在编译期就定下来了。构造必须是 `const`，字段也不能事后再改。
- q: `sealed` 的子类能写在别的库里吗
  tone: 平稳
  pause: 320
  say: 不能。子类都要在同一个库。名单闭合了，`switch` 才能穷尽。
