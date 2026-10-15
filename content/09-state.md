# 状态管理

## lesson state-kinds
title: 临时、页面、应用三级状态

### 定义
visual: concept
caption: 三级各放一处
points: 临时放在 State | 页面只供这一页 | 应用要跨页用

画面上三行逐条出现，写着临时放在 State、页面只供这一页、应用要跨页用。临时状态像输入框里的字、一段动画、一个局部开关，放在 State 里就够了。页面状态是这一页自己的数据，例如这一页正在看的列表。应用状态像登录与否、当前主题，多个页面都要用，就不能只关在某一个 State 里。

### 类比
visual: compare
left: 三层抽屉
right: 三级状态
caption: 抽屉分层来放
points: 手边抽屉随手放 | 书桌只放这一页 | 临时状态放 State | 登录主题给多页

左边是三层抽屉，两行写着手边抽屉随手放、书桌只放这一页。右边是三级状态，两行写着临时状态放 State、登录主题给多页。手边那一层放输入框、动画和局部开关，合上也不影响别人。书桌对应这一页的数据，最外面那一层才放多个页面都要看的登录和主题。

### 机制
visual: state
caption: 三个架子并排
points: 输入框与动画 | 这一页的数据 | 登录与主题

画面上三个架子，标签是临时状态、页面状态、应用状态。左边架子写着输入框与动画，上面有一颗圆点左右往返，局部开关也放在这一格，数据留在 State。中间架子写着这一页的数据，只给当前这一页用。右边架子写着登录与主题，多个页面都要读它，所以它离开了单个页面。

### 示例
visual: code
caption: 草稿和列表分开放
points: 控制器留在 State | 列表是页面数据 | 离开时释放控制器

```dart
class _NotePageState extends State<NotePage> {
  final draft = TextEditingController();
  var notes = const ['买牛奶'];
  @override
  void dispose() {
    draft.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) => Column(children: [
    TextField(controller: draft),
    Text('共 ${notes.length} 条'),
  ]);
}
```

draft 这个控制器是临时状态，输入框的字留在 State 里，离开页面时在 dispose 里释放。notes 是这一页的数据，列表有几条跟这一页走，文本把它的长度画出来。动画控制器和局部开关也和 draft 一样，创建在 State 里就合适。登录和主题没有写在这里，那是多个页面共用的应用状态。

### 你会看到
visual: phone
caption: 草稿留在这一页
points: 输入框里有字 | 列表是页面数据 | 主题不在这页

手机框顶上是草稿留在这一页，框里三行写着输入框里有字、列表是页面数据、主题不在这页。你打出来的字留在这个 State 的控制器里，这个 State 还在，草稿就还在。下面一行写着列表有几条，那是这一页自己的数据。主题如果变了，应该是应用状态在起作用，这一页只是跟着显示。

### 常见坑
visual: warning
caption: 三级放错了层
points: 输入抬到全局 | 登录塞进某一页 | 控制器不释放

错误卡上写着输入抬到全局、登录塞进某一页、控制器不释放。输入框的字和局部开关放进应用状态，每次敲键盘都会惊动很多页面。登录和主题若只放在某一个页面的 State 里，别的页面读不到，这个页面一销毁，登录也就跟着没了。动画控制器和文本控制器创建在 State 里，就要在 dispose 里配对释放。

### 收束
visual: path
caption: 再看 setState
points: 先分清三级 | 再看重建范围

路径上两步，先分清临时、页面、应用这三级，再看 setState 会让谁重建。输入、动画和局部开关放在 State，页面数据留在这一页，登录和主题给多个页面用，三个架子就是这个顺序。下一课是 setState 的边界，会把标脏的范围收在这一棵子树上，右边那一块才会闪。

## lesson set-state
title: setState 的边界

### 定义
visual: concept
caption: 只标脏这一棵
points: 只标脏这一棵 | 外面不跟着重建 | 卸下后再调会抛

画面上三行逐条出现，写着只标脏这一棵、外面不跟着重建、卸下后再调会抛。setState 会把这个 State 对应的子树标成脏，框架随后重新调用它的 build。页头如果属于别的 State，这次就不会跟着重建，整棵应用树也不会因此全部重走一遍。dispose 之后这个 State 已经卸下，再调用 setState 会抛错。

