---
id: 26-lifecycle
module: Widget 心智
title: State 生命周期和 mounted
order: 26
---

# 总结

顺序是 `initState`、`didChangeDependencies`、`build`、`didUpdateWidget`、`setState`、`deactivate`、`dispose`。`mounted` 是假的，就不能再 `setState`。`initState` 里不要查继承数据。

<!-- section: 专业讲解 -->
## 从进到出

- `initState` 只走一次，开头调用 `super.initState`
- 这里不能用 `Theme.of` 去订继承数据
- `didChangeDependencies` 在第一次 `build` 前会走，依赖变了会再走
- `build` 按当前配置做出子组件
- `didUpdateWidget` 在同类型、同 `Key` 的新配置到来时先看到旧配置
- `setState` 通知可变数据变了，请框架再 `build`
- `deactivate` 先离开树，同一帧里可能被放回
- `dispose` 结束以后 `mounted` 是假的

<!-- section: 大白话 -->
## 大白话

- 入职登记只办一次，这时不要读会变的公告
- 公告接好再做事，人留在岗位上才能改自己的记录
- 先离开工位，确定不回来再把东西交回去

<!-- section: 怎么用 -->
## 怎么用

```dart
@override
void initState() {
  super.initState();
  controller = TextEditingController();
}

@override
void didChangeDependencies() {
  super.didChangeDependencies();
  brightness = Theme.of(context).brightness;
}

@override
void dispose() {
  controller.dispose();
  super.dispose();
}
```

- 控制器在 `initState` 里创建
- 继承数据的查找放在 `didChangeDependencies`
- `dispose` 里先释放，最后调用 `super.dispose`

<!-- section: 再讲深一点 -->
## 再讲深一点

- `didChangeDependencies` 会反复到来，只做一次的请求要用标记挡住
- `didUpdateWidget` 用来跟上 `widget` 里的新参数
- `setState` 的回调同步执行，然后把元素标成需要再 `build`

<!-- section: 边界 -->
## 边界

- `build` 里面不要调用 `setState`
- `deactivate` 之后若同一帧被挪走，不会 `dispose`

<!-- section: 收束 -->
## 留下这句

- 按这条顺序记，`mounted` 是假的就不要再 `setState`

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节把 `State` 从放上树到拿下来的顺序走一遍。
- tone: 平稳
  pause: 340
  say: 最容易错的是太早去查继承数据，以及离开之后又去 `setState`。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `initState` 在一个 `State` 的一生里只走一次，适合做一次性准备，开头要调用 `super.initState`。
- tone: 加重
  pause: 400
  stress: 不能在这里建立
  say: 这时 `context` 已经挂上，可是对继承数据的依赖不能在这里建立，所以不要调用 `Theme.of`。
- tone: 平稳
  pause: 380
  say: 紧接着是 `didChangeDependencies`，第一次 `build` 之前就会走，以后依赖变了会再走一次。
- tone: 平稳
  pause: 300
  say: 然后才是 `build`，按现在的配置把子组件交出去。
- tone: 平稳
  pause: 380
  say: 父级换成同类型、同一个 `Key` 的新配置时，先走 `didUpdateWidget`，你能看到旧配置，接着再 `build`。
- tone: 平稳
  pause: 340
  say: 人留在树上而且数据变了，就用 `setState` 告诉框架请它再 `build`。
- tone: 平稳
  pause: 360
  say: 被拿下树时先 `deactivate`，这一帧里如果没有被放回去，才会 `dispose`。
- tone: 平稳
  pause: 360
  say: `dispose` 结束以后 `mounted` 就是假的，这时再 `setState` 会报错。
- tone: 问句
  pause: 460
  say: 那 `initState` 里为什么不能去查会变的继承数据？

## 大白话

- tone: 放慢
  pause: 420
  say: 把它想成员工入职，登记只办一次，这时不要去读那些会变的公告。
- tone: 平稳
  pause: 360
  say: 公告接好以后先读一遍再做事，人留在岗位上，才可以改自己的记录。
- tone: 平稳
  pause: 340
  say: 离开时先从工位上走下来，确定没有新工位，再把物品交回去。

## 怎么用

- tone: 平稳
  pause: 360
  say: 控制器放在 `initState` 里创建，`Theme.of` 这种查找放到 `didChangeDependencies`。
- tone: 平稳
  pause: 320
  say: `dispose` 里先释放控制器，最后再调用 `super.dispose`。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: `didChangeDependencies` 会反复到来，只想做一次的请求，记得用标记把它挡住。
- tone: 平稳
  pause: 340
  say: `didUpdateWidget` 把旧配置交给你，适合在这里跟上 `widget` 里的新参数。
- tone: 放慢
  pause: 340
  say: `setState` 里的函数会马上执行，执行完只是登记一次需要再 `build`。

## 边界

- tone: 加重
  pause: 360
  say: 在 `build` 里面再调用 `setState`，更新会缠到一起。
- tone: 平稳
  pause: 360
  say: `deactivate` 只说明先离开了树，同一帧里若被挪到别的位置，就不会走到 `dispose`。

## 收束

- tone: 收束
  pause: 480
  say: 从 `initState` 走到 `dispose`，中间不要打乱查找继承数据的时机。
- tone: 收束
  pause: 520
  say: `mounted` 变成假以后就不能再 `setState`。

# 可以向老师问

- q: `initState` 里为什么不能调用 `Theme.of`
  tone: 平稳
  pause: 380
  say: 因为对继承数据的依赖不能在 `initState` 里订上，这种查找要放到 `didChangeDependencies`。
- q: `mounted` 是假的时候调用 `setState` 会怎样
  tone: 平稳
  pause: 340
  say: 会报错，`dispose` 之后这个 `State` 不会再 `build`。
