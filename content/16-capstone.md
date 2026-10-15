# 串讲

## lesson feature-walkthrough
title: 一个小功能从界面走到数据

### 定义
visual: concept
caption: 一条新闻列表
points: 界面画列表 | 状态分三种 | 仓库走网络

画面标题是一条新闻列表，下面三条是界面画列表、状态分三种、仓库走网络。界面用 ListView 把标题画出来，加载、数据和错误分成三种样子。状态记住现在是哪一种，数据回来后再换成列表。仓库负责去网络取 JSON，再用 fromJson 收成文章，界面不直接写请求。

### 类比
visual: compare
left: 柜台自己去进货
right: 柜台只负责陈列
caption: 柜台和仓库分开
points: 请求写在组件里 | 三种样子糊住 | 界面只负责画 | 状态仓库网络分开

左边一栏是柜台自己去进货，两行写着请求写在组件里、三种样子糊住。右边一栏是柜台只负责陈列，两行写着界面只负责画、状态仓库网络分开。柜台一边招呼客人一边跑去进货，加载中的桌子上会突然摆出半条标题。右边让界面按状态陈列，进货交给仓库和网络。

### 机制
visual: flow
caption: 四步走到网络
points: ListView 分三态 | 记住加载或错误 | 仓库发起读取 | http.get 与 fromJson

纵向四步的标签是界面、状态、仓库、网络。界面下面写着 ListView 分三态，加载、数据和错误分开画。状态下面写着记住加载或错误，变化之后只通知该刷新的那一块。仓库下面是仓库发起读取，网络下面是 http.get 与 fromJson，响应体解析成文章再交回仓库。

### 示例
visual: code
caption: 请求然后解析
points: http.get | 状态码 | fromJson

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class Article {
  Article.fromJson(Map<String, Object?> json) : title = json['title'] as String;
  final String title;
}

Future<List<Article>> loadNews() async {
  final response = await http.get(Uri.parse('https://example.com/news'));
  if (response.statusCode != 200) throw StateError('读取失败');
  final data = jsonDecode(response.body) as List<Object?>;
  return [
    for (final item in data) Article.fromJson(item as Map<String, Object?>),
  ];
}
```

代码是仓库里的读取。http.get 向网络要新闻，状态码达不到成功时抛出失败，调用方把状态切到错误。成功时把响应体解析成列表，每一项用 fromJson 收成文章。界面上的 ListView 只消费这些标题，加载中和错误两态由状态决定，不写在这个函数里，三种样子在界面上彼此分开。

### 你会看到
visual: phone
caption: 三种样子分开
points: 加载中 | 标题列表 | 读取失败

手机框顶上是三种样子分开，框里三行是加载中、标题列表、读取失败。请求还在路上时，画面是加载中，列表还没出现。数据回来之后，ListView 按标题往下排。网络失败或解析失败时，画面换成读取失败，不会留下半截列表，三种样子对应状态里的三种值。

### 常见坑
visual: warning
caption: 界面里直接请求
points: 组件里写 http.get | 加载和数据叠住 | 失败仍显示旧列表

错误卡上三行是组件里写 http.get、加载和数据叠住、失败仍显示旧列表。请求若写在界面的 build 里，重建一次就会再打一次网络。加载中的圈和已经解析的标题叠在一起，用户不知道该看哪一块。失败时若不切到错误，上一轮的列表会像成功一样留着，状态要把这三态分开。

### 收束
visual: path
caption: 串完去按顺序练
points: 界面到状态 | 状态到仓库 | 再按顺序练

画面上三步，界面用 ListView 分开加载、数据和错误，状态把这三态记下来，仓库再用 http.get 和 fromJson 完成网络这一步。这条小路可以换成你自己的题目，仍从界面走到状态，再走到仓库和网络，题目可以小，但四步不要省。下一课是学完后的练习顺序。

## lesson practice-path
title: 学完后的练习顺序

### 定义
visual: concept
caption: 六步练习
points: 计数器到列表 | 跳转和请求 | 主题和测试

画面标题是六步练习，下面三条是计数器到列表、跳转和请求、主题和测试。练习从计数器开始，把状态和按钮走通，再做列表。然后做页面跳转，再请求一份 JSON。换主题看应用级的配置，最后写一个 Widget 测试，把按钮在测试里点一遍，确认加一之后数字真的变了。

### 类比
visual: compare
left: 一上来盖整栋
right: 按工序做小件
caption: 先做小件
points: 跳过计数器 | 没有测试 | 先做计数和列表 | 再做跳转和请求

左边一栏是一上来盖整栋，两行写着跳过计数器、没有测试。右边一栏是按工序做小件，两行写着先做计数和列表、再做跳转和请求。整栋楼的图纸还没对应到手上的那一砖，返工会很大。右边先做计数器和列表，再做页面跳转和请求 JSON，主题和 Widget 测试留在后面。

### 机制
visual: path
caption: 六步按编号
points: 计数器 | 列表 | 页面跳转 | 请求 JSON | 换主题 | Widget 测试

画面上六步，依次是计数器、列表、页面跳转、请求 JSON、换主题，最后写一个 Widget 测试。计数器先把状态和按钮走通，列表再练按需创建的长列表。页面跳转把参数带过去，请求 JSON 接上仓库和 fromJson。换主题看应用级配置，Widget 测试用 pumpWidget、find、tap 和 pump 把按钮点一遍，期望的文字要在泵完之后出现。

### 示例
visual: code
caption: 练习从计数开始
points: 有状态 | 点按加一 | 文字显示数字

```dart
import 'package:flutter/material.dart';

class CounterPage extends StatefulWidget {
  const CounterPage({super.key});
  @override
  State<CounterPage> createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  int count = 0;
  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () => setState(() => count += 1),
      child: Text('$count'),
    );
  }
}
```

代码是练习的第一步，一个计数器。点按按钮就加一，文字显示当前的数字，状态留在 State 里。这一页走通之后，再把文字换成列表，然后做页面跳转。请求 JSON、换主题和 Widget 测试按后面的编号继续，不要从测试或主题倒着开始，每一项都以前一项已经走通为前提。

### 你会看到
visual: phone
caption: 数字会跟着加
points: 起始是 0 | 点一下变成 1 | 还只有这一页

手机框顶上是数字会跟着加，框里三行是起始是 0、点一下变成 1、还只有这一页。这是计数器那一步，还没有列表，也没有第二个页面。数字停在按钮上，每次点按增加一。后面的练习才会出现跳转、JSON 和主题，这一屏先把加一做稳，数字和按钮都在同一页里。

### 常见坑
visual: warning
caption: 跳步就会卡住
points: 跳过计数器 | 列表一次建完 | 最后不做测试

错误卡上三行是跳过计数器、列表一次建完、最后不做测试。没有计数器就做复杂状态，按钮和重建对不上。列表若一次建出所有子组件，后面看性能时会先被这一处挡住。六步的最后一步是 Widget 测试，只把功能点完、不写测试，回归时没有东西帮你再点一次。

### 收束
visual: path
caption: 按编号做练习
points: 计数器和列表 | 跳转和 JSON | 主题和测试

画面上三步，把练习收成计数器、列表、页面跳转、请求 JSON、换主题和 Widget 测试。每一步都用得到前面的课，做完这一轮练习，页面、数据和测试就接在你自己的工程里。以后加功能，仍按这个顺序从最小的一块做起，先让最小的交互跑通，再往上加列表和请求。
