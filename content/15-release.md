# 发布与工程

## lesson build-modes
title: debug、profile、release

### 定义
visual: concept
caption: 三种构建差很多
points: 断言和热重载 | 接近发布 | 去掉断言

画面标题是三种构建差很多，下面三条是断言和热重载、接近发布、去掉断言。debug 有断言，也可以热重载，方便你改完马上看界面。profile 接近发布性能，用来测卡顿和滚动。release 去掉断言并做优化，装到用户设备上的是这一档，右上角也不再有调试缘带。

### 类比
visual: compare
left: 排练厅
right: 公演场
caption: 排练和公演不同
points: 可以随时改词 | 带检查所以慢 | 接近正式演出 | 检查被拿掉

左边一栏是排练厅，两行写着可以随时改词、带检查所以慢。右边一栏是公演场，两行写着接近正式演出、检查被拿掉。排练厅对应 debug，断言和热重载都还在。公演前还有一场接近正式的彩排，那就是 profile，用来听卡不卡，真正公演是 release，断言拿掉，并做了优化。

### 机制
visual: concept
caption: 三档各有用途
points: debug 能改 | profile 测卡顿 | release 给用户

画面标题是三档各有用途，下面三条是 debug 能改、profile 测卡顿、release 给用户。debug 保留断言，框架会帮你抓住一些明显的错误，热重载也只在这一档好用。profile 拿掉大部分调试成本，性能接近发布，帧图和滚动应在这里看。release 去掉断言并做优化，体积和速度面向安装包。

### 示例
visual: code
caption: 三档各回一句
points: 发布优化 | 测卡顿 | 断言热重载

```dart
import 'package:flutter/foundation.dart';

String modeLabel() {
  if (kReleaseMode) {
    return '去掉断言并优化';
  }
  if (kProfileMode) {
    return '接近发布，用来测卡顿';
  }
  return '有断言，可以热重载';
}
```

代码按三个常量分支。kReleaseMode 为真时，说明当前是 release，断言已经去掉，并做了优化。kProfileMode 为真时，性能接近发布，这句话提醒你用它测卡顿。两个常量都没有命中时落在最后一句，那就是 debug，断言还在，也可以热重载，评滚动顺不顺时不要停在最后这一档。

### 你会看到
visual: phone
caption: 三档字样不同
points: 调试可以热重载 | 性能档用来测 | 发布档没有断言

手机框顶上是三档字样不同，框里三行是调试可以热重载、性能档用来测、发布档没有断言。debug 运行时，改完文字可以热重载，右上角还会有调试缘带。profile 运行时，热重载不在，帧时间更接近用户拿到的包。release 运行时，断言不再帮你报错，界面按优化后的结果出现。

### 常见坑
visual: warning
caption: 在调试里测卡顿
points: debug 里评性能 | 发布包里等热重载 | 发布包里等断言

错误卡上三行是 debug 里评性能、发布包里等热重载、发布包里等断言。debug 有额外检查，滚动慢不能直接算成应用慢，测卡顿要用 profile。release 里没有热重载，改一句还想立刻看见，要回到 debug。release 也去掉了断言，那些只在调试时弹出的检查不会出现在用户的包里。

### 收束
visual: path
caption: 三档分清再打包
points: 调试用来改 | 性能用来测 | 再去打包

画面上三步，debug 用来改并保留断言和热重载，profile 用来测卡顿，然后才进入各商店的打包。用户安装的是 release，签名和标识都发生在这一档的产物上，断言和热重载都不会带到用户手机里，商店要的包也从这一档打出。下一课是 Android 与 iOS 打包。

## lesson mobile-release
title: Android 与 iOS 打包

### 定义
visual: concept
caption: 两套上架检查点
points: 应用包 | 签名 | 标识和 ipa

画面标题是两套上架检查点，下面三条是应用包、签名、标识和 ipa。安卓上架使用 app bundle，并配好签名。苹果要有配套标识和签名，再用 flutter build ipa 产出安装包。这里只核对这几项在不在，签名口令留在本机的签名配置里，不写进课文，也不写进仓库。

