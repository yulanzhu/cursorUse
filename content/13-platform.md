# 平台与插件

## lesson package-plugin
title: 包和插件

### 定义
visual: concept
caption: 包和插件不同
points: Dart 代码 | 带平台代码 | 联邦分开

画面标题是包和插件不同，下面三条是 Dart 代码、带平台代码、联邦分开。包是 Dart 代码，里面可以有类、函数和资源声明，不附带某个操作系统的实现。插件也是包，只是额外带上平台代码。常用的是联邦结构，安卓、苹果和网页的实现分开放，应用只依赖统一的接口。

### 类比
visual: compare
left: 一本菜谱
right: 要接当地灶
caption: 做法和灶具分开
points: 只有步骤 | 不碰炉火 | 接口仍是一份 | 各灶分开接

左边一栏是一本菜谱，两行写着只有步骤、不碰炉火。右边一栏是要接当地灶，两行写着接口仍是一份、各灶分开接。菜谱可以在任何厨房念，真正点火仍要当地的灶具。包像左边的菜谱，插件像右边，把各平台的实现分开接到同一份接口上。

### 机制
visual: compare
left: 纯 Dart 包
right: 联邦插件
caption: 左右两栏对照
points: 类和函数 | 没有原生实现 | 接口留在中间 | 各端实现分开

左边一栏标题是纯 Dart 包，两行是类和函数、没有原生实现。右边一栏标题是联邦插件，两行是接口留在中间、各端实现分开。你在应用里 import 的是中间那份 Dart 接口。安卓文件夹、苹果文件夹和网页实现各自成包，由联邦关系指到同一份接口，改一端时不必把另一端的代码缠进来。

### 示例
visual: code
caption: 一份纯 Dart
points: 常量构造 | 去掉空白 | 没有频道

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

代码框里是一个只画文字的组件，标题去掉首尾空白后交出去。全文都是 Dart，没有频道，也没有安卓或苹果的实现文件。这样的文件可以放进一个包，给别的工程导入。一旦还要调用电量、相机这类系统能力，就得在这份接口旁边加上平台实现，做成插件。

### 你会看到
visual: phone
caption: 屏幕上只有字
points: 去掉空白 | 没有系统弹窗 | 没有原生地图

手机框顶上是屏幕上只有字，框里三行是去掉空白、没有系统弹窗、没有原生地图。跑起来以后，画面中央是整理过的标题，四周仍是普通的 Flutter 页面。没有权限框，也没有一块嵌进来的原生控件。它证明这份包只负责描述界面，系统能力还没有被接上。

### 常见坑
visual: warning
caption: 把插件当成纯包
points: 漏掉平台实现 | 各端写进同一文件 | 接口和实现缠住

错误卡上三行是漏掉平台实现、各端写进同一文件、接口和实现缠住。只把 Dart 文件拷进工程，插件承诺的系统能力并不会出现。联邦结构里各平台实现是分开的，把安卓和苹果的代码堆进同一个 Dart 文件，哪一端都编译不过。应用依赖的应是接口包，平台实现由各自的包去接。

### 收束
visual: path
caption: 先分清再要权限
points: 记住包 | 记住插件 | 接着看权限

画面上三步，先记住包是 Dart 代码，再记住插件带平台实现并且常用联邦结构，然后去看权限怎么要。各端实现分开之后，系统能力才有地方落。下一步就是这些能力动用相机和定位之前，系统要求你先声明、再请求。下一课是权限模式。

## lesson permissions
title: 权限模式

### 定义
visual: concept
caption: 声明后再请求
points: 清单里声明 | 先说明原因 | 再弹系统框

画面标题是声明后再请求，下面三条是清单里声明、先说明原因、再弹系统框。权限要写进 AndroidManifest 或 Info.plist，运行时还要再请求一次。请求之前先用自己的界面告诉用户为什么需要，用户点了同意，再弹出系统框。顺序换了，用户会在莫名其妙的系统框上直接拒绝。

### 类比
visual: compare
left: 进门就亮证件
right: 先讲清来意
caption: 来意在证件之前
points: 突然弹框 | 容易被拒 | 自己的说明页 | 然后再要允许

左边一栏是进门就亮证件，两行写着突然弹框、容易被拒。右边一栏是先讲清来意，两行写着自己的说明页、然后再要允许。客人还没听懂你要进哪一间屋，证件已经递到脸上，多半会摇头。权限也一样，自己的说明页在前，系统框在后，拒绝的人会少很多。

