---
id: 58-notifiers
module: 状态
title: ValueNotifier 与 ChangeNotifier
order: 58
---

# 总结

`ValueNotifier` 装一个值，`ValueListenableBuilder` 只在这个值变时重建。`ChangeNotifier` 可以装一组相关数据，`notifyListeners` 通知听众。创建它的人要 `dispose`。

<!-- section: 专业讲解 -->
## 一个值和一团

- 给 `ValueNotifier` 的 `value` 赋新值，并且和旧值不相等，就会通知
- `ValueListenableBuilder` 只重建自己的 `builder`，外面的 `build` 不必跟着跑
- 改了对象内部，又把同一个对象赋回去，相等判断会认为没有变化
- `ChangeNotifier` 可以放一组相关字段，改完自己调用 `notifyListeners`
- 它不会替你逐个字段做相等判断
- `ValueListenableBuilder` 会自己取消订阅，通知器本身仍要 `dispose`

<!-- section: 大白话 -->
## 大白话

- `ValueNotifier` 像一块只写当前值的小牌子，值换了，盯着牌子的人才刷新
- `ChangeNotifier` 像一块小白板，你改完要自己喊一声，大家才抬头

<!-- section: 怎么用 -->
## 怎么用

```dart
final counter = ValueNotifier<int>(0);

ValueListenableBuilder<int>(
  valueListenable: counter,
  builder: (context, value, child) {
    return Text('$value');
  },
)

class Cart extends ChangeNotifier {
  int count = 0;

  void add() {
    count += 1;
    notifyListeners();
  }
}
```

- 听 `ChangeNotifier` 可以用 `ListenableBuilder`
- 谁在 `State` 里创建，谁在 `dispose` 里放掉

<!-- section: 再讲深一点 -->
## 再讲深一点

- 列表若要通知，换成一个新的列表，不要改完内部再赋回同一个对象
- 也可以改用 `ChangeNotifier`，在修改之后主动 `notifyListeners`
- 听众多、每次都重建很大一片时，把 `builder` 收小，不要让整页都听
- 这些通知器仍然待在你创建它们的那一层，它们不靠 `BuildContext` 才能被读到，但界面要听，还是要有人订阅

<!-- section: 边界 -->
## 边界

- 一个值或一小团相关数据，用它们就够
- 不要把整棵应用的所有数据塞进一个巨大的 `ChangeNotifier`
- 不要 `dispose` 一个仍被别的页面使用的通知器

<!-- section: 收束 -->
## 留下这句

- 一个值用 `ValueNotifier`。一团相关数据用 `ChangeNotifier`，改完要通知，用完要放掉

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节在 `setState` 旁边，再放两种更小的通知。一个装单个值，一个装一小团相关数据。
- tone: 平稳
  pause: 320
  say: 目的一样，都是别为了一个变化，把整页都重新 `build`。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `ValueNotifier` 里面装一个值。你给 `value` 赋一个新值，并且它和旧值不相等，听众就会收到通知。
- tone: 平稳
  pause: 340
  say: `ValueListenableBuilder` 只在这个值变时重建自己的 `builder`。包在外面的那层 `build`，不必为了它再跑一遍。
- tone: 加重
  pause: 400
  stress: 自己喊一声
  say: `ChangeNotifier` 可以装一组相关字段。你改完，要自己调用 `notifyListeners`。它不会替你比对，所以你要自己喊一声。
- tone: 平稳
  pause: 340
  say: 谁创建通知器，谁 `dispose`。构建器会自己取消订阅，通知器身上的听众名单仍要你放掉。
- tone: 问句
  pause: 480
  say: 你改了列表里面的元素，又把同一个列表对象赋回去，`ValueNotifier` 会认为变了吗？

## 大白话

- tone: 放慢
  pause: 420
  say: `ValueNotifier` 像一块只写当前值的小牌子。值换了，盯着这块牌子的人才去刷新。旁边的人可以不抬头。
- tone: 平稳
  pause: 340
  say: `ChangeNotifier` 像一块小白板。你改了字，要自己喊一声。不喊，大家仍然看着旧的内容。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的 `counter` 是一个整型通知器。`ValueListenableBuilder` 里的文字只跟着这个值变。
- tone: 平稳
  pause: 320
  say: `Cart` 里有自己的 `add`。它改完 `count`，马上 `notifyListeners`。漏掉这一声，界面不会动。
- tone: 加重
  pause: 380
  say: 界面要用 `ListenableBuilder` 或前面的值构建器来听。听的范围写小一点。创建它的 `State` 在 `dispose` 里把它放掉。

## 再讲深一点

- tone: 平稳
  pause: 400
  say: 同一个列表对象，改完内部再赋回去，相等判断过了，`ValueNotifier` 会认为没有变化。要么换成新的列表，要么改用 `ChangeNotifier` 主动通知。
- tone: 放慢
  pause: 380
  say: 听众如果包住整页，你就又回到了大片重建。把 `builder` 收在真正会变的那一小块上。
- tone: 平稳
  pause: 340
  say: 它们适合一个值，或一小团一起变的数据。整棵应用的依赖，留给后面的写法，不要现在就堆成一个巨型通知器。

## 边界

- tone: 平稳
  pause: 340
  say: 不要放掉一个仍被别的页面拿着的通知器。谁会存在更久，谁负责 `dispose`。
- tone: 加重
  pause: 380
  say: 构建器取消的是自己的订阅。通知器若是你创建的，订阅取消了，对象本身仍在，仍然要放掉。

## 收束

- tone: 收束
  pause: 480
  say: `ValueNotifier` 装一个值，变了才让那一小块重建。
- tone: 收束
  pause: 520
  say: `ChangeNotifier` 装一组相关数据，改完要 `notifyListeners`，用完要 `dispose`。

# 可以向老师问

- q: 为什么改了列表界面却不动
  tone: 平稳
  pause: 380
  say: 多半是你改了列表内部，又把同一个对象赋回 `value`。相等判断认为没有换过。换成新的列表，或改用 `ChangeNotifier` 主动通知。
- q: ValueListenableBuilder 会不会替我 dispose
  tone: 平稳
  pause: 360
  say: 它会取消自己的订阅，不会放掉通知器。通知器是你创建的，就要在 `dispose` 里放掉。
