---
id: 10-strings-collections
module: Dart 语言
title: 字符串与集合
order: 10
---

# 总结

字符串用插值把值嵌进去。集合分 `List`、`Set`、`Map`。展开运算符和 `collection-if` 能在字面量里组装元素。集合默认可变。要不可变，就用不可变视图或不可变包装，或者你自己不要去改。

<!-- section: 专业讲解 -->
## 组装

- `'$name'` 和 `'${name.length}'` 都是插值
- `List` 有序，`Set` 不重复，`Map` 用键对应值
- `...` 把另一份集合的元素摊进来
- 字面量里的 `if`，按条件决定放不放这个元素
- 普通集合默认可变
- `List.unmodifiable` 是一份不能改的新列表
- `dart:collection` 里的 `UnmodifiableListView` 是不可变视图，源列表变了，视图会跟着变

<!-- section: 大白话 -->
## 大白话

- 插值像把词填进留好的格子
- 普通集合像活页，`const` 和不可变包装像装订好的

<!-- section: 怎么用 -->
## 怎么用

```dart
void main() {
  const name = 'Ada';
  const signedIn = true;
  const more = ['settings'];
  final line = 'Hello $name';
  final menu = <String>[
    'home',
    if (signedIn) 'account',
    ...more,
  ];
  final ids = <int>{1, 2, 2};
  final scores = <String, int>{'Ada': 10};
  print('$line $menu $ids $scores');
}
```

- `signedIn` 不成立，`'account'` 就不会出现
- `Set` 里相同的值只留一份

<!-- section: 再讲深一点 -->
## 再讲深一点

- `...?` 可以在那份集合是空值时跳过展开
- `collection-if` 的条件在运行时判断，它仍然是字面量的一部分
- 不可变视图不拷走元素。别人改了源列表，你这边会看见变化

<!-- section: 边界 -->
## 边界

- 空的 `{}` 是 `Map`，不是 `Set`。空的 `Set` 要写成 `<int>{}`
- 你自己约定不改，只是约定。要靠类型拦住，就用不可变包装

<!-- section: 收束 -->
## 留下这句

- 字符串用插值。集合默认能改。要锁住，就用不可变包装或不可变视图，或者不要去改

# 口播

## 开场

- tone: 平稳
  pause: 380
  say: 这节看字符串，还有 `List`、`Set`、`Map`。

- tone: 放慢
  pause: 340
  say: 你先会把它们组装出来，再记住默认可变这件事。

## 专业讲解

- tone: 平稳
  pause: 340
  say: 插值用美元符号把变量放进字符串。要放一个表达式，就再加一层花括号。

- tone: 平稳
  pause: 360
  say: `List` 保顺序。`Set` 让相同的值只留一份。`Map` 用键去找值。

- tone: 加重
  pause: 380
  stress: 摊进来
  say: 字面量里可以用展开运算符，把另一份集合的元素摊进来。

- tone: 平稳
  pause: 340
  say: `collection-if` 也写在字面量里。条件不成立，那个元素就不会放进去。

- tone: 问句
  pause: 440
  say: 这些集合写出来之后，还能不能改？

- tone: 平稳
  pause: 360
  say: 普通的能改。你要不能改的，再用 `List.unmodifiable`，或者用不可变视图。

## 大白话

- tone: 放慢
  pause: 420
  say: 插值像一句留好格子的话。格子留给名字，你别再手工把几段拼起来。

- tone: 平稳
  pause: 360
  say: 普通集合像活页本，你可以加页。`const` 或者不可变包装，才像装订死了。

## 怎么用

- tone: 平稳
  pause: 380
  say: 屏幕上 `line` 把 `name` 嵌进句子。`signedIn` 成立，`menu` 里才有 `'account'`。

- tone: 平稳
  pause: 320
  say: 再把 `more` 里的 `settings` 摊进来。

- tone: 平稳
  pause: 340
  say: `ids` 里把同一个值写了两次。`Set` 只会留下一个。`scores` 则是用名字去对一个值。

## 再讲深一点

- tone: 平稳
  pause: 400
  say: 展开如果遇到可能是空值的集合，可以在展开前加问号。是空值就跳过，不会因此报错。

- tone: 加重
  pause: 420
  say: `List.unmodifiable` 是一份新的、不能改的列表。`UnmodifiableListView` 才是视图。原来的那份若被改了，视图会跟着变。

## 边界

- tone: 平稳
  pause: 360
  say: 你写一个空的花括号，得到的是 `Map`，不是 `Set`。空的 `Set` 要把类型写上。

- tone: 平稳
  pause: 340
  say: 约定自己不去改，也可以。可那只是约定，别人仍然改得动。

## 收束

- tone: 收束
  pause: 480
  say: 字符串用插值，别拼得七零八落。

- tone: 收束
  pause: 520
  say: 集合默认可变。要不可变，就用相应的包装或视图，或者不要去改它。

# 可以向老师问

- q: 字面量写出来的列表能改吗
  tone: 平稳
  pause: 320
  say: 普通列表能改。写成 `const`，或用 `List.unmodifiable`，才不能通过这份列表去改。
- q: 空的花括号是 `Set` 吗
  tone: 平稳
  pause: 320
  say: 不是。空的花括号是 `Map`。空的 `Set` 要把类型写在花括号前面，比如写上 `int`。
