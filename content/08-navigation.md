# 导航

## lesson push-pop
title: Navigator push 与 pop

### 定义
visual: concept
caption: 压进栈再弹出
points: 压进新页面 | 弹出并可带回 | 等待后拿到结果

画面上三行逐条出现，写着压进新页面、弹出并可带回、等待后拿到结果。Navigator.push 要配上 MaterialPageRoute，新页面才会被压进导航栈，底下原来那一页还留着。Navigator.pop 可以把最上面这页拿走，同时带上一个返回值。若用 await 接住这次 push，页面关掉之后，这个返回值就会交回到调用的地方。

### 类比
visual: compare
left: 一叠卡片
right: 导航栈
caption: 叠上再抽走
points: 新卡从旁滑入 | 底下那张还在 | 新页压进栈 | 弹出可带回

左边是一叠卡片，两行写着新卡从旁滑入、底下那张还在。右边是导航栈，两行写着新页压进栈、弹出可带回。新卡片从右侧盖上来，底下那张还留在原处，抽走上面这张时，背面还可以夹着一句结果。导航也是这样，push 把页面压上栈，pop 把它拿走，并能把结果交还给下面那一页。

### 机制
visual: routes
caption: 详情从右侧滑入
points: 列表页 | 详情页 | 滑入后再滑出

左后方第一张是栈底页，标题写着列表页，下面还有一行栈底还在。新页是详情页，从右侧滑入，字幕是滑入后再滑出，盖住栈底之后再向右滑出。这次滑入来自 Navigator.push 配上的 MaterialPageRoute。滑出时 Navigator.pop 可以带上返回值，await 住这次 push，就能在滑出之后拿到它。

### 示例
visual: code
caption: 压入并等待结果
points: 配上材料路由 | 等待布尔结果 | 弹出时带回真

```dart
Future<void> openDetail(BuildContext context) async {
  final saved = await Navigator.push<bool>(
    context,
    MaterialPageRoute(builder: (context) => const DetailPage()),
  );
  debugPrint('$saved');
}

void closeDetail(BuildContext context) {
  Navigator.pop(context, true);
}
```

代码先 await Navigator.push，路由用的是 MaterialPageRoute，builder 里放上详情页。详情页关掉时调用 Navigator.pop，第二个参数 true 就是返回值，列表那边因此知道这次是保存过的。saved 会在等待结束之后拿到，这里把它打印出来，空着则说明弹出时没带值。这两次调用都要发生在 context 还有效的时候，页面已经卸下就不要再去 push。

### 你会看到
visual: phone
caption: 详情盖住列表
points: 列表留在下面 | 详情滑进来 | 返回带回结果

手机框顶上写着详情盖住列表，框里三行是列表留在下面、详情滑进来、返回带回结果。点开之后，详情页从右侧进入，列表还留在栈底。返回时详情向右离开，下面那一页收到 true，或者在没带值时收到空。你看见的是两页一进一出，栈里其实一直留着列表。

### 常见坑
visual: warning
caption: 返回值容易丢
points: 忘了 await | pop 没带值 | 卸下后还 push

错误卡上三行写着忘了 await、pop 没带值、卸下后还 push。push 的结果是一个 Future，不等待就读不到 pop 带回来的值，界面会以为用户什么都没选。pop 只写 context、不写第二个参数，调用方等到的就是空，保存和取消也就分不开。页面已经卸下之后还用原来的 context 去 push，向上查找导航器会失败。

### 收束
visual: path
caption: 接着给页面起名
points: 记住压栈返回 | 去写命名路由

路径上两步，先记住压栈和返回，再去给页面起名字。push 配 MaterialPageRoute 把新页从右侧滑进栈，栈底那一页还留着，pop 可以带回结果，await 能把这个结果接住。下一课是命名路由，页面的名字会集中写进路由表，打开时按名字来找，不必每次把页面构造函数直接交出去。

## lesson named-routes
title: 命名路由

### 定义
visual: concept
caption: 名字写进路由表
points: 写进路由表 | pushNamed 打开 | 复杂路径另生成

