---
id: 71-json
module: 数据
title: JSON 与模型
order: 71
---

# 总结

把 JSON 译成你自己的类。`fromJson` 可以手写，也可以用代码生成。界面不要直接拿 `Map` 里的字符串键。

<!-- section: 专业讲解 -->
## 译成自己的类

- `jsonDecode` 出来的是 `dynamic`，键和类型都尚未被你的程序约束
- `fromJson` 把字段取出来。类型不对，就当成解析失败，不要让半成品进界面
- 手写适合字段少、你想看清每一条规则的时候
- 代码生成适合字段多、映射重复的时候。生成物仍然是 `fromJson`
- 界面只认 `user.name` 这种模型，不认 `map['name']`
- 解析放在边界上做完，不要写进 `build`

<!-- section: 大白话 -->
## 大白话

- JSON 像一封用别人格式写的信。你要译成自己的表格，再拿去用
- 界面不应该翻那封信的原件，去猜某个键叫什么

<!-- section: 怎么用 -->
## 怎么用

```dart
class User {
  const User({required this.name});
  final String name;

  factory User.fromJson(Map<String, dynamic> json) {
    final name = json['name'];
    if (name is! String) {
      throw const FormatException('name');
    }
    return User(name: name);
  }
}
```

- 界面写 `Text(user.name)`，不写 `map['name']`
- 生成工具会帮你写重复的映射，你仍然要知道失败算解析失败

<!-- section: 再讲深一点 -->
## 再讲深一点

- 键不存在、类型是数字而你要字符串，都在 `fromJson` 里变成明确的失败
- 不要把 `Map` 交进组件，让组件自己 `as String`
- 列表里的每一项也要译成类，不要让界面遍历一串 `dynamic`
- 生成代码要有一份样例能跑通。工具不知道哪个字段在业务上必须有

<!-- section: 边界 -->
## 边界

- 模型不要发起请求，也不要 `setState`
- 手写和生成可以并存，但界面看到的都应该是类，不是 `Map`
- 解析失败不要伪装成网络失败

<!-- section: 收束 -->
## 留下这句

- JSON 在边界上译成类。`fromJson` 可以手写或生成。界面只拿模型，不拿字符串键

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节把字节变成你自己的类。界面后面不应该再出现一串字符串键。
- tone: 平稳
  pause: 320
  say: `fromJson` 可以你自己写，也可以让工具生成。两边的角色一样，都是翻译。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `jsonDecode` 给你的是 `dynamic`。键在不在、值是不是字符串，这时候都尚未被你的类约束住。
- tone: 平稳
  pause: 340
  say: `fromJson` 负责把字段取出来。类型不对，就抛成解析失败。不要把半成品 `Map` 交进界面，让界面再去猜。
- tone: 加重
  pause: 400
  stress: 字符串键
  say: 界面拿 `user.name`，不拿 `map` 里的字符串键。键名只出现在边界上的翻译里。
- tone: 平稳
  pause: 340
  say: 字段少，可以手写，你能看清每一条规则。字段多、映射重复，就用代码生成。生成出来的仍然是 `fromJson`。
- tone: 问句
  pause: 480
  say: 组件的 `build` 里出现 `jsonDecode`，你认为这算边界上的翻译吗？

## 大白话

- tone: 放慢
  pause: 420
  say: JSON 像一封用别人格式写的信。你先译成自己的表格，后面的人只看表格。
- tone: 平稳
  pause: 340
  say: 界面如果去翻原件，就要记住每个键怎么拼。键一改，所有界面都要跟着改。翻译放在一个位置，就只改一个位置。

## 怎么用

- tone: 平稳
  pause: 340
  say: 屏幕上的 `User.fromJson` 取出 `name`。不是字符串，就抛 `FormatException`。这是解析失败，不是网络失败。
- tone: 平稳
  pause: 320
  say: 界面只写 `user.name`。你在组件里看不到 `map['name']`。
- tone: 加重
  pause: 380
  say: 生成工具省的是重复的样板。它不替你决定哪个字段必须有。必须有的，要在模型里写清楚，并用一份样例跑通。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 键不存在，或者值是数字而你要的是字符串，都要在 `fromJson` 里失败。不要留到按钮被按下时才 `as String`。
- tone: 放慢
  pause: 400
  say: 列表里的每一项也译成类。界面遍历的是 `User`，不是一串 `dynamic`。否则类型问题会散进每一个组件。
- tone: 平稳
  pause: 340
  say: 解析仍然放在 `build` 外面。`build` 可能反复走，翻译不应该跟着反复做，更不应该在那里抛一半、画一半。

## 边界

- tone: 平稳
  pause: 340
  say: 模型不要发起请求，也不要拿 `BuildContext`。它只是数据的形状。
- tone: 加重
  pause: 380
  say: 解析失败不要伪装成没网。用户会去再试一次网络，但真正的问题是结构和约定对不上。

## 收束

- tone: 收束
  pause: 480
  say: 把 JSON 译成自己的类。`fromJson` 可以手写，也可以生成。
- tone: 收束
  pause: 520
  say: 界面不要直接拿 `Map` 里的字符串键。键只留在边界上。

# 可以向老师问

- q: 为什么不能在界面里写 map 的键
  tone: 平稳
  pause: 360
  say: 因为键名和类型检查会散到每个组件。改一个字段，就要改很多界面。翻译收在 `fromJson`，界面只认模型。
- q: 手写和代码生成怎么选
  tone: 平稳
  pause: 340
  say: 字段少、你想看清规则，就手写。字段多、映射重复，就生成。生成出来的仍然是 `fromJson`，失败仍然算解析失败。