### 类比
visual: compare
left: 改一张便签
right: setState
caption: 只翻这一张
points: 只擦这一张 | 整本不用重抄 | 只标脏这棵子树 | 撕掉后再写会失败

左边是改一张便签，两行写着只擦这一张、整本不用重抄。右边是 setState，两行写着只标脏这棵子树、撕掉后再写会失败。你改正便签上的数字，别的页不用抽出来重抄，整本笔记本还摊在原来的地方。State 被 dispose 以后，这张便签已经撕掉，再往上写，框架就会报错，这次调用不会悄悄被忽略。

### 机制
visual: rebuild
caption: 右边两格在闪
points: 1 | 开关

左边一列写着保持不动，下面是页头和标题，这两格停在原地。右边一列写着 setState，计数 1 和开关两格反复闪烁，闪的是这个 State 的子树。框架只把这块标成脏，然后重新 build 这一层，页头不在这棵子树里，所以它不闪。dispose 之后再调用 setState，闪都不会发生，这次调用会直接抛错。

### 示例
visual: code
caption: 开关写回布尔值
points: 布尔放在 State | 回调里 setState | 只重建这一层

```dart
class Toggle extends StatefulWidget {
  const Toggle({super.key});
  @override
  State<Toggle> createState() => _ToggleState();
}
class _ToggleState extends State<Toggle> {
  bool on = false;
  @override
  Widget build(BuildContext context) {
    return Switch(
      value: on,
      onChanged: (value) => setState(() => on = value),
    );
  }
}
```

Toggle 的外壳不可变，on 这个布尔值放在 State 里，局部开关就该放在这里。Switch 的 onChanged 收到新值后调用 setState，把 on 写成新值，这一层 build 会再走一遍。闪烁范围就是这个 State 返回的那棵子树，同页里别的 State 不会因此重建。若在 dispose 之后还进入这个回调，setState 会抛错，异步回来时要先看 mounted，已经卸下就直接返回。

### 你会看到
visual: phone
caption: 开关只带动自己
points: 开关状态变了 | 页头没有重画 | 标题停在原地

手机框顶上是开关只带动自己，框里三行写着开关状态变了、页头没有重画、标题停在原地。拨动开关，右边那一列的计数和开关会换样子。页头和标题保持原样，因为它们不在这个 State 的子树里。脏的是这一块，整页其他部分可以停在原来的样子上。

### 常见坑
visual: warning
caption: 卸下之后还去写
points: dispose 后 setState | 异步没看 mounted | 包得太靠上

错误卡上写着 dispose 后 setState、异步没看 mounted、包得太靠上。State 已经 dispose，再 setState 会抛出 called after dispose 这样的错误，框架拒绝往已卸下的树上写。await 之后页面可能已经走了，先判断 mounted，为假就直接返回，不要再碰这个 State。setState 写在很靠上的 State 里，闪烁的子树就会变大，页头也会被卷进来，右边不该闪的格子会一起闪。

### 收束
visual: path
caption: 再把状态上提
points: 看清标脏范围 | 再把数据上提

路径上两步，先看清 setState 标脏的是这一棵子树，再把需要分给兄弟的数据往上提。dispose 之后不能再 setState，异步回来先看 mounted，页头那种不在子树里的部分就让它保持不动。下一课是状态提升，会把数据放到共同的祖先，用参数往下传，用回调往上报，兄弟组件就能看同一份数。

## lesson lift-state
title: 状态提升

### 定义
visual: concept
caption: 提到共同祖先
points: 数据放到祖先 | 参数往下传 | 回调往上报

画面上三行逐条出现，写着数据放到祖先、参数往下传、回调往上报。两个子组件要看同一份数据时，把这份数据放到它们共同的祖先，通常就是上面那个 State。祖先用构造参数把当前值往下传。子组件要修改时，调用祖先传下来的回调，由祖先自己去 setState。

### 类比
visual: compare
left: 共同账本
right: 状态提升
caption: 账本放在柜台
points: 账本放柜台 | 改数要喊一声 | 数据放祖先 | 回调往上报

