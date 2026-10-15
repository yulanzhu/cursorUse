# 常用组件

## lesson text-style
title: Text 与 TextStyle

### 定义
visual: concept
caption: 整段样式和溢出
points: 整段样式 | 行数上限 | 溢出方式 | 局部不同

画面上四行是整段样式、行数上限、溢出方式、局部不同。Text 的 style 管整段字号和颜色，maxLines 卡住最多几行，overflow 决定超出以后怎么收尾。只有几个字要换样子时，用 Text.rich 包住 TextSpan，子片段只覆盖自己那一段。没单独写 style 的文字，会沿用祖先的 DefaultTextStyle，这套默认通常由 Theme 的 textTheme 放进来。

### 类比
visual: compare
left: 整段印刷
right: 局部描色
caption: 整段和局部
points: 同一套字号 | 超出就省略 | 几个字换色 | 其余沿用外层

左边卡片是整段印刷，两行写着同一套字号、超出就省略。右边卡片是局部描色，两行写着几个字换色、其余沿用外层。整段印刷像同一块字模印完全文，局部描色只动其中几个字。style 作用在整段文字上，TextSpan 只改自己的颜色或粗细，没写到的属性继续用外层那一套。

### 机制
visual: phone
caption: 一行末尾省略
points: 整段同一样式 | 最多显示一行 | 末尾出现省略

手机框顶上是一行末尾省略，框里三行写着整段同一样式、最多显示一行、末尾出现省略。这三行对应 style、maxLines 和 overflow。行数写成一，再配上省略，放不下的字收成省略号，不会把后面的组件顶下去。这一行里若有 TextSpan，它只改那几个字，其余仍跟着整段样式。

### 示例
visual: code
caption: 后两字换成绿色
points: 取正文样式 | 后两字变色 | 超出一行省略

```dart
class StyledTitle extends StatelessWidget {
  const StyledTitle({super.key});
  @override
  Widget build(BuildContext context) {
    final style = Theme.of(context).textTheme.bodyLarge ?? const TextStyle();
    return Text.rich(
      TextSpan(style: style, children: [
        const TextSpan(text: '今天'),
        TextSpan(
          text: '已完成',
          style: style.copyWith(color: const Color(0xFF1F7A6D)),
        ),
      ]),
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
    );
  }
}
```

代码从 textTheme 取出 bodyLarge，作为整段文字的样式，取不到时退回一份普通样式。Text.rich 里前一个片段是今天，后一个把已完成改成绿色，字号仍跟着正文。maxLines 是一，overflow 用省略，横着放不下时末尾收成省略号。普通 Text 若不写 style，就会改用周围的 DefaultTextStyle，颜色和字号都从那一层继承过来。

### 你会看到
visual: phone
caption: 今天已完成
points: 今天沿用正文 | 已完成是绿色 | 过长收成省略

手机框顶上是今天已完成，框里三行写着今天沿用正文、已完成是绿色、过长收成省略。跑起来以后，前半句用主题正文的颜色，已完成三个字变成绿色。格子如果太窄，末尾出现省略号，第二行不会被挤出来。字号来自 bodyLarge，这里没有另外写死一个像素数字。

### 常见坑
visual: warning
caption: 默认样式和省略
points: 忽略周围的默认 | 省略却不限行 | 局部样式套整段

错误卡上三行写着忽略周围的默认、省略却不限行、局部样式套整段。文字没写 style 时，DefaultTextStyle 和 textTheme 已经准备好一套，画面不会变成没有字号。只写 overflow、不写 maxLines，文字仍可能往下换行，省略号出不来。只想改两个字的颜色，却把 style 放在整个 Text 上，整句都会跟着变色。

### 收束
visual: path
caption: 接着看按钮
points: 记住文字样式 | 再看五种按钮

路径上两步，先把整段样式、行数和溢出记牢，再去看五种按钮。整段用 style、maxLines 和 overflow 一起收住，只有几个字要变颜色时才用 Text.rich 和 TextSpan，没写到的字号和颜色继续沿用外层。没写样式时，默认外观来自 DefaultTextStyle，主题再用 textTheme 把文字样式交进来。下一课是按钮家族。

## lesson buttons
title: 按钮家族

### 定义
visual: concept
caption: 五种常用按钮
points: 实心 | 抬起 | 描边 | 文字 | 图标