### 机制
visual: warning
caption: 顺序错了就失败
points: 只写了清单 | 一上来就弹框 | 运行时忘了要

错误卡上三行是只写了清单、一上来就弹框、运行时忘了要。清单里的声明只是告诉系统这个应用可能会用到某项能力，到了运行时仍要再请求。说明页还没出现就调用请求，系统框会抢在你的理由前面。反过来，只做了说明、代码里从未请求，设置里也不会出现允许。

### 示例
visual: code
caption: 同意之后才请求
points: 已允许就返回 | 先走说明 | 再请求

```dart
import 'package:permission_handler/permission_handler.dart';

Future<bool> requestCamera(Future<bool> Function() explain) async {
  final current = await Permission.camera.status;
  if (current.isGranted) {
    return true;
  }
  final agreed = await explain();
  if (!agreed) {
    return false;
  }
  final status = await Permission.camera.request();
  return status.isGranted;
}
```

代码先看相机是否已经允许，允许了就直接返回。还没有允许时，先等待 explain 这个说明，用户不同意就返回，系统框不会出现。用户同意之后才调用 request，这一下才是系统框。AndroidManifest 或 Info.plist 里的声明仍要另外写好，这段 Dart 只负责运行时的顺序，说明页上的理由也要让人看得懂。

### 你会看到
visual: phone
caption: 说明页在系统框前
points: 写清为何要用 | 同意才继续 | 系统框在后

手机框顶上是说明页在系统框前，框里三行是写清为何要用、同意才继续、系统框在后。用户先看到你自己写的理由，比如拍摄头像需要相机。点了同意，系统框才盖上来。点了先不用，画面停在说明页，系统框这一次不会出现。

### 常见坑
visual: warning
caption: 声明和请求缺一
points: 清单漏了声明 | 用途说明没写 | 说明被系统框抢走

错误卡上三行是清单漏了声明、用途说明没写、说明被系统框抢走。安卓要在 AndroidManifest 里声明，苹果要在 Info.plist 里写上用途说明，缺了用途说明，系统框没有理由，严重时应用会崩溃。另一边，说明页和系统框同时冒出来，用户不知道该看哪一个。先把声明补全，再让自己的说明页走在系统框前面。

### 收束
visual: path
caption: 顺序固定再接设备
points: 先声明 | 再说明 | 然后请求

画面上三步，先在 AndroidManifest 或 Info.plist 声明，再用自己的页面说明原因，最后才弹出系统框。这三步对相机和定位是同一套，缺了任何一步，后面的设备调用都没有依据。接下来要看应用怎么通过插件碰到这些能力，以及用户拒绝时怎么分支。下一课是设备能力的接入方式。

## lesson device-apis
title: 设备能力的接入方式

### 定义
visual: concept
caption: 优先用维护中的插件
points: 相机和定位 | 拒绝 | 永久拒绝

画面标题是优先用维护中的插件，下面三条是相机和定位、拒绝、永久拒绝。相机和定位优先用还在维护的插件，不要自己从零接一套容易停更的原生代码。用户可以拒绝，也可以永久拒绝。拒绝表示这次没给，以后还可能再问，永久拒绝则表示系统框不会再出现，只能引导用户去系统设置里打开。

### 类比
visual: compare
left: 自己拆机器
right: 交给在维护的人
caption: 专人还在值班
points: 各端重写 | 人走了就停 | 相机定位有插件 | 拒绝要有后路

左边一栏是自己拆机器，两行写着各端重写、人走了就停。右边一栏是交给在维护的人，两行写着相机定位有插件、拒绝要有后路。机器每换一个品牌就重画一次电路，原作者离开后没人修。相机和定位已经有人持续维护插件，应用只要把拒绝和永久拒绝这两条退路留好。

### 机制
visual: flow
caption: 四步走到系统
points: 提出相机或定位 | 调用维护中的插件 | 按结果分支 | 系统执行或去设置
headers: 应用 | 插件 | 权限 | 系统

纵向四步的标签依次是应用、插件、权限、系统。应用这一格提出要相机或定位，插件这一格调用还在维护的实现，不在业务页面里散落原生调用。权限这一格看请求结果，普通拒绝就停住，永久拒绝再引导去设置。系统这一格才真正打开相机、读定位，或者打开设置页。

### 示例
visual: code
caption: 两种拒绝分开
points: 未允许再请求 | 永久拒绝去设置 | 普通拒绝停下

