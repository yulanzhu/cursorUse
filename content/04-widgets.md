# Widget 核心

## lesson everything-widget
title: 一切皆 Widget

### 定义
visual: concept
caption: 配置都是 Widget
points: 间距 | 对齐 | 按钮 | 文本

画面上的四个要点是间距、对齐、按钮和文本。Flutter 里几乎一切界面配置都是 Widget，留白和对齐也算在内。按钮负责点按，文本负责显示，间距负责四周空白，对齐负责把内容摆到指定位置。它们职责不同，写进树里时都是同一类配置，绘制交给框架完成。

### 类比
visual: compare
left: 单块积木
right: 拼好的页面
caption: 积木拼成页面
points: 间距一块 | 按钮一块 | 嵌套组合 | 整屏出现

左边是单块积木，间距一块，按钮一块，每块都可以单独拿下来换掉。右边是拼好的页面，这些积木嵌套组合之后，一整屏界面就出现了。你写界面，就是在挑这些积木，并决定谁包住谁。换掉其中一块，周围的结构还可以留着，整页不用推倒重来。

### 机制
visual: trees
caption: 配置走到绘制
points: 界面配置 | 树上实例 | 布局绘制

三列标题是 Widget、Element、RenderObject。最左的 Widget 列放的是界面配置，间距、对齐、按钮和文本都写在这里，留白也不例外。中间 Element 列是这棵树上活着的实例，右边 RenderObject 列负责把配置布局并绘制出来。你平时编写的代码，主要落在最左边这一列，后两列由框架在运行时接上。

### 示例
visual: code
caption: 间距对齐和文本
points: 四周留白 | 居中对齐 | 一行你好

```dart
class HelloCard extends StatelessWidget {
  const HelloCard({super.key});
  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.all(16),
      child: Align(
        alignment: Alignment.center,
        child: Text('你好'),
      ),
    );
  }
}
```

代码里 Padding 负责间距，Align 负责对齐，Text 写出一行你好。三层都是 Widget，从最外层的留白到中间的文字，都标成了 const。这里没有点击逻辑，它只描述卡片中间有一行字，四周留出空白。框架拿到这棵配置之后，再去排版，并把结果画到屏幕上，像素不用你自己描。

### 你会看到
visual: phone
caption: 一张居中卡片
points: 四周留白 | 文字居中 | 一行你好

手机预览的标题是一张居中卡片。屏幕上能看到四周留白、文字居中，还有中间的一行你好。留白来自间距配置，居中来自对齐配置，它们和文本一样，都是写在树上的 Widget。这一页没有第二屏，也没有列表，只让你看清这三样东西。

### 常见坑
visual: warning
caption: 只记得按钮文本
points: 漏掉间距 | 漏掉对齐 | 当成普通参数

错误卡上写着漏掉间距、漏掉对齐、当成普通参数。初学时容易只把按钮和文本当成 Widget，把留白写成某个数字字段。间距和对齐本身也要放进树里，才会跟着别的配置一起参与排版。漏掉它们，文字会贴边，位置也到不了卡片中间。

### 收束
visual: path
caption: 下一步看无状态
points: 记住配置 | 看无状态

步骤第一条是记住配置，第二条是看无状态。间距、对齐、按钮和文本，都用 Widget 来描述，整页就是这些配置一层层嵌在一起。字段在构造时定下来，控件自己不再改写这份配置，下一次要变，就换一份新的配置从外面传进来。下一课是 StatelessWidget。

## lesson stateless
title: StatelessWidget

### 定义
visual: concept
caption: 自身不能修改
points: 自身不可变 | 配置传入 | 返回子树

三个要点是自身不可变、配置传入、返回子树。StatelessWidget 的字段在构造时定下来，之后这份对象不再修改。build 根据传入的配置，返回下面的子 Widget，名字和颜色都从外面进来。控件自己不保存会变的数据，这一次显示什么，全看拿到的参数，这一点先记住。

