---
id: 57-set-state
module: 状态
title: setState 与状态提升
order: 57
---

# 总结

`setState` 只标记当前 `State` 要重新 `build`。两个兄弟要共享数据，就把状态提到共同父级。不要为了一个开关就引入状态库。

<!-- section: 专业讲解 -->
## 谁重建

- `setState` 的回调里同步改字段，回调返回后当前 `State` 被标成需要重建
- 它不会把整个应用魔法一样全部重建
- 在回调里 `await`，后面的赋值就可能发生在这次标记之外
- 兄弟之间不直接互相改字段
- 共享的数据放到共同父级，父级把值和回调交给两边
- 只在这一页用的开关，留在这一页的 `State` 里

<!-- section: 大白话 -->
## 大白话

- `setState` 像在自己的本子上做个记号，请人再看这一页
- 两个孩子要看同一份结果，结果放在大人那里，不要放在其中一个孩子口袋里

<!-- section: 怎么用 -->
## 怎么用

```dart
class Parent extends StatefulWidget {
  const Parent({super.key});

  @override
  State<Parent> createState() => ParentState();
}

class ParentState extends State<Parent> {
  bool on = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Switch(
          value: on,
          onChanged: (next) => setState(() => on = next),
        ),
        Child(on: on),
        Other(on: on),
      ],
    );
  }
}
```

- `Child` 和 `Other` 都只读 `on`，要改就走父级给的回调
- 一个开关不需要 `Notifier` 或别的状态库

<!-- section: 再讲深一点 -->
## 再讲深一点

- 父级重建时，子级 `State` 若类型和 `Key` 没变，会留下来
- 输入框的光标因此不一定丢。丢掉，常常是因为你换了类型，或把组件从树上拿掉了
- 子组件不要写父级的私有字段。写入只有回调这一条路
- 提升过高，父级会因为一个小开关重建一大片。那时候再考虑把监听收窄

<!-- section: 边界 -->
## 边界

- `setState` 不能在 `dispose` 之后调用。异步回来先看 `mounted`
- 它不跨路由保存数据。换页仍然要留的，就不是这一页的临时状态
- 不要为了“以后可能更大”提前引入整套状态库

<!-- section: 收束 -->
## 留下这句

- `setState` 只标记当前 `State`。兄弟要共享，就把状态提到共同父级

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节把 `setState` 的范围说小。它不是一个让整个应用重新画一遍的按钮。
- tone: 平稳
  pause: 320
  say: 然后看两个兄弟怎么共享一份数据。办法是往上提，不是互相伸手。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `setState` 只标记当前这个 `State` 要重新 `build`。回调里的字段要在它返回之前改完。
- tone: 平稳
  pause: 340
  say: 你在回调里写 `await`，后面的赋值就可能发生在这次标记之外。界面不会因为那个晚到的赋值再自动看一眼。
- tone: 加重
  pause: 400
  stress: 共同父级
  say: 两个兄弟要共享数据，就把状态提到共同父级。父级拿着值，再把值和回调交给两边。
- tone: 平稳
  pause: 320
  say: 子级不要去改父级的私有字段。它只能调用交下来的回调。这样写入只有一个位置。
- tone: 问句
  pause: 460
  say: 只是一个开关，你有必要为了它去引入一整套状态库吗？

## 大白话

- tone: 放慢
  pause: 420
  say: `setState` 像在自己的本子上夹一张纸条，请人再读这一页。别的本子不会因为这张纸条被打开。
- tone: 平稳
  pause: 360
  say: 两个孩子要看同一份结果，结果放在大人那里。放在其中一个孩子口袋里，另一个就看不见。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的 `on` 在父级。开关一变，就 `setState`，然后 `Child` 和 `Other` 都读到新的值。
- tone: 平稳
  pause: 320
  say: 两个孩子自己不保存另一份 `on`。它们要改，就调用父级给的回调。
- tone: 加重
  pause: 380
  say: 这种范围用框架自带的 `State` 就够。不要为了一个开关把 `Notifier` 或更大的库请进来。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 父级重建时，子级的 `State` 如果类型和 `Key` 都没变，会留下来。输入框的光标因此不一定丢。
- tone: 放慢
  pause: 400
  say: 光标丢了，常常是因为你把组件从树上拿掉了，或者换成了另一种组件。提升状态不是为了把所有 `State` 都清掉。
- tone: 平稳
  pause: 340
  say: 如果父级因为一个小开关，把很大的一片都重建了，再考虑把监听收窄。那是后面通知器要解决的，不是现在就换库。

## 边界

- tone: 平稳
  pause: 340
  say: 异步回来以后，先看 `mounted`。`State` 已经 `dispose`，再 `setState` 会失败。
- tone: 加重
  pause: 380
  say: 换一条路由仍然要留着的数据，不要只放在这一页的 `State` 里。`setState` 不负责跨页保存。

## 收束

- tone: 收束
  pause: 480
  say: `setState` 只标记当前 `State` 要重新 `build`。
- tone: 收束
  pause: 520
  say: 兄弟要共享，就把状态提到共同父级。一个开关，不必请状态库。

# 可以向老师问

- q: setState 会不会重建整个应用
  tone: 平稳
  pause: 340
  say: 不会。它标记的是当前这个 `State`。父级若重建，会按新的配置更新子组件，但不是魔法一样把整个应用重新来过。
- q: 两个兄弟能不能直接改对方的字段
  tone: 平稳
  pause: 360
  say: 不要。把共享的数据提到共同父级，用回调写入。这样只有一个位置在改这份数据。