画面上三行逐条出现，写着写进路由表、pushNamed 打开、复杂路径另生成。命名路由登记在 MaterialApp 的 routes 里，键是路径，值是一个拿着 context 造出页面的函数。打开时调用 Navigator.pushNamed，把这条路径传进去。路径要临时拼、或者构造时就必须带上参数，这张表就不够用，那时改走 onGenerateRoute。

### 类比
visual: compare
left: 门牌号
right: 路由表
caption: 按名字找页
points: 门牌对上房间 | 不必手拎着门 | 路径对上页面 | 按名字压进栈

左边是门牌号，两行写着门牌对上房间、不必手拎着门。右边是路由表，两行写着路径对上页面、按名字压进栈。你报出房间号，前台就能找到那一间，不必每次把房门本身递过去。routes 里写好路径和页面，pushNamed 只报路径，导航器自己去表里把页面取出来。

### 机制
visual: routes
caption: 详情按名滑入
points: 首页 | 命名详情 | 按路径滑入

左后方第一张是栈底页，标题是首页，下面写着栈底还在。新页是命名详情，从右侧滑入，字幕写着按路径滑入，停一会儿再向右滑出。滑入时走的是 Navigator.pushNamed，路径要能在 MaterialApp.routes 里对上。对上之后，表里的那个函数才把这一页造出来，再盖到首页上面。

### 示例
visual: code
caption: 表里两条路径
points: 斜杠是首页 | 详情另有路径 | 按名打开详情

```dart
MaterialApp(
  routes: {
    '/': (context) => const HomePage(),
    '/detail': (context) => const DetailPage(),
  },
);

void openDetail(BuildContext context) {
  Navigator.pushNamed(context, '/detail');
}
```

代码里 MaterialApp.routes 登记了两条路径，斜杠对应首页，斜杠 detail 对应详情页。openDetail 调用 pushNamed，只把路径交出去，页面由那张表里的函数来创建。这里没有再设置 home，因为表里已经有斜杠这一条，再写 home 会和它撞车。详情页需要的编号还不在这张表里，下一步再谈怎么送过去。

### 你会看到
visual: phone
caption: 按名字打开详情
points: 首页停在栈底 | 路径对上详情 | 详情从右侧进入

手机框顶上是按名字打开详情，框里三行写着首页停在栈底、路径对上详情、详情从右侧进入。点按钮之后，用的路径是斜杠 detail，屏幕换成详情页。返回之后又回到首页，因为首页一直留在栈底。路径如果和表里的键对不上，这一页就不会被造出来。

### 常见坑
visual: warning
caption: 名字和表对不上
points: 路径少了斜杠 | 同时写了 home | 表里塞不进参数

错误卡上写着路径少了斜杠、同时写了 home、表里塞不进参数。pushNamed 的字符串必须和 routes 的键完全一样，少一个斜杠就会落到未知路由。home 和斜杠那一条不能一起写，框架会认为首页被定义了两次。这张表的函数只能拿到 context，构造时就必须带上编号的话，要改用 onGenerateRoute。

### 收束
visual: path
caption: 接着送参数
points: 先把表写对 | 再送参数和结果

路径上两步，先把路由表和 pushNamed 写对，让新页能按名字从右侧滑入，再去送参数和结果。名字集中放在 MaterialApp.routes 里，打开时只报路径，表里的函数负责把页面造出来。下一课是参数与返回值，会讲 arguments 怎么放、怎么读，返回值也会在那一课一起接住，复杂路径则改走 onGenerateRoute。

## lesson route-args
title: 参数与返回值

### 定义
visual: concept
caption: 参数和回执分开
points: 参数放 arguments | 从路由设置里读 | 生成路由更灵活 | 等待接住返回值

画面上四行逐条出现，写着参数放 arguments、从路由设置里读、生成路由更灵活、等待接住返回值。pushNamed 的 arguments 会放进这条路由的设置里，和路径分开走。页面里用 ModalRoute.of(context)?.settings.arguments 把它读出来，类型要自己判断。路径种类多、或者要在构造函数里直接拿到参数时，用 onGenerateRoute 按 RouteSettings 自己返回一条路由，await 住 pushNamed 也能接到 pop 带回的值。

