---
id: 96-repaint
module: 性能
title: RepaintBoundary 和图片缓存
order: 96
---

# 总结

`RepaintBoundary` 把重绘限在一块里。乱加会多占图层内存。图片按显示大小解码，别把原图整张留在内存里。`saveLayer` 要先画进离屏缓冲，很贵。

<!-- section: 专业讲解 -->
## 圈住重绘

- 边界里面的重绘，不必连着外面一起重绘
- 每一道边界都可能留下一块图层
- `cacheWidth` 和 `cacheHeight` 按显示尺寸解码
- 一些透明和遮罩效果会走到 `saveLayer`

<!-- section: 大白话 -->
## 大白话

- 圈里的灰尘擦掉时，不必把整面玻璃再擦一遍。圈太多，玻璃就捧不住

<!-- section: 怎么用 -->
## 怎么用

- 只包住频繁重绘的那一块，比如一个反复变化的小动画
- 给 `Image` 加上接近显示尺寸的解码宽高
- 列表项里不要每人一次 `saveLayer`

<!-- section: 再讲深一点 -->
## 再讲深一点

- 边界让外面的图层可以复用
- 解码尺寸太小会糊，太大就浪费内存

<!-- section: 边界 -->
## 边界

- 没有频繁重绘时，加边界就是白占内存
- 它不是装饰

<!-- section: 收束 -->
## 留下这句

- 重绘频繁才圈起来。图片按显示大小解码。离屏缓冲不要随手加

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节讲怎样把重绘圈在一块里。
- tone: 平稳
  pause: 300
  say: 也讲图片不要按原图的尺寸留在内存里。

## 专业讲解

- tone: 平稳
  pause: 340
  say: `RepaintBoundary` 单独成一层。里面的重绘不必连着外面一起重绘。
- tone: 加重
  pause: 400
  stress: 到处加
  say: 每一道这样的边界都可能留下一块图层。到处加，内存会上去，合成也会更忙。
- tone: 平稳
  pause: 360
  say: 图片按显示尺寸解码。`cacheWidth` 和 `cacheHeight` 就是在做这件事，不要把一张很大的原图整张留在内存里。
- tone: 平稳
  pause: 320
  say: `saveLayer` 会先画到离屏缓冲，它很贵。一些透明和遮罩效果会走到这里。
- tone: 问句
  pause: 480
  say: 一个几乎不动的背景，应该和每帧都在动的小图标绑在同一层里重绘吗？

## 大白话

- tone: 放慢
  pause: 400
  say: 像在玻璃上圈一块。圈里的灰尘擦掉时，不必把整面玻璃再擦一遍。
- tone: 平稳
  pause: 320
  say: 圈太多，你就有太多块玻璃要捧着。图片也一样，不要把原尺寸的巨幅整张留着。

## 怎么用

- tone: 平稳
  pause: 320
  say: 只在动画或频繁重绘的那一块外包 `RepaintBoundary`。
- tone: 平稳
  pause: 300
  say: 给 `Image` 加上和显示尺寸接近的 `cacheWidth` 或 `cacheHeight`。

## 再讲深一点

- tone: 平稳
  pause: 320
  say: 边界让里面的绘制停在这一层。外面的图层可以复用。
- tone: 放慢
  pause: 300
  say: 解码尺寸过小，画面会糊。过大，内存就浪费。选一个接近屏幕上那一块的像素尺寸。

## 边界

- tone: 平稳
  pause: 300
  say: 它不是一种装饰。没有频繁重绘时，加了就是白占内存。
- tone: 平稳
  pause: 320
  say: `saveLayer` 不要在列表的每一项里都来一次。滚动时这个费用会被放大。

## 收束

- tone: 收束
  pause: 480
  say: 重绘频繁的一块，可以用边界圈住。
- tone: 收束
  pause: 500
  say: 图片按显示大小解码，离屏缓冲不要随手加。

# 可以向老师问

- q: 为什么 `RepaintBoundary` 不能到处加
  tone: 平稳
  pause: 340
  say: 因为每一道都可能占一块图层。加多了，内存和合成都会变贵。
- q: `saveLayer` 贵在哪
  tone: 平稳
  pause: 320
  say: 它要先把内容画进离屏缓冲，再贴回去。这一步比直接画贵。
