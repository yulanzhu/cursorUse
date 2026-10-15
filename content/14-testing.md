# 测试、调试、性能

## lesson unit-tests
title: 单元测试

### 定义
visual: concept
caption: 不启动界面
points: package:test | test 与 expect | 只验输入输出

画面标题是不启动界面，下面三条是 package:test、test 与 expect、只验输入输出。单元测试用 package:test 里的 test 包住一组安排，用 expect 比对实际值和期望值。它不创建 Widget，也不把应用跑起来。纯函数、解析和仓库里的计算，适合放在这一层先钉住，失败时也只指向这一处逻辑。

### 类比
visual: compare
left: 整车才检查
right: 零件单独量
caption: 零件不必上车
points: 一启动就慢 | 界面被拉起 | 不启动界面 | 只比输入输出

左边一栏是整车才检查，两行写着一启动就慢、界面被拉起。右边一栏是零件单独量，两行写着不启动界面、只比输入输出。一个计数函数有没有算错，不必先把整页画出来。右边这种量法就是单元测试，输入一组标题，输出一个数字，对不上就立刻失败。

### 机制
visual: pyramid
caption: 底层最宽
points: 集成测试 | Widget 测试 | 单元测试

金字塔上窄下宽，顶层最窄写着集成测试，中间一层是 Widget 测试，最底下最宽的一层写着单元测试。这一课站在底层，用 package:test 的 test 和 expect 检查纯逻辑，不启动界面。上面两层以后再碰组件和真机，数量会少很多，日常能反复跑的就是这层最宽的底。

### 示例
visual: code
caption: 只比一个数字
points: test 包住 | expect 比对 | 没有界面

```dart
import 'package:test/test.dart';

int unreadCount(List<String> titles) => titles.length;

void main() {
  test('未读条数', () {
    expect(unreadCount(['早报', '晚报']), 2);
  });
}
```

代码从 package:test 引入 test 和 expect。unreadCount 只数标题有几条，test 把这次检查包起来，expect 要求结果是 2。这里没有 pumpWidget，也没有 MaterialApp，界面不会启动。标题列表换成空的，期望值跟着改成 0，这条测试就换成另一种输入，计算若写错，报告会直接指出这一条，界面始终不会被拉起来。

### 你会看到
visual: phone
caption: 测试不画页面
points: 两条标题 | 结果是 2 | 没有按钮

手机框顶上是测试不画页面，框里三行是两条标题、结果是 2、没有按钮。这三行是在说明输入和期望，不是一棵已经跑起来的界面树。早报和晚报送进函数，出来的数字应是 2。对不上时，失败出现在测试报告里，屏幕上不会多出一个页面。

### 常见坑
visual: warning
caption: 为纯函数启动界面
points: 拉起整个应用 | 忘了 expect | 把界面放进这层

错误卡上三行是拉起整个应用、忘了 expect、把界面放进这层。纯函数却去启动整套应用，测试会变慢，失败时也不知道是计算错了还是界面没画出来。只写 test、不写 expect，函数跑完也不会判定成败。需要点按钮的检查留给上面两层，这一层保持不启动界面。

### 收束
visual: path
caption: 底层之后看组件
points: 用 test | 用 expect | 再测组件

画面上三步，先用 package:test 的 test 把检查包住，再用 expect 比对结果，然后去看会把组件画出来的那一层。金字塔中间那一层才碰界面，而且仍然不需要真机，底层这些纯函数的检查可以一直留在最快的位置，改一个解析也不必把整页重新跑起来。下一课是 Widget 测试。

## lesson widget-tests
title: Widget 测试

### 定义
visual: concept
caption: 在测试里点组件
points: testWidgets | pumpWidget | find tap pump

画面标题是在测试里点组件，下面三条是 testWidgets、pumpWidget、find tap pump。Widget 测试使用 flutter_test。testWidgets 提供一个测试器，pumpWidget 把一棵界面树画进测试环境，find 按文字或类型查找，tap 模拟点按，pump 再推进一帧。它不需要真机，完整的用户路径留到更上面的那一层，这一层只负责把组件画出来再点一下。

### 类比
visual: compare
left: 真机上点一遍
right: 测试台里点
caption: 按钮放上测试台
points: 要连设备 | 又慢又飘 | 泵出一棵树 | 查找再点按

