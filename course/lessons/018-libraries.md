---
id: 18-libraries
module: Dart 语言
title: 库、条件导入和 pub
order: 18
---

# 总结

`import` 可以用 `show` 和 `hide` 控制看见哪些名字。条件导入在编译时按平台选文件。`pubspec.yaml` 写版本约束。`flutter pub get` 把依赖拉下来。私有仓库的密钥不要写进项目。

<!-- section: 专业讲解 -->
## 看见谁、装哪一版

- `show` 只引入点名的那些，`hide` 把点名的那些留在外面
- 条件导入看某个库在不在，比如 `dart.library.io`，再决定用哪个文件
- 这是编译期的选择，不是运行时再挑
- `^1.2.0` 从这一版起，不会跨到 2.0.0
- 主版本是 0 时，`^0.2.0` 不会跨到 0.3.0
- `flutter pub get` 按约束把依赖拉下来，具体版本记在 `pubspec.lock`

<!-- section: 大白话 -->
## 大白话

- 借书时只抽出要用的几本
- 换平台是出发前就选定文件，不是走到半路再翻箱

<!-- section: 怎么用 -->
## 怎么用

```dart
import 'user.dart' show User;
import 'log.dart' hide debugLog;

import 'stub.dart' if (dart.library.io) 'io_impl.dart';
```

- 自己的文件用相对路径，依赖用 `package:` 开头
- 在项目里执行 `flutter pub get`

<!-- section: 再讲深一点 -->
## 再讲深一点

- 下划线开头的名字，私有范围是库，不是类
- 几份条件导入的文件要提供同样的名字，调用的文件才不用改
- 应用的 `pubspec.lock` 应该留下来，大家装到的版本才一致

<!-- section: 边界 -->
## 边界

- 密钥不要写进 `pubspec.yaml`，也不要写进仓库、讲稿或聊天记录
- `show` 和 `hide` 不改被导入的库，只改这个文件的视野

<!-- section: 收束 -->
## 留下这句

- 导入时把名字收干净。平台差异用条件导入。依赖交给 `pubspec.yaml` 和 `flutter pub get`

# 口播

## 开场

- tone: 平稳
  pause: 400
  say: 这节看代码怎么分成库，又怎么把别人的包拉进来。

- tone: 放慢
  pause: 380
  say: 你要分清两件。哪些名字进得了这个文件，依赖的哪一版会被装上。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `show` 让这个文件只看见你点名的名字。`hide` 则把你点名的名字挡在外面。

- tone: 平稳
  pause: 380
  say: 条件导入按库在不在来选文件。比如有 `dart.library.io`，就改用那一份实现。

- tone: 加重
  pause: 400
  stress: 编译的时候
  say: 这个选择发生在编译的时候。运行起来之后，不会再挑一次。

- tone: 平稳
  pause: 380
  say: `pubspec.yaml` 里写依赖和版本约束。屏幕上 1.2.0 前面那个标记，表示兼容更新不会跳到 2.0.0。

- tone: 问句
  pause: 440
  say: 这些约束写好了，包就自动在了吗？

- tone: 平稳
  pause: 340
  say: 没有。你还要执行 `flutter pub get`，依赖才会被拉下来。

## 大白话

- tone: 放慢
  pause: 420
  say: `show` 和 `hide` 像借书。你只把要用的那几本抽出来，不把整个书架倒进房间。

- tone: 平稳
  pause: 380
  say: 条件导入像出发前就选定地图。走到半路，不会再换一本。

- tone: 平稳
  pause: 360
  say: `pub get` 是按清单去取包裹。范围写在约束里，取回来的那一版会被记下来。

## 怎么用

- tone: 平稳
  pause: 360
  say: 屏幕上第一条只引入 `User`。下一条把 `debugLog` 留在外面。

- tone: 平稳
  pause: 380
  say: 再下一条在有 `dart.library.io` 时，改用 `io_impl.dart`。没有，就用 `stub.dart`。

- tone: 平稳
  pause: 360
  say: 自己的文件用相对路径。依赖用 `package:` 这种导入。然后执行 `flutter pub get`。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 以下划线开头的名字，私有的是整个库，不是一个类。同一个库里都能看见。

- tone: 平稳
  pause: 360
  say: 条件导入的几份文件，要提供同样的名字。这样调用它们的代码就不用跟着改。

- tone: 加重
  pause: 400
  say: 主版本还是 0 的时候，同样的标记从 0.2.0 起，不会跨到 0.3.0。范围更窄。

- tone: 平稳
  pause: 380
  say: 应用项目里把 `pubspec.lock` 留下来。这样每次执行 `flutter pub get`，拿到的才是同一套版本。

## 边界

- tone: 平稳
  pause: 400
  say: 私有仓库的密钥不要写进 `pubspec.yaml`。不要提交到仓库，也不要贴进讲稿或聊天记录。

- tone: 平稳
  pause: 340
  say: `show` 和 `hide` 不会去改那个库的源码。它们只影响当前这个文件能看见什么。

## 收束

- tone: 收束
  pause: 500
  say: 导入时把名字收干净。平台差异用条件导入解决。

- tone: 收束
  pause: 500
  say: 版本约束写在 `pubspec.yaml`。执行 `flutter pub get`，才真正把依赖拉下来。

# 可以向老师问

- q: `show` 和 `hide` 会改库里的源码吗
  tone: 平稳
  pause: 320
  say: 不会。它们只决定这个文件能看见哪些名字。库本身不动。
- q: 条件导入是运行到那里再选文件吗
  tone: 平稳
  pause: 320
  say: 不是。编译时就按那个库在不在选定文件。跑起来不会再挑一次。
