---
id: 81-theme
module: 主题与适配
title: Theme 与深色模式
order: 81
---

# 总结

`ThemeData` 收纳颜色、字体和组件外观。`ColorScheme` 是其中的颜色角色。`ThemeMode` 决定跟随系统，还是锁住深色或浅色。组件用 `Theme.of` 去取，不要到处写死颜色。

<!-- section: 专业讲解 -->
## 继承下来的外观

- `theme` 与 `darkTheme` 可以同时存在
- `ThemeMode.system` 跟随系统，`light` 和 `dark` 把深浅锁住
- `Theme.of` 建立依赖，主题一换，用到它的组件会重建
- `ColorScheme.fromSeed` 能从一颗种子色推出一整套角色

<!-- section: 大白话 -->
## 大白话

- 主题像屋子的灯光方案，孩子不必各自带灯泡

<!-- section: 怎么用 -->
## 怎么用

```dart
MaterialApp(
  theme: ThemeData(
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
  ),
  darkTheme: ThemeData(
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.indigo,
      brightness: Brightness.dark,
    ),
  ),
  themeMode: ThemeMode.system,
)
```

- 文字和按钮从 `colorScheme`、`textTheme` 取
- 个别例外可以局部包一层 `Theme`

<!-- section: 再讲深一点 -->
## 再讲深一点

- 深色要另一套能看清的角色，不是把浅色随便反一下
- 写死的颜色数字不会跟着主题走

<!-- section: 边界 -->
## 边界

- 主题不管业务数据，它只统一外观
- 例外太多时，继承就名存实亡

<!-- section: 收束 -->
## 留下这句

- 颜色和字体放进主题，深浅交给 `ThemeMode`

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节讲颜色和字体怎样从上面流到每个组件。
- tone: 平稳
  pause: 300
  say: 也讲深色是跟随系统，还是被你锁住。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `ThemeData` 把颜色、字体和组件外观收成一份配置。`ColorScheme` 是里面的颜色角色，比如主色、表面和错误色。
- tone: 平稳
  pause: 340
  say: `MaterialApp` 可以同时放一份浅色和一份深色，再用 `ThemeMode` 决定眼前用哪一份。
- tone: 加重
  pause: 380
  stress: 跟随系统
  say: `ThemeMode.system` 跟随系统。`light` 和 `dark` 则把深浅锁住，不再看系统。
- tone: 平稳
  pause: 320
  say: 组件里用 `Theme.of` 去取。主题对象一换，依赖它的组件会重建。
- tone: 问句
  pause: 480
  say: 你若在每个按钮上写死一个颜色数字，换深色时，这些数字会自己变吗？

## 大白话

- tone: 放慢
  pause: 400
  say: 主题像一间屋子的灯光方案。下面的组件不必各自带灯泡。
- tone: 平稳
  pause: 280
  say: 方案挂在上面，谁需要颜色，就抬头看一眼。

## 怎么用

- tone: 平稳
  pause: 340
  say: 在 `MaterialApp` 上写好 `theme`、`darkTheme` 和 `themeMode`。
- tone: 平稳
  pause: 320
  say: 按钮和文字从 `colorScheme` 和 `textTheme` 取，不要满屏幕写死 `Color`。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 一颗种子色可以铺出一整套浅色角色。深色不要把浅色反过来用，要另配一套能看清的颜色。
- tone: 放慢
  pause: 300
  say: `Theme.of` 建立的是依赖。配置换了，这些组件就会重建，颜色跟着换。

## 边界

- tone: 平稳
  pause: 300
  say: 主题不管业务数据。它只负责把外观统一下来。
- tone: 平稳
  pause: 320
  say: 某个组件确实要例外时，可以局部再包一层 `Theme`，不要因此回到到处写死。

## 收束

- tone: 收束
  pause: 480
  say: 颜色和字体放进主题，让组件去继承。
- tone: 收束
  pause: 500
  say: 深浅由 `ThemeMode` 决定，可以跟随系统，也可以锁住其中一种。

# 可以向老师问

- q: `ThemeMode.system` 看谁的设置
  tone: 平稳
  pause: 320
  say: 看操作系统当前是浅色还是深色。系统一变，应用可以跟着变。
- q: 为什么不要把颜色写死在组件里
  tone: 平稳
  pause: 340
  say: 因为换深色或换品牌色时，写死的数字不会跟着主题走。