左边一栏是真机上点一遍，两行写着要连设备、又慢又飘。右边一栏是测试台里点，两行写着泵出一棵树、查找再点按。一颗按钮会不会把文字从甲改成乙，可以放在测试台上看。右边先把树泵出来，找到那一行字，点下去，再泵一帧看结果。

### 机制
visual: pyramid
caption: 中间这一层
points: 集成测试 | Widget 测试 | 单元测试

金字塔上窄下宽，顶层是集成测试，中间是 Widget 测试，底层最宽的是单元测试。这一课看中间那一层。它用 flutter_test 的 testWidgets 包住一次交互，pumpWidget 画出组件，find 定位，tap 点按，pump 让变化落到下一帧。底层不画树，顶层才上真机或模拟器，中间这一层专门负责把组件画出来再点一下。

### 示例
visual: code
caption: 泵出再点一下
points: pumpWidget | find 与 tap | 再 pump

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('点按标题', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Text('新闻')));
    expect(find.text('新闻'), findsOneWidget);
    await tester.tap(find.text('新闻'));
    await tester.pump();
  });
}
```

代码用 testWidgets 打开一次 Widget 测试。pumpWidget 把写着新闻的页面送进测试环境，find.text 确认这行字有一个。tap 点在这行字上，pump 把这一帧推进去。这里还没有真机，也没有网络，若点按之后文字会变，就在 pump 之后再写一次 expect，确认文字已经跟着点按更新，旧文字应当消失。

### 你会看到
visual: phone
caption: 测试里的一页
points: 新闻两个字 | 被点了一下 | 又推进一帧

手机框顶上是测试里的一页，框里三行是新闻两个字、被点了一下、又推进一帧。这页是 pumpWidget 画出来的测试画面，上面没有桌面图标，也没有系统权限框，它只存在于测试进程里。find 能找到新闻，tap 落在它上面。pump 之后，该出现的新文字若没出现，测试就会失败。

### 常见坑
visual: warning
caption: 点完没有推进
points: 忘了 pump | find 对不上 | 在这里打真网络

错误卡上三行是忘了 pump、find 对不上、在这里打真网络。tap 之后状态已经改了，界面却要等 pump 才重画，不泵就还看见旧文字。find 的字符串和组件上的文字差一个字，点击会落空，报告里会写找不到目标。这一层应使用假的数据，真的接口和真机路径留给集成测试。

### 收束
visual: path
caption: 组件之后上真机
points: 泵出组件 | 查找并点按 | 再看整条路径

画面上三步，先 pumpWidget 把树画出来，再用 find、tap 和 pump 完成一次交互，然后把整条路径放到设备上。金字塔顶上那一层数量少，但跑的是真环境，要连上真机或模拟器才会真正执行，启动和插件也会按设备的样子出现。下一课是集成测试概念。

## lesson integration-tests
title: 集成测试概念

### 定义
visual: concept
caption: 跑在设备上
points: integration_test | 真机 | 模拟器

画面标题是跑在设备上，下面三条是 integration_test、真机、模拟器。集成测试使用 integration_test，把应用跑在真机或模拟器上，走一条接近用户的路径。它能看见真实的启动、插件和屏幕尺寸。因为慢，所以只覆盖少数关键路径，细的分支仍放在下面两层，避免每次改动都等待整机启动。

### 类比
visual: compare
left: 只对台词
right: 上台彩排
caption: 彩排要上台
points: 函数是对的 | 按钮也点过 | 装到真机 | 模拟器也行

左边一栏是只对台词，两行写着函数是对的、按钮也点过。右边一栏是上台彩排，两行写着装到真机、模拟器也行。台词和单场按钮都对了，灯和舞台仍可能出问题。集成测试就是上台，应用装到真机或模拟器上，把启动到关键页面的路走一遍。

### 机制
visual: pyramid
caption: 顶层最窄
points: 集成测试 | Widget 测试 | 单元测试

金字塔上窄下宽，最上面最窄的一层是集成测试，中间是 Widget 测试，底下最宽的是单元测试。顶层用 integration_test 跑在真机或模拟器上，看整条路径。中间层在测试环境里点组件，底层用 test 和 expect，不启动界面。越往上越慢，所以顶层只留关键的几条，日常回归仍主要靠下面两层。

### 示例
visual: code
caption: 绑定之后再泵
points: 集成绑定 | 泵出首页 | 找到标题

```dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  testWidgets('首页标题', (tester) async {
    await tester.pumpWidget(const MaterialApp(home: Text('新闻')));
    expect(find.text('新闻'), findsOneWidget);
  });
}
```

代码先调用 IntegrationTestWidgetsFlutterBinding.ensureInitialized，这样测试才能跑在真机或模拟器的集成环境里。后面的 testWidgets 把一页泵出来，并期望找得到新闻。这条路径要设备，不在普通的纯 Dart 进程里完成。关键页面留在这里，细的计算仍回到单元测试，这样设备上的时间只花在用户真正会走的那几步。

### 你会看到
visual: phone
caption: 设备上的首页
points: 应用真的打开 | 标题是新闻 | 走的是关键路径

手机框顶上是设备上的首页，框里三行是应用真的打开、标题是新闻、走的是关键路径。真机或模拟器上会启动应用，而不只是在内存里摆一棵树。标题能找到，说明这条路径通了。滚动、权限和插件若也在这条路径上，会按设备的真实表现出现。

### 常见坑
visual: warning
caption: 用顶层代替全部
points: 每条分支都上设备 | 没有设备仍当它过了 | 底下两层空着

错误卡上三行是每条分支都上设备、没有设备仍当它过了、底下两层空着。集成测试慢，把所有文案分支都放上来，日常就跑不动。没有真机或模拟器时，这条测试并没有执行，不能当成已经通过。纯计算和单次点按应留在金字塔的下面两层。

### 收束
visual: path
caption: 测试之后去调试
points: 关键路径上设备 | 分支留在下面 | 再看调试

画面上三步，先把关键路径用 integration_test 放到真机或模拟器上，再把细的分支留在下面两层，然后去看失败时怎么停住。测试告诉你哪里不对，调试告诉你当时的值是什么，下一步就停在那一行把变量看清楚，再决定要改哪一处。下一课是断点、日志与 DevTools。

## lesson debugging
title: 断点、日志与 DevTools

### 定义
visual: concept
caption: 三件调试工具
points: IDE 断点 | debugPrint | DevTools

画面标题是三件调试工具，下面三条是 IDE 断点、debugPrint、DevTools。断点在 IDE 里下，程序跑到那一行会停住，你可以看当时的变量。debugPrint 用来打日志，长日志也不容易把界面撑卡。DevTools 用来看检查器和性能，一个看界面树，一个看帧和耗时，两页对着同一次运行才完整。

### 类比
visual: compare
left: 凭感觉改
right: 停住再看
caption: 先看清再改
points: 猜一个原因 | 问题会漂 | 断点停在行上 | 日志和检查器

左边一栏是凭感觉改，两行写着猜一个原因、问题会漂。右边一栏是停住再看，两行写着断点停在行上、日志和检查器。猜错一次，下一轮现象又变了。右边先在 IDE 里把那一行停住，再用日志和 DevTools 核对树上的实际组件，猜的原因要让这三样证据对上。

### 机制
visual: phone
caption: 三件一起用
points: 断点停住 | debugPrint 打日志 | 检查器和性能

手机框顶上是三件一起用，框里三行是断点停住、debugPrint 打日志、检查器和性能。断点在 IDE 里下到可疑的那一行，执行会停在那里。日志用 debugPrint 打出条数或状态。界面结构打开 DevTools 的检查器，卡顿打开性能那一页，三行对着同一次运行，不要只靠改完再猜。

### 示例
visual: code
caption: 日志打出条数
points: 引入基础库 | debugPrint | 带上数字

```dart
import 'package:flutter/foundation.dart';

