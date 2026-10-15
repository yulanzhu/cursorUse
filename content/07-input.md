# 交互与表单

## lesson gestures
title: 点击、拖动与缩放

### 定义
visual: concept
caption: 三种手势
points: 点击 | 拖动 | 缩放

画面上三行是点击、拖动、缩放。GestureDetector 能分别接住这三种动作，子组件得先有一块看得见的尺寸，点击才有地方落下去。点击用 onTap，只处理拖动时用 onPanUpdate，细节里的 delta 是这一小段位移。缩放用 onScaleUpdate，scale 是倍数，focalPointDelta 是双指中心的位移，所以拖动也可以从这里读。

### 类比
visual: compare
left: 手指
right: 探测器
caption: 手指和回调
points: 点一下 | 拖走或捏合 | 点击单独回调 | 位移倍数在细节

左边卡片是手指，两行写着点一下、拖走或捏合。右边卡片是探测器，两行写着点击单独回调、位移倍数在细节。手指的动作要落到有尺寸的子组件上，探测器自己不会变出一块面积。点一下进入 onTap，拖走可以读位移，捏合可以读倍数，两样都从缩放细节里读时，就不要再同时登记平移回调。

### 机制
visual: phone
caption: 绿块听三种动作
points: 点按进入点击 | 拖动看位移 | 捏合看倍数

手机框顶上是绿块听三种动作，框里三行写着点按进入点击、拖动看位移、捏合看倍数。绿块有一百二十宽、八十高，点击才有地方落下。缩放回调同时带着倍数和中心位移，示例只用这一个更新回调，避免和平移回调抢同一套手势。位置和大小要不要变，还得在回调里改状态。

### 示例
visual: code
caption: 有尺寸的绿块
points: 点击回调 | 缩放里带位移 | 子组件有宽高

```dart
class ZoomCard extends StatelessWidget {
  const ZoomCard({super.key});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {},
      onScaleUpdate: (details) {},
      child: const SizedBox(
        width: 120,
        height: 80,
        child: ColoredBox(color: Color(0xFF1F7A6D)),
      ),
    );
  }
}
```

代码用探测器包住一块绿色的固定盒子，宽一百二十，高八十。onTap 处理点击，onScaleUpdate 的细节里可以读倍数和中心位移。示例先把两个回调留空，所以绿块还不会移动，位置和大小都要等你在回调里改状态。只想拖、不需要捏合时，把更新回调换成 onPanUpdate。

### 你会看到
visual: phone
caption: 绿块停在原地
points: 点按已经接住 | 细节里有位移 | 画面还没跟着改

手机框顶上是绿块停在原地，框里三行写着点按已经接住、细节里有位移、画面还没跟着改。两个回调还是空的，颜色和位置都不变。手势已经被探测器接住，下一帧动不动，取决于回调里改不改状态。子组件如果没有宽高，这三行动作都会落空。

### 常见坑
visual: warning
caption: 点不中或抢手势
points: 子组件没有尺寸 | 拖动和缩放互抢 | 透明区域点不中

错误卡上三行写着子组件没有尺寸、拖动和缩放互抢、透明区域点不中。探测器的大小跟着子组件走，子组件缩成零，点击就没有目标。平移更新和缩放更新写在一起会抢同一套手势，缩放细节里已经带有位移。默认要点中子组件本身，有尺寸但中间透明的区域，要把 behavior 设成不透明的命中，才接得住。

### 收束
visual: path
caption: 接着比两种点击
points: 记住三种手势 | 再比点击和水波

路径上两步，先把点击、拖动、缩放这三种手势记牢，再去比较单纯点击和带水波的点击。三种动作可以落到不同回调上，子组件要先有尺寸才接得住。缩放细节里已经有位移，不要和拖动回调叠在同一个探测器上。下一课是 GestureDetector 与 InkWell。

## lesson gesture-detector
title: GestureDetector 与 InkWell

### 定义
visual: concept
caption: 点击的两种反馈
points: 只接住手势 | 按下有水波 | 水波需要材质

画面上三行是只接住手势、按下有水波、水波需要材质。GestureDetector 把点击交到回调里，它不画按下的反馈。InkWell 在按下时画出水波纹，必须有一个 Material 祖先，水波才有一块地方铺开。普通容器涂上的颜色算不上这层材质，包在水波外面也仍然不够。

### 类比
visual: compare
left: 静音按键
right: 水面
caption: 按键和水面
points: 能按但没有声 | 反馈要自己画 | 按下会荡开 | 要有一层材质