左边是共同账本，两行写着账本放柜台、改数要喊一声。右边是状态提升，两行写着数据放祖先、回调往上报。账本如果在某一个人的口袋里，另一个人看不见最新的数。放到柜台上，两边都按柜台给的数字来看，要改数就喊柜台记一笔，柜台再把新数传回去。

### 机制
visual: state
caption: 三个架子还在
points: 仍留在子组件 | 提到共同祖先 | 多页才继续上移

三个架子的标签仍是临时状态、页面状态、应用状态。左边架子写着仍留在子组件，输入框和局部开关继续放在自己的 State 里，圆点还在这一格往返。中间架子写着提到共同祖先，这一页里兄弟要共享的数据就提到父 State，参数往下传，回调往上报。右边架子写着多页才继续上移，登录和主题要给多个页面用，才离开这一页。

### 示例
visual: code
caption: 数字向下回调向上
points: 祖先保存数字 | 参数把数字传下 | 回调里再加一

```dart
class _BoardState extends State<Board> {
  int count = 0;
  @override
  Widget build(BuildContext context) =>
      Score(count: count, onAdd: () => setState(() => count += 1));
}
class Score extends StatelessWidget {
  const Score({super.key, required this.count, required this.onAdd});
  final int count;
  final VoidCallback onAdd;
  @override
  Widget build(BuildContext context) =>
      TextButton(onPressed: onAdd, child: Text('$count'));
}
```

_BoardState 把 count 放在自己身上，这就是子组件共同的祖先，页面状态先提到这一层。build 里把 count 通过参数交给 Score，把 onAdd 这个回调也交下去，数字向下、动作向上。Score 自己不保存数字，按下按钮只是调用 onAdd，它不负责把加一这件事做完。回调里再 setState，数字加一之后，参数会把新值重新传下来，按钮上的字跟着换。

### 你会看到
visual: phone
caption: 按钮和数字一起变
points: 数字来自祖先 | 按下调用回调 | 兄弟一起更新

手机框顶上是按钮和数字一起变，框里三行写着数字来自祖先、按下调用回调、兄弟一起更新。按下按钮，数字加一。旁边如果还有一个文本接收了同一个 count，它会一起变，因为值是祖先传下来的。子组件里没有自己的一份数字，所以不会各改各的。

### 常见坑
visual: warning
caption: 提得太高或太低
points: 兄弟各存一份 | 回调里没 setState | 临时状态也上提

错误卡上写着兄弟各存一份、回调里没 setState、临时状态也上提。两个组件各写一个 count，看起来同时加一，其实是两份数据，很快会对不上。回调只改了局部变量，忘了在祖先里 setState，参数不会更新，界面就停在旧数字。输入框的光标和局部开关不必提升，它们仍属于临时状态，留在自己的 State 里。

### 收束
visual: path
caption: 再看继承依赖
points: 先会提升 | 再看继承通知

路径上两步，先会把共享数据提到共同祖先，再看上层怎样通知订阅者。参数负责往下传，回调负责往上报，临时状态不必跟着上提，输入框和局部开关仍留在自己的 State。下一课是 InheritedWidget 与依赖，会把订阅和只读一次分开，变化之后谁该重建就清楚了。

## lesson inherited-dep
title: InheritedWidget 与依赖

### 定义
visual: concept
caption: 订阅和只读分开
points: 比较后才通知 | 依赖调用会订阅 | 只读调用不订阅

画面上三行逐条出现，写着比较后才通知、依赖调用会订阅、只读调用不订阅。InheritedWidget 的 updateShouldNotify 比较新旧两份，返回真才会通知已经订阅的人。dependOnInheritedWidgetOfExactType 在读取的同时登记依赖，之后数据变化会跟着重建。getInheritedWidgetOfExactType 只读一次，不登记，后面改了也不会再叫这个调用方。

### 类比
visual: compare
left: 订报纸
right: 买一份报纸
caption: 长期订和买一份
points: 改版会再送 | 登记之后还来 | 只取今天这一份 | 之后不再来敲