### 类比
visual: compare
left: 信封
right: 路由参数
caption: 信封夹着纸条
points: 信封写上房号 | 纸条夹在里面 | 参数单独放 | 返回值另交回

左边是信封，两行写着信封写上房号、纸条夹在里面。右边是路由参数，两行写着参数单独放、返回值另交回。房号决定去哪一页，纸条是额外带上的编号，不写进门牌本身。返回时再另交一张回执，那就是 pop 带回来的值，和去的时候夹上的纸条各走各的。

### 机制
visual: routes
caption: 详情带着编号
points: 列表页 | 参数详情 | 编号跟着滑入

左后方第一张是栈底页，标题是列表页，下面写着栈底还在。新页是参数详情，从右侧滑入，字幕是编号跟着滑入，然后再向右滑出。编号放在 arguments 里，跟着这条路由一起进来，详情页要用自己的 context 去读。滑出时 pop 带上的结果，会回到 await 住 pushNamed 的那一端。

### 示例
visual: code
caption: 送出编号再读回
points: 参数写成 42 | 等待布尔结果 | 读到再判断类型

```dart
Future<void> openDetail(BuildContext context) async {
  final saved = await Navigator.pushNamed<bool>(
    context,
    '/detail',
    arguments: '42',
  );
  debugPrint('$saved');
}

String? readId(BuildContext context) {
  final args = ModalRoute.of(context)?.settings.arguments;
  return args is String ? args : null;
}
```

openDetail 用 pushNamed 打开斜杠 detail，arguments 放的是字符串 42，返回值用 await 接成 saved。readId 通过 ModalRoute.of(context)?.settings.arguments 读取，问号是因为当前 context 上可能没有模态路由。读到的对象要先确认类型是字符串，对上了才当编号用，对不上就当成没有编号。种类再多时，把分支写进 onGenerateRoute，按 settings.name 和 settings.arguments 自己造出 MaterialPageRoute，这样构造函数就能直接收下编号。

### 你会看到
visual: phone
caption: 详情读到编号
points: 打开时带上 42 | 页面读出编号 | 返回得到布尔

手机框顶上是详情读到编号，框里三行写着打开时带上 42、页面读出编号、返回得到布尔。进入详情后，屏幕上能看到这串编号。点保存再返回，列表那边会接到 true。若 pop 没带值，接到的是空，去的时候那张编号还在路由设置里，不和回执混在一起。

### 常见坑
visual: warning
caption: 读参位置不对
points: 在出发页去读 | 忘记判断类型 | 生成路由乱返回

错误卡上写着在出发页去读、忘记判断类型、生成路由乱返回。arguments 挂在目标页自己的路由上，在发出 push 的那一页去读，拿到的是旧页的设置。读出来是一个对象，不判断类型就当成字符串用，运行时会断。routes 表里没有的名字才会进 onGenerateRoute，认不出时应返回空，让未知路由继续处理。

### 收束
visual: path
caption: 接着看转场
points: 参数和返回值 | 再看页面怎么动

路径上两步，先把参数和返回值送对，再看页面切换时怎么动。arguments 放在 pushNamed 里，用 ModalRoute 的 settings 来读，复杂情况改走 onGenerateRoute，由它按名字造出路由。下一课是路由转场，会讲单次打开怎么画，以及整份主题里怎么换过渡，当前页和下一页会在同一段时间里一起动。

## lesson transitions
title: 路由转场

### 定义
visual: concept
caption: 两页一起换场
points: 单页自己画过渡 | 主题里统一更换 | 两页同时在动

画面上三行逐条出现，写着单页自己画过渡、主题里统一更换、两页同时在动。某一次打开想要淡入，可以用 PageRouteBuilder，在 transitionsBuilder 里按动画值画出这一页。希望普通的 MaterialPageRoute 都换同一种过渡，就改 ThemeData 的 pageTransitionsTheme，按平台放上对应的 builder。转场那一小段时间里，当前页和下一页一起变化。