```dart
import 'package:permission_handler/permission_handler.dart';

Future<String> gateCamera() async {
  var status = await Permission.camera.status;
  if (!status.isGranted) {
    status = await Permission.camera.request();
  }
  if (status.isGranted) {
    return '打开相机';
  }
  if (status.isPermanentlyDenied) {
    await openAppSettings();
    return '永久拒绝';
  }
  return '拒绝';
}
```

代码在还没允许时调用 request，再按返回的结果分支。允许就去打开相机插件，结果若是永久拒绝，就打开系统设置，因为系统框不会再弹。普通拒绝停在拒绝这两个字，这次不打开相机。安卓上不能靠请求前的 status 判断永久拒绝，要看 request 返回的那一次。

### 你会看到
visual: phone
caption: 三种结果分得开
points: 打开相机 | 停在拒绝 | 转去系统设置

手机框顶上是三种结果分得开，框里三行是打开相机、停在拒绝、转去系统设置。允许之后，维护中的相机插件才会接到后面的流程。用户刚刚拒绝时，画面停住，不反复弹系统框。若是永久拒绝，应用把人带到系统设置，回来后再读一次状态。

### 常见坑
visual: warning
caption: 拒绝被当成允许
points: 用了停更插件 | 拒绝仍去打开 | 永久拒绝再弹框

错误卡上三行是用了停更插件、拒绝仍去打开、永久拒绝再弹框。相机和定位若接在多年没人维护的包上，系统一升级就容易失效。请求结果还是拒绝时就去打开设备，后面的调用会失败。永久拒绝后再调用请求，系统框也不会出现，应改去设置，原地连点不会再弹出系统框。

### 收束
visual: path
caption: 插件之后看频道
points: 选维护中的插件 | 分开两种拒绝 | 再看频道

画面上三步，先选还在维护的相机或定位插件，再把拒绝和永久拒绝分成两条路，然后去看没有现成插件时怎么自己通话。插件内部多半也是一条命名频道，两边要写同一个名字，结果异步回来，失败时走平台异常。下一课是 MethodChannel。

## lesson method-channel
title: MethodChannel

### 定义
visual: concept
caption: 同一个名字通话
points: 名字必须相同 | 调用是异步 | 失败有异常

画面标题是同一个名字通话，下面三条是名字必须相同、调用是异步、失败有异常。MethodChannel 用一个字符串当作频道名，Dart 这边和平台这边必须写成同一个名字。invokeMethod 返回的是未来的结果，调用本身是异步的。平台侧用 setMethodCallHandler 接住这个名字上的调用，失败时抛出 PlatformException。

### 类比
visual: compare
left: 频道对不上
right: 同一个频道名
caption: 对讲机要对频
points: 名字差一个字 | 呼叫没有回音 | 两边写同一串 | 数据包来回走

左边一栏是频道对不上，两行写着名字差一个字、呼叫没有回音。右边一栏是同一个频道名，两行写着两边写同一串、数据包来回走。对讲机差一个频段，说话的人听不到任何回应。频道名写成同一串之后，数据包才能从 Dart 走到平台，再把结果带回来。

### 机制
visual: channel
caption: 数据包在中间走
points: invokeMethod 异步 | setMethodCallHandler

左边标题是 Dart，下面写着 invokeMethod 异步，右边标题是平台，下面写着 setMethodCallHandler，中间的数据包在两边之间来回移动。两边的 MethodChannel 必须使用同一个名字，调用要等待异步结果，界面不能把返回值当成已经到手。能传过去的有 null、bool、int、double、String、List、Map 和 Uint8List，自定义的类要先拆开再送。失败时这边接住的是 PlatformException，频道名差一个字，数据包就到不了右边。

### 示例
visual: code
caption: 异步读取电量
points: 同一个频道名 | 等待结果 | 接住失败

```dart
import 'package:flutter/services.dart';

const battery = MethodChannel('samples.flutter.dev/battery');

Future<int?> readBattery() async {
  try {
    return await battery.invokeMethod<int>('getBatteryLevel');
  } on PlatformException {
    return null;
  }
}
```

代码框里的频道名是 samples.flutter.dev/battery，平台侧的 MethodChannel 必须写这一串，并在上面 setMethodCallHandler。invokeMethod 前面有 await，因为结果是异步回来的。平台若失败，就会变成 PlatformException，这里把它收成空值，避免异常直接打断界面。传过去的参数也只能是那几种标准类型，自定义的类要先拆成 Map 或 List。

### 你会看到
visual: phone
caption: 电量或空白
points: 读到整数 | 失败变成空 | 界面还在