左边是订报纸，两行写着改版会再送、登记之后还来。右边是买一份报纸，两行写着只取今天这一份、之后不再来敲。订阅像 dependOnInheritedWidgetOfExactType，登记之后，updateShouldNotify 认为有变化就会再送一次，家里的那一栏会跟着换。只读像 getInheritedWidgetOfExactType，柜台上取走今天这一份，后面改版不会再来找你。

### 机制
visual: state
caption: 架子上的三层
points: 开关留在 State | 页面数据下发 | 上层决定通知

三个架子仍标着临时状态、页面状态、应用状态。左边写着开关留在 State，局部开关不靠继承通知，圆点在这一格自己动。中间写着页面数据下发，这一页的数据可以放进祖先的 InheritedWidget，再让子组件来取。右边写着上层决定通知，updateShouldNotify 返回真，订阅过的人才会重建，只读一次的人留在原来的值上。

### 示例
visual: code
caption: 订阅和只读两个入口
points: 明暗不同才通知 | depend 会订阅 | get 只取一次

```dart
class ThemeScope extends InheritedWidget {
  const ThemeScope({super.key, required this.dark, required super.child});
  final bool dark;
  static ThemeScope? watch(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<ThemeScope>();
  }
  static ThemeScope? read(BuildContext context) {
    return context.getInheritedWidgetOfExactType<ThemeScope>();
  }
  @override
  bool updateShouldNotify(ThemeScope oldWidget) => dark != oldWidget.dark;
}
```

ThemeScope 把 dark 存在自己身上，updateShouldNotify 只在明暗和上一份不同时返回真，相同就不必打扰订阅者。watch 里面调用 dependOnInheritedWidgetOfExactType，调用它的 context 因此成为订阅者，之后会跟着重建。read 里面调用 getInheritedWidgetOfExactType，只把当前值取走，不建立依赖。这两个方法都要在子组件的 context 上调用，创建这个控件的那一次 build 还看不到它。

### 你会看到
visual: phone
caption: 订阅的文字会变
points: 明暗开关变了 | 订阅文字跟着换 | 只读文字停着

手机框顶上是订阅的文字会变，框里三行写着明暗开关变了、订阅文字跟着换、只读文字停着。dark 从假变成真，调用过 depend 的文字会重建。只调用过 get 的文字还显示旧的结果，因为它没有登记依赖。updateShouldNotify 若返回假，连订阅者也不会收到这次变化。

### 常见坑
visual: warning
caption: 订阅和只读用反
points: 该订阅却只读 | 比较永远返回真 | 在创建处读取

错误卡上写着该订阅却只读、比较永远返回真、在创建处读取。需要跟着变的界面如果用了 getInheritedWidgetOfExactType，第一次能读到，之后就停住了。updateShouldNotify 不看字段、永远返回真，订阅者会在无关的重建里也被通知。在创建这个 InheritedWidget 的同一个 build 里去 depend，查找的是更上面的祖先，这里还找不到刚放进去的那一个。

### 收束
visual: path
caption: 再看通知包
points: 分清订阅和只读 | 换到通知包

路径上两步，先分清订阅和只读一次，再换到专门的通知包，靠右那个应用状态的架子就适合这样往下发。updateShouldNotify 决定要不要通知已经登记的人，dependOnInheritedWidgetOfExactType 会在读取时订阅，getInheritedWidgetOfExactType 只把当前值取走，读一次的人就停在旧值上。下一课是 Provider 与 ChangeNotifier，会把 watch 放进 build，把 read 放进按钮回调。

## lesson provider
title: Provider 与 ChangeNotifier

### 定义
visual: concept
caption: 包住再分开读
points: 用提供者包住 | build 里 watch | 回调里 read

画面上三行逐条出现，写着用提供者包住、build 里 watch、回调里 read。provider 这个包里常用 ChangeNotifierProvider，create 里造出一个 ChangeNotifier，数据变化时由它来喊一声。界面在 build 里用 context.watch 读取，这样 notifyListeners 之后会重建，文字会换成新的数字。按钮回调里用 context.read，只是拿到对象去改数据，不在回调里再订阅一次，避免按下时又登记一层依赖。