左边卡片是静音按键，两行写着能按但没有声、反馈要自己画。右边卡片是水面，两行写着按下会荡开、要有一层材质。静音按键像探测器，动作收到了，外观要自己做，水面像水波组件，波纹出现在材质上，材质的形状会把水波裁住。没有这层材质，水波无处可画，调试时还会断言。

### 机制
visual: compare
left: GestureDetector
right: InkWell
caption: 有没有水波
points: 接住点击 | 不画水波 | 按下有水波 | 必须有材质祖先

左边卡片是 GestureDetector，两行写着接住点击、不画水波，右边卡片是 InkWell，两行写着按下有水波、必须有材质祖先。左边适合还要处理拖动或缩放的区域，反馈由你自己画。右边把点击和水波放在一起，外层得是材质，卡片那种材质也可以当祖先。水波只覆盖这块材质，不会漫到屏幕别处。

### 示例
visual: code
caption: 上下两种点击
points: 上面只接点击 | 下面材质加水波 | 内边距留出面积

```dart
class TwoTaps extends StatelessWidget {
  const TwoTaps({super.key});
  @override
  Widget build(BuildContext context) {
    return Column(children: [
      GestureDetector(onTap: () {}, child: const Text('只接收点击')),
      Material(
        child: InkWell(
          onTap: () {},
          child: const Padding(
            padding: EdgeInsets.all(12),
            child: Text('带水波纹'),
          ),
        ),
      ),
    ]);
  }
}
```

代码上面是探测器，子组件写着只接收点击，没有水波。下面先放 Material，再放 InkWell，文字是带水波纹，四周留出十二的内边距，水波才有一块面积。按下第二行，波纹出现在这层材质里面。材质一定要是祖先，写到水波组件的里面就来不及。

### 你会看到
visual: phone
caption: 两行点击反馈
points: 第一行没有水波 | 第二行按下有纹 | 波纹停在材质内

手机框顶上是两行点击反馈，框里三行写着第一行没有水波、第二行按下有纹、波纹停在材质内。第一行只有探测器，文字能点，外观保持不变。第二行按下时能看见水波散开，松手后波纹收掉。波纹被材质的范围裁住，不会铺满整页。

### 常见坑
visual: warning
caption: 水波出不来
points: 没有材质祖先 | 材质放在里面 | 子组件没有面积

错误卡上三行写着没有材质祖先、材质放在里面、子组件没有面积。水波组件找不到 Material 时，一点就抛出没有材质的断言。把材质放成它的子组件，水波仍然找不到祖先。文字四周不留空、子组件又没有尺寸，水波没有面积，按下就像没有反应。

### 收束
visual: path
caption: 接着做表单
points: 分清两种点击 | 再做表单校验

路径上两步，先把两种点击的差别分清，再去做要检查、要保存的表单。探测器只把动作交到回调里，按下时不画水波。带水波的点击必须有材质祖先，波纹才有地方铺开，也会被材质的形状裁在那一块里面。下一课是 Form 与校验。

## lesson forms
title: Form 与校验

### 定义
visual: concept
caption: 校验然后保存
points: 表单钥匙 | 校验函数 | 通过后保存 | 何时自动校验

画面上四行是表单钥匙、校验函数、通过后保存、何时自动校验。Form 配一把 GlobalKey，类型是 FormState，才能在提交时找到表单。TextFormField 的 validator 返回 null 表示通过，返回一句说明表示错误。validate 跑完各栏并告诉你是否全部通过，save 才会调用每栏的 onSaved，autovalidateMode 决定这些检查什么时候自动发生。

### 类比
visual: compare
left: 收表格
right: 表单
caption: 先查再归档
points: 先检查再归档 | 空着就退回 | 先校验再保存 | 模式决定何时查

左边卡片是收表格，两行写着先检查再归档、空着就退回。右边卡片是表单，两行写着先校验再保存、模式决定何时查。窗口先看每一栏，空着就退回，全部通过才收进档案。validate 负责检查，save 负责把值交给 onSaved，它不会代替检查，自动校验模式决定是改字时查，还是等你提交再查。

### 机制
visual: form
caption: 一栏空一栏过
points: 名字还空着 | 邮箱格式对了

画面上两行输入，第一行报错写着名字还空着，第二行通过写着邮箱格式对了。这是 validate 跑完以后的样子，名字那栏发现是空的，就马上在框下返回一句错误说明。邮箱那栏返回 null，所以算通过。只有每一栏都返回 null，validate 才得到真，这时再调用 save。

### 示例
visual: code
caption: 钥匙校验和保存
points: 钥匙挂在表单上 | 改过之后再校验 | 通过才保存