### 类比
visual: compare
left: 固定模具
right: 每次盖印
caption: 模具和盖印
points: 模具不变 | 参数外给 | 按参产出 | 得到子树

左边是固定模具，模具不变，印什么由参数外给。右边是每次盖印，按参产出，得到一棵新的子树。参数换成另一套，盖出来的图案就换一版，模具这个类还是原来的类。它不会把本次结果存进自己身体里，下次仍按新参数现盖一次。

### 机制
visual: concept
caption: build 只做组装
points: 读入配置 | 挑选子组件 | 立刻返回

这一屏的三点是读入配置、挑选子组件、立刻返回。build 先看构造时传入的字段，再决定用哪些子 Widget 把界面装出来。它把子树交出去就结束，不等待网络，也不改写自己的字段。无状态控件这一次显示什么，完全由这次传入的配置决定。

### 示例
visual: code
caption: 按名字问候
points: 名字传入 | 拼成问候 | 现算现返

```dart
class Greeting extends StatelessWidget {
  const Greeting({super.key, required this.name});
  final String name;
  @override
  Widget build(BuildContext context) {
    return Text('你好，$name');
  }
}
```

Greeting 把 name 定成必填字段，build 里只用它拼成一句你好。控件身上没有计数器，也没有可以改写的缓存，名字只活在这次传入的配置里。调用的人换成另一个名字，就会得到另一棵文本配置。这个类每次都是现算现返回，不把结果留下来。

### 你会看到
visual: phone
caption: 名字换文字换
points: 传入小明 | 你好小明 | 类本身不变

手机上先传入小明，中间显示你好小明。把配置换成小红，文字跟着换成你好小红，类本身不变。变的是这次传入的名字，控件并没有在内部另存一份。你在这台手机上找不到偷偷保存的数据，看到的就是配置直接变出来的那句问候。

### 常见坑
visual: warning
caption: 在里面存变量
points: 字段乱改 | 点击没反应 | 该换 State

错误卡写着字段乱改、点击没反应、该换 State。在 StatelessWidget 里给普通字段赋值，下一次 build 不会按你希望的那样留下这次修改。点击之后要变化的数字，得放到 State 里面，由那一份对象保管。这个类只负责把外面的配置翻译成子 Widget，点按后要变的数别往这里塞。

### 收束
visual: path
caption: 下一步看生命周期
points: 翻译配置 | 进入生命周期

步骤上先是翻译配置，再是进入生命周期。无状态控件把传入配置变成子树，自己不留会变的账，每次都按新参数重新算一遍。会变的数据要另找地方保管，才能跨过多次构建还在，页面上的数字才留得住。下一课是 StatefulWidget 与生命周期。

## lesson stateful
title: StatefulWidget 与生命周期

### 定义
visual: concept
caption: 可变数据在 State
points: 外壳不可变 | 数据在 State | 位置类型键

三个要点是外壳不可变、数据在 State、位置类型键。StatefulWidget 同样不可变，会变的数字和勾选都放在 State 里，不写在外壳上。createState 负责创建这份 State，之后由它记住那些会变的数据。同一位置、同运行类型、Key 相同时，原来的 State 会保留下来，父级换新外壳时账本还在。

### 类比
visual: compare
left: 外壳配置
right: 里面的账本
caption: 外壳和账本
points: 外壳可换 | 父级重传 | 账本还在 | 数字留下

左边是外壳配置，外壳可换，每次可以由父级重新传来一份新的。右边是里面的账本，账本还在，位置相同的时候数字留下。你要改的是账本上的数，外壳保持不可变，不在上面涂改。Key 和运行类型也对得上时，账不会被换成一本新的。

### 机制
visual: rebuild
caption: 右边子树闪烁
points: 3 | 加一

左边标着保持不动，页头和标题停在原地，没有跟着一起闪。右边标着 setState，计数 3 和加一正在闪烁，只有这块子树被标脏。setState 之后，框架重新调用这一层的 build，把新的数字交出去。State 还在，因为位置、运行类型和 Key 都没有变，左边那两行不在这块子树里。

