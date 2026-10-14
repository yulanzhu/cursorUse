---
id: 39-text
module: 界面组件
title: 文本和字体
order: 39
---

# 总结

屏幕上的文字由 `Text` 画出来。样式放在 `TextStyle` 里，混排用 `TextSpan`。字体要先登记，字号要跟着主题和系统缩放走。

<!-- section: 专业讲解 -->
## 文字和样式

- `Text` 画一段文字，并合并周围的 `DefaultTextStyle`
- `TextStyle` 写颜色、粗细、字体家族和基准字号
- `RichText` 吃一棵 `TextSpan`，不会自动接上默认样式
- `Text.rich` 会接上默认样式，适合同一段里的混排
- 自定义字体先写进 `pubspec` 的 `flutter: fonts`
- 用 `textTheme` 的样式做基准，不要关掉 `TextScaler`

<!-- section: 大白话 -->
## 大白话

- `Text` 是黑板上的那一句，`TextStyle` 是粉笔的颜色和粗细
- 自带的粉笔不登记，黑板就只用原配的那支

<!-- section: 怎么用 -->
## 怎么用

```yaml
flutter:
  fonts:
    - family: Brand
      fonts:
        - asset: fonts/Brand-Regular.ttf
```

```dart
Column(
  children: [
    Text(
      title,
      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
            fontFamily: 'Brand',
          ),
    ),
    Text.rich(
      TextSpan(
        children: [
          const TextSpan(text: '合计 '),
          TextSpan(
            text: price,
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
        ],
      ),
    ),
  ],
)
```

- 家族名要和 `fontFamily` 一致
- 不要写 `textScaler: TextScaler.noScaling`
- 混排优先 `Text.rich`，不要误用 `RichText` 却忘了默认样式

<!-- section: 再讲深一点 -->
## 再讲深一点

- 系统文字变大时，基准字号会乘上缩放
- 四周如果卡死高度，变大的字会被裁掉
- 必须限制所占位置时，用 `maxLines` 和 `overflow`，不要用死高度裁字

<!-- section: 边界 -->
## 边界

- 家族名对了、文件路径错了，运行时仍然拿不到字形
- 缩放继续生效，不表示挤在一起的排版会自动变好看

<!-- section: 收束 -->
## 留下这句

- 文字交给 `Text` 这一家，字体先登记，字号跟着系统和主题走

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节讲屏幕上的字，谁负责画，字号又为什么不能写死。
- tone: 平稳
  pause: 320
  say: 你先分清普通的一段，和同一段里夹着不同样子的文字。

## 专业讲解

- tone: 平稳
  pause: 320
  say: 普通的一段用 `Text`。它会把周围已有的默认样式和你写的 `TextStyle` 并在一起。
- tone: 平稳
  pause: 340
  say: `TextStyle` 里放的是颜色、粗细、字体家族，还有基准字号。
- tone: 加重
  pause: 400
  stress: 不会自动接上
  say: 同一段里要夹两种样子，就把 `TextSpan` 交给 `RichText`。这里有个容易漏的差别，`RichText` 不会自动接上 `DefaultTextStyle`。
- tone: 平稳
  pause: 320
  say: `Text.rich` 会接上。你想混排、又想保留周围的字样，就用它。
- tone: 问句
  pause: 480
  say: 家族名如果没有写进 `pubspec`，运行的时候就没有这套字形，这句你抓住了吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 把它想成一块黑板。`Text` 是你写下的那一句，`TextStyle` 是粉笔的颜色和粗细。
- tone: 平稳
  pause: 340
  say: 你自带的粉笔要先在工具箱里登记，不然黑板只会用原配的那支。

## 怎么用

- tone: 平稳
  pause: 320
  say: 屏幕上先是字体登记。家族名要和后面的 `fontFamily` 写成同一个。
- tone: 平稳
  pause: 360
  say: 普通文字用主题里的 `bodyLarge`，没有另写一个死字号，也没有把缩放关掉。
- tone: 加重
  pause: 380
  say: 混排那一段走 `Text.rich`。价格被加粗，前面的字仍然跟着默认样式。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 系统把字放大时，基准字号会再乘上一个缩放。你若套上 `TextScaler.noScaling`，这个放大就失效了。
- tone: 放慢
  pause: 400
  say: 字变高以后，四周要留出能变高的空间。卡死高度，字会被裁掉。
- tone: 平稳
  pause: 340
  say: 真的必须少占位置时，用 `maxLines` 和 `overflow` 来收，不要用一个死盒子把字切成半截。

## 边界

- tone: 平稳
  pause: 340
  say: 家族名写对了，文件路径写错，运行时照样找不到字形，界面会退回默认字体。
- tone: 加重
  pause: 380
  say: 缩放继续生效，也不表示每一块排版都会自动变好看。挤在一行里的字，放大后会溢出。

## 收束

- tone: 收束
  pause: 480
  say: 文字交给 `Text` 这一家来画，自定义字体先在 `pubspec` 里登记。
- tone: 收束
  pause: 520
  say: 字号跟着主题和系统走，不要写成一个不会变的死数字。

# 可以向老师问

- q: RichText 为什么看起来没有样式
  tone: 平稳
  pause: 360
  say: 因为它不接周围的 `DefaultTextStyle`。要混排又要默认样式，就改用 `Text.rich`，或者自己把那份样式放进根上的 `TextSpan`。
- q: 写了字号 16 是不是就固定了
  tone: 平稳
  pause: 380
  say: 不固定。16 只是基准，系统缩放默认会再乘上去。只有你换成 `TextScaler.noScaling`，它才真的不动。
