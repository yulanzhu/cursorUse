---
id: 78-painter
module: 动画与绘制
title: CustomPainter 与 shouldRepaint
order: 78
---

# 总结

`CustomPaint` 准备一块区域，把 `Canvas` 交给 `CustomPainter`。`shouldRepaint` 返回假，就可以省掉这次重绘。坐标系原点在左上角，横轴向右，纵轴向下。

<!-- section: 专业讲解 -->
## 画布和判断

- `paint` 收到画布和尺寸
- 新的画手和旧的画手比一比
- 没有视觉差别就返回假
- 没有孩子时，要自己给出尺寸

<!-- section: 大白话 -->
## 大白话

- 框架递给你一张纸。纸上的内容没变，就说不必再画

<!-- section: 怎么用 -->
## 怎么用

```dart
class BarPainter extends CustomPainter {
  BarPainter(this.amount);
  final double amount;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = const Color(0xFF1565C0);
    canvas.drawRect(
      Rect.fromLTWH(0, size.height * (1 - amount), size.width, size.height * amount),
      paint,
    );
  }

  @override
  bool shouldRepaint(BarPainter oldDelegate) => oldDelegate.amount != amount;
}
```

- 会变的数据放进画手的字段，在 `shouldRepaint` 里比较
- 原点在左上角，不要按向上的纵轴去估

<!-- section: 再讲深一点 -->
## 再讲深一点

- 父级重建时常常会换一个新的画手对象
- 换了对象不等于一定要画，要听 `shouldRepaint`

<!-- section: 边界 -->
## 边界

- 文字、圆角和图片优先用现成组件
- `paint` 里不要发请求，也不要创建会活很久的对象

<!-- section: 收束 -->
## 留下这句

- 纸交给 `CustomPainter`，没变化就别重绘，原点在左上角

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节讲你真的要自己下笔时，画布交给谁。
- tone: 平稳
  pause: 300
  say: 再讲一件省事的事：什么时候可以不重绘。

## 专业讲解

- tone: 平稳
  pause: 340
  say: `CustomPaint` 是组件。它划出一块区域，再把 `Canvas` 交给 `CustomPainter`。
- tone: 平稳
  pause: 320
  say: 你在 `paint` 里画线和形状，能用的宽高在参数 `Size` 里。
- tone: 加重
  pause: 400
  stress: 返回假
  say: `shouldRepaint` 比较新旧两个画手。视觉上没有差别，就返回假，这次可以不重绘。
- tone: 平稳
  pause: 300
  say: 原点在左上角。往右是横轴变大，往下是纵轴变大。
- tone: 问句
  pause: 480
  say: 若你每次都返回真，父级一重建，这块是不是就会跟着重绘？

## 大白话

- tone: 放慢
  pause: 400
  say: 组件像递给你一张纸，并且告诉你纸有多大。
- tone: 平稳
  pause: 280
  say: 纸上的东西没变，你就告诉框架，这一遍笔可以不动。

## 怎么用

- tone: 平稳
  pause: 340
  say: 把会变的数据放进画手的字段，`shouldRepaint` 只比较这些字段。
- tone: 平稳
  pause: 320
  say: 没有孩子时要给出尺寸，不然这块区域可能根本没有面积。

## 再讲深一点

- tone: 平稳
  pause: 340
  say: 父级重建时，往往会新造一个画手。新对象只是新的配置。
- tone: 放慢
  pause: 320
  say: 只有比较之后发现有差别，`paint` 才会再被调用。

## 边界

- tone: 平稳
  pause: 320
  say: 文字、圆角盒子和图片，优先交给现成组件。自己画会丢掉不少现成能力。
- tone: 平稳
  pause: 300
  say: `paint` 里不要发请求，也不要把会活很久的对象创建在这里。

## 收束

- tone: 收束
  pause: 480
  say: 画布在 `CustomPaint` 里，笔法写在 `CustomPainter` 里。
- tone: 收束
  pause: 500
  say: 没有变化就让 `shouldRepaint` 返回假，原点记在左上角。

# 可以向老师问

- q: 原点在左上角是什么意思
  tone: 平稳
  pause: 340
  say: 横轴往右变大，纵轴往下变大，和常见的向上纵轴相反。
- q: `shouldRepaint` 返回假会省掉什么
  tone: 平稳
  pause: 320
  say: 会省掉这次的 `paint`。布局若没脏，也不会为了这块再走一遍绘制。