### 示例
visual: code
caption: 订阅然后解除
points: 创建状态 | 定时订阅 | 离开解除

```dart
class Pulse extends StatefulWidget {
  const Pulse({super.key});
  @override
  State<Pulse> createState() => _PulseState();
}
class _PulseState extends State<Pulse> {
  late final Timer timer;
  var count = 0;
  @override
  void initState() {
    super.initState();
    timer = Timer.periodic(const Duration(seconds: 1), (_) => setState(() => count += 1));
  }
  @override
  void dispose() { timer.cancel(); super.dispose(); }
  @override
  Widget build(BuildContext context) => Text('$count');
}
```

代码从 createState 交出 State，initState 里启动定时器，一次性订阅就放在这里。dispose 里取消定时器，页面离开后回调就停下来。build 只负责把 count 显示出来，数字变化时用 setState 通知框架重画。依赖变化会走 didChangeDependencies，新配置会走 didUpdateWidget，这两步之后也都会再次进入 build，这几步的顺序先按这个记。

### 你会看到
visual: phone
caption: 数字每秒加一
points: 计数在涨 | 页头不动 | 离开后停止

手机上计数在涨，大约每秒加一，页头那一行保持不动。离开这个页面以后，定时器停掉，数字不再往上跳。你看见的变化来自 State 里的 count，外壳每次只是按当前数字把文本配置交出去。页面还在的时候，这份账本就一直留在原来的 State 上。

### 常见坑
visual: warning
caption: 订阅要成对解除
points: 只订阅 | 忘记解除 | 依赖里订阅

错误卡上是只订阅、忘记解除、依赖里订阅。一次性订阅要写在 initState 里，离开页面时在 dispose 里成对解除。页面关掉以后定时器还在，setState 会打到已经卸下的 State 上，框架就会报错。didChangeDependencies 可能进入多次，不适合承担只做一次的订阅，否则同一次进入会订上好几份。

### 收束
visual: path
caption: 下一步看纯 build
points: 记住 State | 看纯 build

步骤第一条记住 State，第二条看纯 build。外壳不可变，可变数据在 State，订阅和解除要配成一对，页面离开时把回调停掉。构建接下来会被频繁调用，里面不能再夹带请求或赋值。下一课是 build 方法为什么要纯，那一课专门讲这里为什么不能夹带动作。

## lesson pure-build
title: build 方法为什么要纯

### 定义
visual: concept
caption: 会被频繁调用
points: 频繁执行 | 快速返回 | 动作外置

三个要点是频繁执行、快速返回、动作外置。build 会一次次进来，父级刷新、依赖变化，热重载时也可能再把它叫进来。它要尽快返回 Widget，把这一次要显示的配置交出去。发请求、改变量、打印，都挪到按钮回调或生命周期里，不要留在这里。

### 类比
visual: compare
left: 纯描述
right: 夹带动作
caption: 描述对上动作
points: 读配置 | 返回界面 | 发请求 | 改数据

左边是纯描述，只做两件事，读配置，然后返回界面。右边是夹带动作，把发请求和改数据写了进去。build 如果走右边，一次打开页面重建好几趟，请求就会打出好几遍。动作留在按钮回调里，左边的描述才每次都得到同一份结果，界面才不会跟着乱。

### 机制
visual: warning
caption: 这三件别做
points: 发请求 | 改变量 | 打印副作用

错误卡上三行是发请求、改变量、打印副作用。请求放进 build，进来一次就可能打一次网络，重建几次就打几次。给变量赋值，会让这次重建顺便改掉数据，下一次的结果更难预料。打印同样是副作用，列表一长，控制台会被刷满，排查时也看不清。

### 示例
visual: code
caption: 只返回配置
points: 只读参数 | 包一层间距 | 返回文本