void logCount(int count) {
  debugPrint('新闻条数 $count');
}
```

代码从基础库引入 debugPrint，把新闻条数打到日志里，方便回头对照。这一行也可以在 IDE 里下断点，停住后直接看 count 的值。它不负责展示界面树，树的层级去 DevTools 的检查器里点。若要判断卡顿，换到 DevTools 的性能页，帧花了多久以那一页的图为准，日志里的快慢不算数。

### 你会看到
visual: phone
caption: 日志和树上的字
points: 控制台有条数 | 检查器点得到 | 性能页另开

手机框顶上是日志和树上的字，框里三行是控制台有条数、检查器点得到、性能页另开。debugPrint 的那一句出现在日志里，数字就是当时的条数。DevTools 的检查器里能点到对应的文字组件，看见它的父级。性能页是另一块，帧的时间不在这行日志里。

### 常见坑
visual: warning
caption: 只靠猜和打印
points: 断点下在发布包 | 日志写进 build | 用检查器评卡顿

错误卡上三行是断点下在发布包、日志写进 build、用检查器评卡顿。release 里断点挂不上，调试要在 IDE 连接的 debug 运行里下。build 会被多次调用，把 debugPrint 写进去，日志会刷很多行。检查器负责看结构，卡不卡要看 DevTools 的性能，给性能下结论要换到更接近发布的运行。

### 收束
visual: path
caption: 调试之后看卡顿
points: 断点看值 | 日志留痕迹 | 再看帧

画面上三步，先在 IDE 里用断点看变量，再用 debugPrint 把关键数字留在日志里，然后去看一帧为什么超时。检查器回答树上有什么，性能页回答时间花在哪里，两页一起看，才知道是结构太多，还是这一帧做了太重的工作。下一课是重建与卡顿。

## lesson jank
title: 重建与卡顿

### 定义
visual: concept
caption: 一帧约十六毫秒
points: 界面线程 | 约 16 毫秒 | 用帧图看

画面标题是一帧约十六毫秒，下面三条是界面线程、约 16 毫秒、用帧图看。界面线程要在约 16 毫秒内画完一帧，超时就会掉帧。整页重建、很重的 build、大图在界面线程解码，都会把这一帧撑过预算。用 DevTools 的帧图看，不要在 debug 模式里评性能，评的时候要换掉调试运行。

### 类比
visual: compare
left: 在排练厅计时
right: 按公演计时
caption: 计时要换场地
points: 调试本身就慢 | 误判成卡顿 | 约十六毫秒一帧 | 帧图才算数

左边一栏是在排练厅计时，两行写着调试本身就慢、误判成卡顿。右边一栏是按公演计时，两行写着约十六毫秒一帧、帧图才算数。debug 模式带着额外检查，慢是它自己的成本。要看卡顿，换到接近发布的运行，再用 DevTools 的帧图看哪一帧超过了约 16 毫秒。

### 机制
visual: rebuild
caption: 右边子树闪烁
points: 计数字 | 重的构建

左边标着保持不动，页头和标题停在原地，没有跟着闪。右边标着 setState，计数字和重的构建这两行正在闪，只有这块子树被标脏。闪的范围若扩大成整页，或者 build 里做了很重的计算，界面线程就可能超过约 16 毫秒。大图若在界面线程按原尺寸解码，这一帧也会掉。

### 示例
visual: code
caption: 闪的只是数字
points: 只收到数字 | build 很轻 | 页头不在这里

```dart
import 'package:flutter/material.dart';