### 类比
visual: compare
left: 安卓商店的门
right: 苹果商店的门
caption: 两扇门各有钥匙
points: 应用包加签名 | 口令不入库 | 配套标识 | 签名后再打 ipa

左边一栏是安卓商店的门，两行写着应用包加签名、口令不入库。右边一栏是苹果商店的门，两行写着配套标识、签名后再打 ipa。两扇门都要钥匙，但钥匙的形状不同。安卓交的是 app bundle 和签名，苹果先对上标识，再签名，然后用 flutter build ipa，具体密码不出现在这份课文里。

### 机制
visual: path
caption: 四项检查点
points: 打出 app bundle | 配好安卓签名 | 核对苹果标识 | flutter build ipa

画面上四步按编号走，第一步打出安卓的 app bundle，商店要的是这份应用包。第二步配好签名，口令只放在本机配置，不写具体密码。第三步核对苹果的配套标识，标识和签名要对上同一个应用。第四步执行 flutter build ipa，拿到可以送审的包，四步都过了才能送审。

### 示例
visual: code
caption: 只留下检查点
points: 安卓两项 | 苹果两项 | 没有口令

```dart
class StoreGate {
  const StoreGate.android() : label = 'app bundle 与签名';
  const StoreGate.ios() : label = '标识、签名、ipa';

  final String label;
}
```

代码里两个命名构造，只留下上架要核对的字。安卓这一行是 app bundle 与签名。苹果这一行是标识、签名和 ipa，对应 flutter build ipa 之前要齐的东西。没有任何密码、证书文件内容或钥匙串口令，那些值留在本机的签名配置里，提交到仓库的应是检查项本身。

### 你会看到
visual: phone
caption: 包上没有口令
points: 安卓是应用包 | 苹果是 ipa | 屏幕上没有密码

手机框顶上是包上没有口令，框里三行是安卓是应用包、苹果是 ipa、屏幕上没有密码。安卓产物是 app bundle，给商店上传。苹果产物来自 flutter build ipa。无论哪一个包，界面和仓库里都不应出现签名密码，缺标识或签名时构建会在检查点停住，口令仍只留在本机。

### 常见坑
visual: warning
caption: 口令写进仓库
points: 密码写进代码 | 安卓只交旧包 | 标识和签名对不上

错误卡上三行是密码写进代码、安卓只交旧包、标识和签名对不上。签名口令一旦出现在仓库里，就不再是秘密，课文也不编造一个假密码来充数。安卓上架应使用 app bundle，并配好签名。苹果的配套标识、签名和 flutter build ipa 这三项要一起齐，缺一项包就出不了门。

### 收束
visual: path
caption: 移动包之后看网页
points: 安卓应用包和签名 | 苹果标识和 ipa | 再看网页

画面上三步，安卓核对 app bundle 和签名，苹果核对配套标识、签名和 flutter build ipa，然后去看网页产物长什么样。口令始终留在本机，课文不写任何具体密码，证书内容也不进仓库。网页不再交安装包，它交的是一叠给浏览器打开的静态文件，整份目录要一起带走。下一课是 Web 构建。

## lesson web-release
title: Web 构建

### 定义
visual: concept
caption: 产物是静态文件
points: flutter build web | 静态文件 | 渲染器影响体积

画面标题是产物是静态文件，下面三条是 flutter build web、静态文件、渲染器影响体积。flutter build web 把应用编译成浏览器能打开的静态文件。渲染器会影响下载体积，也会影响画面和移动端是否一致，选定之后整站按同一套打开。这里不展开那些已经变化过的命令行参数。

### 类比
visual: compare
left: 交出一个安装包
right: 交出一叠印刷品
caption: 浏览器拿的是文件
points: 还想要安装包 | 带着 dart:io | 编译成静态文件 | 浏览器打开

左边一栏是交出一个安装包，两行写着还想要安装包、带着 dart:io。右边一栏是交出一叠印刷品，两行写着编译成静态文件、浏览器打开。网页用户拿到的是浏览器能直接打开的文件，手机那种安装包不会出现在这里。flutter build web 交出的是一叠静态文件，浏览器按这叠文件把画面打开。