```dart
class BannerText extends StatelessWidget {
  const BannerText({super.key, required this.label});
  final String label;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(12),
      child: Text(label),
    );
  }
}
```

画面上的 build 只读 label，外包一层 Padding，再返回 Text。没有网络调用，没有给字段赋新值，也没有在这里打印日志。这次返回的配置完全由传入的 label 决定，算完就交出去。框架即使连续调用几次，得到的子树仍然是一致的，文字不会因为多跑几次就变样。

### 你会看到
visual: phone
caption: 文字稳定出现
points: 标题稳定 | 没有重复请求 | 页面不乱跳

手机上标题稳定，没有重复请求，页面也不乱跳。你让父级多刷新几次，文字还是同一句，控制台也保持安静。这说明 build 每次都只是把同一份配置交出去，没有顺手做别的事。界面稳，是因为这里没有夹带动作，刷新多少次都还是那一句。

### 常见坑
visual: warning
caption: 打印也是副作用
points: 控制台刷屏 | 请求打多次 | 状态被改乱

错误卡写着控制台刷屏、请求打多次、状态被改乱。有人觉得打印无害，于是在 build 里写日志，结果一次点击就刷出好几行。一次操作可能触发多次 build，日志和请求都会被放大。要观察数据，把打印放到按钮回调或 initState 里，这样构建过程才能保持安静。

### 收束
visual: path
caption: 下一步给身份
points: 保持快速 | 看 Key

步骤上先保持快速，再看键的用法。构建方法要快，只把界面配置交回去，请求、赋值和打印都挪走，这样重建才不会把副作用放大。列表项如果自己带着状态，就得另外给它们一个稳定身份，不能只靠排在第几位。下一课是 Key 的作用。

## lesson keys
title: Key 的作用

### 定义
visual: concept
caption: 身份不靠下标
points: 元素身份 | 不跟下标 | 用 ValueKey

三个要点是元素身份、不跟下标、用 ValueKey。Key 用来标明这一项是谁，让 State 跟着元素身份走，列表下标只表示这一次排在第几位。列表重排时，如果只看下标，勾选会留在旧的那一行。给 Stateful 的列表项配上 ValueKey，状态才能对回原来的那一项，重排时尤其要这样。

### 类比
visual: compare
left: 按座位找人
right: 按姓名找人
caption: 座位和姓名
points: 对号入座 | 人换了座 | 喊到名字 | 还是那人

左边按座位找人，讲究对号入座，人换了座就会找错人。右边按姓名找人，喊到名字，还是那人，不看他现在坐在哪一排。列表里的 State 也一样，ValueKey 扮演姓名，下标只是这一次的座位。重排之后要认人，就得靠右边这一种对法，座位号留不住人。

### 机制
visual: compare
left: 按下标配对
right: 按 Key 配对
caption: 两种配对方式
points: 第几位 | 状态串位 | 同一个键 | 状态留住

左边按下标配对，只看它排在第几位，状态就会串到旁边的项上。不写 Key 时，每一项的键都空着，框架只能按这个位置对齐。右边按 Key 配对，同一个键仍是同一个元素，状态留在原来那一项上。重排 Stateful 列表时走右边，用 ValueKey 把身份写明确，身份就稳定了。

### 示例
visual: code
caption: 用 id 当键
points: 项上写键 | 稳定的 id | 勾选跟着走

```dart
class TaskTile extends StatefulWidget {
  const TaskTile({super.key, required this.id});
  final String id;
  @override
  State<TaskTile> createState() => _TaskTileState();
}
class _TaskTileState extends State<TaskTile> {
  bool done = false;
  @override
  Widget build(BuildContext context) => Checkbox(
    value: done,
    onChanged: (v) => setState(() => done = v ?? false),
  );
}
List<Widget> rows(List<String> ids) => [
  for (final id in ids) TaskTile(key: ValueKey(id), id: id),
];
```

