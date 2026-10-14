---
id: 37-adaptive
module: 布局
title: LayoutBuilder、MediaQuery 和安全区
order: 37
---

# 总结

`MediaQuery` 能拿到屏幕尺寸、字号缩放和键盘插入。`viewInsets` 是键盘占掉的部分。`SafeArea` 躲开刘海和状态栏。`LayoutBuilder` 拿到父级给的约束，比屏幕宽度更贴近自己的位置。

<!-- section: 专业讲解 -->
## 屏幕和父级

- `MediaQuery.size` 是整块屏幕或窗口的尺寸
- 字号缩放看 `textScaler`，不要再用已经弃用的 `textScaleFactor`
- `viewInsets` 是被键盘等完全挡住的那一截
- `padding` 是刘海、状态栏这一类要让开的边
- `SafeArea` 按 `padding` 把内容推进去，并让孩子看到的这份边距被拿掉
- `LayoutBuilder` 给出的是父级真正交下来的 `BoxConstraints`

<!-- section: 大白话 -->
## 大白话

- 问全楼的公告，和问自己这道门洞有多宽，不是一回事
- 安全区躲的是刘海和状态栏，不是键盘

<!-- section: 怎么用 -->
## 怎么用

```dart
@override
Widget build(BuildContext context) {
  return LayoutBuilder(
    builder: (context, constraints) {
      final fontSize = MediaQuery.textScalerOf(context).scale(16);
      final wide = constraints.maxWidth >= 600;
      return Text(
        wide ? 'wide' : 'narrow',
        style: TextStyle(fontSize: fontSize),
      );
    },
  );
}
```

```dart
SafeArea(
  child: Text('content'),
)
```

- 宽不宽，看 `constraints.maxWidth`，不看整块屏幕
- 字号用 `textScalerOf`，安全区用 `SafeArea`

<!-- section: 再讲深一点 -->
## 再讲深一点

- `sizeOf`、`textScalerOf`、`viewInsetsOf` 只在对应字段变化时重建
- `MediaQuery.of` 会在任意一项变化时都重建
- `Scaffold` 默认 `resizeToAvoidBottomInset` 是真，会为了键盘把内容区缩短

<!-- section: 边界 -->
## 边界

- `SafeArea` 不负责键盘。键盘高度在 `viewInsets`，不在它使用的 `padding` 里
- 人坐在侧栏里时，屏幕宽度仍是整块屏幕，父级约束才是侧栏的宽度

<!-- section: 收束 -->
## 留下这句

- 屏幕问 `MediaQuery`，自己的位置问 `LayoutBuilder`，刘海和状态栏交给 `SafeArea`

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节分清三件容易混在一起的事，屏幕、父级给的约束，还有安全区。
- tone: 平稳
  pause: 320
  say: 键盘占掉的那一截，也要单独认出来。

## 专业讲解

- tone: 平稳
  pause: 340
  say: `MediaQuery` 告诉你整块屏幕有多大，字号现在按 `textScaler` 来缩放。
- tone: 平稳
  pause: 360
  say: `viewInsets` 是键盘这一类完全挡住的部分，底部那一段常常就是键盘高度。
- tone: 加重
  pause: 400
  stress: 不是键盘
  say: `SafeArea` 躲开的是刘海和状态栏，它用的是 `padding`，不是键盘。
- tone: 平稳
  pause: 380
  say: 它把内容推进安全范围之后，会把这份边距从孩子能看见的 `MediaQuery` 里拿掉，避免套两层时垫两次。
- tone: 平稳
  pause: 360
  say: `LayoutBuilder` 给你的则是父级交下来的最大宽度和最大高度，比整块屏幕更贴近你坐的位置。
- tone: 问句
  pause: 480
  say: 人已经坐在一条窄侧栏里，如果仍用屏幕宽度来决定排成几列，合适吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 问全楼公告牌，你得到的是整栋楼有多宽，问自己这道门洞，得到的才是你真正能用的宽度。
- tone: 平稳
  pause: 340
  say: 安全区像给刘海和状态栏让出一条边，键盘则是另一块临时盖上来的板。

## 怎么用

- tone: 平稳
  pause: 360
  say: 第一段用 `constraints.maxWidth` 判断宽窄，字号则通过 `textScalerOf` 从 16 换算出来。
- tone: 平稳
  pause: 300
  say: 第二段的 `SafeArea` 只负责把内容从刘海和状态栏旁边挪开。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: `sizeOf`、`textScalerOf` 和 `viewInsetsOf` 只盯住一个字段，这个字段没变，就不会因为别的数据重建。
- tone: 放慢
  pause: 340
  say: 直接 `MediaQuery.of` 会在任意一项变化时都来一次。
- tone: 平稳
  pause: 360
  say: `Scaffold` 默认会为了键盘把内容区缩短，所以你不一定要再手写一层键盘边距。

## 边界

- tone: 平稳
  pause: 360
  say: 不要指望 `SafeArea` 会替你躲开键盘，键盘的高度在 `viewInsets` 里。
- tone: 加重
  pause: 380
  say: 侧栏里的组件如果去读屏幕宽度，会把自己当成仍有整块屏幕那么宽，父级约束才是真的。

## 收束

- tone: 收束
  pause: 480
  say: 屏幕、字号和键盘插入，问 `MediaQuery`。
- tone: 收束
  pause: 520
  say: 自己这一格有多宽，问 `LayoutBuilder`，刘海和状态栏则交给 `SafeArea`。

# 可以向老师问

- q: `SafeArea` 会不会把键盘也让出去
  tone: 平稳
  pause: 360
  say: 不会，它躲的是 `padding` 里的刘海和状态栏，键盘占掉的部分在 `viewInsets`。
- q: 为什么侧栏里不要用屏幕宽度来分支
  tone: 平稳
  pause: 380
  say: 因为屏幕宽度仍是整块屏幕，`LayoutBuilder` 拿到的才是父级真正给你的约束。