```dart
final formKey = GlobalKey<FormState>();

Widget nameForm() => Form(
  key: formKey,
  autovalidateMode: AutovalidateMode.onUserInteraction,
  child: TextFormField(
    validator: (value) => (value == null || value.isEmpty) ? '请填写' : null,
    onSaved: (value) {},
  ),
);

void submitName() {
  final form = formKey.currentState;
  if (form != null && form.validate()) form.save();
}
```

代码用一把放在外面的钥匙挂到 Form 上。自动校验模式是用户交互之后才查，刚进页面时不会先对空栏报错。空字符串返回请填写，有字则返回 null。提交时取出表单状态，validate 为真才 save，上一课的普通输入框没有 validator，要这样查就换成表单字段。

### 你会看到
visual: phone
caption: 提交后的两行
points: 空名字出现错误 | 填了才算通过 | 通过后才会保存

手机框顶上是提交后的两行，框里三行写着空名字出现错误、填了才算通过、通过后才会保存。名字空着时，框下出现请填写。填上字以后，这句错误消失，用户改过内容之后才会自动检查，刚进页面时还不会变红。save 只有在检查通过时才执行。

### 常见坑
visual: warning
caption: 校验没有接上
points: 钥匙没有挂稳 | 一进来就全红 | 查过了却没保存

错误卡上三行写着钥匙没有挂稳、一进来就全红、查过了却没保存。钥匙如果写在 build 里面，每次重建都是新的，表单状态会对不上。自动模式用始终校验，页面刚出现就对空栏报错。检查已经通过却忘了 save，onSaved 不会执行，校验函数返回空字符串也算失败，通过必须返回 null。

### 收束
visual: path
caption: 接着看焦点
points: 记住校验和保存 | 再看焦点和键盘

路径上两步，先把校验和保存的顺序记牢，再去看焦点怎么跳、键盘右下角写什么。表单用钥匙找到 validate 和 save，字段用校验函数返回 null 或一句错误。自动模式可以等用户改过再查，也可以等这一栏失去焦点再查。下一课是焦点与键盘。

## lesson focus-keyboard
title: 焦点与键盘

### 定义
visual: concept
caption: 焦点和右下角
points: 焦点节点 | 跳到下一个 | 键盘右下角

画面上三行是焦点节点、跳到下一个、键盘右下角。FocusNode 可以交给输入框的 focusNode，方便从外面查看或请求这一栏。FocusScope.of(context).nextFocus 按遍历顺序跳到下一个可聚焦的组件，TextInputAction 决定键盘右下角画成下一步、完成还是搜索。自己创建的焦点节点，要在页面卸下时 dispose。

### 类比
visual: compare
left: 叫号
right: 输入焦点
caption: 叫号和键盘
points: 叫到下一位 | 牌子写下一位 | 节点拿住当前栏 | 右下角决定按钮

左边卡片是叫号，两行写着叫到下一位、牌子写下一位。右边卡片是输入焦点，两行写着节点拿住当前栏、右下角决定按钮。牌子上的字是键盘动作，它决定右下角长什么样。真正叫下一位的是 nextFocus，当前这一栏由焦点节点拿着，跳走以后，下一栏才会变亮。

### 机制
visual: form
caption: 报错栏还占焦点
points: 这一栏还报错 | 下一栏已经通过

画面上两行输入，第一行报错写着这一栏还报错，第二行通过写着下一栏已经通过。焦点应该还留在报错的这一栏，方便马上修改。键盘右下角如果是下一步，按下之后要走到已经通过的下一栏。动作类型负责按钮上的字，自己写了编辑完成的回调，就要在里面调用 nextFocus，焦点才会过去。

### 示例
visual: code
caption: 下一步交给下栏
points: 自己持有焦点 | 右下角是下一步 | 编辑完成时跳转

```dart
class JumpFields extends StatefulWidget {
  const JumpFields({super.key});
  @override
  State<JumpFields> createState() => _JumpFieldsState();
}
class _JumpFieldsState extends State<JumpFields> {
  final node = FocusNode();
  @override
  Widget build(BuildContext context) {
    return TextField(
      focusNode: node,
      textInputAction: TextInputAction.next,
      decoration: const InputDecoration(labelText: '名字'),
      onEditingComplete: () => FocusScope.of(context).nextFocus(),
    );
  }
}
```

代码自己持有一个焦点节点，交给这一栏输入框。键盘动作设成下一步，右下角就显示下一步。编辑完成的回调里只调用一次 nextFocus，自己写了这个回调，框架那次默认跳转就不会再执行，所以这里不能再在提交回调里跳第二次。节点在状态里创建，销毁时要一起释放。

