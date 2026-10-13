---
id: 55-form
module: 手势与表单
title: TextField 与 Form 校验
order: 55
---

# 总结

`TextEditingController` 读写输入框里的文字。`Form` 和 `FormField` 把校验收在一起。校验函数返回字符串就是错误，返回 `null` 就是通过。控制器要 `dispose`。

<!-- section: 专业讲解 -->
## 文字和规则

- 读 `controller.text`，也可以把 `text` 设成新内容
- `addListener` 能在文字变化时收到通知
- `TextFormField` 是带校验的输入框，放进 `Form`
- `FormState.validate` 会跑每一个校验函数
- 返回一段字符串，界面把这段话当成错误
- 返回 `null` 才是通过。返回一串没有字符的文字，仍然是一段字符串，不算通过
- 有控制器时不要再写 `initialValue`

<!-- section: 大白话 -->
## 大白话

- 控制器像你拿着的那张草稿纸，输入框只是把纸上的字显示出来
- `Form` 像收卷。你说开始检查，每一题才把自己的错误交出来

<!-- section: 怎么用 -->
## 怎么用

```dart
final formKey = GlobalKey<FormState>();
final nameController = TextEditingController();

Form(
  key: formKey,
  child: TextFormField(
    controller: nameController,
    validator: (value) {
      if (value == null || value.isEmpty) {
        return '请填写名字';
      }
      return null;
    },
  ),
)

void submit() {
  if (formKey.currentState!.validate()) {
    save(nameController.text);
  }
}
```

- 控制器在 `State` 里创建，并在 `dispose` 里放掉
- `AutovalidateMode.onUserInteraction` 可以在用户一改就校验

<!-- section: 再讲深一点 -->
## 再讲深一点

- 在 `build` 里新造控制器，会把用户正在打的字换成空白的新控制器
- `validate` 通过，只说明规则满足，不说明网络或业务已经成功
- `onSaved` 和校验是两步。先通过，再 `save`
- 初始文字放进控制器，不要和 `initialValue` 同时出现

<!-- section: 边界 -->
## 边界

- `Form` 不发起请求，也不知道服务器认不认这段文字
- 不要用返回没有字符的字符串表示通过
- 父级交进来的控制器，子级不要 `dispose`

<!-- section: 收束 -->
## 留下这句

- 控制器读写文字，用完放掉。校验返回字符串是错，返回 `null` 是通过

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节把输入框里的文字，和这组输入算不算通过，分成两件事。
- tone: 平稳
  pause: 320
  say: 文字交给 `TextEditingController`。规则交给 `Form`。两个都要会放掉自己的东西。

## 专业讲解

- tone: 平稳
  pause: 360
  say: 控制器能读 `text`，也能把 `text` 写成新的内容。你监听它，文字一变就能做反应。
- tone: 平稳
  pause: 340
  say: `TextFormField` 是一种 `FormField`。外面套上 `Form`，再用 `GlobalKey` 拿到 `FormState`，就能一次 `validate`。
- tone: 加重
  pause: 420
  stress: 返回 `null`
  say: 校验函数返回一段字符串，就是错误，这段话会显示出来。返回 `null`，才是通过。不要返回一串没有字符的文字。
- tone: 平稳
  pause: 340
  say: 那一串看起来什么都没有，它仍然是字符串，框架仍会当成错误。通过只有 `null` 这一种说法。
- tone: 问句
  pause: 480
  say: 控制器和 `initialValue` 一起写上，你猜输入框会听谁的？

## 大白话

- tone: 放慢
  pause: 420
  say: 控制器像你手里的草稿纸。输入框只是把纸上的字映到屏幕上。纸丢了，字也就没了。
- tone: 平稳
  pause: 340
  say: `Form` 像收卷。你说开始检查，每一格才把自己的问题交出来。它不替你把卷子送到另一个办公室。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的校验看 `value`。没有文字，就返回一句请填写名字。有文字，就返回 `null`。
- tone: 平稳
  pause: 320
  say: 提交时先 `validate`。通过了，再读 `nameController.text` 去保存。
- tone: 加重
  pause: 380
  say: 控制器要在 `dispose` 里放掉。它如果活在 `build` 里，每次重建都会换成新的，用户正在打的字会被清掉。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: `AutovalidateMode.onUserInteraction` 让用户一改就校验。你也可以等到提交时再查。两种都走同一个校验函数。
- tone: 放慢
  pause: 400
  say: 有控制器时，初始文字写进控制器，不要再给 `initialValue`。两个一起来，框架会拒绝这种写法。
- tone: 平稳
  pause: 340
  say: `onSaved` 是校验通过之后的另一步。不要在校验函数里偷偷做保存。校验只回答过不过。

## 边界

- tone: 平稳
  pause: 340
  say: 规则通过，不表示服务器会接受。`Form` 看不见网络，也看不见业务上的余额或权限。
- tone: 加重
  pause: 380
  say: 谁创建控制器，谁放掉。父级交进来的，子级只使用，不要在自己的 `dispose` 里放掉。

## 收束

- tone: 收束
  pause: 480
  say: `TextEditingController` 读写文字，用完要 `dispose`。
- tone: 收束
  pause: 520
  say: 校验返回字符串就是错误，返回 `null` 就是通过。

# 可以向老师问

- q: 返回没有字符的字符串算通过吗
  tone: 平稳
  pause: 360
  say: 不算。它仍然是一段字符串，会当成错误。通过必须返回 `null`。
- q: 为什么不能在 build 里创建控制器
  tone: 平稳
  pause: 360
  say: 因为 `build` 会反复走。新控制器把旧文字换掉，用户正在输入的内容会丢，而且旧的往往没被放掉。
