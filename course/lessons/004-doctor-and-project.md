---
id: 04-doctor-and-project
module: 全貌与环境
title: 安装、flutter doctor 和项目目录
order: 4
---

# 总结

先把 Flutter 装好，再用 `flutter doctor` 看工具链齐不齐。Dart 代码放在 `lib/`。`pubspec.yaml` 管依赖和资源。`android/` 和 `ios/` 是嵌入层工程。`test/` 放测试。

<!-- section: 专业讲解 -->
## 环境和目录

- `flutter doctor` 检查 SDK、设备和平台工具链
- 它报告缺什么，不代替你安装
- `lib/` 放 Dart 代码，入口一般是 `lib/main.dart`
- `pubspec.yaml` 管依赖、图片和字体
- `android/`、`ios/` 是嵌入层工程
- `test/` 放测试，用 `flutter test` 去跑

<!-- section: 大白话 -->
## 大白话

- 先体检，再认房间。写代码的是客厅，嵌入层是水电和大门

<!-- section: 怎么用 -->
## 怎么用

- 终端里执行 `flutter doctor`，看哪一项没准备好
- `flutter create` 会生成这些目录
- 每天改的界面进 `lib/`，别进平台目录

<!-- section: 再讲深一点 -->
## 再讲深一点

- `web/`、`windows/`、`macos/`、`linux/` 也是嵌入层，创建时没打开的平台可能没有目录
- 只在开发时用的包，写在 `dev_dependencies`
- 代码规范放在 `analysis_options.yaml`，这节先不展开

<!-- section: 边界 -->
## 边界

- 医生清单是绿的，只说明工具链在，不说明业务写对了
- 权限、应用名可以进嵌入层。每天的界面仍然写在 `lib/`

<!-- section: 收束 -->
## 留下这句

- 代码在 `lib/`，依赖和资源在 `pubspec.yaml`，平台目录是嵌入层，测试在 `test/`

# 口播

## 开场

- tone: 平稳
  pause: 400
  say: 这节把环境和项目目录认一遍。

- tone: 放慢
  pause: 360
  say: 你以后找文件，就靠今天这张地图。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `flutter doctor` 在检查工具链。SDK、连上的设备、Android 或 iOS，它都会看。

- tone: 加重
  pause: 400
  stress: 写进
  say: 你的 Dart 代码放在 `lib/`。依赖、图片和字体，写进 `pubspec.yaml`。

- tone: 平稳
  pause: 340
  say: `android/` 和 `ios/` 不是给你写界面的，它们是嵌入层工程。

- tone: 问句
  pause: 440
  say: 测试又该放在哪？

- tone: 平稳
  pause: 300
  say: 放在 `test/`。你执行 `flutter test`，它会去跑这些测试。

## 大白话

- tone: 放慢
  pause: 420
  say: 你就当搬进一套新房。先做体检，再认每个房间是干什么的。

- tone: 平稳
  pause: 320
  say: 客厅里写 Dart。水电和大门，是 `android/`、`ios/` 那些嵌入层。

## 怎么用

- tone: 平稳
  pause: 340
  say: 打开终端，执行 `flutter doctor`。哪一项没打勾，就先补哪一项。

- tone: 平稳
  pause: 360
  say: 新项目用 `flutter create` 生成。你要改的界面进 `lib/`，别进平台目录。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 桌面和网页也有自己的目录，角色一样，都是嵌入层。创建时没打开的平台，目录可能不在。

- tone: 平稳
  pause: 340
  say: 只在开发时用的包，写进 `dev_dependencies`。`analysis_options.yaml` 管规范，今天知道有这个文件就可以。

## 边界

- tone: 平稳
  pause: 320
  say: 医生清单全绿，只表示工具链齐了。业务对不对，它看不出来。

- tone: 加重
  pause: 360
  say: 权限、应用名可以进嵌入层。每天的界面，仍然只写在 `lib/`。

## 收束

- tone: 收束
  pause: 500
  say: Dart 代码在 `lib/`，依赖和资源在 `pubspec.yaml`。

- tone: 收束
  pause: 480
  say: 平台目录是嵌入层工程。测试放在 `test/`。

# 可以向老师问

- q: `flutter doctor` 报红是不是代码写错了
  tone: 平稳
  pause: 320
  say: 多半不是。它在查工具链和设备。`lib/` 里的业务错误，它看不出来。
- q: 界面可以写在 android 目录里吗
  tone: 平稳
  pause: 320
  say: 不要。界面放在 `lib/`。`android/` 和 `ios/` 是嵌入层，用来接平台配置。