画面上五行依次是实心、抬起、描边、文字和图标。它们对应 FilledButton、ElevatedButton、OutlinedButton、TextButton 和 IconButton，强调从重到轻一次排开。实心最醒目，抬起带一点阴影，描边只留边线，文字按钮最轻，图标按钮里面放一枚图标。onPressed 设为 null 时，这五种都会禁用，颜色变淡，点击也不再进入回调。

### 类比
visual: compare
left: 门
right: 按钮
caption: 能开或者锁上
points: 推一下就开 | 上锁推不动 | 回调还在就能点 | 回调为空就禁用

左边卡片是门，两行写着推一下就开、上锁推不动。右边卡片是按钮，两行写着回调还在就能点、回调为空就禁用。门上了锁，门还在，只是不再被推开。按钮把 onPressed 设为 null 以后，控件仍留在树上，只是不再响应点击，外观也会变成禁用的样子。

### 机制
visual: phone
caption: 保存可以禁用
points: 实心按钮可点 | 忙碌时变为空 | 其余按钮仍在

手机框顶上是保存可以禁用，框里三行写着实心按钮可点、忙碌时变为空、其余按钮仍在。空在这里就是 null，按钮本身还留在树上。忙碌标记为真时，只有保存这个实心按钮的 onPressed 变成 null。提交、预览、取消和分享仍各自带着回调，所以它们保持可点。

### 示例
visual: code
caption: 忙碌时禁用保存
points: 五种按钮并排 | 忙碌则保存为空 | 图标单独一种

```dart
class SaveActions extends StatelessWidget {
  const SaveActions({super.key, required this.busy});
  final bool busy;
  @override
  Widget build(BuildContext context) {
    final save = busy ? null : () {};
    return Column(children: [
      FilledButton(onPressed: save, child: const Text('保存')),
      ElevatedButton(onPressed: () {}, child: const Text('提交')),
      OutlinedButton(onPressed: () {}, child: const Text('预览')),
      TextButton(onPressed: () {}, child: const Text('取消')),
      IconButton(onPressed: () {}, icon: const Icon(Icons.share)),
    ]);
  }
}
```

代码把 busy 收成 save，忙碌时它是 null，空闲时它是一个什么都不做的点击函数。FilledButton 用这份 save，所以只有保存会随忙碌禁用，颜色也会跟着变淡。抬起、描边和文字按钮一直有自己的回调，不会被这份标记关掉。IconButton 的图标是分享，它的回调写成 null 时，图标按钮也会禁用。

### 你会看到
visual: phone
caption: 一列五个按钮
points: 保存提交预览 | 取消是文字按钮 | 分享是图标

手机框顶上是一列五个按钮，框里三行写着保存提交预览、取消是文字按钮、分享是图标。屏幕上从上到下是实心保存、抬起的提交、描边预览、文字取消，最后是一个分享图标。忙碌变成真之后，保存变淡而且点不动，下面四个仍能点进去。

### 常见坑
visual: warning
caption: 空函数仍能点
points: 空函数仍然可点 | 禁用要传 null | 旧按钮已经退出

错误卡上三行写着空函数仍然可点、禁用要传 null、旧按钮已经退出。onPressed 写成一个什么都不做的函数，按钮看起来仍能按下，只是松手后没有后续。要禁用，这个参数得是 null，框架才会变淡并忽略点击。以前那两种扁平按钮和凸起按钮已经退出框架，新界面用现在这五种。

### 收束
visual: path
caption: 接着看图标
points: 记住五种按钮 | 再看图标和图片

路径上两步，先把五种按钮的轻重记牢，再去看图标和图片怎么放上这一整屏。实心、抬起、描边、文字和图标，差别在强调程度，不在另一套点击规则。禁用只看 onPressed 是 null 还是仍留着函数，跟按钮上的文字还在不在没有关系。下一课是 Icon 与 Image。

## lesson icon-image
title: Icon 与 Image

### 定义
visual: concept
caption: 图标和两种图
points: 图标数据 | 本地图片 | 网络图片 | 失败与填充

画面上四行是图标数据、本地图片、网络图片、失败与填充。Icon 接收的是 IconData，Icons.photo 就是一份这样的数据，还可以另写大小、颜色和语义说明。Image.asset 读取打包进应用的文件，Image.network 按地址去下载。errorBuilder 在加载失败时换上另一块界面，fit 决定图片怎样放进给定的宽高。