手机框顶上是电量或空白，框里三行是读到整数、失败变成空、界面还在。调用发出去之后，画面可以先保持原样，等数据包回来再改数字。平台正常时，框里出现电量的整数。平台抛出 PlatformException 时，数字的位置是空的，页面本身还在，没有整页红掉。

### 常见坑
visual: warning
caption: 名字或类型对不上
points: 频道名不一致 | 当成同步去读 | 传了自定义类

错误卡上三行是频道名不一致、当成同步去读、传了自定义类。名字差一个字母，数据包到不了右边的平台。把 invokeMethod 的结果当成立刻就有的整数，读到的只是一个还没完成的未来。自定义类不在能传的类型里，应改成 null、bool、int、double、String、List、Map 或 Uint8List，失败时要接住 PlatformException。

### 收束
visual: path
caption: 频道之后看嵌视图
points: 对齐频道名 | 等待异步结果 | 再看嵌视图

画面上三步，先让两边的频道名完全一致，再把 invokeMethod 当成异步去等，然后看什么时候才需要把原生控件嵌进界面。频道适合交换数据。地图和网页那种必须用原生控件的场景，是另一条更重的路。下一课是平台视图何时才需要。

## lesson platform-view
title: 平台视图何时才需要

### 定义
visual: concept
caption: 只有必须时才嵌
points: 地图和网页 | 比普通组件重 | 能画就不嵌

画面标题是只有必须时才嵌，下面三条是地图和网页、比普通组件重、能画就不嵌。平台视图用来嵌入地图、网页这类必须使用原生控件的场景。它比普通 Widget 重，滚动、变换和手势都要多付一笔成本。按钮、文字、列表和静态图，能用 Flutter 自己画就不要嵌。

### 类比
visual: compare
left: 在墙上画画
right: 墙上开一扇窗
caption: 画和开窗差别大
points: 颜料就在手里 | 轻且好改 | 要用外面的风景 | 窗框又重又贵

左边一栏是在墙上画画，两行写着颜料就在手里、轻且好改。右边一栏是墙上开一扇窗，两行写着要用外面的风景、窗框又重又贵。风景若只是一张画得出来的海报，开窗就多余。地图和真实网页要的是外面那套原生控件，这时才值得开这扇更重的窗。

### 机制
visual: compare
left: Flutter 自己画
right: 嵌原生控件
caption: 能画的留在左边
points: 按钮文字列表 | 轻且统一 | 地图和网页 | 比 Widget 重

左边一栏是 Flutter 自己画，两行写着按钮文字列表、轻且统一。右边一栏是嵌原生控件，两行写着地图和网页、比 Widget 重。左边这些由框架直接铺像素，圆角和主题都听这份界面的。右边把一块原生视图嵌进树里，父级必须给它有限的宽高，能画在左边的不要搬到右边。

### 示例
visual: code
caption: 嵌进一块地图
points: 有限高度 | 视图类型 | 原生地图

```dart
import 'package:flutter/material.dart';

class MapSlot extends StatelessWidget {
  const MapSlot({super.key});

  @override
  Widget build(BuildContext context) {
    return const SizedBox(
      height: 220,
      child: AndroidView(viewType: 'news/map'),
    );
  }
}
```

代码用固定高度包住一块 AndroidView，视图类型是 news/map，父级还要给它有限的宽度。这块区域交给原生地图控件来画，周围的标题和按钮仍由 Flutter 画。若只是一张不会交互的示意图，换成 Image 或自己绘制即可，不必走平台视图。网页若必须是系统网页控件，才用同样的方式嵌进来。

### 你会看到
visual: phone
caption: 中间一块原生地图
points: 高度二百二 | 地图在中间 | 标题仍是框架画的

手机框顶上是中间一块原生地图，框里三行是高度二百二、地图在中间、标题仍是框架画的。地图那一块能缩放、能拖动，它来自原生控件。标题和按钮的字体仍跟应用的其它页面一致。整页如果只是静态路线图，这块原生区域就不该出现。

### 常见坑
visual: warning
caption: 能画的也去嵌
points: 普通按钮也嵌 | 放进长列表 | 父级没有边界

错误卡上三行是普通按钮也嵌、放进长列表、父级没有边界。一个用 Text 和按钮就能完成的卡片，嵌成平台视图后会更重，也更难跟主题保持一致。长列表里每一行都嵌一块原生视图，滚动会明显变差。父级若给不出有限宽高，这块原生视图无法布局。

