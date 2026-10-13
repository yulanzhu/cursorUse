---
id: 24-composition
module: Widget 心智
title: 组合优于继承
order: 24
---

# 总结

界面用小的 `Widget` 拼出来。不要为了换一个颜色，去继承很长的一串类。`Widget` 是不可变的配置。

<!-- section: 专业讲解 -->
## 拼而不是派生

- 定义新组件时，仍要继承 `StatelessWidget` 或 `StatefulWidget`
- 内部用 `Padding`、`Theme`、`ColoredBox` 这类小块拼起来
- 为了换颜色连续派生多层，修改会缠在一起
- 字段用 `final`，建好以后不改这份配置
- 要变样子，就由父级再构造一份

<!-- section: 大白话 -->
## 大白话

- 像搭积木，换颜色就换一块
- 不要因为一个颜色，就订做很长的专用积木

<!-- section: 怎么用 -->
## 怎么用

```dart
class NameLabel extends StatelessWidget {
  const NameLabel({super.key, required this.name});

  final String name;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: Text(name),
    );
  }
}
```

- 颜色要变，可以加 `color` 参数，或外面包 `ColoredBox`
- `name` 是 `final`，这份配置建好后不改它

<!-- section: 再讲深一点 -->
## 再讲深一点

- 父级 `build` 时常常新建子 `Widget`，旧配置本身不被改写
- 框架按运行时类型和 `Key` 决定更新原来的实例，还是换掉
- 换实例的细节后面再讲

<!-- section: 边界 -->
## 边界

- 组合不是禁止继承，定义新组件仍要继承那两个基类
- 不要为了样式差异，把业务判断塞进很长的子类链

<!-- section: 收束 -->
## 留下这句

- 拼出界面，配置不可变，要变就换一份

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节建立一个习惯，界面优先用小块拼，而不是一层层继承下去。
- tone: 平稳
  pause: 340
  say: 继承用来声明一个新组件，颜色和边距尽量用组合解决。

## 专业讲解

- tone: 平稳
  pause: 360
  say: 写一个自己的组件时，你还是会继承 `StatelessWidget` 或 `StatefulWidget`。
- tone: 平稳
  pause: 320
  say: 继承到这里就够了，里面的样子用更小的组件叠出来。
- tone: 加重
  pause: 400
  stress: 为了把字换成红色
  say: 如果为了把字换成红色，就派生出很多层按钮子类，改一层会牵动很多层。
- tone: 平稳
  pause: 340
  say: `Widget` 上的字段保持 `final`，这份对象建好之后不要去改它。
- tone: 平稳
  pause: 320
  say: 父级想要新样子，就再构造一份新的配置交给框架。
- tone: 问句
  pause: 460
  say: 这样和改一个巨型子类相比，差别在哪里？

## 大白话

- tone: 放慢
  pause: 400
  say: 把它想成桌上的积木，哪一块颜色不对，就换掉那一块。
- tone: 平稳
  pause: 340
  say: 因为一块颜色不同，就去定制一整条只有你能用的积木，并不划算。

## 怎么用

- tone: 平稳
  pause: 340
  say: `NameLabel` 自己不继承 `Text`，它只是用 `Padding` 包住一个 `Text`。
- tone: 平稳
  pause: 340
  say: 名字通过 `final` 字段传入，配置一旦建好，这个字段就不会被改掉。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 父级每次 `build`，经常会拿出新的子组件对象，原来那份配置并没有被改掉。
- tone: 平稳
  pause: 340
  say: 框架接着看运行时类型和 `Key`，决定是更新原来的实例，还是换成新的。
- tone: 放慢
  pause: 300
  say: 换实例的细节后面再讲，今天先把配置不可变记住。

## 边界

- tone: 平稳
  pause: 340
  say: 这不是说你不能继承，没有那两个基类，你就定义不出自己的组件。
- tone: 平稳
  pause: 360
  say: 不合适的是，为了样式差异把继承层次拉到很长，业务判断也塞进那些子类里。

## 收束

- tone: 收束
  pause: 460
  say: 用小的 `Widget` 把界面拼出来。
- tone: 收束
  pause: 520
  say: 把 `Widget` 看成不可变配置，要变化就换一份，而不是去改旧对象的字段。

# 可以向老师问

- q: 换个颜色应该继承出一个新按钮吗
  tone: 平稳
  pause: 360
  say: 通常不用，把颜色作为参数传入，或者在外面套 `ColoredBox` 和 `Theme`。
- q: `Widget` 的字段可以在建好以后改吗
  tone: 平稳
  pause: 340
  say: `Widget` 的字段保持 `final`，需要新样子时由父级再构造一份配置。