### 类比
visual: compare
left: 路牌
right: 照片
caption: 路牌和照片
points: 一块图标数据 | 能改大小颜色 | 本地或网络取图 | 失败要有替身

左边卡片是路牌，两行写着一块图标数据、能改大小颜色。右边卡片是照片，两行写着本地或网络取图、失败要有替身。路牌是矢量指示，换颜色和大小就能用。照片是像素，要先找到文件或网址，放不进框时，fit 决定裁掉还是留白，加载失败时，得有一块替身，不能只留一个空位。

### 机制
visual: phone
caption: 图标和封面
points: 上方是图标 | 封面用裁切 | 失败换成图标

手机框顶上是图标和封面，框里三行写着上方是图标、封面用裁切、失败换成图标。最上面的 Icon 用的是照片符号那份图标数据。本地封面用 cover，多出来的边会被裁掉，好铺满高度。网络图用 contain，整张都留在框里，地址失效时，errorBuilder 画出破损图标。

### 示例
visual: code
caption: 封面和失败替身
points: 图标用数据 | 本地图裁切 | 网络失败有替身

```dart
class CoverIcon extends StatelessWidget {
  const CoverIcon({super.key});
  @override
  Widget build(BuildContext context) {
    return Column(children: [
      const Icon(Icons.photo, size: 28),
      Image.asset('assets/cover.png', height: 72, fit: BoxFit.cover),
      Image.network(
        'https://example.com/a.png',
        height: 72,
        fit: BoxFit.contain,
        errorBuilder: (context, error, stackTrace) {
          return const Icon(Icons.broken_image);
        },
      ),
    ]);
  }
}
```

代码第一行是 Icon，数据是 Icons.photo，尺寸是二十八。Image.asset 读取 cover 这张本地图，高度七十二，fit 为 cover，多出来的边会被裁掉。网络图用 contain，失败时 errorBuilder 收到上下文、错误和堆栈，返回一个破损图标。本地图也可以接同样的失败回调，示例把替身放在更容易出错的网络图上。

### 你会看到
visual: phone
caption: 封面三种结果
points: 图标正常显示 | 本地图被裁满 | 失败出现替身

手机框顶上是封面三种结果，框里三行写着图标正常显示、本地图被裁满、失败出现替身。图标是单色的照片符号，大小按二十八来画。本地封面铺满那一块高度，超出的两侧被裁掉。网络地址打不开时，那一块不再留白，改成一枚破损图标。

### 常见坑
visual: warning
caption: 失败和拉变形
points: 失败没有替身 | 填充方式拉变形 | 资源没有登记

错误卡上三行写着失败没有替身、填充方式拉变形、资源没有登记。不写 errorBuilder，网络失败时那一块是空的，看的人不知道发生了什么。BoxFit.fill 会把宽和高都拉满，照片可能被拉变形。cover 是裁切后铺满，contain 是整张放进框里，本地路径没写进资源清单，Image.asset 同样会走失败。

### 收束
visual: path
caption: 接着看卡片
points: 记住图标和图片 | 再看卡片和行

路径上两步，先把图标数据和两种图片分开记住，再去看卡片怎样托住列表里的一行。图标吃的是图标数据，两张图分别来自本地文件和网络地址。填充方式管图片怎么放进宽高，失败回调管加载失败时画出什么替身。下一课是 Card 与 ListTile。

## lesson card-listtile
title: Card 与 ListTile

### 定义
visual: concept
caption: 卡片托住一行
points: 一层材质 | 标题 | 副标题 | 前后饰物

画面上四行是一层材质、标题、副标题、前后饰物。Card 在子组件外面裹一层 Material，带上圆角、表面颜色和一点浮起。ListTile 用 title 放主文字，subtitle 放第二行，leading 在前面，trailing 在后面，onTap 让整行都能点。按下时的水波要靠这层材质才铺得开，没有这层材质，水波就铺不出来。

### 类比
visual: compare
left: 档案卡
right: 列表一行
caption: 硬纸和一行字
points: 硬纸托住内容 | 表面微微浮起 | 标题加一句说明 | 整行都能点

左边卡片是档案卡，两行写着硬纸托住内容、表面微微浮起。右边卡片是列表一行，两行写着标题加一句说明、整行都能点。硬纸就是 Card 那层材质，内容不要直接铺在光桌上。一行上写着标题和说明，左右还可以别上图标，手指点在这一整行的任意位置，都会走进 onTap。