### 你会看到
visual: phone
caption: 键盘上的下一步
points: 名字栏占着焦点 | 右下角写下一步 | 按下跳到下一栏

手机框顶上是键盘上的下一步，框里三行写着名字栏占着焦点、右下角写下一步、按下跳到下一栏。光标停在名字这一栏里。键盘右下角的按钮写成下一步。按下之后，焦点进入下一个可聚焦的输入框，这一栏的节点不再是当前焦点。

### 常见坑
visual: warning
caption: 焦点跳过或停住
points: 节点忘记释放 | 跳转调用了两次 | 右下角只改了字

错误卡上三行写着节点忘记释放、跳转调用了两次、右下角只改了字。焦点节点不释放，监听会留在已经离开的页面外面。不写编辑完成回调时，下一步已经会自己跳走。这时再在提交回调里调用 nextFocus，焦点会跳过一栏，自己写了完成回调却不调用跳转，右下角的字变了，焦点仍停在原地。

### 收束
visual: path
caption: 接着看刷新
points: 记住焦点和键盘 | 再看刷新和删除

路径上两步，先把焦点和键盘右下角的分工记牢，再去看列表怎么下拉刷新、怎么滑开删除。焦点节点拿住当前这一栏，nextFocus 按顺序跳到下一栏。右下角的字由输入动作决定，自己接管完成回调时就要亲自做这次跳转。下一课是下拉刷新与滑动删除。

## lesson refresh-dismiss
title: 下拉刷新与滑动删除

### 定义
visual: concept
caption: 下拉和滑开
points: 下拉刷新 | 等待未来 | 滑动删除 | 每行要有键

画面上四行是下拉刷新、等待未来、滑动删除、每行要有键。RefreshIndicator 包住可滚动的列表，onRefresh 必须返回 Future，圆圈会等到它结束才收起。Dismissible 让一行可以滑走，构造时必须带 Key，用来认出滑走的是哪一行。confirmDismiss 可以先问一句，返回 false 就把这次滑开取消，行会弹回去。

### 类比
visual: compare
left: 抽屉纸条
right: 列表
caption: 拉开和撕掉
points: 拉开找新的 | 撕前问一声 | 刷新等未来 | 删除要有键

左边卡片是抽屉纸条，两行写着拉开找新的、撕前问一声。右边卡片是列表，两行写着刷新等未来、删除要有键。拉开抽屉像下拉，松手后要等新数据回来，圆圈才消失。撕纸条前问一声，就是确认回调，每张纸条要有自己的键，否则框架分不清滑走的是哪一张。

### 机制
visual: phone
caption: 刷新然后删除
points: 下拉出现圆圈 | 松手后等待 | 滑开可以确认

手机框顶上是刷新然后删除，框里三行写着下拉出现圆圈、松手后等待、滑开可以确认。圆圈会留到 onRefresh 的 Future 完成。列表不满一屏时，示例加了始终可滚动的物理效果，否则内容太短就拉不动。某一行滑开时，确认回调返回真才真正移走，返回假会弹回原处。

### 示例
visual: code
caption: 刷新包住可滑行
points: 刷新返回未来 | 每行有键 | 确认后才滑走

```dart
class NoteList extends StatelessWidget {
  const NoteList({super.key, required this.items});
  final List<String> items;
  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: () async {},
      child: ListView(physics: const AlwaysScrollableScrollPhysics(), children: [
        for (final item in items)
          Dismissible(
            key: ValueKey(item),
            confirmDismiss: (direction) async => true,
            child: ListTile(title: Text(item)),
          ),
      ]),
    );
  }
}
```

代码用刷新指示器包住列表，onRefresh 是异步函数，所以返回一个 Future。物理效果让内容很短时也能下拉。每一行是可滑走的组件，键用这项字符串包成 ValueKey，确认回调现在固定返回真。真正从数据里删掉这一项要等确认通过，两行字符串相同，键就会撞在一起。

### 你会看到
visual: phone
caption: 列表两种手势
points: 下拉看见圆圈 | 松手后圈消失 | 滑开一行会离开

手机框顶上是列表两种手势，框里三行写着下拉看见圆圈、松手后圈消失、滑开一行会离开。向下拉，顶部出现圆形指示器。刷新的 Future 一结束，圆圈就收起，把一行滑到一边，确认通过后这一行离开。确认如果返回假，这一行会回到原来的位置。

### 常见坑
visual: warning
caption: 圈不走或行报错
points: 未来一直不完成 | 短列表拉不动 | 删除行没有键