### 类比
visual: compare
left: 看公告栏
right: Provider
caption: 盯着栏和问一声
points: 站着看会更新 | 路过只问一句 | build 里 watch | 回调里 read

左边是看公告栏，两行写着站着看会更新、路过只问一句。右边是 Provider，两行写着 build 里 watch、回调里 read。站在栏前相当于 watch，栏上的字一换，你会再看一次，build 就会按新字重画。路过问一句相当于 read，适合在按下按钮时拿到那个对象，然后调用它的方法，这次询问不会让你一直盯着栏。

### 机制
visual: flow
caption: 四步从上往下
points: 界面要数据 | 变化后通知 | 创建并挂上 | 子级来订阅
headers: Widget | ChangeNotifier | Provider | 子组件

纵向四步从上往下排开，标题依次是 Widget、ChangeNotifier、Provider、子组件。Widget 那一行写着界面要数据，ChangeNotifier 那一行写着变化后通知，数字改完要调用 notifyListeners。Provider 那一行写着创建并挂上，用 ChangeNotifierProvider 的 create 把对象放到树上。子组件那一行写着子级来订阅，要在更下面的 build 里 context.watch，按钮回调里再用 context.read，通知到来时这一层才会重建。

### 示例
visual: code
caption: 子级才去 watch
points: 改完要通知 | 子级 build 里 watch | 回调里 read

```dart
class Counter extends ChangeNotifier {
  int value = 0;
  void add() {
    value += 1;
    notifyListeners();
  }
}
ChangeNotifierProvider(
  create: (context) => Counter(),
  child: Builder(builder: (context) {
    final count = context.watch<Counter>().value;
    return TextButton(
      onPressed: () => context.read<Counter>().add(),
      child: Text('$count'),
    );
  }),
)
```

Counter 继承 ChangeNotifier，add 把 value 加一后调用 notifyListeners，听过的人这才知道数字变了。ChangeNotifierProvider 的 create 负责创建它，watch 放在 child 的 Builder 里，那里的 context 才在 Provider 下面。build 中用 context.watch 读取 value，通知到来时文字会重建，屏幕上的计数会跟着跳，按钮回调里则用 context.read 去调用 add。创建 Provider 的那一个 build 不要 watch 它，那个 context 位于它上方，查找不到刚挂上的对象。

### 你会看到
visual: phone
caption: 数字跟着按钮涨
points: 按钮在子组件里 | 按下后数字加一 | 文字重新画出

手机框顶上是数字跟着按钮涨，框里三行写着按钮在子组件里、按下后数字加一、文字重新画出。按下按钮，read 拿到 Counter 并调用 add，数字先在通知者里面加一。notifyListeners 之后，watch 过的文字从 0 变成 1，这一行会重新画出来。旁边如果有一段没有 watch 的文字，它不会因为这次通知而重建，还停在旧的那一句上。

### 常见坑
visual: warning
caption: 读的位置不对
points: 创建处就 watch | build 里用了 read | 改完忘记通知

错误卡上写着创建处就 watch、build 里用了 read、改完忘记通知。在创建 Provider 的同一个 build 里 watch，用的是上一层的 context，会找不到这个对象，运行时直接报查找失败。build 里如果写成 read，当时能拿到数字，notifyListeners 之后却不会重建，按钮点了字还是旧的。add 里改了 value 却不调用 notifyListeners，watch 的人也不知道要刷新。

### 收束
visual: path
caption: 再看 Riverpod
points: 先会 watch 和 read | 再换一套引用

路径上两步，先把 watch 和 read 的位置放对，四步从上往下那张图可以再对一遍，再看另一套不靠 context 查找的写法。ChangeNotifierProvider 负责创建并挂到树上，build 里 watch，回调里 read，创建它的那个 build 里不要 watch，否则查找会落空。下一课是 Riverpod 入门，会把范围套在应用根上，用 ref 来订阅，测试时还可以把实现换掉。

## lesson riverpod
title: Riverpod 入门

### 定义
visual: concept
caption: 根上先套范围
points: 根上套范围 | 用 Notifier 持有 | 构建里 ref.watch | 测试可以覆盖

