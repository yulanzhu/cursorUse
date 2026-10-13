---
id: 109-lint
module: 工程与发布
title: lint 与 dart-define
order: 109
---

# 总结

`analysis_options.yaml` 把团队的静态检查写下来。`dart-define` 在构建时传入环境，用来区分网址，不要把环境网址写死。这些值会进产物，不是藏秘钥的位置。

<!-- section: 专业讲解 -->
## 规矩和环境

- 谁提交，都面对同一套规则
- 测试、预发和正式可以各有网址
- 用 `String.fromEnvironment` 读取
- 读不到时要明确失败，不要悄悄退回写死的正式网址
- 秘钥留在服务端，或留在不进安装包的凭据里

<!-- section: 大白话 -->
## 大白话

- 规矩像检查单，写在纸上。环境值像一张纸条，换一张可以去另一家，条子就在口袋里

<!-- section: 怎么用 -->
## 怎么用

```yaml
include: package:flutter_lints/flutter.yaml
```

```dart
const apiBase = String.fromEnvironment('API_BASE');
```

- 运行或构建时传入 `dart-define`
- 给不同环境打不同的包

<!-- section: 再讲深一点 -->
## 再讲深一点

- `lint` 抓风格和一批已知问题，不证明业务是对的
- 客户端只拿它该拿的配置

<!-- section: 边界 -->
## 边界

- `dart-define` 不负责权限
- 它也不负责把秘密变看不见

<!-- section: 收束 -->
## 留下这句

- 规矩写进分析配置。环境用 `dart-define`。秘钥不要放在这里

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节讲团队的规矩写在哪。
- tone: 平稳
  pause: 280
  say: 也讲环境网址怎样不写死在代码里。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `analysis_options.yaml` 把分析器的规矩写下来。谁提交之前，都会被同一套规则看一遍。
- tone: 平稳
  pause: 340
  say: `dart-define` 用来在构建时传入环境。测试、预发和正式的网址可以不同。
- tone: 加重
  pause: 400
  stress: 不是藏秘钥
  say: 这些值会进编译产物。它不是藏秘钥的位置。秘钥放进去，就能被从产物里找出来。
- tone: 平稳
  pause: 320
  say: 代码里按名字读取这些值。不要在源码里写死唯一的正式网址。
- tone: 问句
  pause: 500
  say: 把数据库密码写进 `dart-define`，只是不写进仓库，就能算藏好了吗？

## 大白话

- tone: 放慢
  pause: 400
  say: 规矩像店里的检查单。写在纸上，不靠每个人自己回忆。
- tone: 平稳
  pause: 340
  say: 环境值像出门前发的纸条，上面写着要去的网址。换一张可以去另一家。条子就在口袋里，不能当保险箱。

## 怎么用

- tone: 平稳
  pause: 340
  say: 在 `analysis_options.yaml` 里引入团队选定的 `lint` 集合，再加你们自己的规则。
- tone: 平稳
  pause: 340
  say: 构建或运行时，用 `dart-define` 传入环境。代码按这个名字读网址，不同环境打不同的包。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 读取不到时要有明确的失败。悄悄退回一个写死的正式网址，会让测试打到不该打的服务。
- tone: 放慢
  pause: 340
  say: 秘钥应留在服务端，或留在不进仓库、也不进安装包的凭据里。客户端只拿它该拿的配置。

## 边界

- tone: 平稳
  pause: 300
  say: `lint` 抓的是代码风格和一批已知问题，不证明业务是对的。
- tone: 平稳
  pause: 320
  say: `dart-define` 区分环境，不负责权限，也不负责把秘密变看不见。

## 收束

- tone: 收束
  pause: 480
  say: 规矩写进 `analysis_options.yaml`。
- tone: 收束
  pause: 500
  say: 环境用 `dart-define` 区分。秘钥不要放在这里。

# 可以向老师问

- q: `dart-define` 为什么不能放秘钥
  tone: 平稳
  pause: 340
  say: 因为它会进构建产物。拿到包的人有机会把这个值找出来。
- q: `analysis_options.yaml` 解决什么
  tone: 平稳
  pause: 320
  say: 它把团队的静态检查写下来，让每个人面对同一套规矩。