### 机制
visual: phone
caption: 一张买菜卡
points: 左侧笔记图标 | 标题和副标题 | 右侧箭头

手机框顶上是一张买菜卡，框里三行写着左侧笔记图标、标题和副标题、右侧箭头。笔记图标放在 leading，买菜是 title，晚上六点是 subtitle，箭头是 trailing。Card 把这四样托在同一张略微浮起的材质上，圆角和表面颜色也由这层材质一起给出。点这一整行，会走到 ListTile 的 onTap。

### 示例
visual: code
caption: 卡片里的一行
points: 卡片包住材质 | 四格都写上 | 整行交给点击

```dart
class NoteTile extends StatelessWidget {
  const NoteTile({super.key});
  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        leading: const Icon(Icons.note),
        title: const Text('买菜'),
        subtitle: const Text('晚上六点'),
        trailing: const Icon(Icons.chevron_right),
        onTap: () {},
      ),
    );
  }
}
```

代码最外层是 Card，里面只有一个 ListTile。leading 和 trailing 都是图标，title 是买菜，subtitle 是晚上六点。onTap 目前是空函数，点下去还没有下一页，但整行已经能接收点击。水波出现在卡片提供的材质上，点按已经交到这一整行自己身上，不必再在外面套一层手势探测器。

### 你会看到
visual: phone
caption: 买菜这一行
points: 卡片微微浮起 | 两行文字 | 整行可以点

手机框顶上是买菜这一行，框里三行写着卡片微微浮起、两行文字、整行可以点。屏幕上是一张略微抬起的卡片，四周能看出一层浅浅的浮起。第一行是买菜，第二行是晚上六点，左边是笔记图标，右边是箭头。手指按下时，水波铺在这张卡片里面。

### 常见坑
visual: warning
caption: 水波找不到材质
points: 行外没有材质 | 点了没有水波 | 外层抢走点击

错误卡上三行写着行外没有材质、点了没有水波、外层抢走点击。ListTile 的水波要向上找到 Material，把它单独放进没有材质的容器，一点就可能断言失败。Card 已经提供了这层材质。再在卡片外面套一个也在接点击的探测器，里面的水波常常出不来，整行像是没有按下。

### 收束
visual: path
caption: 接着搭骨架
points: 记住卡片和行 | 再搭页面骨架

路径上两步，先把卡片和这一行的分工记牢，再去搭一整页的骨架。卡片负责那层材质、圆角和浅浅的浮起。一行里的标题、说明、前后饰物和点击都交给 ListTile，按下时的水波要铺在这层材质上，不要把这一行单独放在没有材质的容器里。下一课是 Scaffold 骨架。

## lesson scaffold
title: Scaffold 骨架

### 定义
visual: concept
caption: 一页的五个槽
points: 顶栏 | 正文 | 抽屉 | 底栏 | 浮动按钮

画面上五行是顶栏、正文、抽屉、底栏、浮动按钮。Scaffold 用 appBar、body、drawer、bottomNavigationBar、floatingActionButton 这五个槽把它们放好，每一个槽各管页面上的一块位置。抽屉放进槽里以后，顶栏会自己带上菜单按钮，菜单按钮就是这么出现的。窗口够宽时，底栏那种切换可以改成正文旁边的 NavigationRail。

### 类比
visual: compare
left: 房间
right: 页面骨架
caption: 房间和页面
points: 门楣柜门地板 | 桌角有个把手 | 顶栏抽屉正文 | 底栏和浮动按钮

左边卡片是房间，两行写着门楣柜门地板、桌角有个把手。右边卡片是页面骨架，两行写着顶栏抽屉正文、底栏和浮动按钮。门楣像顶栏，柜门像抽屉，地板中间是正文。桌角的把手像浮动按钮，换房间的踏板像底栏，房子变宽以后，踏板可以改成靠墙的 NavigationRail。

### 机制
visual: phone
caption: 首页五个位置
points: 顶栏带菜单 | 中间是正文 | 底栏和加号

手机框顶上是首页五个位置，框里三行写着顶栏带菜单、中间是正文、底栏和加号。菜单按钮会出现，是因为 drawer 槽里放了抽屉。正文槽里是两个字，底栏有首页和我的两项，加号是浮动按钮，浮在底栏上方。宽屏时，这两项切换可以挪到侧面的 NavigationRail。

### 示例
visual: code
caption: 五个槽都放上
points: 顶栏正文抽屉 | 浮动的加号 | 底栏至少两项