### 机制
visual: flow
caption: 四步送到浏览器
points: 界面写在这里 | flutter build web | 目录里的文件 | 打开页面
headers: Dart | 编译 | 静态文件 | 浏览器

纵向四步的标签依次是 Dart、编译、静态文件、浏览器。Dart 这一格是你写的界面和逻辑，编译这一格执行 flutter build web，把这份代码变成产物。静态文件这一格是编译落地的那些文件，要整份一起提供，浏览器这一格打开它们。渲染器只影响体积和一致性，不改变这四步的顺序。

### 示例
visual: code
caption: 交给浏览器的一页
points: 入口 | 一页文字 | 没有安装包

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(
    const MaterialApp(
      home: Center(child: Text('静态页面')),
    ),
  );
}
```

代码仍是普通的 Dart 入口，中间一行字写着静态页面。执行 flutter build web 之后，浏览器打开的是编译出来的静态文件，源文件本身并不直接送进浏览器。网页上没有完整的 dart:io，入口里也不要依赖它。渲染器换成另一套时，体积和画面一致性会变，构建命令仍从 flutter build web 这条主线走。

### 你会看到
visual: phone
caption: 浏览器里的同一句
points: 静态页面四个字 | 没有安装步骤 | 文件要整份在

手机框顶上是浏览器里的同一句，框里三行是静态页面四个字、没有安装步骤、文件要整份在。打开的是编译后的页面，正中仍是那一句。用户不安装一个手机包。若只拷走其中一部分文件，页面会缺资源，所以静态文件要整份交给浏览器。

### 常见坑
visual: warning
caption: 把网页当手机包
points: 网页使用 dart:io | 只拷走一个文件 | 用调试看体积

错误卡上三行是网页使用 dart:io、只拷走一个文件、用调试看体积。Web 没有完整的 dart:io，一些插件也没有 Web 实现，这些在编译静态文件时就会暴露。产物是一整份静态文件，不能只拿其中一个。体积和一致性跟渲染器有关，不要用 debug 运行去估发布后的下载大小。

### 收束
visual: path
caption: 网页之后分环境
points: 编译静态文件 | 整份交给浏览器 | 再分环境

画面上三步，用 flutter build web 产出静态文件，整份交给浏览器，然后把开发和生产拆开。渲染器那一句只记住它影响体积和一致性，不记那些会变动的命令参数。环境不同，接口地址也不该写死，开发和生产要分成两套构建，门牌跟着参数走。下一课是 flavor。

## lesson flavors
title: flavor

### 定义
visual: concept
caption: 开发和生产分开
points: flavor 区分环境 | dart-define 传地址 | 编译期读入

画面标题是开发和生产分开，下面三条是 flavor 区分环境、dart-define 传地址、编译期读入。flavor 用来区分开发和生产，两套构建可以有不同的名字和入口配置。接口地址用 --dart-define 传进去，代码里用编译期常量读出来。这样换环境时不用改业务文件，也不会把生产地址写死在开发包里。

### 类比
visual: compare
left: 地址刻在门上
right: 门牌可以更换
caption: 门牌跟着环境走
points: 开发和生产混用 | 换地址要改代码 | 两套构建分开 | 参数传入地址

左边一栏是地址刻在门上，两行写着开发和生产混用、换地址要改代码。右边一栏是门牌可以更换，两行写着两套构建分开、参数传入地址。地址刻死以后，开发包会去敲生产的门。flavor 把两套构建分开，--dart-define 再把这一次的接口地址挂到门牌上。

### 机制
visual: compare
left: 写死地址
right: flavor 加参数
caption: 地址从参数来
points: 环境混在一起 | 提交前手动改 | 开发生产分开 | 编译期读入地址

左边一栏是写死地址，两行写着环境混在一起、提交前手动改。右边一栏是 flavor 加参数，两行写着开发生产分开、编译期读入地址。左边每次换服务器都要改源码，容易把开发地址留在发布包里。右边用 flavor 区分开发和生产，接口地址从 --dart-define 进来，在编译时就定下来。

### 示例
visual: code
caption: 编译期读接口
points: 常量 | 名字是 API_BASE | 默认给开发

```dart
const apiBase = String.fromEnvironment(
  'API_BASE',
  defaultValue: 'https://dev.example.com',
);
```

代码用 String.fromEnvironment 读 API_BASE，这是一个编译期常量。打包时用 --dart-define 把生产或开发的接口地址传进来，flavor 负责区分这两套构建。没传时落到默认值，默认值只适合开发。生产构建一定要把地址传进来，不要靠改这一行源码来切换，否则开发地址会留在发布包里。

### 你会看到
visual: phone
caption: 地址跟着构建变
points: 开发走默认 | 生产走传入值 | 业务代码不动

手机框顶上是地址跟着构建变，框里三行是开发走默认、生产走传入值、业务代码不动。开发那一套 flavor 可以显示或请求默认的开发地址。生产那一套在构建时传入另一条地址，页面上的请求就走向生产。切换时改的是构建参数，地址不要写进组件里。

### 常见坑
visual: warning
caption: 开发包打到生产
points: 地址写死 | 生产没传参数 | flavor 和地址搞混

错误卡上三行是地址写死、生产没传参数、flavor 和地址搞混。地址写死在代码里，开发构建和生产构建会打到同一个接口。生产的 flavor 若忘了加 --dart-define，String.fromEnvironment 会使用开发默认值。flavor 负责区分哪一套构建，接口地址仍要靠参数传，两件事要一起做，漏掉参数就会打到开发服务器。

### 收束
visual: path
caption: 环境分开再查规则
points: flavor 分环境 | 参数传地址 | 再查规则

画面上三步，用 flavor 把开发和生产分成两套构建，用 --dart-define 传入接口地址，然后让静态检查守住写法。地址在编译期读入，页面里不必再为环境涂改分支，换的时候只改构建参数。业务组件保持原样，开发地址也不会混进生产包。下一课是 lint。

## lesson lint
title: lint

### 定义
visual: concept
caption: 规则先于运行
points: 分析选项文件 | flutter_lints | flutter analyze

画面标题是规则先于运行，下面三条是分析选项文件、flutter_lints、flutter analyze。analysis_options.yaml 里引入 flutter_lints，就把一套推荐规则接到工程上。需要检查时运行 flutter analyze，它按这些规则扫描 Dart 文件。问题在运行前就被点出来，不必等用户点到那一页，文件名和行号都会写在那份报告里。

### 类比
visual: compare
left: 凭眼睛通读
right: 按清单校对
caption: 校对有一张清单
points: 风格各写各 | 问题到运行才见 | 引入推荐规则 | 分析命令扫一遍

左边一栏是凭眼睛通读，两行写着风格各写各、问题到运行才见。右边一栏是按清单校对，两行写着引入推荐规则、分析命令扫一遍。眼睛会漏掉没使用的变量和不一致的写法。analysis_options.yaml 引入 flutter_lints 之后，flutter analyze 按同一张清单把文件扫一遍，没使用的变量和能写成常量的地方都会被点名。

### 机制
visual: warning
caption: 没接规则就扫不到
points: 选项文件是空的 | 规则没有引入 | 分析命令没跑

错误卡上三行是选项文件是空的、规则没有引入、分析命令没跑。analysis_options.yaml 若没有引入 flutter_lints，工程就还没有那套推荐规则。规则在文件里，但不运行 flutter analyze，问题也不会出现在报告中。两条都接上，未使用的变量、不一致的常量和危险的空值才会在运行前被点名。

### 示例
visual: code
caption: 分析会看这个组件
points: 常量构造 | 必填标题 | 去掉空白

```dart
import 'package:flutter/material.dart';