class CountText extends StatelessWidget {
  const CountText({super.key, required this.count});

  final int count;

  @override
  Widget build(BuildContext context) {
    return Text('$count');
  }
}
```

代码里的 build 只把数字画成一行字，没有循环，也没有解码图片。右边闪烁的子树若只包含这个组件，页头和标题可以留在左边不动。把整页的构建都放进同一次 setState，闪烁的范围就会变成整页。很重的计算和大图解码也不要放进这段 build。

### 你会看到
visual: phone
caption: 数字在变页头不动
points: 页头不动 | 数字在变 | 帧图另开

手机框顶上是数字在变页头不动，框里三行是页头不动、数字在变、帧图另开。点按之后，只有数字那一块更新，页头仍停在原处。若整页一起闪，说明重建范围太大。卡不卡不要凭 debug 模式的手感，打开 DevTools 的帧图，看有没有帧超过约 16 毫秒。

### 常见坑
visual: warning
caption: 在调试里下结论
points: 整页一起重建 | build 里做重活 | debug 里评性能

错误卡上三行是整页一起重建、build 里做重活、debug 里评性能。父级一次 setState 把页头、列表和图片全标脏，界面线程要重做很多工作。build 里解码大图或做很重的计算，一帧就超过约 16 毫秒。debug 模式本身更慢，评卡顿要换模式，并用 DevTools 的帧图，调试时顺不顺不能拿来下结论。

### 收束
visual: path
caption: 卡顿之后看列表
points: 缩小重建 | 看帧图 | 再看列表

画面上三步，先让闪烁停在右边那块子树，再用 DevTools 的帧图确认有没有超过约 16 毫秒，然后去看长列表和图片怎么少做工作。列表若一次建出所有子组件，掉帧会来得很稳，图片若按原尺寸解码也会一起超时。下一课是列表和图片的常见性能点。

## lesson list-perf
title: 列表和图片的常见性能点

### 定义
visual: concept
caption: 滚到再创建
points: builder | itemExtent | cacheWidth

画面标题是滚到再创建，下面三条是 builder、itemExtent、cacheWidth。长列表用 ListView.builder，让子组件在靠近视口时才创建。行高固定时给 itemExtent，滚动位置就不必把每一行都量一遍。图片用 cacheWidth 控制解码尺寸，避免按原图的大尺寸在界面线程解码，内存和那一帧的时间都会小一截。

### 类比
visual: compare
left: 一次做好全部
right: 窗口里才做
caption: 只做看得见的
points: 菜全部出锅 | 大图原尺寸 | 滚到再做 | 按显示尺寸解码

左边一栏是一次做好全部，两行写着菜全部出锅、大图原尺寸。右边一栏是窗口里才做，两行写着滚到再做、按显示尺寸解码。客人还没看到的菜全部堆在台上，厨房会堵。列表只创建窗口附近的行，图片按要显示的宽度解码，界面线程才腾得出约 16 毫秒。

### 机制
visual: boxes
mode: scroll
caption: 列表向上滚
points: 按需创建 | 固定行高 | 缩小解码

一列盒子不断向上滚，重复出现的字是按需创建、固定行高、缩小解码。按需创建对应 ListView.builder，滚进视口附近才建那一行。固定行高对应 itemExtent，每一行的高度事先知道。缩小解码对应 cacheWidth，图片按较小的像素宽度解码，原始大图不会整张进内存。

### 示例
visual: code
caption: 固定高度并限解码
points: builder | 行高七十二 | 解码宽度

```dart
import 'package:flutter/material.dart';