TaskTile 自己保存 done，勾选值放在 State 里，跟着这一项走。rows 给每一项写上 ValueKey，值用条目自己的 id，不拿下标来充数。列表颠倒或插入新项时，框架按这个键找回原来的 State。勾选留在对应的 id 上，不会因为排到前面就掉到第一行，勾选就跟着原来的编号走。

### 你会看到
visual: phone
caption: 勾选跟着原项
points: 第一项勾了 | 列表颠倒 | 勾选跟着走

手机上第一项勾了，接着整份列表颠倒，顺序整个换了一遍。勾选跟着走，出现在该项的新位置，还是原来那一项，没有留在第一行。若当时没有 ValueKey，勾选会粘在旧的下标上。现在身份对上了，状态跟着这一项走，这就是键要解决的那件事。

### 常见坑
visual: warning
caption: Key 放错地方
points: 键放进内部 | 用下标当键 | 状态仍错位

错误卡写着键放进内部、用下标当键、状态仍错位。Key 要写在列表里的那个 StatefulWidget 上，写到内部的文本或图标上帮不上忙。用会变的下标当 ValueKey，配对结果仍和下标绑在一起。稳定不变的 id 才适合做这个值，否则重排之后勾选还是会飞到别的行上。

### 收束
visual: path
caption: 下一步看 const
points: 身份对齐 | 看 const

步骤第一条是身份对齐，第二条是看 const。Key 让状态跟着元素身份走，重排 Stateful 列表时用 ValueKey，下标只表示这一次的排列顺序，勾选才能留在原来那一项上，不会粘在旧的行号。相同的配置怎么省，留到下一课再讲，那里专门看怎样少做重复的组装。下一课是 const 构造优化。

## lesson const-widgets
title: const 构造优化

### 定义
visual: concept
caption: 相同配置可复用
points: const 构造 | 配置复用 | 跳过重建

三个要点是 const 构造、配置复用、跳过重建。const 构造能让相同配置被复用，多次写出同一份时，可以是同一份实例。父级重建走到这里，框架发现配置没有变化，就可以跳过一部分重建。会随数据变化的那一层，仍然照常往下建，不会被这一层挡住。

### 类比
visual: compare
left: 每次新写
right: 同一张卡
caption: 新写和复用
points: 内容一样 | 仍要重做 | 配置相同 | 直接复用

左边是每次新写，内容一样，仍要重做一遍，纸张也要重新拿。右边是同一张卡，配置相同，就直接复用，不必再抄一份。const 走的是右边这条路，把不变的标题固定下来。会变的内容留在卡片外面，该重建的时候再单独重建，纸不用再费一遍。

### 机制
visual: concept
caption: 框架可以跳过
points: 配置没变 | 实例相同 | 子树不动

这一屏三点是配置没变、实例相同、子树不动。const 让相同配置合成同一份，框架比对时能够直接沿用，不必再往下走。这一小段子树就可以停在原地，不必重新创建里面的节点。旁边若有新的数据，那一层仍然走自己的重建，省下的就是这一段。

### 示例
visual: code
caption: 固定的标题
points: 构造是 const | 标题固定 | 这段可复用

```dart
class QuietHeader extends StatelessWidget {
  const QuietHeader({super.key});
  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.all(16),
      child: Text('固定标题'),
    );
  }
}
```

QuietHeader 的构造标了 const，返回的 Padding 和 Text 也是 const。标题文字在编译期就固定，build 里没有额外计算，每次都交回同一份配置。父级一次次重建时，这份配置可以被复用，框架就能跳过这一段。下面真正会变的列表，不受这一层影响，标题不用跟着父级重做。

### 你会看到
visual: phone
caption: 标题保持不动
points: 父级在刷新 | 标题不闪 | 下面继续更新

手机上父级在刷新，固定标题不闪，下面的内容继续更新。标题那一块配置相同，所以一直停在原处，没有跟着重画。下面的行因为数据不同，会按新配置再画一遍。不变的壳可以尽量写成 const，把重复的组装省掉，一眼就能分出动静。