### 类比
visual: compare
left: 拉幕
right: 路由转场
caption: 两页一起换幕
points: 旧幕往旁边走 | 新幕同时进来 | 当前页让出位置 | 下一页跟着进入

左边是拉幕，两行写着旧幕往旁边走、新幕同时进来。右边是路由转场，两行写着当前页让出位置、下一页跟着进入。两层幕布在同一段时间里错开，画面才从旧的换成新的。路由转场也占着一段时间，当前页和下一页各自按照动画进度来移动或淡化。

### 机制
visual: timeline
caption: 两页各一条轴
points: 进度往右铺 | 游标沿轨走
headers: 当前页 | 下一页

画面上两条时间轴，上面一条标着当前页，绿色进度从左往右铺开，表示这一页正在让出位置。下面一条标着下一页，黄色游标沿着轨道往前走，表示新页正在进入。两条轴一起走完，这一次转场才结束，当前页和下一页是在同一段时间里换位。单次的画法交给 PageRouteBuilder，整应用的 Material 过渡则写进 pageTransitionsTheme。

### 示例
visual: code
caption: 详情页淡入
points: 页面由建造器给 | 透明度跟动画 | 只影响这一次

```dart
Navigator.push(
  context,
  PageRouteBuilder(
    pageBuilder: (context, animation, secondary) {
      return const DetailPage();
    },
    transitionsBuilder: (context, animation, secondary, child) {
      return FadeTransition(opacity: animation, child: child);
    },
  ),
);
```

这段用 PageRouteBuilder 包住详情页，pageBuilder 负责造出下一页，它能拿到主动画和次动画。transitionsBuilder 把 child 放进 FadeTransition，透明度跟着 animation 从无到有，新页就这样淡入。这种写法只影响这一次 push，返回时同一段动画会倒着再走。若要让项目里普通的 MaterialPageRoute 一起换过渡，应改到主题的 pageTransitionsTheme 上，按平台指定建造器。

### 你会看到
visual: phone
caption: 详情页慢慢淡入
points: 当前页还在 | 详情逐渐显现 | 淡完可以返回

手机框顶上是详情页慢慢淡入，框里三行写着当前页还在、详情逐渐显现、淡完可以返回。打开的那一小段时间里，详情从透明变得清楚，底下的页面还在。动画走完，详情完全盖住。返回时同一段过渡会倒着再走一遍，当前页重新露出来。

### 常见坑
visual: warning
caption: 过渡建在错处
points: 生成器不读主题 | 丢掉了 child | 每帧做重活

错误卡上写着生成器不读主题、丢掉了 child、每帧做重活。PageRouteBuilder 自己画过渡，不会去读 pageTransitionsTheme，所以改了主题，这一页仍按自己的 builder 来。transitionsBuilder 应把参数里的 child 放进动画组件，另外再造一个页面，pageBuilder 的结果就用不上了。这两个 builder 在动画期间会反复调用，请求和重计算不要放在这里。

### 收束
visual: path
caption: 再看路由栈状态
points: 单页或主题 | 再看栈即状态

路径上两步，先分清单次转场和主题转场，再把整条路由栈看成状态。一次打开用 PageRouteBuilder 自己画淡入淡出，全局的 Material 过渡改 pageTransitionsTheme，让普通路由共用同一套。下一课是 Navigator 2.0 的直觉，会讲这条栈怎样被描述成一份可以保存的状态，页面列表会决定谁滑进来。

## lesson navigator2
title: Navigator 2.0 的直觉

### 定义
visual: concept
caption: 栈被当成状态
points: 栈本身是状态 | 两个类来描述 | 多数改用路由包

画面上三行逐条出现，写着栈本身是状态、两个类来描述、多数改用路由包。Navigator 2.0 把页面列表当成状态，栈里有哪些页，由这份数据决定，再交给 Navigator 的 pages。RouterDelegate 负责描述这份状态并画出导航器，RouteInformationParser 负责把网址和这份状态互相对上。大多数应用不用手写这两个类，直接改用 go_router。