```dart
class HomeShell extends StatelessWidget {
  const HomeShell({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('首页')),
      drawer: const Drawer(),
      body: const Text('正文'),
      floatingActionButton:
          FloatingActionButton(onPressed: () {}, child: const Icon(Icons.add)),
      bottomNavigationBar: BottomNavigationBar(items: const [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: '首页'),
        BottomNavigationBarItem(icon: Icon(Icons.person), label: '我的'),
      ]),
    );
  }
}
```

代码把五个槽都填上了，顶栏标题是首页，抽屉是一个 Drawer，正文是两个字。浮动按钮是加号，回调先留成空函数，所以它仍然可点。底栏放了首页和我的两项，少于两项会在调试时断言失败。NavigationRail 不在这些槽里，宽屏时要跟正文并排放。

### 你会看到
visual: phone
caption: 打开后的首页
points: 左上有菜单 | 中间写着正文 | 底部两项加号

手机框顶上是打开后的首页，框里三行写着左上有菜单、中间写着正文、底部两项加号。菜单能把抽屉拉开，正文留在顶栏下面，底部可以在首页和我的之间切换。右下角是加号，浮在底栏上方。窗口变宽时，这种切换可以改到左侧那条 NavigationRail，不必再挤在脚下。

### 常见坑
visual: warning
caption: 骨架容易套错
points: 一页套两层骨架 | 宽屏仍挤底栏 | 抽屉塞进正文

错误卡上三行写着一页套两层骨架、宽屏仍挤底栏、抽屉塞进正文。一页里面再套一个 Scaffold，浮动按钮和后来的提示会抢同一套槽。屏幕已经很宽，还把导航留在底部，两侧会空出大片。抽屉如果写在 body 里，顶栏不会出现菜单，也拉不开，它必须放进 drawer 槽。

### 收束
visual: path
caption: 接着看浮层
points: 记住五个槽 | 再看三种浮层

路径上两步，先把五个槽的位置记牢，再去看盖在页面上的三种浮层。窄屏用顶栏、正文、抽屉、底栏和浮动按钮把一整页稳稳撑起来。宽屏可以把底栏换成旁边的 NavigationRail，正文仍留在骨架的正中间，不必再另起一页。下一课是对话框、底部弹层与 SnackBar。

## lesson overlays
title: 对话框、底部弹层与 SnackBar

### 定义
visual: concept
caption: 三种盖住页面
points: 对话框 | 底部弹层 | 短暂提示

画面上三行是对话框、底部弹层、短暂提示。对话框用 showDialog 推到画面正中央，底部弹层用 showModalBottomSheet 从底下抽出，都要等用户看完再往下走。两者都会返回一个 Future，关掉以后后面的代码才继续。短暂提示用 ScaffoldMessenger.of(context).showSnackBar，它不挡整页，过一会儿自己从屏幕底边收起。

### 类比
visual: compare
left: 打断方式
right: 三种浮层
caption: 拦住和闪一下
points: 拦在路中间 | 从底下抽出来 | 对话框和弹层 | 提示一闪而过

左边卡片是打断方式，两行写着拦在路中间、从底下抽出来。右边卡片是三种浮层，两行写着对话框和弹层、提示一闪而过。拦在路中间的是对话框，从底下抽出来的是底部弹层，这两样都要等用户处理完。提示像柜台递来的小条，看一眼就行，原来的页面还留在下面。

### 机制
visual: phone
caption: 确认然后提示
points: 先弹出确认 | 再抽出操作 | 底边说已保存

手机框顶上是确认然后提示，框里三行写着先弹出确认、再抽出操作、底边说已保存。顺序和代码一致，确认框关掉之后，才调用底部弹层。弹层也关掉，并且页面的 context 仍挂在树上，才用 ScaffoldMessenger 把已保存送出去。中间若已经卸下，就不再继续。

### 示例
visual: code
caption: 三种浮层依次来
points: 对话框可关闭 | 弹层写更多操作 | 信使送出提示

```dart
Future<void> openNotice(BuildContext context) async {
  await showDialog<void>(
    context: context,
    builder: (context) => AlertDialog(
      title: const Text('确认'),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context), child: const Text('关闭')),
      ],
    ),
  );
  if (!context.mounted) return;
  await showModalBottomSheet<void>(
    context: context,
    builder: (context) => const Text('更多操作'),
  );
  if (!context.mounted) return;
  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('已保存')));
}
```

