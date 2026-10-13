---
id: 75-implicit
module: 动画与绘制
title: 隐式动画
order: 75
---

# 总结

你改的是终点。框架补上中间那段变化。适合短、直接的属性变化。

<!-- section: 专业讲解 -->
## 四种写法

- `AnimatedContainer`：尺寸、边距、装饰走到新的终点
- `AnimatedOpacity`：一整块的不透明度走到新的终点
- `TweenAnimationBuilder`：你提供插值，框架按时间交回中间值
- `AnimatedSwitcher`：孩子换了，才做切换过渡

<!-- section: 大白话 -->
## 大白话

- 你只报新的终点，不必自己报每一帧

<!-- section: 怎么用 -->
## 怎么用

```dart
AnimatedContainer(
  duration: const Duration(milliseconds: 280),
  width: expanded ? 200 : 80,
  color: expanded ? Colors.blue : Colors.grey,
)
```

- 用时是必填的
- 同类型的孩子若要让 `AnimatedSwitcher` 切换，加上不同的 `Key`

<!-- section: 再讲深一点 -->
## 再讲深一点

- 这类组件内部自己准备计时，你拿不到那个控制器
- 终点在半路又变了，就从当前值再走向新的终点

<!-- section: 边界 -->
## 边界

- 循环、中途掉头、好几段接起来，不适合隐式动画
- 那种情况要自己掌握时间

<!-- section: 收束 -->
## 留下这句

- 短而直接：改终点，让框架补中间

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节讲一种省事的动画，你只负责新的终点。
- tone: 平稳
  pause: 300
  say: 中间怎么变过去，由框架替你填。

## 专业讲解

- tone: 平稳
  pause: 340
  say: 隐式动画盯着的是属性最后要变成什么样。
- tone: 加重
  pause: 380
  stress: 盒子
  say: `AnimatedContainer` 管的是盒子，比如宽、高、边距和装饰。
- tone: 平稳
  pause: 320
  say: `AnimatedOpacity` 管一整块慢慢显现，或慢慢隐去。
- tone: 平稳
  pause: 360
  say: 现成属性不够用时，用 `TweenAnimationBuilder`，你交一段插值，它按时间把中间值送回来。
- tone: 平稳
  pause: 340
  say: 整个孩子要换掉时，用 `AnimatedSwitcher`。类型没变的话，给新旧孩子不同的 `Key`，切换才会发生。
- tone: 问句
  pause: 460
  say: 你有没有发现，这里并没有谁在替你一帧帧推进度？

## 大白话

- tone: 放慢
  pause: 400
  say: 把它想成电梯。你按下楼层，不必自己喊它走到了哪一格。
- tone: 平稳
  pause: 300
  say: 你在意的是它停在哪，中间的移动由机器完成。

## 怎么用

- tone: 平稳
  pause: 320
  say: 先给一段用时，再把新的宽高或颜色写进参数。
- tone: 平稳
  pause: 300
  say: 下一次构建这些参数变了，那段变化就会自己开始。

## 再讲深一点

- tone: 平稳
  pause: 340
  say: 计时器在组件里面，你碰不到，所以也没法让它循环。
- tone: 放慢
  pause: 320
  say: 曲线决定先快后慢还是匀速，用时决定这段路走多久。

## 边界

- tone: 平稳
  pause: 320
  say: 它适合一次走到终点的变化。
- tone: 加重
  pause: 380
  say: 你要是想无限转圈，或走到一半立刻掉头，就该换成自己掌握的控制器。

## 收束

- tone: 收束
  pause: 480
  say: 短的变化，你改终点就够了。
- tone: 收束
  pause: 500
  say: 路一旦变复杂，时间就要交回你自己手里。

# 可以向老师问

- q: 隐式动画要不要自己建 `AnimationController`
  tone: 平稳
  pause: 320
  say: 不用。这类组件会在内部把计时准备好，你只改终点。
- q: `AnimatedSwitcher` 为什么有时看不出切换
  tone: 平稳
  pause: 360
  say: 新旧孩子的类型和 `Key` 都一样时，框架当成同一个，过渡就不会开始。