class Headline extends StatelessWidget {
  const Headline({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Text(title.trim());
  }
}
```

代码是一个常量组件，标题是必填参数，build 里只做去掉空白和显示。analysis_options.yaml 引入 flutter_lints 之后，flutter analyze 会按这套规则看这个文件。多余的变量、能写成常量却没写、以及不该在构建里做的事，都会出现在分析结果里。规则负责提醒，改不改仍由你在报告里逐条处理。

### 你会看到
visual: phone
caption: 报告先于页面
points: 分析列出问题 | 页面还没跑 | 改完再分析

手机框顶上是报告先于页面，框里三行是分析列出问题、页面还没跑、改完再分析。flutter analyze 的输出是一份问题清单，页面这时还没画出来。有问题的行会写着文件和原因，你按报告逐条改。改完再跑一次，清单变短，然后才把页面跑起来看。

### 常见坑
visual: warning
caption: 规则接上却不看
points: 忘了引入 flutter_lints | 分析失败仍继续 | 把规则整份关掉

错误卡上三行是忘了引入 flutter_lints、分析失败仍继续、把规则整份关掉。analysis_options.yaml 里没有那一行引入，flutter analyze 就缺少这套推荐。报告里已经有错误，仍去打包，问题会留到发布包里。遇到一条不理解的规则就整份关掉，后面的文件也不再被守住，应先看懂那一条再决定。

### 收束
visual: path
caption: 规则之后拆目录
points: 引入规则 | 跑分析 | 再拆目录

画面上三步，在 analysis_options.yaml 引入 flutter_lints，用 flutter analyze 扫一遍，然后把变大的工程按目录拆开。规则守的是写法，比如常量和未使用的变量都会被点出来，目录守的是以后找不找得到。分析通过之后，再去看入口、功能模块和数据层怎么分房间。下一课是目录拆分。

## lesson project-structure
title: 目录拆分

### 定义
visual: concept
caption: 按功能拆开
points: 入口很薄 | 界面进功能模块 | 数据单独放

画面标题是按功能拆开，下面三条是入口很薄、界面进功能模块、数据单独放。目录按功能拆，把同一个功能的界面和数据放在一起，避免只按文件类型把所有页面堆进一个文件夹。入口只负责启动，main.dart 保持很薄，界面放进功能模块，请求、解析和仓库放进数据层。一个新闻功能的页面和它的数据因此能挨在一起被找到。

### 类比
visual: compare
left: 全堆在门口
right: 按房间收纳
caption: 门口只留一把钥匙
points: 入口越写越厚 | 界面数据缠住 | 入口保持很薄 | 界面和数据分开

左边一栏是全堆在门口，两行写着入口越写越厚、界面数据缠住。右边一栏是按房间收纳，两行写着入口保持很薄、界面和数据分开。门口堆满家具，后来的人找不到钥匙。右边把界面放进功能模块，把数据放进数据层，入口只留下启动这一下。

### 机制
visual: trees
caption: 三列各管一层
points: main 很薄 | 界面放这里 | 请求和解析
headers: 入口 | 功能模块 | 数据层

三列标题是入口、功能模块、数据层。入口这一列是很薄的 main.dart，只把应用跑起来，不写列表和请求。功能模块这一列放界面，新闻页、空状态和错误提示都在这里。数据层这一列放仓库、http 请求和 fromJson，按功能拆时，一个功能的界面和数据层成对出现，入口仍保持那一层不变。

### 示例
visual: code
caption: 入口只负责启动
points: main 很短 | 根组件 | 页面不写在这里

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const NewsApp());
}

class NewsApp extends StatelessWidget {
  const NewsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: Text('新闻'));
  }
}
```

代码里的 main 只调用 runApp，把根交给框架。这个文件保持很薄，没有列表，没有 http 请求，也没有 fromJson。新闻页面应挪到功能模块，加载和解析应挪到数据层。入口以后可以换成真正的首页组件，启动的方式仍然只有这一下，列表和请求不要再写回这个文件。

### 你会看到
visual: phone
caption: 入口只交出首页
points: 启动很快看懂 | 页面在功能模块 | 数据不在 main

手机框顶上是入口只交出首页，框里三行是启动很快看懂、页面在功能模块、数据不在 main。用户看见的新闻页来自功能模块，入口文件里找不到那一长串组件。请求地址和解析在数据层。要改一条新闻的样子就去功能模块，要改解析就去数据层。

### 常见坑
visual: warning
caption: 入口写成整页应用
points: main 越写越厚 | 按类型堆文件夹 | 界面直接请求

错误卡上三行是 main 越写越厚、按类型堆文件夹、界面直接请求。所有页面都写进 main.dart，文件会长到无法阅读，入口也不再薄。只按页面、模型这种类型分文件夹，一个功能的界面和数据会被拆散。界面里直接写请求，数据层就空了，换接口时要改很多页面。

### 收束
visual: path
caption: 目录之后锁版本
points: 入口保持很薄 | 界面和数据分开 | 再锁版本

画面上三步，main.dart 保持很薄，界面放进功能模块，请求和解析放进数据层，然后去看依赖的版本怎么约束。目录稳定之后，包的版本也要有约定，同事和构建机器才会装到同一套，锁文件也要跟着仓库一起提交，避免各装各的。下一课是依赖版本。

## lesson versions
title: 依赖版本

### 定义
visual: concept
caption: 尖号加锁文件
points: 尖号约束 | 提交锁文件 | 先看可升级项

画面标题是尖号加锁文件，下面三条是尖号约束、提交锁文件、先看可升级项。依赖在清单里用尖号约束，允许兼容的小版本更新，不把范围开成任意版本。应用要提交 pubspec.lock，同事和构建机器才会解析到同一套。想知道哪些能升，先跑 flutter pub outdated，不要随便写 dependency_overrides。

### 类比
visual: compare
left: 版本随缘
right: 约定再上锁
caption: 锁住同一套
points: 每个人装到不同版 | 冲突就硬压 | 尖号留出兼容 | 锁文件提交

左边一栏是版本随缘，两行写着每个人装到不同版、冲突就硬压。右边一栏是约定再上锁，两行写着尖号留出兼容、锁文件提交。左边今天能编过，明天同事就可能装到另一套。右边用尖号写出兼容范围，再用 pubspec.lock 把应用实际用的版本固定下来。

### 机制
visual: warning
caption: 版本被随手改掉
points: 没有尖号 | 锁文件没提交 | 用覆盖压冲突

错误卡上三行是没有尖号、锁文件没提交、用覆盖压冲突。没有尖号、范围又放得太开时，解析可能跳到不兼容的版本。应用不提交 pubspec.lock，每台机器的解析结果可以不同。dependency_overrides 能把冲突暂时压住，随便使用会把真正的版本问题藏起来，升级前先看 flutter pub outdated。

### 示例
visual: code
caption: 代码里只负责导入
points: 导入 http | 发起 get | 版本不写在这里

```dart
import 'package:http/http.dart' as http;

Future<http.Response> fetchNews() {
  return http.get(Uri.parse('https://example.com/news'));
}
```

代码只导入 http 并发起一次 get，版本号不写在这个文件里。清单中这个包用尖号约束，应用再把解析结果提交为 pubspec.lock。想升级时先跑 flutter pub outdated，看哪些有新版本，再决定要不要动。遇到冲突，先看是哪两个包要求不一致，不要马上用 dependency_overrides 盖住，先让两边的版本约束自己对上。

### 你会看到
visual: phone
caption: 请求靠锁住的包
points: 新闻请求发出 | 版本来自锁文件 | 覆盖没有出现

手机框顶上是请求靠锁住的包，框里三行是新闻请求发出、版本来自锁文件、覆盖没有出现。页面能发出请求，是因为解析到的 http 包和锁文件一致。换一台机器重新取依赖，仍应得到同一套。若有人用 dependency_overrides 临时改过版本，这台机器的结果会和锁文件看起来不一样。

### 常见坑
visual: warning
caption: 覆盖把冲突藏住
points: 范围写成任意 | 应用不交锁文件 | 随便 dependency_overrides

错误卡上三行是范围写成任意、应用不交锁文件、随便 dependency_overrides。任意范围让解析可以跳得很远，尖号才是日常应写的约束。应用仓库里没有 pubspec.lock，构建会随时间漂移。dependency_overrides 是少数排障时的手段，随便留下会掩盖不兼容，升级前应先看 flutter pub outdated，确认要升的是哪几个包。

### 收束
visual: path
caption: 版本之后做上线检查
points: 尖号约束 | 提交锁文件 | 再做上线检查

画面上三步，依赖用尖号约束，应用提交 pubspec.lock，升级前用 flutter pub outdated 看可升级项，然后走上一份上线清单。不要把 dependency_overrides 留在正常的发布路径上，冲突应先在清单里看清楚，尖号和锁文件先对齐，再决定要不要升级，避免把临时覆盖留到发布。下一课是上线前检查清单。

## lesson release-checklist
title: 上线前检查清单

### 定义
visual: concept
caption: 上线前过一遍
points: 分析测试构建 | 滚动用 profile | 权限图标版本

画面标题是上线前过一遍，下面三条是分析测试构建、滚动用 profile、权限图标版本。上线前先 flutter analyze，再跑测试，然后打 release。列表顺不顺要在 profile 下看滚动，不要在 debug 里下结论。权限声明、图标和版本号也要核对，debug 模式才有右上角调试缘带，发布包里不应再看见它。

### 类比
visual: compare
left: 排练服直接上台
right: 按清单换装
caption: 上台前换装
points: 带着调试缘带 | 滚动没看过 | 分析测试构建 | 权限图标版本

左边一栏是排练服直接上台，两行写着带着调试缘带、滚动没看过。右边一栏是按清单换装，两行写着分析测试构建、权限图标版本。左边还停在 debug，右上角的调试缘带会跟着走。右边先分析、测试，再在 profile 下看滚动，最后核对权限、图标和版本号，然后才打 release。

### 机制
visual: path
caption: 六项按编号走
points: 跑 analyze | 跑测试 | profile 看滚动 | 打 release | 核对权限 | 核对图标版本

画面上六步连在一起。第一步 flutter analyze，第二步跑测试，第三步在 profile 下看列表滚动，第四步打 release 构建。第五步核对权限声明还在 AndroidManifest 或 Info.plist 里，第六步核对图标和版本号。debug 才有的右上角调试缘带，不应出现在这套发布产物里，有缘带就说明还停在调试运行。

### 示例
visual: code
caption: 缘带交给模式
points: 普通的根 | 没有关掉标记 | 发布自然没有

```dart
import 'package:flutter/material.dart';

class NewsApp extends StatelessWidget {
  const NewsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: Text('新闻'));
  }
}
```

代码是一个很普通的根，没有为了上架去特殊处理右上角。debug 模式才有调试缘带，release 构建里它不会留下。上线前仍要跑 flutter analyze 和测试，在 profile 下看滚动，并打出 release。权限声明、图标和版本号在工程配置里核对，不靠这个组件自己去写，版本号要和准备上架的那一版一致。

### 你会看到
visual: phone
caption: 发布包没有缘带
points: 右上角是干净的 | 版本号对得上 | 图标是正式的

手机框顶上是发布包没有缘带，框里三行是右上角是干净的、版本号对得上、图标是正式的。release 包的右上角没有调试缘带，那条只在 debug 模式出现。版本号和商店里要提交的一致，图标是正式资源。若右上角还有那条缘带，说明手头仍是 debug 运行。

### 常见坑
visual: warning
caption: 调试包直接上架
points: 带着调试缘带 | 滚动只在 debug 看 | 忘了图标或版本

错误卡上三行是带着调试缘带、滚动只在 debug 看、忘了图标或版本。debug 包右上角有调试缘带，不能当作上架包。滚动卡不卡要在 profile 下看，debug 的手感不算数。权限声明、图标和版本号有一项漏了，分析即使通过，商店或系统仍会卡住，release 构建要真的打出来看一次。

### 收束
visual: path
caption: 清单之后串一条功能
points: 分析测试和构建 | profile 看滚动 | 再串一条功能

画面上三步，先完成分析、测试和 release 构建，再在 profile 下看滚动，并核对权限、图标和版本号。debug 的调试缘带只留在调试运行里。接下来把一条新闻列表从界面串到数据，看加载、列表和错误这三种样子怎么分开。下一课是一个小功能从界面走到数据。