画面上四行逐条出现，写着根上套范围、用 Notifier 持有、构建里 ref.watch、测试可以覆盖。Riverpod 是另一个包，界面这边一般用 flutter_riverpod，不和 provider 混成同一套查找，门牌那套问法在这里用不上。应用根上套 ProviderScope，状态用 Notifier 和 NotifierProvider 来放，初值由 build 给出。界面改成 ConsumerWidget，在 build 里用 ref.watch 订阅，测试时可以用 override 把某一份实现换掉。

### 类比
visual: compare
left: 前台问询
right: 手牌取货
caption: 问前台和看手牌
points: 拿门牌去问 | 前台得在这栋楼 | 手牌上写着编号 | 进门先发范围

左边是前台问询，两行写着拿门牌去问、前台得在这栋楼。右边是手牌取货，两行写着手牌上写着编号、进门先发范围。provider 像拿着 context 这张门牌去找楼上的人，楼里没有这间前台就会落空。Riverpod 把 ref 交到 ConsumerWidget 的 build 里，用 ref.watch 按编号取，ProviderScope 就是进门时先发放范围的地方，根上没发手牌就取不到货。

### 机制
visual: flow
caption: 四步纵向排开
points: 根上套范围 | 声明提供者 | 改内部状态 | 订阅后重建
headers: Widget | Provider | Notifier | ref.watch

纵向四步的标题是 Widget、Provider、Notifier、ref.watch，每一行下面还有一句说明。Widget 那一行写着根上套范围，应用入口要用 ProviderScope 包住。Provider 那一行写着声明提供者，这里用 NotifierProvider 把 Counter 登记出来，Notifier 那一行写着改内部状态，build 给出初值，方法里给 state 赋一个新值。最后一行 ref.watch 写着订阅后重建，ConsumerWidget 在 build 里 watch 这个提供者，测试时还可以 override。

### 示例
visual: code
caption: 手牌订阅计数
points: 提供者创建 Notifier | 初值是零 | 构建里 watch

```dart
final counterProvider = NotifierProvider<Counter, int>(Counter.new);
class Counter extends Notifier<int> {
  @override
  int build() => 0;
  void add() => state = state + 1;
}
class CounterText extends ConsumerWidget {
  const CounterText({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    return Text('$count');
  }
}
```

counterProvider 是一个 NotifierProvider，它创建 Counter 这个 Notifier，类型参数里写明状态是整数。Counter 的 build 返回初始值 0，add 里把 state 改成加一后的数，读取它的人会因此更新。CounterText 是 ConsumerWidget，build 比普通控件多一个 ref，这里用 ref.watch 订阅计数，文字会跟着这份状态走。整棵应用还要在根上套 ProviderScope，测试时用 override 把这个提供者换成另一份实现。

### 你会看到
visual: phone
caption: 手牌上的计数
points: 根上有范围 | 数字来自 watch | 按下后会加一

手机框顶上是手牌上的计数，框里三行写着根上有范围、数字来自 watch、按下后会加一。进入页面时能看到 0，它来自 Notifier 的初值，还没有人按过按钮。按下加一以后，文字变成 1，因为 ref.watch 订阅了这份状态，这一行会重新画。如果根上没有 ProviderScope，这个 watch 找不到容器，页面就起不来。

### 常见坑
visual: warning
caption: 范围和订阅用错
points: 忘了 ProviderScope | 普通控件里 watch | 测试忘了覆盖

错误卡上写着忘了 ProviderScope、普通控件里 watch、测试忘了覆盖。ConsumerWidget 必须放在 ProviderScope 下面，否则 ref 没有容器可用，一进页面就会失败。普通 StatelessWidget 的 build 没有 ref，不能在里面调用 ref.watch，要换成 ConsumerWidget，让构建方法多接一个 ref。测试若不想碰真实的登录或网络，就在 ProviderScope 的 overrides 里把对应提供者 override 掉。

### 收束
visual: path
caption: 再看事件流
points: 先会 ref.watch | 再看事件进出

