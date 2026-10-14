---
id: 72-storage
module: 数据
title: 本地偏好、文件和数据库
order: 72
---

# 总结

小开关用 `shared_preferences`。文件用 `path_provider` 找目录，再自己读写。要查询的结构化数据用 sqlite 或 `drift`。别把数据库当成配置文件，也别把大文件塞进偏好设置。

<!-- section: 专业讲解 -->
## 三种本机存储

- `shared_preferences` 是一组键值，适合布尔和短文字。它会整包读进内存
- 图片、视频这类大文件不要放进去。启动会被拖慢，它也不是保险箱
- `path_provider` 给你目录。临时文件用 `getTemporaryDirectory`，要留的文档用 `getApplicationDocumentsDirectory`
- 找到目录以后，再用文件接口去读写。它不替你规定文件格式
- 需要按条件查找、排序、更新一部分记录时，用 sqlite 或 `drift`
- `drift` 在 sqlite 上提供类型和查询。一个布尔开关用不上表和迁移

<!-- section: 大白话 -->
## 大白话

- 偏好像门边的几个小开关，不要往里面塞一整箱东西
- 文件像抽屉里的纸。数据库像可以按问题查找的账本，不是用来夹一张便签的

<!-- section: 怎么用 -->
## 怎么用

```dart
final prefs = await SharedPreferences.getInstance();
await prefs.setBool('dark', true);

final dir = await getApplicationDocumentsDirectory();
final file = File('${dir.path}/note.txt');
await file.writeAsString(text);
```

- 偏好的键要稳定。改键名等于把旧值丢掉
- 网页没有同一套本机路径。这些目录接口主要给手机和桌面

<!-- section: 再讲深一点 -->
## 再讲深一点

- 临时目录里的东西，系统可能清掉。不要把用户要留的文档放在那里
- 文档目录更适合要留下来的文件。缓存文件不要写进文档目录，避免备份里全是可以再取的副本
- sqlite 适合有记录和字段、并且要查询的数据。`drift` 让查询写在 Dart 里，并生成类型
- 偏好设置是明文的小配置。密钥不要放进去

<!-- section: 边界 -->
## 边界

- 不要把数据库当成配置文件。一个开关不需要迁移
- 不要把大文件塞进偏好。偏好也不是密钥的位置
- 换存储时，界面最好只面对仓库，不面对这三种技术的名字

<!-- section: 收束 -->
## 留下这句

- 小开关用偏好，文件用目录，要查询的结构用 sqlite 或 `drift`。不要把它们互相冒充

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节把本机的三种位置分开。小开关、文件、还有要查询的结构，不是同一个抽屉。
- tone: 平稳
  pause: 320
  say: 选错抽屉，要么启动变慢，要么为了一个布尔去做迁移。

## 专业讲解

- tone: 平稳
  pause: 360
  say: 小开关和短文字用 `shared_preferences`。它是键值，会整包读进内存。布尔、主题这种偏好，放这里合适。
- tone: 平稳
  pause: 340
  say: 真正的文件，用 `path_provider` 找目录，再用文件接口去写。临时的和要留住的，不要放进同一个目录。
- tone: 加重
  pause: 400
  stress: 不是配置文件
  say: 要按条件查找、排序、改其中一部分记录，用 sqlite 或 `drift`。数据库不是配置文件。一个开关用不上表和迁移。
- tone: 平稳
  pause: 340
  say: 大文件也不要塞进偏好。图片和视频会把那一整包拖慢，而且它不是保险箱。
- tone: 问句
  pause: 480
  say: 只是记住深色主题开了没有，你会为了它去建一张表吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 偏好像门边的几个小开关。你不会把一整箱东西挂在开关上。
- tone: 平稳
  pause: 340
  say: 文件像抽屉里的一张纸。数据库像可以按问题查找的账本。便签不要做成账本，账本也不要用来夹一张图。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上先拿 `SharedPreferences`，把 `dark` 写成布尔。这是偏好，不是文件，也不是表。
- tone: 平稳
  pause: 340
  say: 笔记则先要 `getApplicationDocumentsDirectory`，再在那个目录里写 `note.txt`。目录和文件内容是两步。
- tone: 加重
  pause: 380
  say: 这些目录接口主要给手机和桌面。网页没有同一套本机路径。不要假设每个平台都能拿到一个磁盘目录。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: `getTemporaryDirectory` 里的东西，系统可能清掉。用户要留的文档，放文档目录。可以再取的缓存，不要写进会被备份的文档里。
- tone: 放慢
  pause: 400
  say: `drift` 是盖在 sqlite 上的一层。查询写在 Dart 里，类型由生成给出。你要的是查询，才适合上这一层。
- tone: 平稳
  pause: 320
  say: 偏好是明文的小配置。密钥不要放进去。密钥该放哪，下一节的判断再讲。这里先把它排除出偏好。

## 边界

- tone: 平稳
  pause: 340
  say: 不要把数据库当成配置文件，也不要把大文件塞进偏好。两种冒充都会让简单的事变贵。
- tone: 加重
  pause: 380
  say: 界面最好不要直接点这三个库的名字。它问仓库要数据，仓库再决定读偏好、读文件，还是读表。

## 收束

- tone: 收束
  pause: 480
  say: 小开关用 `shared_preferences`，文件用 `path_provider` 找目录。
- tone: 收束
  pause: 520
  say: 要查询的结构用 sqlite 或 `drift`。不要把数据库当成配置，也不要把大文件塞进偏好。

# 可以向老师问

- q: 一个布尔该用数据库吗
  tone: 平稳
  pause: 320
  say: 不用。它是偏好，用 `shared_preferences`。数据库留给要查询、要更新一部分记录的结构。
- q: 临时目录能放用户文档吗
  tone: 平稳
  pause: 360
  say: 不合适。临时目录里的东西系统可能清掉。用户要留的文件，放 `getApplicationDocumentsDirectory` 那一类目录。
