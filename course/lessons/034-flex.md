---
id: 34-flex
module: 布局
title: Expanded 与 Flexible
order: 34
---

# 总结

`Expanded` 带有 `flex`，并且 `fit` 是 `tight`，孩子必须占满分到的空间。`Flexible` 可以把 `fit` 设成 `loose`，孩子可以比分到的小。`Spacer` 是空的 `Expanded`。

<!-- section: 专业讲解 -->
## 分剩余空间

- 两者都是 `Flexible`，默认 `flex` 是 1
- 非弹性孩子先按自身的主轴尺寸占位
- 剩下的有界空间按 `flex` 比例分配
- `tight` 把分到的长度收成固定尺寸，孩子必须占满
- `loose` 只给出上限，孩子可以更小
- `Spacer` 里面是空的盒子，外面用 `Expanded` 把空间撑开

<!-- section: 大白话 -->
## 大白话

- `Expanded` 领到的格子必须铺满
- `loose` 的 `Flexible` 只把格子当成上限
- `Spacer` 是一块不画内容、专门占位的弹性空白

<!-- section: 怎么用 -->
## 怎么用

```dart
Row(
  children: const [
    Flexible(
      fit: FlexFit.loose,
      child: Text('short'),
    ),
    Expanded(
      child: Text('fill'),
    ),
    Spacer(),
  ],
)
```

- `loose` 的文字可以比分到的上限更窄
- `Expanded` 会占满它分到的那段
- `Spacer` 把剩下的空间吃掉

<!-- section: 再讲深一点 -->
## 再讲深一点

- `loose` 没有用完的那段，会回到主轴的剩余空间
- `mainAxisAlignment` 可以继续排列这些剩余空间
- `tight` 把孩子的尺寸收死，剩余空间就被占住
- `flex` 是 2 和 1 时，弹性空间按二比一分

<!-- section: 边界 -->
## 边界

- 它们必须放在 `Row`、`Column` 或 `Flex` 下面
- 主轴无界时没有有限的剩余空间，非零 `flex` 会报错

<!-- section: 收束 -->
## 留下这句

- `tight` 必须占满，`loose` 可以更小，`Spacer` 用来占剩余空间

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节分开 `Expanded` 和 `Flexible`，关键在孩子要不要占满分到的那一段。
- tone: 平稳
  pause: 300
  say: `Spacer` 也放在这里一起看，它并不是第三套规则。

## 专业讲解

- tone: 平稳
  pause: 340
  say: 这两个组件都是 `Flexible`，不写的时候 `flex` 都是 1。
- tone: 平稳
  pause: 360
  say: `Row` 或 `Column` 会让没有弹性的孩子先占掉自己需要的主轴长度，再把剩下的有界空间拿出来分。
- tone: 加重
  pause: 400
  stress: 必须占满
  say: `Expanded` 的 `fit` 是 `tight`，分到多少，孩子就必须占满多少。
- tone: 平稳
  pause: 360
  say: `Flexible` 可以改成 `loose`，那时分到的长度只是上限，孩子可以更小。
- tone: 平稳
  pause: 340
  say: `Spacer` 里面放的是一个空的盒子，靠外层的 `Expanded` 把这段空间撑开。
- tone: 平稳
  pause: 340
  say: 弹性的那几份按 `flex` 来分，写成 2 和 1 就是二比一。
- tone: 问句
  pause: 460
  say: 所以同样是 `tight` 时，`flex` 更大的孩子会占更多空间，对吗？

## 大白话

- tone: 放慢
  pause: 400
  say: `Expanded` 像领到一个格子，就必须把格子铺满，不能只占用一个角。
- tone: 平稳
  pause: 360
  say: `loose` 的 `Flexible` 只是说你最大可以到这里，东西可以比分到的空间小，`Spacer` 则是一块不画内容的弹性空白。

## 怎么用

- tone: 平稳
  pause: 340
  say: 这段 `Row` 里，`loose` 的短文字可以保持自己的宽度，不必被拉到上限。
- tone: 平稳
  pause: 340
  say: 中间的 `Expanded` 会占满自己分到的那段，最后的 `Spacer` 把尚未分掉的空间吃完。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: `loose` 的孩子如果没有用完上限，多出来的那段会回到主轴的剩余空间里。
- tone: 放慢
  pause: 340
  say: 于是 `mainAxisAlignment` 仍可以排列这些剩下的空间。
- tone: 平稳
  pause: 360
  say: `tight` 则把孩子收成刚好那么大，这段空间就被它占住，不再交回去。

## 边界

- tone: 平稳
  pause: 340
  say: `Expanded` 和 `Flexible` 不能随便挂在任意组件下面，父级要是 `Row`、`Column` 或 `Flex`。
- tone: 加重
  pause: 380
  say: 主轴如果无界，就没有有限的剩余空间可以分，非零的 `flex` 会直接报错。

## 收束

- tone: 收束
  pause: 480
  say: `Expanded` 强制孩子占满分到的空间，`loose` 的 `Flexible` 允许孩子更小。
- tone: 收束
  pause: 520
  say: `Spacer` 是空的 `Expanded`，专门用来占掉剩余空间。

# 可以向老师问

- q: `Flexible` 不写 `fit` 时，孩子必须占满吗
  tone: 平稳
  pause: 360
  say: 不必，默认是 `loose`，分到的长度只是上限，孩子可以更小。
- q: 主轴没有有限上限时，能用 `Expanded` 吗
  tone: 平稳
  pause: 340
  say: 不能，没有有限的剩余空间可以分，非零 `flex` 会报错。