路径上两步，先会在 ConsumerWidget 里 ref.watch，四步那张图可以从上往下再对一次，再看事件进、状态出的那一种写法。根上要有 ProviderScope，状态用 Notifier 和 NotifierProvider，方法里改的是 state，测试可以 override 把实现换掉。下一课是 Bloc 与 Cubit 的直觉，会把直接发出和先收事件分开，界面仍然按新状态来画。

## lesson bloc
title: Bloc 与 Cubit 的直觉

### 定义
visual: concept
caption: 直接发或先收事件
points: Cubit 直接发出 | Bloc 先收事件 | 界面用建造器

画面上三行逐条出现，写着 Cubit 直接发出、Bloc 先收事件、界面用建造器。Cubit 在方法里直接 emit 一个新状态，调用方只是去调用这个方法。Bloc 先接收事件，再在处理函数里 emit 新状态，所以是事件进、状态出。界面用 BlocBuilder，builder 会在状态变化后拿到新值并重新画。

### 类比
visual: compare
left: 柜台直接改
right: 先取号再办
caption: 直接改和先取号
points: 喊一声就改数 | 当场给出新数 | 先递进一张单 | 办完再吐出状态

左边是柜台直接改，两行写着喊一声就改数、当场给出新数。右边是先取号再办，两行写着先递进一张单、办完再吐出状态。Cubit 像左边，方法里面立刻 emit 新状态，调用回来数字就已经换了。Bloc 像右边，事件对象先进来，处理完再把新状态交给 BlocBuilder，界面按这份新状态重画。

### 机制
visual: flow
caption: 四步向下流
points: 动作先到 | 产出下一次 | emit 新值 | 按状态重画
headers: 事件 | Cubit 或 Bloc | 新状态 | 界面

纵向四步的标题是事件、Cubit 或 Bloc、新状态、界面。事件那一行写着动作先到，对 Cubit 来说常常是一次方法调用，对 Bloc 来说是一个事件对象。第二行写着产出下一次，Cubit 在方法里直接 emit，Bloc 在 on 的处理函数里 emit。第三行写着 emit 新值，发出来的是一份新状态，界面那一行写着按状态重画，BlocBuilder 拿到它之后再建子组件。

### 示例
visual: code
caption: 直接发和先收事件
points: Cubit 方法里 emit | 枚举当成事件 | 建造器按新数画

```dart
enum CounterEvent { added }
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);
  void add() => emit(state + 1);
}
class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<CounterEvent>((event, emit) => emit(state + 1));
  }
}
BlocBuilder<CounterCubit, int>(
  builder: (context, count) => Text('$count'),
)
```

CounterCubit 的 add 里直接 emit 下一个整数，调用方法就是一次动作，中间不必再包一个事件对象。CounterBloc 用枚举 CounterEvent 当事件，on 里面收到事件后再 emit 新状态，这就是事件进、状态出。界面这段 BlocBuilder 订阅的是 Cubit，builder 拿到的 count 就是当前状态，文字直接把它画出来。这些类型放在 flutter_bloc 里，状态从 0 变成 1 时，文字会按新值再画一次。

### 你会看到
visual: phone
caption: 计数跟着动作变
points: 按下触发动作 | Cubit 发出新数 | 文字显示新数

手机框顶上是计数跟着动作变，框里三行写着按下触发动作、Cubit 发出新数、文字显示新数。按下按钮后，Cubit 的 add 发出下一个整数，新状态离开柜台。BlocBuilder 重建，文字从 0 变成 1，这一行跟着换掉。若换成 Bloc，中间会多一个事件对象，屏幕上仍是 BlocBuilder 按新状态来画，用户看见的还是那个数字。

### 常见坑
visual: warning
caption: 状态没有真正换新
points: 改的是同一个对象 | 忘记 emit | 计数也套事件类

错误卡上写着改的是同一个对象、忘记 emit、计数也套事件类。如果状态是可改对象，就地改字段再 emit 同一个实例，比较时会认为没有变化，界面不刷新。方法里算了新数字却忘记 emit，BlocBuilder 也收不到。一个计数器就先写一套事件类，层级会比这个界面需要的更重。

### 收束
visual: path
caption: 再选一套方案
points: 分清两种出口 | 再决定用哪套