### 类比
visual: compare
left: 时刻表
right: 声明式路由
caption: 改表车次就换
points: 表上有哪几站 | 改表车次跟着变 | 栈由数据决定 | 委托负责画出

左边是时刻表，两行写着表上有哪几站、改表车次跟着变。右边是声明式路由，两行写着栈由数据决定、委托负责画出。想少停一站，就去改时刻表，车次会按新表重排。页面列表一变，Navigator 就按新的列表重排栈，解析网址的那一半交给 RouteInformationParser。

### 机制
visual: routes
caption: 详情滑入又滑出
points: 首页 | 详情页 | 栈被看成状态

左后方第一张是栈底页，标题是首页，下面写着栈底还在。新页是详情页，从右侧滑入，字幕写着栈被看成状态，停住后再向右滑出。它会不会滑进来，取决于页面列表里有没有这一页，这份列表就是状态。RouterDelegate 按列表画出栈，和网址的对应交给 RouteInformationParser。

### 示例
visual: code
caption: 布尔决定有没有详情
points: 首页一直在列表 | 为真才追加详情 | 移除时改回假

```dart
class AppPages extends StatefulWidget {
  const AppPages({super.key});
  @override
  State<AppPages> createState() => _AppPagesState();
}
class _AppPagesState extends State<AppPages> {
  bool showDetail = false;
  @override
  Widget build(BuildContext context) {
    return Navigator(
      pages: [
        const MaterialPage(child: HomePage()),
        if (showDetail) const MaterialPage(child: DetailPage()),
      ],
      onDidRemovePage: (page) => setState(() => showDetail = false),
    );
  }
}
```

代码里的 showDetail 就是栈的状态，build 按它组装 pages，首页一直在，为真才追加详情页。用户把详情滑走时，onDidRemovePage 把 showDetail 改回假，下一帧列表里就没有那一页。回调如果忘了改状态，同一页还会被当成新页面再放出来。RouterDelegate 做的也是按状态画出栈，再由 RouteInformationParser 和网址对齐，大多数应用改用 go_router，不必手写这两个类。

### 你会看到
visual: phone
caption: 详情跟着数据开关
points: 首页一直在 | 打开才出现详情 | 关掉就从栈消失

手机框顶上是详情跟着数据开关，框里三行写着首页一直在、打开才出现详情、关掉就从栈消失。showDetail 变成真，详情页从右侧滑入。变回假，详情页向右滑出，首页还在。你改的是那个布尔值，屏幕上的栈跟着变，这就是把路由栈当成状态。

### 常见坑
visual: warning
caption: 页面列表没改掉
points: 移除后仍留在列表 | 手写两个类太重 | 两套栈各写各的

错误卡上写着移除后仍留在列表、手写两个类太重、两套栈各写各的。onDidRemovePage 之后如果 pages 里还留着那一页，导航器会把它再显示出来。RouterDelegate 加 RouteInformationParser 样板很多，大多数页面栈用 go_router 就能描述。命令式的 push 和这份 pages 列表如果各写一套，后面就很难对上栈里到底有哪些页。

### 收束
visual: path
caption: 改用路径路由
points: 栈是一份状态 | 换路径来描述

路径上两步，先记住路由栈是一份状态，再换到按路径描述的包。页面列表决定有哪些页，新页会不会从右侧滑入就看这份列表，RouterDelegate 和 RouteInformationParser 负责描述和同步，大多数应用不用手写。下一课是 go_router 的路径、嵌套与深链，会用一条路径把这个栈说清楚。

## lesson go-router
title: go_router 的路径、嵌套与深链

### 定义
visual: concept
caption: 路径决定落在哪
points: 路径配上页面 | go 与 push | 重定向可拦截 | 深链就是路径