代码先等待对话框，确认框里的关闭按钮用 builder 交来的那个 context 去做 pop。回到页面后先看 mounted，已经卸下就直接返回，不再往下弹。接着等待底部弹层，里面写着更多操作，从屏幕底部抽出来。再次确认还在树上，才让 ScaffoldMessenger 出示一条已保存的提示。

### 你会看到
visual: phone
caption: 保存这一路
points: 中间要确认 | 底部还有操作 | 最后闪过已保存

手机框顶上是保存这一路，框里三行写着中间要确认、底部还有操作、最后闪过已保存。确认框挡在页面中央，点关闭会收起，点外面的遮罩默认也能收起。底部弹层从下方盖上来，点遮罩同样能把它放下。最后屏幕下方出现已保存，过一会儿自己消失，原来的页面还在。

### 常见坑
visual: warning
caption: 上下文找错了
points: 异步后上下文失效 | 用了更外层上下文 | 关闭时用错上下文

错误卡上三行写着异步后上下文失效、用了更外层上下文、关闭时用错上下文。await 回来要先看 mounted，组件卸下了就不能再弹。对话框和信使都要找得到应用根上的祖先，用更外面的 context 会找不到。showDialog 默认走根导航器，页面若包在内层导航里，用页面 context 去 pop，可能关掉的是页面。

### 收束
visual: path
caption: 接着看输入框
points: 记住三种浮层 | 再看输入框

路径上两步，先把三种浮层的用法分开记住，再去看用户怎么把字打进框里。对话框和底部弹层会挡住当前页，要等它们关掉，后面的代码才继续。提示条交给页面上的信使，过一会儿自己收起，原来的页面还留在下面。下一课是 TextField 基础。

## lesson text-field
title: TextField 基础

### 定义
visual: concept
caption: 输入框三件套
points: 控制器 | 装饰 | 变更回调

画面上三行是控制器、装饰、变更回调。TextField 把文字交给 TextEditingController，读取、改写、光标和选区都走它。decoration 是一份 InputDecoration，用来放标签、提示和错误文字。onChanged 在每次变化时拿到整段新字符串，控制器要跟 State 活得一样久，页面卸下时要调用它的 dispose，不然这些监听会一直留下来。

### 类比
visual: compare
left: 便签
right: 输入框
caption: 便签和格子
points: 本子记下内容 | 格子标出名字 | 控制器持有文本 | 装饰和回调分开

左边卡片是便签，两行写着本子记下内容、格子标出名字。右边卡片是输入框，两行写着控制器持有文本、装饰和回调分开。本子是控制器，格子上印的字是装饰里的标签，本子里的句子才是用户打出来的。每多写一个字，onChanged 就收到整句新文本，光标和选区也记在这本子上。

### 机制
visual: form
caption: 一栏报错一栏过
points: 名字还空着 | 格式已经通过

画面上两行输入，第一行报错写着名字还空着，第二行通过写着格式已经通过。报错那一行来自 decoration 的 errorText，这句话画在框下面，边框也会换成错误的颜色。通过的那一行不再设置 errorText，框回到平常的样子。控制器里的文字还在，通过只表示这次没有错误要显示。

### 示例
visual: code
caption: 控制器和标签
points: 控制器放状态里 | 标签写着名字 | 每次变更都回调

```dart
class NameField extends StatefulWidget {
  const NameField({super.key});
  @override
  State<NameField> createState() => _NameFieldState();
}
class _NameFieldState extends State<NameField> {
  final controller = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      decoration: const InputDecoration(labelText: '名字'),
      onChanged: (value) {},
    );
  }
}
```

代码把控制器放在 State 的字段里，避免每次 build 都换一个新的，输入也就不会被清掉。TextField 的 controller 指向它，decoration 只写了标签名字。onChanged 目前是空函数，每打一个字仍会进来，参数就是当时这一栏里的整段文本。页面销毁时要调用控制器的 dispose，否则监听会留下来。

### 你会看到
visual: phone
caption: 名字这一栏
points: 标签是名字 | 打字会触发回调 | 文字留在控制器

手机框顶上是名字这一栏，框里三行写着标签是名字、打字会触发回调、文字留在控制器。框的上方或内侧能看见名字两个字。每输入一个字符，onChanged 收到一次新字符串。离开这一页之前，文字一直待在控制器里，不会因为旁边无关的重建被清掉。