### 常见坑
visual: warning
caption: 罩不住会变的
points: 参数每次变 | 照样重建 | 罩不住整页

错误卡上是参数每次变、照样重建、罩不住整页。const 只能罩住真正不变的配置，每次传入新对象的那一层仍然会重建。把它写在会变的数据外面，收益才看得见。想靠一个 const 盖住整页动态内容，做不到，动态列表还是要正常往下重建。

### 收束
visual: path
caption: 下一步看三棵树
points: 复用配置 | 看三棵树

步骤上先复用配置，再看三棵树。const 构造用来复用相同配置，让框架跳过一部分重建，少做那些重复的组装。它不改 Widget 的含义，配置该怎么写还是怎么写，变的那一层仍然会往下重建。下一课是三棵树，把配置、实例和绘制分开来看。

## lesson three-trees
title: 三棵树

### 定义
visual: concept
caption: 配置实例和绘制
points: Widget 配置 | Element 实例 | 布局绘制

三个要点是 Widget 配置、Element 实例、布局绘制。Widget 树保存你写下的配置，Element 树保存运行时的实例，记住这一层现在是谁。RenderObject 树负责布局和绘制，把配置变成屏幕上的像素。你在代码里嵌套的，主要是第一棵，后两棵由框架在运行时挂上，别把三棵看成一棵。

### 类比
visual: compare
left: 设计图
right: 现场和墙
caption: 图纸和工地
points: 只写配置 | 图可重印 | 记住进度 | 负责绘制

左边是设计图，只写配置，同一份图可重印，改标注也不必换施工队。右边是现场和墙，现场记住进度，墙负责绘制，最后被人看见的是墙。你改的是图纸上的标注，现场仍守着原来的工位。Widget 像图，Element 像现场，RenderObject 像最后砌好的墙，三层各干各的活。

### 机制
visual: trees
caption: 三列各管一段
points: 不可变配置 | 树上的实例 | 布局和绘制

三列标题是 Widget、Element、RenderObject。Widget 列是不可变配置，Element 列是树上的实例，RenderObject 列做布局和绘制。组合类 Element 只负责组装子节点，身上不挂 RenderObject，它只把孩子装到树上。因此不是每个 Element 都有 RenderObject，第三列只出现在真正要绘制的节点上，组装和绘制要分开数，别按层数一刀切。

### 示例
visual: code
caption: 徽章只做组装
points: 外层组装 | 底色绘制 | 间距绘制

```dart
class Badge extends StatelessWidget {
  const Badge({super.key, required this.label});
  final String label;
  @override
  Widget build(BuildContext context) {
    return ColoredBox(
      color: const Color(0xFF1F7A6D),
      child: Padding(
        padding: const EdgeInsets.all(8),
        child: Text(label),
      ),
    );
  }
}
```

Badge 是组合类，build 里把 ColoredBox、Padding 和 Text 装在一起。这一层 Element 只负责组装子节点，自己不参与布局，也没有自己的像素。底色和间距这两层才会挂上 RenderObject，负责你看见的色块和留白。Text 同样是组合，它再往下交出画字的那一层，自己不直接绘制，层数和绘制对象对不齐。

### 你会看到
visual: phone
caption: 一枚小徽章
points: 底色块 | 内边距 | 标签文字

手机上是一枚小徽章，底下有底色块，四周是内边距，中间是标签文字。底色和留白来自里面负责绘制的那两层，文字则还要再往下交一层才画出来。外层 Badge 没有自己的像素，它只是把这些配置装进树里。标签上的字，用的是传入的 label。

### 常见坑
visual: warning
caption: 别按层数估绘制
points: 组合层不绘制 | 层数会误导 | 先分清职责

错误卡写着组合层不绘制、层数会误导、先分清职责。看到 Widget 嵌了五层，并不等于有五个 RenderObject，组合类只负责组装。Text 这种控件自己也不直接绘制，它会再交出真正画字的对象。排查卡顿时，先分清哪一层在布局，哪一层只是在转发配置。