路径上两步，先分清 Cubit 直接 emit、Bloc 事件进状态出，再决定项目用哪一套，简单计数用方法直接发就够。界面侧记住用 BlocBuilder 按新状态来画，没有 emit 的那一次界面不会自己变。下一课是怎么选状态方案，会按界面有多大来挑，计数器不必一上来就套满三层。

## lesson choose-state
title: 怎么选状态方案

### 定义
visual: concept
caption: 从最轻的开始
points: 先用 setState | 跨组件再用包 | 严格事件再上 Bloc | 计数器别套三层

画面上四行逐条出现，写着先用 setState、跨组件再用包、严格事件再上 Bloc、计数器别套三层。一个页面里的数字和开关，用 setState 和状态提升就够，兄弟要一起看就把数据提到祖先。同一份数据要穿过很多组件，再考虑 Provider 或 Riverpod，事件要一条条进来、状态清楚地出去时再考虑 Bloc。计数器不要一上来就套三层架构，一个按钮撑不起这么多层文件。

### 类比
visual: compare
left: 小柜台
right: 大厂房
caption: 柜台和厂房
points: 一本账就够 | 喊一声就能改 | 很多人同时取 | 才上流水线

左边是小柜台，两行写着一本账就够、喊一声就能改。右边是大厂房，两行写着很多人同时取、才上流水线。柜台对应 setState 和状态提升，账本放在共同祖先就行，输入框也不必搬出这一页。厂房里很多人要同一份数据，再用 Provider 或 Riverpod，真的要严格事件流，才考虑 Bloc。

### 机制
visual: compare
left: 先留在本地
right: 再跨组件
caption: 左右两栏对照
points: setState 够用 | 提升到祖先 | Provider 或 Riverpod | 严格事件用 Bloc

左边一栏标题是先留在本地，两行写着 setState 够用、提升到祖先。右边一栏标题是再跨组件，两行写着 Provider 或 Riverpod、严格事件用 Bloc。计数器和输入框放在左边这一栏，不必为了它们去右边搭三层。数据要穿过很多组件，再走到右边，先选 Provider 或 Riverpod，事件流很严格时才用 Bloc。

### 示例
visual: code
caption: 计数器就这一层
points: 数字放在 State | 按钮里 setState | 没有额外的包

```dart
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

这段就是一个计数器该有的样子，按钮和数字都在同一棵子树里。count 放在 State 里，按钮里 setState 把数字加一，文字直接显示它，页头不会因此重画。这里没有 Provider，没有 Notifier，也没有 Cubit，三层架构先不要套上来。当这个数字要传给兄弟组件时，再做状态提升，仍然不必先引入新的包。

### 你会看到
visual: phone
caption: 一个朴素计数器
points: 数字从零开始 | 按下加一 | 没有额外分层

手机框顶上是一个朴素计数器，框里三行写着数字从零开始、按下加一、没有额外分层。屏幕上一个按钮、一个数字，没有底栏，也没有第二页。按一下，数字加一，变化来自 setState，只有这块文字会换。你看不到事件类或额外的提供者，这个小界面也不需要它们，登录和主题那种跨页数据以后再说。

### 常见坑
visual: warning
caption: 一上来就搭满
points: 计数器套三层 | 登录只放某一页 | 所有控件都订阅

错误卡上写着计数器套三层、登录只放某一页、所有控件都订阅。计数器如果同时包上事件流、仓库和接口层，读代码要跳很多文件，这个按钮却小得很。登录和主题是应用状态，只放在某一个页面的 State 里，别的页面用不上。反过来，每个文本都去订阅整份应用状态，一个开关就会让很多无关的控件重建。

### 收束
visual: path
caption: 接着等一次结果
points: 先选最轻的方案 | 再处理异步结果

路径上两步，先选最轻的状态方案，再去处理还没回来的异步结果。页面内用 setState 和状态提升，跨很多组件再用 Provider 或 Riverpod，严格事件流才考虑 Bloc，计数器保持现在这一层就好。下一课是 FutureBuilder，会把等待、成功和失败画在界面上，数据还在路上时屏幕也有东西可看。
