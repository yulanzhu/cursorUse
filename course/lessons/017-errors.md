---
id: 17-errors
module: Dart 语言
title: 异常和 Error
order: 17
---

# 总结

`Exception` 是你预料到的失败。`Error` 是程序错误。用 `try`、`catch`、`finally` 接住失败、做完收尾。`rethrow` 保留原来的堆栈。不要用空的 `catch` 把错误吃掉。

<!-- section: 专业讲解 -->
## 失败和错误

- 输入不合法这种，用 `Exception`
- 断言失败、类型用错、`late` 被提前读，这种是 `Error`
- `on Exception` 接不住 `Error`
- 什么类型都不写的 `catch`，两种都接
- `finally` 无论成功还是失败都会执行
- `rethrow` 保留原来的堆栈。重新 `throw` 那个对象，堆栈从这一行再算

<!-- section: 大白话 -->
## 大白话

- 预料中的翻车要有预案。程序写错了，应该暴露，不要装作没事

<!-- section: 怎么用 -->
## 怎么用

```dart
int? readCount(String text) {
  try {
    return int.parse(text);
  } on FormatException {
    return null;
  }
}
```

- `int.parse` 遇到不是数字的文本，抛 `FormatException`
- 这里把预料中的失败变成空值。程序错误不要这样吞

<!-- section: 再讲深一点 -->
## 再讲深一点

- `catch (error, stack)` 能同时拿到原来的堆栈
- `finally` 用来收尾。不要在里面把异常吃掉
- `rethrow` 只能写在 `catch` 里，它不改堆栈

<!-- section: 边界 -->
## 边界

- 空的 `catch` 会把 `Error` 一起吃掉。表面没事，问题还在
- 能处理的才处理。程序错误拿去修，不要拿去兜住

<!-- section: 收束 -->
## 留下这句

- 预料中的失败用 `Exception`。程序错误让它现形。还要往外抛时，用 `rethrow`

# 口播

## 开场

- tone: 放慢
  pause: 420
  say: 这节分两种会炸的情况。一种是你预料中的，一种是程序写错了。

- tone: 平稳
  pause: 320
  say: 你处理它们的方式，不该一样。

## 专业讲解

- tone: 平稳
  pause: 380
  say: `Exception` 是失败。比如文本不是数字，`int.parse` 会抛 `FormatException`。

- tone: 加重
  pause: 420
  stress: 程序错误
  say: `Error` 是程序错误。断言被打破、类型用错、`late` 还没赋值就被读，都算这一类。

- tone: 平稳
  pause: 380
  say: `on Exception` 只接你点名的失败。`Error` 会继续往外走。

- tone: 问句
  pause: 440
  say: 那写一个什么都不标注的 `catch`，会怎样？

- tone: 平稳
  pause: 360
  say: 空的 `catch` 会把失败和程序错误一起吃掉。问题还在，你只是看不见了。

## 大白话

- tone: 放慢
  pause: 420
  say: 预料中的翻车，像路滑。你该准备预案，告诉使用的人这份文本不能用。

- tone: 平稳
  pause: 400
  say: 程序写错，像刹车装反了。你把警报拆掉，问题不会消失，只会更难查。

- tone: 平稳
  pause: 340
  say: `finally` 像下车一定要锁门。顺利还是翻车，这件事都要做。

## 怎么用

- tone: 平稳
  pause: 420
  say: 屏幕上的 `readCount` 只处理 `FormatException`。文本不是数字，它返回空值。

- tone: 平稳
  pause: 340
  say: 这是预料中的失败，所以走 `Exception` 这条路是合适的。

- tone: 平稳
  pause: 320
  say: 成功和失败之后都要收尾，就把收尾放进 `finally`。

## 再讲深一点

- tone: 加重
  pause: 420
  say: 你在 `catch` 里写 `rethrow`，原来的堆栈会保留。问题从哪一行来，还看得清。

- tone: 平稳
  pause: 400
  say: 你要是重新 `throw` 那个刚接住的对象，堆栈会从这一行再算，根因就丢了。

- tone: 平稳
  pause: 320
  say: `catch` 可以同时接住错误和堆栈。需要记下来的时候，用得上。

## 边界

- tone: 平稳
  pause: 380
  say: 不要写空的 `catch`。那一行会把 `Error` 吃掉，调试时你找不到原因。

- tone: 平稳
  pause: 340
  say: 程序错误该修。不要在业务分支里，把 `Error` 当成普通失败处理掉。

## 收束

- tone: 收束
  pause: 460
  say: 预料中的失败，用 `Exception` 接住。

- tone: 收束
  pause: 520
  say: 程序错误让它暴露。还要继续抛时，用 `rethrow`，把原来的堆栈留下。

# 可以向老师问

- q: 为什么不把所有错误都 `catch` 住
  tone: 平稳
  pause: 320
  say: `Error` 是程序写错了。你把它吃掉，表面像没事，问题还在。预料中的失败，才用 `Exception` 去处理。
- q: `rethrow` 和再次抛出有什么差别
  tone: 平稳
  pause: 320
  say: `rethrow` 留下原来的堆栈。你重新 `throw` 那个对象，堆栈会从这一行再算，根因就丢了。