### 收束
visual: path
caption: 下一步看句柄
points: 分清三棵 | 看句柄

步骤第一条是分清三棵，第二条是看句柄。Widget 是配置，Element 是实例，RenderObject 负责布局绘制，组合类只组装子节点，不承担绘制。要沿着树向上找祖先，手里需要一个指向当前节点的句柄。下一课是 BuildContext，这个句柄就是用来沿着这棵树往上找的，离开节点就不能再用。

## lesson build-context
title: BuildContext

### 定义
visual: concept
caption: Element 的句柄
points: 指向元素 | 向上找祖先 | 卸下后停用

三个要点是指向元素、向上找祖先、卸下后停用。BuildContext 是 Element 的句柄，build 的时候框架会把它交给你。你用它向上找祖先，例如主题、尺寸，以及继承下来的数据。dispose 之后这层 Element 已经卸下，句柄不能再使用，异步回来之前也要先确认它还在，确认完再向上读。

### 类比
visual: compare
left: 门牌号
right: 沿楼向上
caption: 门牌找长辈
points: 标出这一户 | 当前位置 | 向上询问 | 找到祖先

左边是门牌号，标出这一户，只代表当前位置，管的是这一户的门。右边是沿楼向上，向上询问，找到住在上面的祖先。BuildContext 像这张门牌，对应的 Element 是这一户本身。人搬离以后再拿旧门牌去问路，就会找错楼层，门牌只在人还住着的时候有效。

### 机制
visual: trees
caption: 三列对上号
headers: BuildContext | Element | 祖先
points: 手里的句柄 | 实际节点 | 向上查找

三列标题换成了 BuildContext、Element、祖先。BuildContext 列是手里的句柄，Element 列是它指向的实际节点，最右一列是向上查找。主题和继承数据放在祖先那里，子组件沿着这个句柄一层层去取。节点在 dispose 里卸下以后，这个句柄就不能再使用，看画面时就按这三列对上。

### 示例
visual: code
caption: 向上读主题色
points: 收到句柄 | 读取主色 | 画成文本

```dart
class ThemedLabel extends StatelessWidget {
  const ThemedLabel({super.key});
  @override
  Widget build(BuildContext context) {
    final color = Theme.of(context).colorScheme.primary;
    return Text('标签', style: TextStyle(color: color));
  }
}
```

ThemedLabel 的 build 收到 context，这就是当前 Element 的句柄。代码沿着它读取主题的主色，再把颜色交给 Text 去画。查找方向是向上的，用的是祖先里已经放好的主题，不用自己再存一份。这个读取发生在 build 期间，此时节点还挂在树上，沿这个句柄就能找到上面的主题。

### 你会看到
visual: phone
caption: 文字带上主题色
points: 读到主色 | 标签变色 | 祖先给主题

手机上的标签读到主色，于是标签变色，这套颜色是祖先给的主题。这一层只是把颜色拿来用，没有自己保存一份主题数据。你换整套主题时，标签颜色会跟着一起变。文字仍是标签二字，变的是祖先传下来的那一个颜色，颜色来自上面。

### 常见坑
visual: warning
caption: 卸下之后还用
points: 异步还没回 | 节点已卸下 | 再读会出错

错误卡写着异步还没回、节点已卸下、再读会出错。请求回来得太晚时，State 可能已经 dispose，这一层已经不在树上。这时再使用 BuildContext 去找祖先，会碰到已经卸下的 Element。回调里先看 mounted，确认这一层还挂着，再去读主题或弹提示，卸下之后这条路就断了。

### 收束
visual: path
caption: 下一步看继承
points: 向上查找 | 看继承

步骤上先向上查找，再看继承。BuildContext 是 Element 的句柄，专门用来找祖先，dispose 之后不要再用。祖先若要把一份数据只通知需要的人，就靠继承控件来放，别的节点可以保持不动，没订阅的子树不必跟着刷新，刷新范围就可以收得很小。下一课是 InheritedWidget 直觉。

