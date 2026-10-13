---
id: 32-bounded
module: 布局
title: 有界和无界约束
order: 32
---

# 总结

某一轴的最大约束是无穷，这一轴就是无界。`Row` 里再放 `Row`，内层若再用 `Expanded`，会撞上水平方向的无界。`ListView` 放进竖直方向无界的 `Column`，也会失败。`Expanded` 只在有界的主轴上分剩余空间。

<!-- section: 专业讲解 -->
## 上限有没有尽头

- 有界：这一轴的最大约束是有限值
- 无界：最大约束是无穷
- `Row` 给非弹性孩子的水平最大宽度常常是无穷
- 内层 `Row` 再放 `Expanded`，就分不到有限的剩余宽度
- `Column` 给非弹性孩子的竖直最大高度可以是无穷
- `ListView` 会去要这个最大高度，无穷就失败
- `Expanded` 必须站在有界的主轴上

<!-- section: 大白话 -->
## 大白话

- 没有尽头的巷子，没法按剩下的长度来分摊
- `Row` 套 `Row`，和竖直没有尽头的 `Column` 里放 `ListView`，都是同一类问题

<!-- section: 怎么用 -->
## 怎么用

```dart
Column(
  children: [
    Expanded(
      child: ListView(
        children: const [
          Text('one'),
          Text('two'),
        ],
      ),
    ),
  ],
)
```

- 外面的 `Column` 自己要先有竖直上限，`Expanded` 才能把有限高度交给 `ListView`
- 内层 `Row` 想用 `Expanded`，也要先被一个有界的父级包住

<!-- section: 再讲深一点 -->
## 再讲深一点

- 有界只说明上限有限，最小仍可以是 0
- 最小等于最大时，才是紧约束
- `shrinkWrap` 可以让列表按孩子收缩，但会失去按需构建的好处

<!-- section: 边界 -->
## 边界

- 不是任意两层 `Row` 都会失败，内层只按孩子自身宽度收缩时可以成功
- 失败发生在内层也要一个有限上限、再拿去扩展的时候

<!-- section: 收束 -->
## 留下这句

- 先问最大是不是无穷。`Expanded` 只分割有限的剩余空间

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节分清有界和无界，很多布局报错其实是同一句话。
- tone: 平稳
  pause: 320
  say: 最大宽度或最大高度变成无穷，这一轴就没有尽头。

## 专业讲解

- tone: 平稳
  pause: 340
  say: 有界的意思是，这一轴的最大约束是一个有限的值。
- tone: 平稳
  pause: 320
  say: 无界就是这个最大被写成无穷，上面没有给你一个有限的上限。
- tone: 平稳
  pause: 380
  say: `Row` 在水平方向上，常常给那些不是 `Expanded` 的孩子一个没有上限的最大宽度。
- tone: 加重
  pause: 400
  stress: 没有有限的剩余宽度
  say: 里面再放一个 `Row`，而这个内层又想用 `Expanded` 去分空间，它就会发现没有有限的剩余宽度。
- tone: 平稳
  pause: 380
  say: 竖直方向没有上限的 `Column` 把 `ListView` 放进来时，列表会去要一个无限的高度，同样失败。
- tone: 问句
  pause: 460
  say: `Expanded` 为什么一定要主轴先有界？

## 大白话

- tone: 放慢
  pause: 420
  say: 一条巷子如果没有尽头，你就没法按剩下的长度把这段路分给几户人。
- tone: 平稳
  pause: 360
  say: `Row` 里面再套 `Row`，水平方向经常就是这样一条巷子，竖直没有尽头的列里放列表，也是同一类麻烦。

## 怎么用

- tone: 平稳
  pause: 360
  say: 这段把 `ListView` 放进 `Expanded`，前提是外面的 `Column` 自己已经有一个有限的高度。
- tone: 平稳
  pause: 340
  say: 内层 `Row` 如果也要 `Expanded`，就先用外层的 `Expanded` 或别的有界父级，把上限定下来。

## 再讲深一点

- tone: 平稳
  pause: 340
  say: 有界并不表示尺寸已经被定死，最小可以仍是 0，最大只是不再是无穷。
- tone: 放慢
  pause: 320
  say: 最小和最大收成同一个值，那才叫紧约束。
- tone: 平稳
  pause: 380
  say: `shrinkWrap` 能让 `ListView` 跟着孩子变矮，可是它会把按需构建的好处丢掉，不要当成默认办法。

## 边界

- tone: 平稳
  pause: 360
  say: 两层 `Row` 如果内层只是包住几个本身有宽度的孩子，不一定会报错。
- tone: 加重
  pause: 380
  say: 真正会撞上的，是内层也想拿有限的剩余空间去扩展，可是这个上限并不存在。

## 收束

- tone: 收束
  pause: 460
  say: 看到布局报错，先看这一轴的最大是不是无穷。
- tone: 收束
  pause: 520
  say: `Expanded` 只能在有界的主轴上，把剩下的空间分出去。

# 可以向老师问

- q: `Column` 里直接放 `ListView` 为什么会失败
  tone: 平稳
  pause: 380
  say: 因为这个 `Column` 往往在竖直方向给孩子无限的最大高度，列表又想占满那个最大高度。
- q: 是不是 `Row` 里面一放 `Row` 就一定会报错
  tone: 平稳
  pause: 360
  say: 不一定，内层如果只按孩子自己的宽度收缩就可以，再要 `Expanded` 又没有有限上限才会失败。
