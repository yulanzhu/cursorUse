---
id: 11-control-flow
module: Dart 语言
title: 控制流、记录和模式匹配
order: 11
---

# 总结

`if` 做选择，`for` 和 `while` 做重复。`switch` 可以配模式，不只好比一个常量。`Record` 是轻量的多值返回，不必为了它去建一个类。解构赋值把这一包值拆开。

<!-- section: 专业讲解 -->
## 选择、重复、拆包

- `if` 按条件选一条路
- `for` 走完一份集合，`while` 是条件还成立就继续
- `switch` 可以按模式匹配
- `Record` 用圆括号一次交出多个值
- 解构按同样的形状，把值拆进各自的变量

<!-- section: 大白话 -->
## 大白话

- 一次把姓名和年龄一起带回来，到门口再拆开
- 不必为了这趟去注册一个正式的类型

<!-- section: 怎么用 -->
## 怎么用

```dart
(String, int) person() => ('Ada', 36);

void main() {
  final (name, years) = person();
  if (years >= 18) {
    print(name);
  }
}
```

- 圆括号把两个值包成 `Record`
- 左边的圆括号按位置拆开

<!-- section: 再讲深一点 -->
## 再讲深一点

- `Record` 的字段可以起名字，调用的地方更好读
- 模式也能写进 `switch`，按形状匹配
- 对上了就走那一支，不必先拆开再写一串 `if`

<!-- section: 边界 -->
## 边界

- 值一多，或者还有一套行为，就该建类
- `Record` 扛不住业务模型。业务模型要有名字，也要有方法

<!-- section: 收束 -->
## 留下这句

- 选择用 `if`，重复用 `for` 和 `while`。多个值用 `Record` 交出来，再用解构拆开

# 口播

## 开场

- tone: 平稳
  pause: 380
  say: 这节把控制流补齐，再加一种很轻的多值返回。

- tone: 放慢
  pause: 340
  say: 你只要处理姓名和年龄这种事，不必靠公式。

## 专业讲解

- tone: 平稳
  pause: 380
  say: `if` 按条件选一条路。`for` 把一份集合走完。`while` 是条件还成立，就继续。

- tone: 加重
  pause: 400
  stress: 模式
  say: `switch` 可以配模式。它不只是把一个值，跟几个固定的值比一比。

- tone: 平稳
  pause: 360
  say: `Record` 用圆括号把多个值包在一起，适合从函数里一次交出来。

- tone: 问句
  pause: 440
  say: 交出来之后，怎么把里面的值拆开？

- tone: 平稳
  pause: 340
  say: 用解构。左边写成同样的形状，姓名进一个变量，年龄进另一个。

## 大白话

- tone: 放慢
  pause: 420
  say: 你让人跑一趟，不要只许带回一样东西。姓名和年龄可以一起带回来。

- tone: 平稳
  pause: 360
  say: 到了门口，你把包拆开，各自放好。不必为了这趟去建一个类。

## 怎么用

- tone: 平稳
  pause: 360
  say: 屏幕上 `person` 返回姓名和年龄。`main` 里用解构接住。

- tone: 平稳
  pause: 340
  say: `years` 不小于 18，才把 `name` 打出来。这就是 `if`。

- tone: 平稳
  pause: 340
  say: 你以后写 `for`，多半是在走一份集合。`while` 则是条件还在，就继续转。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: `Record` 的字段可以有名字。调用的地方会更好读。

- tone: 加重
  pause: 380
  say: `switch` 也能按这个形状做匹配。对上了就走那一支，不必先拆开再写一串 `if`。

## 边界

- tone: 平稳
  pause: 400
  say: 三个四个值，上面如果还有一套行为，就不要再硬用 `Record`。

- tone: 平稳
  pause: 320
  say: 它也不适合当你的业务模型。业务模型要有名字，还要有方法。

## 收束

- tone: 收束
  pause: 460
  say: `if` 选择，`for` 和 `while` 重复。

- tone: 收束
  pause: 520
  say: 多个值用 `Record` 带回来，解构负责拆开。

# 可以向老师问

- q: `Record` 和类有什么差别
  tone: 平稳
  pause: 320
  say: `Record` 轻，适合一次交出几个值。它没有你专门写的一套行为。行为复杂了，还是建类。
- q: `switch` 配了模式就可以不写兜底吗
  tone: 平稳
  pause: 320
  say: 要看情况有没有穷尽。随便一个 `Object` 还是要有兜底。枚举和 `sealed` 那种有限情况，后面会再讲。
