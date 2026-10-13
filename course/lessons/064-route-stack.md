---
id: 64-route-stack
module: 导航
title: 路由栈和返回值
order: 64
---

# 总结

`Navigator.push` 把一条路由压进栈顶。`pop` 把栈顶弹掉，并可以带结果。`await push` 就能接到这个结果。

<!-- section: 专业讲解 -->
## 压栈和弹栈

- `push` 让新页面盖在当前页面上面，下面的页面仍然留在栈里
- `pop` 去掉栈顶。可以带一个结果，也可以不带
- `await` 当时的 `push`，`Future` 会在弹出时完成
- 用户按系统返回、没有带结果时，你接到的是 `null`
- 不要把栈底也弹掉。先看 `canPop`
- 结果只在这条路由被弹出时交回一次，不是一条持续的流

<!-- section: 大白话 -->
## 大白话

- 像一叠纸。`push` 是再盖一张，`pop` 是拿走最上面那张
- 拿走时可以在背面写一个答案。下面那张一直在等这个答案

<!-- section: 怎么用 -->
## 怎么用

```dart
final saved = await Navigator.push<bool>(
  context,
  MaterialPageRoute(builder: (_) => const Editor()),
);

Navigator.pop(context, true);
```

- 编辑页保存时 `pop` 回 `true`，取消时回 `false` 或 `null`
- 下面的页面在 `await` 之后再决定要不要刷新

<!-- section: 再讲深一点 -->
## 再讲深一点

- 系统返回和你调用的 `pop`，都会完成同一个 `Future`
- 对话框也是一条路由，所以它的结果同样用 `pop` 带回来
- 页面仍然留在栈上时，下面那一页拿不到中途的修改
- 想在离开前拦住返回，用 `PopScope`，不要在结果里事后补救

<!-- section: 边界 -->
## 边界

- 结果不是流。页面仍然在上面时，不要指望下面已经看见每次按键
- 栈里已经没有页面时再 `pop`，屏幕会没有路由
- `push` 不负责替换或清掉。那是下一节的事

<!-- section: 收束 -->
## 留下这句

- `push` 压栈，`pop` 弹栈。`pop` 可以带结果，`await push` 就能接到

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节讲路由栈。新页面怎么盖上去，旧页面怎么把一个结果等回来。
- tone: 平稳
  pause: 320
  say: 你要分清两下。压进去是 `push`，弹出来是 `pop`。结果跟着弹出来的那一下走。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `Navigator.push` 往栈顶压一条新路由。当前页面仍然在下面，只是被盖住了。
- tone: 平稳
  pause: 340
  say: `pop` 把栈顶弹掉。你可以带一个结果，比如真或假。不带的话，等在外面的人接到的是 `null`。
- tone: 加重
  pause: 400
  stress: await
  say: 你 `await` 当时的 `push`，这个 `Future` 会在路由被弹出时完成。系统返回和你自己的 `pop`，完成的是同一个等待。
- tone: 平稳
  pause: 340
  say: 所以跳出去之前要想好，回来时要不要一个明确的答案。编辑页保存，就可以 `pop` 回 `true`。
- tone: 问句
  pause: 480
  say: 页面仍然盖在上面、人仍在编辑时，下面那一页能看见中途的每一次修改吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 把它想成一叠纸。`push` 是再盖一张，`pop` 是拿走最上面那张。
- tone: 平稳
  pause: 340
  say: 拿走的时候可以在背面写一个答案。下面那张纸一直在等。答案只在拿走的这一下交回去，不是写一行它就看见一行。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上先 `await` 一个布尔。编辑页用 `MaterialPageRoute` 盖上去。
- tone: 平稳
  pause: 320
  say: 保存时 `Navigator.pop` 带回 `true`。取消可以带回 `false`，或者什么都不带。
- tone: 加重
  pause: 380
  say: 下面的页面要等 `await` 结束，再决定要不要刷新。不要在编辑页仍然开着的时候，就假设结果已经到了。

## 再讲深一点

- tone: 平稳
  pause: 360
  say: 对话框也是一条路由。它的确认结果同样用 `pop` 带出来，外面同样用 `await` 接。
- tone: 放慢
  pause: 400
  say: 想在离开前拦住系统返回，用 `PopScope`。等结果已经是 `null` 再补救，用户其实已经离开了。
- tone: 平稳
  pause: 340
  say: 栈底那一页不要随便 `pop`。先看 `canPop`。栈里已经没有页面，屏幕上就没有路由了。

## 边界

- tone: 平稳
  pause: 340
  say: 这个结果不是一条流。页面仍然留在栈上时，下面拿不到中途的修改。
- tone: 加重
  pause: 380
  say: `push` 只是再盖一张。要换掉当前页，或把一截栈清掉，用下一节的那两个方法，不要用普通 `pop` 去硬凑。

## 收束

- tone: 收束
  pause: 480
  say: `Navigator.push` 压栈，`pop` 弹栈。
- tone: 收束
  pause: 520
  say: `pop` 可以带结果。你 `await push`，就能把这个结果接到。

# 可以向老师问

- q: 不带结果时 await 接到什么
  tone: 平稳
  pause: 340
  say: 接到 `null`。系统返回通常就是这样。你要区分保存和取消，就在 `pop` 里明确带回 `true` 或 `false`。
- q: 编辑尚未结束，列表能更新吗
  tone: 平稳
  pause: 360
  say: 靠这次 `await` 不能。结果要等路由弹出才完成。页面仍然盖在上面时，下面拿不到中途的修改。
