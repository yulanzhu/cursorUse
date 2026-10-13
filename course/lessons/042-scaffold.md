---
id: 42-scaffold
module: 界面组件
title: Scaffold 及其槽位
order: 42
---

# 总结

`Scaffold` 是一页的骨架，把顶栏、侧栏、主体、浮动按钮和底栏放进固定的槽。它不是 `Row` 或 `Column` 那种布局协议。

<!-- section: 专业讲解 -->
## 五个槽

- `appBar` 放顶栏，常见是 `AppBar`
- `drawer` 放从起始边拉出的侧栏
- `body` 放这一页的主内容，里面的排布仍由布局组件负责
- `floatingActionButton` 放浮在内容上的主动作
- `bottomNavigationBar` 是底部槽，材料三里常放 `NavigationBar`
- 一页路由通常一个 `Scaffold`，不要拿它做局部留白

<!-- section: 大白话 -->
## 大白话

- 像一间已经定好门窗位置的房间
- 你往门窗里放东西，不是用房间本身把桌椅排齐

<!-- section: 怎么用 -->
## 怎么用

```dart
Scaffold(
  appBar: AppBar(title: const Text('订单')),
  drawer: const AppDrawer(),
  body: const OrderBody(),
  floatingActionButton: FloatingActionButton(
    onPressed: create,
    child: const Icon(Icons.add),
  ),
  bottomNavigationBar: NavigationBar(
    selectedIndex: index,
    onDestinationSelected: onSelect,
    destinations: const [
      NavigationDestination(icon: Icon(Icons.list), label: '订单'),
      NavigationDestination(icon: Icon(Icons.person), label: '我的'),
    ],
  ),
)
```

- 槽的名字是 `bottomNavigationBar`，放进去的组件可以是 `NavigationBar`
- `body` 里再写 `Column`、`ListView` 或其他布局

<!-- section: 再讲深一点 -->
## 再讲深一点

- `endDrawer` 是另一侧的槽，和 `drawer` 分开
- `Scaffold.of` 必须在这个骨架的子孙里找。在创建它的同一个 `build` 里调用，找到的不是它
- `resizeToAvoidBottomInset` 默认会在键盘出现时缩短 `body` 的可用高度

<!-- section: 边界 -->
## 边界

- 骨架不决定业务该有几个入口，只负责这些槽怎么摆
- 想随便叠一个悬浮块，用 `Stack`，不要把浮动按钮槽当成自由定位
- 不要为了间距再套一层 `Scaffold`

<!-- section: 收束 -->
## 留下这句

- `Scaffold` 是页面骨架，不是布局协议。内容怎么排，仍然写在 `body` 里

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节认识一页的骨架。你要知道每个槽放什么，也要知道它不替你做布局。
- tone: 平稳
  pause: 300
  say: 名字叫 `Scaffold`。把它想成已经留好位置的框架，而不是一把尺子。

## 专业讲解

- tone: 平稳
  pause: 340
  say: 顶上的 `appBar` 通常放 `AppBar`。从起始边拉出来的侧栏放进 `drawer`。中间一大块是 `body`。
- tone: 平稳
  pause: 360
  say: 浮在内容上面的那个主动作，放进 `floatingActionButton`。底部的导航放进 `bottomNavigationBar`。
- tone: 加重
  pause: 400
  stress: 布局协议
  say: 这些是命名好的槽。`Scaffold` 知道顶栏在上、底栏在下，但它不是 `Row` 或 `Column` 那种布局协议。
- tone: 平稳
  pause: 320
  say: `body` 里面两个图标怎么排，仍然是你自己的布局组件去写。
- tone: 问句
  pause: 460
  say: 底部槽的名字是 `bottomNavigationBar`，放进去的却常常是 `NavigationBar`，这两个名字的差别，你注意到了吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 把它想成一间已经定好门窗的房间。门在哪、窗在哪，房间已经定了。
- tone: 平稳
  pause: 320
  say: 你负责往里面搬家具。你不会把整间房当成一把尺子，去量桌子该离墙多远。

## 怎么用

- tone: 平稳
  pause: 320
  say: 屏幕上这一页，顶栏标题是订单，侧栏交给 `AppDrawer`，主体交给 `OrderBody`。
- tone: 平稳
  pause: 340
  say: 加号是浮动按钮。底部两条去向放在 `NavigationBar` 里，而这个组件坐在 `bottomNavigationBar` 这个槽上。
- tone: 加重
  pause: 360
  say: `OrderBody` 里面怎么排，骨架不管。那里仍然可以是列表，也可以是别的布局。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 另一侧还有 `endDrawer`，不要和起始边的 `drawer` 混成一个槽。
- tone: 放慢
  pause: 420
  say: `Scaffold.of` 要在子孙里才能找到刚建出来的这个骨架。在创建它的同一个 `build` 里调用，找到的是更外层，或者根本找不到。
- tone: 平稳
  pause: 340
  say: 键盘起来时，它默认会缩短 `body` 的可用高度。那是骨架在让位，不是你在 `body` 里自己算出了一套布局。

## 边界

- tone: 平稳
  pause: 320
  say: 一页路由放一个 `Scaffold` 就够。为了留出一点间距再套一层，会把顶栏和浮动按钮搞出两套。
- tone: 加重
  pause: 380
  say: 浮动按钮槽不是自由定位器。你只是想在某个角上叠一块东西，用 `Stack`。骨架不替你发明新的布局规则。

## 收束

- tone: 收束
  pause: 480
  say: `Scaffold` 是页面骨架，槽位已经定好。
- tone: 收束
  pause: 520
  say: 它不是布局协议。内容怎么排，你写在 `body` 里面。

# 可以向老师问

- q: 同一个 build 里为什么找不到 Scaffold
  tone: 平稳
  pause: 380
  say: 因为 `Scaffold.of` 要往祖先找。创建它的那个 `build` 自己并不是它的子孙。把调用放进子组件，或者放进 `Builder`。
- q: bottomNavigationBar 和 NavigationBar 是一个东西吗
  tone: 平稳
  pause: 360
  say: 不是。前面是槽的名字，后面是常放进这个槽的组件。槽里也可以放别的底部组件。
