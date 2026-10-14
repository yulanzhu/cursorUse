---
id: 52-inkwell
module: 手势与表单
title: InkWell
order: 52
---

# 总结

水波纹要画在 `Material` 上。`InkWell` 自己不会变成按钮的语义。没有 `Material` 祖先时，水波纹看不见。

<!-- section: 专业讲解 -->
## 波纹画在哪

- `InkWell` 提供点击和波纹的交互，真正落笔的是祖先里的 `Material`
- 材料表面，比如 `Card`，自己带 `Material`
- 最近的 `Material` 太高，波纹会铺到那一层，而不是你这块
- 在它旁边再放一个 `Material`，颜色可以是透明的
- `InkWell` 没有按钮的禁用态，也不把自己标成按钮
- 要按钮的语义和禁用，用上一节的按钮，不要用它冒充

<!-- section: 大白话 -->
## 大白话

- 波纹像墨滴在一张纸上。`InkWell` 只是决定在哪滴
- 没有那张纸，墨铺不开，你就看不见

<!-- section: 怎么用 -->
## 怎么用

```dart
Material(
  color: Colors.transparent,
  child: InkWell(
    onTap: open,
    child: const Padding(
      padding: EdgeInsets.all(16),
      child: Text('更多'),
    ),
  ),
)
```

- 卡片里已经有 `Material` 时，可以直接把 `InkWell` 放进 `Card`
- 只是想要按钮，用 `FilledButton` 或 `TextButton`

<!-- section: 再讲深一点 -->
## 再讲深一点

- 开发时的检查会指出缺少 `Material`。发布构建里你主要是看不见波纹
- 波纹的形状跟着那层 `Material` 的剪裁走
- 想要自定义边界，把装饰画在 `Ink` 上，让波纹和装饰在同一层
- 需要读屏把它当成按钮时，要自己包 `Semantics`，把 `button` 设成真

<!-- section: 边界 -->
## 边界

- 有波纹，不表示有禁用态、焦点和按钮语义
- 不要用 `InkWell` 替换 `IconButton` 或 `FilledButton`
- 整页只有一个很远的 `Material` 时，波纹位置会让人吃惊

<!-- section: 收束 -->
## 留下这句

- 水波纹画在 `Material` 上。`InkWell` 不是按钮。没有那层祖先，波纹看不见

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节讲水波纹到底画在哪。很多人认为一点就能看见，结果什么都没有。
- tone: 平稳
  pause: 320
  say: 还有一件事要分开。能点、能起波纹，不等于它变成了按钮。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `InkWell` 负责这块区域被按下时要不要起波纹，以及点击回调。墨本身画在祖先的 `Material` 上。
- tone: 平稳
  pause: 340
  say: `Card` 一类的表面自己带 `Material`，所以波纹常常能留在卡片里。
- tone: 加重
  pause: 420
  stress: 不会变成按钮
  say: 它不会变成按钮。禁用时的样子、按钮的读屏角色，它都没有。你只是有了一块能点的材料表面。
- tone: 平稳
  pause: 340
  say: 没有 `Material` 祖先时，波纹没有落笔的那一层，所以看不见。
- tone: 问句
  pause: 480
  say: 如果最近的 `Material` 是整页那么大，波纹也会乖乖留在你这块小区域里吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 把它想成滴墨。`InkWell` 决定手指在哪一滴，纸才是真正被染到的那一层。
- tone: 平稳
  pause: 340
  say: 没有纸，墨滴不下去。纸如果是整面墙，墨就会在墙上散开，而不是只染你手指下的那一小块。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上在 `InkWell` 紧外侧放了一个透明的 `Material`。波纹就有了一块挨着它的纸。
- tone: 平稳
  pause: 320
  say: 颜色用透明，是为了不额外铺一层底色。你要的是波纹的落点，不是另一块色块。
- tone: 加重
  pause: 380
  say: 如果外面已经是 `Card`，通常不用再套。卡片自己就是那张纸。想要的是按钮时，不要停在 `InkWell`。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 开发时的检查会直接告诉你缺少 `Material`。你不要只在发布包里才发现波纹没了。
- tone: 放慢
  pause: 400
  say: 波纹会被那层 `Material` 剪裁。形状不对时，先看这层纸的边界，而不是去怪点击回调。
- tone: 平稳
  pause: 340
  say: 你若希望读屏说它是按钮，要自己包 `Semantics`，把 `button` 设成真。`InkWell` 不会替你写上。

## 边界

- tone: 加重
  pause: 400
  say: 有波纹，不带禁用态，也不带按钮语义。`IconButton` 和 `FilledButton` 那些东西，不要用 `InkWell` 去换。
- tone: 平稳
  pause: 340
  say: 它适合让一张已经有材料表面的区域能被点，比如卡片。除此之外，先回到按钮那一节。

## 收束

- tone: 收束
  pause: 480
  say: 水波纹要画在 `Material` 上。没有这层祖先，你看不见它。
- tone: 收束
  pause: 520
  say: `InkWell` 自己不会变成按钮的语义。要按钮，就用按钮。

# 可以向老师问

- q: 波纹跑到整页上怎么办
  tone: 平稳
  pause: 360
  say: 说明最近的 `Material` 太高了。在 `InkWell` 旁边再放一个，颜色可以透明，波纹就会留在这一块。
- q: InkWell 算不算按钮
  tone: 平稳
  pause: 340
  say: 不算。它能点击，也能起波纹，但没有按钮的禁用态和按钮语义。需要时用真正的按钮，或自己补 `Semantics`。