错误卡上三行写着未来一直不完成、短列表拉不动、删除行没有键。刷新回调的 Future 如果不结束，圆圈会一直转。列表比屏幕短，又没有始终可滚动的物理效果，下拉没有位移，刷新不会触发。可滑走的行缺少 Key，调试时会直接断言，键如果重复，滑走的可能是另一行。

### 收束
visual: path
caption: 接着看读屏
points: 记住刷新和删除 | 再看读屏和字号

路径上两步，先把下拉刷新和滑动删除记牢，再去看读屏怎么念、字号怎么跟着系统变。刷新回调要返回一个未来，指示器会等到它完成才收起圆圈。滑走的每一行必须有自己的键，确认回调返回假就能把它取消。下一课是 Semantics 与字号。

## lesson semantics
title: Semantics 与字号

### 定义
visual: concept
caption: 读屏标签和字号
points: 读屏标签 | 字号缩放器 | 只换算一次

画面上三行是读屏标签、字号缩放器、只换算一次。Semantics 的 label 告诉读屏软件这块界面是什么，屏幕上画出来的可以只是一个数字或图标。字号缩放从 MediaQuery.textScalerOf 读取，它返回一个缩放器。普通文字会自己套用这份缩放，需要自己算像素时再调用 scale，不要先乘一次，又交给文字再乘一次。

### 类比
visual: compare
left: 门口牌子
right: 界面语义
caption: 牌子和读屏
points: 牌子写出用途 | 字跟着眼睛放大 | 标签告诉读屏 | 缩放器改字号

左边卡片是门口牌子，两行写着牌子写出用途、字跟着眼睛放大。右边卡片是界面语义，两行写着标签告诉读屏、缩放器改字号。门上的牌子像标签，路人不用先看懂窗里的数字。系统把字放大时，textScalerOf 带回这份设置，文字按它来排，牌子和窗里的字如果都念出来，听的人会听到两遍。

### 机制
visual: phone
caption: 数字和它的读法
points: 屏上只画数字 | 读屏念整句 | 字号跟着缩放

手机框顶上是数字和它的读法，框里三行写着屏上只画数字、读屏念整句、字号跟着缩放。数字三是给人看的，标签是已完成三件事。把子组件从语义树里拿掉以后，读屏只念这句，不会再把数字念一遍。设计字号二十经过缩放器换算，系统放大时，这个三也会变大。

### 示例
visual: code
caption: 标签替换数字
points: 标签是整句 | 子语义被拿掉 | 缩放只交一次

```dart
class LoudTitle extends StatelessWidget {
  const LoudTitle({super.key});
  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: '已完成三件事',
      excludeSemantics: true,
      child: Text(
        '3',
        textScaler: MediaQuery.textScalerOf(context),
        style: const TextStyle(fontSize: 20),
      ),
    );
  }
}
```

代码用语义组件包住一段文字，标签写的是已完成三件事，子语义被排除，屏幕上的数字不再进入读屏树。文字显示三，缩放器来自 textScalerOf，设计字号仍是二十。文字不写缩放器时也会自己读取同一份，这里写出来是为了看清来源。先用 scale 乘出字号再交给文字，又保留缩放器，字会放大两次。

### 你会看到
visual: phone
caption: 完成数怎么被读
points: 屏幕上是数字三 | 读屏念完整句 | 大字号时三变大

手机框顶上是完成数怎么被读，框里三行写着屏幕上是数字三、读屏念完整句、大字号时三变大。眼睛看见的只有一个三。打开读屏以后，听到的是已完成三件事。把系统字号调大，这个三跟着变大，因为缩放器作用在字号二十上，而且只换算一次。

### 常见坑
visual: warning
caption: 读屏和字号错了
points: 只有图标没有标签 | 字被放大两次 | 标签和原文一起念

错误卡上三行写着只有图标没有标签、字被放大两次、标签和原文一起念。只有图标、没有标签，读屏只能知道这里能点，不知道是分享还是删除。自己先用 scale 乘出字号，又让文字再套一次缩放器，字会过大。标签已经说明了含义，却不把子语义拿掉，数字和整句会被连着念出来。

### 收束
visual: path
caption: 接着看跳转
points: 记住读屏和字号 | 再看页面怎么切换

路径上两步，先把读屏标签和字号缩放记牢，再去看一页怎么推进、怎么退回。语义标签把数字或图标的含义告诉读屏，系统放大时文字按缩放器变大，而且只换算一次。自己先乘出字号再交给文字，字就会放得过大，听的人也会把标签和原文连着念。下一课是 Navigator push 与 pop。