class NewsList extends StatelessWidget {
  const NewsList({super.key, required this.urls});

  final List<String> urls;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemExtent: 72,
      itemCount: urls.length,
      itemBuilder: (context, index) {
        return Image.network(urls[index], cacheWidth: 360);
      },
    );
  }
}
```

代码用 ListView.builder，只在需要时为当前下标建一行。itemExtent 把每一行定成 72，高度固定时滚动可以少做测量。Image.network 的 cacheWidth 是 360，解码尺寸跟着这个宽度走，原图再大也不会按原尺寸铺进内存。不要改回一次建出所有子组件的 ListView，那会在第一帧就把全部行和图片都做出来。

### 你会看到
visual: phone
caption: 窗口里只有几行
points: 看得见的几行 | 行高固定 | 图按宽度解码

手机框顶上是窗口里只有几行，框里三行是看得见的几行、行高固定、图按宽度解码。向上滚时，新的一行从底部进来，离开窗口的行可以被收掉。每一行都是同样的高度。图片清晰度够看即可，不会先按几千像素的原图解码再缩小。

### 常见坑
visual: warning
caption: 第一帧做完全部
points: 子组件一次建完 | 行高反复量 | 大图原尺寸解码

错误卡上三行是子组件一次建完、行高反复量、大图原尺寸解码。用一次建出所有子组件的 ListView，列表一长，第一帧就会超时。高度明明固定却不给 itemExtent，滚动时还要反复测量。图片不写 cacheWidth，界面线程会按原图解码，帧图上容易看到超过约 16 毫秒的帧，这些判断不要放在 debug 模式里做。

### 收束
visual: path
caption: 列表之后看三种构建
points: 用 builder | 固定高度给 itemExtent | 再看三种构建

画面上三步，长列表用 ListView.builder 按需创建，高度固定时给 itemExtent，图片用 cacheWidth 控制解码尺寸。这些优化要在接近发布的运行里用帧图确认，看有没有帧超过大约十六毫秒，滚动时新行才出现，离开窗口的行可以收掉，调试里的顺滑不能当成发布结论。下一课是 debug、profile、release。
