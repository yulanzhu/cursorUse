---
id: 44-feedback
module: 界面组件
title: 对话框、底部弹层和 SnackBar
order: 44
---

# 总结

`showDialog` 会压上一条对话框路由。`showModalBottomSheet` 也是一条模态路由。`SnackBar` 只是轻提示，不要拿它当确认框。

<!-- section: 专业讲解 -->
## 三条通道

- `showDialog` 把 `DialogRoute` 压进导航器，`await` 能接到 `pop` 带回的结果
- 系统返回会先弹出这条对话框路由
- `showModalBottomSheet` 同样压上模态路由，挡住后面的页面
- `Scaffold.bottomSheet` 是页面自己的槽，不是一条新路由
- `SnackBar` 由 `ScaffoldMessenger` 显示，会自己消失
- 必须让人做决定的事，用对话框，不要用轻提示

<!-- section: 大白话 -->
## 大白话

- 对话框像临时推过来的一扇门，要先关上它才能回到原来的房间
- 轻提示像门口闪一下的纸条，人可能根本没看见

<!-- section: 怎么用 -->
## 怎么用

```dart
final ok = await showDialog<bool>(
  context: context,
  builder: (dialogContext) {
    return AlertDialog(
      title: const Text('删除这张订单'),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(dialogContext, false),
          child: const Text('取消'),
        ),
        FilledButton(
          onPressed: () => Navigator.pop(dialogContext, true),
          child: const Text('删除'),
        ),
      ],
    );
  },
);

ScaffoldMessenger.of(context).showSnackBar(
  const SnackBar(content: Text('已保存')),
);
```

```dart
await showModalBottomSheet<void>(
  context: context,
  builder: (sheetContext) => const ShareSheet(),
);
```

- 对话框里的 `pop` 用 `builder` 给的上下文
- 轻提示不 `await` 一个必须回答的结果

<!-- section: 再讲深一点 -->
## 再讲深一点

- 模态路由会吃掉这一下返回，下面的页面先不会被弹出
- `ScaffoldMessenger` 放在导航器外面，当前页被弹出后，提示仍可以落到下面的骨架上
- 底部弹层要关，同样是 `pop`，不是把 `body` 里的一个布尔改掉

<!-- section: 边界 -->
## 边界

- 轻提示可以带一个可选动作，但用户可能错过，不能当成确认
- 对话框的上下文找不到导航器时，路由压不上去
- 不要用轻提示报告“删除成功”来代替删除前的确认

<!-- section: 收束 -->
## 留下这句

- 对话框和底部弹层是路由。`SnackBar` 是轻提示，不做确认框

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节分三种反馈。有的会压上一条新路由，有的只是闪一下就走。
- tone: 平稳
  pause: 300
  say: 你先记住，要人做决定的，和只是告诉人一声的，不是同一个组件。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `showDialog` 会往导航器上压一条对话框路由。下面的页面仍然在栈里，只是被盖住了。
- tone: 平稳
  pause: 340
  say: 你 `pop` 的时候可以带结果。外面 `await` 这次 `showDialog`，就能接到真或假。系统返回也会先弹这条路由。
- tone: 加重
  pause: 400
  stress: 模态路由
  say: `showModalBottomSheet` 同样是模态路由。它不是把一块组件偷偷塞进 `body`。
- tone: 平稳
  pause: 340
  say: `SnackBar` 不一样。它由 `ScaffoldMessenger` 显示，过一会儿自己消失，不压路由。
- tone: 问句
  pause: 480
  say: 删除这种必须让人点头的事，能不能只弹一条轻提示就当确认了？

## 大白话

- tone: 放慢
  pause: 420
  say: 对话框像临时推过来的一扇门。你要先把它关上，才能回到原来那间房。
- tone: 平稳
  pause: 340
  say: 轻提示像门口闪一下的纸条。人走很快时可能根本没看见。所以它不能代替那扇必须推开的门。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的删除确认，等的是一个布尔。取消交回假，删除交回真。
- tone: 加重
  pause: 400
  say: 注意 `pop` 用的是 `dialogContext`，也就是 `builder` 交进来的那个。用外面的上下文，可能把对话框下面的页面弹掉。
- tone: 平稳
  pause: 320
  say: 保存完成只是一声告知，所以走 `ScaffoldMessenger` 的 `SnackBar`，没有人必须回答它。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: `Scaffold` 自己也有一个 `bottomSheet` 槽。那一块跟着页面走，不是新路由。不要和 `showModalBottomSheet` 混名。
- tone: 放慢
  pause: 400
  say: 消息器放在导航器的外面。当前页已经被弹出时，轻提示仍然可以出现在下面那一页的骨架上。
- tone: 平稳
  pause: 320
  say: 底部弹层要关掉，仍然是对那条路由 `pop`。不是把 `body` 里的一个布尔改成假。

## 边界

- tone: 平稳
  pause: 340
  say: 轻提示可以带一个可选动作，比如撤销。用户可能错过，所以它仍然不是确认框。
- tone: 加重
  pause: 380
  say: 删除之前要人决定，用对话框。删除做完了再轻轻说一声，那才是 `SnackBar` 的位置。

## 收束

- tone: 收束
  pause: 480
  say: `showDialog` 和 `showModalBottomSheet` 都会压上路由。
- tone: 收束
  pause: 520
  say: `SnackBar` 只是轻提示。不要拿它当成确认框。

# 可以向老师问

- q: 底部弹层是不是 Scaffold 的 bottomSheet
  tone: 平稳
  pause: 380
  say: 不是。`showModalBottomSheet` 是一条新的模态路由。`Scaffold.bottomSheet` 只是这一页自己的槽，不单独占一条路由。
- q: 轻提示为什么不适合做删除确认
  tone: 平稳
  pause: 360
  say: 因为它会自己消失，用户可能看不到，也不必回答。确认要压一条对话框路由，并等 `pop` 带回的结果。