### 收束
visual: path
caption: 嵌完再看各端
points: 能画就不嵌 | 地图网页才嵌 | 接着看各端

画面上三步，先确认 Flutter 自己画得了，再把平台视图留给地图和网页，然后看移动、网页和桌面差在哪里。嵌进去的控件在各端并不相同，桌面和手机的原生控件也各自一套。有的能力在网页上根本没有完整实现。下一课是移动、Web 与桌面差异。

## lesson platform-diff
title: 移动、Web 与桌面差异

### 定义
visual: concept
caption: 三端能力不一样
points: 网页缺 dart:io | 桌面有窗口鼠标 | 移动有手势权限

画面标题是三端能力不一样，下面三条是网页缺 dart:io、桌面有窗口鼠标、移动有手势权限。Web 没有完整的 dart:io，一些插件也没有 Web 实现。桌面有窗口、鼠标和快捷键，移动端有手势、权限和应用生命周期。代码要用 kIsWeb 或 defaultTargetPlatform 分支，不能假设每一端都有同一套能力。

### 类比
visual: compare
left: 三间屋摆一样
right: 按屋子配家具
caption: 屋子不一样
points: 炉灶都按手机 | 网页点不着 | 先看是不是网页 | 再分桌面和移动

左边一栏是三间屋摆一样，两行写着炉灶都按手机、网页点不着。右边一栏是按屋子配家具，两行写着先看是不是网页、再分桌面和移动。手机那间有手势和权限，网页那间没有完整的文件炉灶，桌面那间多了窗口和鼠标。家具按屋子来配，入口处先看清自己站在哪一间。

### 机制
visual: compare
left: 网页
right: 桌面和移动
caption: 先把网页分开
points: 没有完整 dart:io | 插件可能没有实现 | 窗口鼠标快捷键 | 手势权限生命周期

左边一栏是网页，两行写着没有完整 dart:io、插件可能没有实现。右边一栏是桌面和移动，两行写着窗口鼠标快捷键、手势权限生命周期。判断时先看 kIsWeb，网页走左边，不要去导入 dart:io。其余平台再用 defaultTargetPlatform 分，桌面处理窗口、鼠标和快捷键，手机和平板处理手势、权限和应用生命周期。

### 示例
visual: code
caption: 先看网页再分端
points: kIsWeb 优先 | 移动一句 | 桌面一句

```dart
import 'package:flutter/foundation.dart';

String shellHint() {
  if (kIsWeb) {
    return '没有完整的 dart:io';
  }
  switch (defaultTargetPlatform) {
    case TargetPlatform.android:
    case TargetPlatform.iOS:
      return '手势、权限和应用生命周期';
    default:
      return '窗口、鼠标和快捷键';
  }
}
```

代码先看 kIsWeb，网页直接说明没有完整的 dart:io，这个文件也没有导入 dart:io。剩下的再用 defaultTargetPlatform 分，安卓和苹果返回手势、权限和应用生命周期。其它平台落到桌面那句，窗口、鼠标和快捷键归在这里。某个插件若没有 Web 实现，也应在左边这个分支里避开，等到运行时才发现就晚了。

### 你会看到
visual: phone
caption: 三端提示不同
points: 网页没有 dart:io | 手机是手势权限 | 桌面是窗口鼠标

手机框顶上是三端提示不同，框里三行是网页没有 dart:io、手机是手势权限、桌面是窗口鼠标。同一份界面在浏览器里会落到网页那句，文件和部分插件不可用。在手机上，提示变成手势、权限和应用生命周期。在桌面窗口里，提示变成窗口、鼠标和快捷键。

### 常见坑
visual: warning
caption: 把手机能力搬到网页
points: 网页导入 dart:io | 假设插件都有网页 | 桌面只留手势

错误卡上三行是网页导入 dart:io、假设插件都有网页、桌面只留手势。网页编译时就会因 dart:io 失败，这个导入不能放进所有平台共用的文件。有的插件只有移动实现，在浏览器里调用会找不到。桌面用户用的是鼠标和快捷键，只做手机手势，窗口里的操作会缺一块。

### 收束
visual: path
caption: 分端之后去测试
points: 先看是不是网页 | 再分桌面和移动 | 接着写测试

画面上三步，先用 kIsWeb 把网页分开，再用 defaultTargetPlatform 区分桌面和移动，然后给这些纯逻辑写测试。平台差异一旦收成明确的分支，输入和输出就可以单独验证，网页没有文件能力，桌面多窗口和鼠标，移动多权限和生命周期。下一课是单元测试。