### 常见坑
visual: warning
caption: 控制器三种错
points: 控制器没有释放 | 构建里改写文本 | 错误文字一直留着

错误卡上三行写着控制器没有释放、构建里改写文本、错误文字一直留着。不调用 dispose，控制器的监听会跟着已经离开的页面留下来。在 build 里给 controller.text 赋值，光标会跳，输入也像被打断。errorText 一旦写上，输入变合法时要改回 null，否则通过了仍显示红字。

### 收束
visual: path
caption: 接着看进度
points: 记住输入三件套 | 再看进度和空态

路径上两步，先把输入框的三件套记牢，再去看等待和没有数据时画面该画什么。控制器管文字和光标，装饰管标签和错误文字，变更回调管每一次打字。页面卸下时记得把控制器释放掉，不要让监听留下来。下一课是进度与空状态。

## lesson progress-empty
title: 进度与空状态

### 定义
visual: concept
caption: 等待和没有数据
points: 圆形进度 | 条形进度 | 空了要有说明

画面上三行是圆形进度、条形进度、空了要有说明。圆形用 CircularProgressIndicator，横条用 LinearProgressIndicator，一个转圈，一个走条。不传 value 时，两者都表示还不知道完成了多少，动画会自己走。列表一项都没有时，要自己画一个空状态，让人看见一句说明，不要留下一块空白。

### 类比
visual: compare
left: 等车
right: 列表
caption: 等车和空站
points: 转圈表示还在来 | 空站要贴告示 | 进度说明在加载 | 空白要换成说明

左边卡片是等车，两行写着转圈表示还在来、空站要贴告示。右边卡片是列表，两行写着进度说明在加载、空白要换成说明。车还没到，站牌会告诉你正在等，列表还在请求，就画出圆形或横条。请求结束但一条都没有，不能只剩空白，要写出还没有笔记这样的话。

### 机制
visual: phone
caption: 加载或没有笔记
points: 圆圈自己在转 | 横条自己在走 | 空了写出一句

手机框顶上是加载或没有笔记，框里三行写着圆圈自己在转、横条自己在走、空了写出一句。前两行是两种进度。示例在加载时把它们放在一起，方便对照，真页面里按场景留一个就够。第三行是空状态，已经不在加载、又没有任何一项时，就换成这句说明。

### 示例
visual: code
caption: 加载空态和列表
points: 加载时两种进度 | 空了居中一句 | 有数据才列出来

```dart
class NotesBody extends StatelessWidget {
  const NotesBody({super.key, required this.loading, required this.items});
  final bool loading;
  final List<String> items;
  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Column(children: [
        CircularProgressIndicator(),
        LinearProgressIndicator(),
      ]);
    }
    if (items.isEmpty) return const Center(child: Text('还没有笔记'));
    return ListView(children: [for (final item in items) Text(item)]);
  }
}
```

代码先看 loading，为真时返回一列，里面是圆形和横条，都没有 value，所以是还不确定进度。不在加载而且一项都没有，就返回居中的还没有笔记。有数据才用列表把每一项画成文字。空的列表不会自动变成说明，所以这个分支要自己写。

### 你会看到
visual: phone
caption: 三种屏幕
points: 加载时看见进度 | 没有笔记有一句 | 有数据才出列表

手机框顶上是三种屏幕，框里三行写着加载时看见进度、没有笔记有一句、有数据才出列表。请求没回来时，能看见圆圈和横条在动。请求回来但一条都没有，中间是还没有笔记。有字符串之后，那些字才排成列表，进度和那句空话都退下。

### 常见坑
visual: warning
caption: 白屏和横条报错
points: 空列表什么都不画 | 横条遇到无限宽 | 加载和空态叠住

错误卡上三行写着空列表什么都不画、横条遇到无限宽、加载和空态叠住。一项都没有却返回一个没有子组件的列表，用户看见的是一块白。横条想要有限的最大宽度，直接放进横向不限宽的一行里，布局会失败。加载已经结束、列表也是空，两个条件如果写反，转圈和空话会叠在同一屏。

### 收束
visual: path
caption: 接着看手势
points: 记住进度和空态 | 再看三种手势

路径上两步，先把进度和空态的画法记牢，再去看手指怎么点、怎么拖、怎么缩放。圆形和横条是两种进度，不给完成比例时它们会自己动。一项都没有时要画出说明，不要留下一块白让用户自己猜。下一课是点击、拖动与缩放。