画面上四行逐条出现，写着路径配上页面、go 与 push、重定向可拦截、深链就是路径。go_router 里用 GoRouter 装上多条 GoRoute，路径可以写成斜杠 news 斜杠冒号 id。context.go 按新路径替换栈，context.push 在栈上再压一页，context.pop 负责返回。redirect 可以在未登录时把人送到登录页，深链不用另做一套，它就是这样一条路径。

### 类比
visual: compare
left: 公交线路
right: 路径路由
caption: 报站名就到
points: 报出站名 | 中途可以改道 | 路径决定落点 | 登录可被拦下

左边是公交线路，两行写着报出站名、中途可以改道。右边是路径路由，两行写着路径决定落点、登录可被拦下。乘客报一个站名，车就按线路开到那里，深链报的也是同一条线路上的路径。中途发现还没登录，调度可以改送到登录页，这就是 redirect 在做的拦截。

### 机制
visual: routes
caption: 详情沿路径滑入
points: 新闻列表 | 新闻详情 | 沿路径滑入

左后方第一张是栈底页，标题是新闻列表，下面写着栈底还在。新页是新闻详情，从右侧滑入，字幕是沿路径滑入，然后再向右滑出。这一页的路径像斜杠 news 斜杠某个 id，GoRoute 用 pathParameters 把编号取出来。context.push 会让它压在列表上面，context.go 则会按新路径把栈替换掉。

### 示例
visual: code
caption: 路径参数和拦截
points: 未登录送去登录 | 路径里带编号 | 建造时读出 id

```dart
final router = GoRouter(
  redirect: (context, state) {
    const signedIn = false;
    final atLogin = state.matchedLocation == '/login';
    if (!signedIn && !atLogin) return '/login';
    return null;
  },
  routes: [
    GoRoute(
      path: '/news/:id',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return NewsPage(id: id);
      },
    ),
  ],
);
```

代码创建 GoRouter，redirect 里看 matchedLocation 有没有停在登录页。这里把 signedIn 写成假，用来演示未登录会被送去斜杠 login，返回空则留下当前路径。routes 里那条 GoRoute 的路径是斜杠 news 斜杠冒号 id，builder 用 pathParameters 读取编号再交给 NewsPage。context.go 用一条新路径替换栈，context.push 才把详情压上去，context.pop 负责返回，系统打开斜杠 news 斜杠 7 也是走这条路径。

### 你会看到
visual: phone
caption: 编号进了详情
points: 路径里带着 7 | 详情显示编号 | 返回回到列表

手机框顶上是编号进了详情，框里三行写着路径里带着 7、详情显示编号、返回回到列表。地址是斜杠 news 斜杠 7 时，详情页打开，上面能看到这个编号。若这次是 push 进来的，返回会回到新闻列表。若是 go 进来的，栈已经按这条路径重排，返回不一定回到刚才那一页。

### 常见坑
visual: warning
caption: go 和 push 混了
points: 详情误用 go | 重定向来回跳 | 参数名对不上

错误卡上写着详情误用 go、重定向来回跳、参数名对不上。想从列表进入详情再回到列表，应该 context.push，context.go 会把栈替换掉。redirect 如果在登录页也返回登录路径，就会来回跳，登录页自己要放行。路径写的是冒号 id，读取时却用别的键，pathParameters 里就取不到编号。

### 收束
visual: path
caption: 底栏要分栈
points: 路径先走通 | 再留住各栏的栈

路径上两步，先让一条路径能打开页面，再处理底栏里各自的栈。GoRouter 和 GoRoute 用路径描述页面，go 替换栈，push 再压一页，pop 负责返回，redirect 做登录拦截，深链也是这条路径。下一课是底栏和嵌套栈，会把每一栏自己的栈留住，切换时不再把别的栏弹出。

## lesson nested-nav
title: 底栏和嵌套栈

### 定义
visual: concept
caption: 每栏各留一栈
points: 每栏各有一栈 | 索引用来切换 | 离开时栈还在