## lesson inherited-widget
title: InheritedWidget 直觉

### 定义
visual: concept
caption: 上层数据向下供
points: 数据在上层 | 子组件订阅 | 只重建订阅者

三个要点是数据在上层、子组件订阅、只重建订阅者。InheritedWidget 把数据放在祖先，子组件用 dependOnInheritedWidgetOfExactType 登记订阅。数据变化时，框架只重建这些订阅者，没有登记的兄弟可以保持不动。这样一份计数或主题，就不必一层层手动往下传，重建范围就小了。

### 类比
visual: compare
left: 公告栏
right: 挨个喊话
caption: 公告和喊话
points: 需要的人来看 | 只通知他们 | 每个人都听 | 全楼跟着动

左边是公告栏，需要的人来看，更新时只通知他们，没看过的房间不用动。右边是挨个喊话，每个人都听，全楼跟着动，代价很大。InheritedWidget 走左边，子组件登记之后，变化只重建订阅者。没去看公告的房间，这次就不必重新粉刷，能省的就别全楼重刷。

### 机制
visual: state
caption: 三个架子
headers: 数据在上层 | 子树订阅 | 变化后重建
points: 放在祖先 | 登记依赖 | 只刷订阅者

三个架子的标签是数据在上层、子树订阅、变化后重建。数据放在祖先那个架子上，子组件用 dependOnInheritedWidgetOfExactType 在中间登记依赖。变化发生后，只有登记过的订阅者进入第三个架子，重新 build。没有订阅的兄弟，不在这次刷新范围内，范围卡在订阅者身上。

### 示例
visual: code
caption: 子代才读得到
points: 上层存数字 | 子代来订阅 | 变化只刷它

```dart
class CountScope extends InheritedWidget {
  const CountScope({super.key, required this.count, required super.child});
  final int count;
  static CountScope of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<CountScope>()!;
  }
  @override
  bool updateShouldNotify(CountScope oldWidget) => count != oldWidget.count;
}
class CountText extends StatelessWidget {
  const CountText({super.key});
  @override
  Widget build(BuildContext context) {
    return Text('${CountScope.of(context).count}');
  }
}
```

CountScope 把 count 存在自己身上，updateShouldNotify 用来比较新旧数值，数值没变就可以不通知。of 里面调用 dependOnInheritedWidgetOfExactType，调用方因此成为订阅者。CountText 在自己的 build 里读取，它是子代，才能找到这份数据。count 一变，只有订阅过的文本会重建，父级那一次构建里读不到刚放进去的数据，读取必须发生在子代。

### 你会看到
visual: phone
caption: 只刷订阅的文字
points: 上层计数变了 | 订阅文字更新 | 静态文本不动

手机上上层计数变了，订阅文字更新，旁边的静态文本仍然不动。静态文本没有登记依赖，所以这次刷新轮不到它，它继续显示原来的字。你能同时看到变和不变的两块，范围卡得很小。这就是只重建订阅者的效果，对比很清楚。

### 常见坑
visual: warning
caption: 同一层读不到
points: 创建处去读 | 找的是上层 | 消费者在子代

在创建 Provider 的同一个 build 里去读它，会找不到。错误卡上写着创建处去读、找的是上层、消费者在子代。那个 build 拿到的句柄属于上一层，查找停在更上面，碰不到刚创建的节点。消费者必须是子代，让读取发生在更里面的那一次 build，子代才能订到这份数据。

### 收束
visual: path
caption: 下一步看约束
points: 只刷订阅者 | 进入布局

步骤第一条是只刷订阅者，第二条是进入布局。数据留在上层，子树按需订阅，变化后只重建订阅者，读取要放在子代自己的 build 里。排版会换成另一套方向，布局从约束讲起，先看父级给了多大的空间。下一课是约束向下、尺寸向上、父决定位置。