画面上三行逐条出现，写着每栏各有一栈、索引用来切换、离开时栈还在。底栏的首页和消息如果共用一个导航栈，切走再回来，原来压上去的页面就没了。go_router 用 StatefulShellRoute.indexedStack 给每个分支单独放一个栈，并用 IndexedStack 把它们留在树上。切换时调用 goBranch，另一栏已经压上去的页面不会被弹出。

### 类比
visual: compare
left: 两本簿子
right: 嵌套栈
caption: 簿子各记各的
points: 每本分开夹页 | 合上不撕页 | 每栏分开压栈 | 切换不弹出

左边是两本簿子，两行写着每本分开夹页、合上不撕页。右边是嵌套栈，两行写着每栏分开压栈、切换不弹出。首页簿里夹着详情，合上它去写消息簿，详情那一页还夹在原来的簿子里。底栏也要这样，每一栏有自己的分支，切到旁边时不要把这一栏的栈清掉。

### 机制
visual: routes
caption: 消息页滑入滑出
points: 首页栈 | 消息页 | 只动这一栏

左后方第一张是栈底页，标题是首页栈，下面写着栈底还在。新页是消息页，从右侧滑入，字幕是只动这一栏，停住后再向右滑出。你看到的进出发生在当前这一栏自己的栈里，底栏还留在屏幕上。切到别的栏时，首页栈不会被弹出，indexedStack 把各个分支都留着。

### 示例
visual: code
caption: 底栏挂着两个分支
points: 壳放进正文 | 点选取分支 | 两栏各一条路由

```dart
StatefulShellRoute.indexedStack(
  builder: (context, state, shell) => Scaffold(
    body: shell,
    bottomNavigationBar: NavigationBar(
      selectedIndex: shell.currentIndex,
      onDestinationSelected: (index) => shell.goBranch(index),
      destinations: const [
        NavigationDestination(icon: Icon(Icons.home), label: '首页'),
        NavigationDestination(icon: Icon(Icons.mail), label: '消息'),
      ],
    ),
  ),
  branches: [
    StatefulShellBranch(routes: [GoRoute(path: '/home', builder: (context, state) => const HomePage())]),
    StatefulShellBranch(routes: [GoRoute(path: '/mail', builder: (context, state) => const MailPage())]),
  ],
)
```

代码用 StatefulShellRoute.indexedStack，builder 里把 shell 放进 Scaffold 的正文，底栏用 NavigationBar。选中项取 shell.currentIndex，点某一项时调用 goBranch，从而换到对应的分支，另一栏先留在原地。branches 里有两个 StatefulShellBranch，首页和消息各写一条 GoRoute，两条栈互不相通。消息栏再往里压详情之后，切回首页再回来，那一条栈还在，详情不会被清掉。

### 你会看到
visual: phone
caption: 切栏后栈还在
points: 底栏停在下方 | 消息里进了详情 | 再回来详情仍在

手机框顶上是切栏后栈还在，框里三行写着底栏停在下方、消息里进了详情、再回来详情仍在。在消息栏打开详情，详情从右侧滑入，底栏还在。点首页，内容换成首页栈。再点消息，刚才的详情还在，因为这一栏的栈没有被弹出。

### 常见坑
visual: warning
caption: 各栏被收成一条
points: 各栏塞进同一分支 | 忘了放上 shell | 切换时回到起点

错误卡上写着各栏塞进同一分支、忘了放上 shell、切换时回到起点。几个底栏页面如果放进同一个 StatefulShellBranch，它们仍是一条栈，切栏就做不到各记各的。builder 拿到的 shell 必须放进界面，否则分支里的页面没有地方显示。goBranch 若每次都让分支回到起点，详情会被清掉，想留住栈就按默认方式切换。

### 收束
visual: path
caption: 去分三种状态
points: 先留住各栏的栈 | 再分三级状态

路径上两步，先让底栏的每一栏留住自己的栈，再去区分三种状态。StatefulShellRoute.indexedStack 用分支和 goBranch 做这件事，切换时另一栏不被弹出，首页栈还停在原来的位置。下一课是临时、页面、应用三级状态，导航先告一段落，状态从输入框、动画这种最小的一层讲起。
