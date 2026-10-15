# 动画与绘制

## lesson implicit-anim
title: 隐式动画

### 定义
visual: concept
caption: 属性变了自己补
points: 同一位置换属性 | 框架自己补间 | 写上一段时长

画面上三行是同一位置换属性、框架自己补间、写上一段时长。隐式动画如 AnimatedContainer、AnimatedOpacity，同一位置上的属性变了，框架会自己补上中间值。你要写的是新的属性值和一段 duration，不用自己算每一帧。组件类型和位置保持不变，这段补间才会接到同一次更新上。

### 类比
visual: compare
left: 自己画每一格
right: 只改结果
caption: 逐格对上交结果
points: 中间格要自己算 | 节拍也要自己管 | 只交出新旧属性 | 时长交给组件

左边卡片是自己画每一格，两行写着中间格要自己算、节拍也要自己管。右边卡片是只改结果，两行写着只交出新旧属性、时长交给组件。自己画格，就要准备控制器和每一帧的数值。隐式动画只改同一位置上的宽高或透明度，中间的变化由组件按 duration 补上。

### 机制
visual: timeline
caption: 上下两条时间轴
points: 属性自己补间 | 播放头另管

上面一条时间轴标着隐式动画，绿色条子自己往右铺满。下面一条标着显式控制器，黄色播放头沿轨道移动。上面这种只要同一位置的属性变了，AnimatedContainer 或 AnimatedOpacity 就会按 duration 补间。下面的播放头要等你自己拿控制器去推，这一课先看上面那条自己铺开的轴。

### 示例
visual: code
caption: 透明度和宽度
points: 透明度跟着开合 | 宽度四十八或一百二 | 时长三百毫秒

```dart
class ExpandBox extends StatelessWidget {
  const ExpandBox({super.key, required this.open});
  final bool open;
  @override
  Widget build(BuildContext context) {
    return AnimatedOpacity(
      opacity: open ? 1 : 0,
      duration: const Duration(milliseconds: 300),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        width: open ? 120 : 48,
        height: 48,
        color: const Color(0xFF1F7A6D),
      ),
    );
  }
}
```

画面上的代码把 AnimatedOpacity 套在 AnimatedContainer 外面，时长都是三百毫秒。open 为真时透明度是一、宽度是一百二十，为假时透明度是零、宽度是四十八。这两个组件留在原来的位置，只是属性变了，框架会把中间值补上。高度和颜色这次没有改，补间主要发生在透明度和宽度上。

### 你会看到
visual: phone
caption: 色块慢慢变宽
points: 宽度在变 | 透明度在变 | 大约三百毫秒

手机框顶上写着色块慢慢变宽，框里三行是宽度在变、透明度在变、大约三百毫秒。open 从假变成真时，青绿块大约用三百毫秒从四十八宽到一百二十宽，同时从完全透明变成不透明。再关掉时，它会沿相反方向收回去。手机框里的三行，就是这次能看出来的变化。

### 常见坑
visual: warning
caption: 位置一变就不补
points: 换成了别的组件 | 时长写成零 | 中途对错了位置

错误卡上三行是换成了别的组件、时长写成零、中途对错了位置。用条件把 AnimatedContainer 换成普通 Container，位置上的类型变了，框架不会再补间。duration 写成零，属性会直接跳到新值，看不出中间过程。列表里没有稳定的 Key，这项被当成另一项，补间也会接到错误的那一块上。

### 收束
visual: path
caption: 进入控制器
points: 先交新旧属性 | 再自己推进度

路径上两步，先交新旧属性，再自己推进度，隐式动画只改同一位置，进度则交给控制器。上面那条绿条是容器和透明度在按时长自己铺开。下面那条黄色播放头代表显式控制器，要你自己创建，节拍也得你自己来管，离开时还要释放。下一课是 AnimationController。

## lesson animation-controller
title: AnimationController

### 定义
visual: concept
caption: 节拍驱动进度
points: 混入节拍器 | 控制器记住进度 | 离开时要释放

画面标题下面三行逐条出现，是混入节拍器、控制器记住进度、离开时要释放。动画控制器 AnimationController 用节拍器混入 TickerProviderStateMixin 提供垂直同步 vsync，每一帧由这个节拍把进度向前推。控制器记住的是从零走向一的进度，时长写在它自己的 duration 上。状态对象离开时必须在释放方法 dispose 里把控制器也释放掉，节拍才会停。

### 类比
visual: compare
left: 节拍器
right: 控制器
caption: 节拍器和进度
points: 每一拍推进一步 | 离开房间就停下 | vsync 提供节拍 | dispose 释放控制器

左边卡片是节拍器，两行写着每一拍推进一步、离开房间就停下。右边卡片是控制器，两行写着 vsync 提供节拍、dispose 释放控制器。节拍器一直响，人离开房间却不关，拍子还会空打。控制器也一样，页面 dispose 时要把它一起释放，否则节拍还在打已经卸下的界面。

### 机制
visual: timeline
caption: 上轴推动下轴
points: 进度从零到一 | 界面跟着动
headers: 控制器 | 界面

上面一条时间轴标着控制器，绿色条子代表进度从零铺到一。下面一条标着界面，黄色播放头跟着这段进度移动。控制器靠节拍器混入获得每一帧的节拍，调用前进之后才会往前走。界面这条要听控制器的值，状态被卸下时，两条都得在释放方法里停干净。

### 示例
visual: code
caption: 创建并释放
points: 混入节拍器 | 前进四百毫秒 | 离开时释放

```dart
class FadeIn extends StatefulWidget {
  const FadeIn({super.key});
  @override
  State<FadeIn> createState() => _FadeInState();
}
class _FadeInState extends State<FadeIn> with TickerProviderStateMixin {
  late final AnimationController controller;
  @override
  void initState() {
    super.initState();
    controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 400))..forward();
  }
  @override
  void dispose() { controller.dispose(); super.dispose(); }
  @override
  Widget build(BuildContext context) => FadeTransition(opacity: controller, child: const Text('淡入'));
}
```

画面上的状态类混入了节拍器 TickerProviderStateMixin，控制器的同步参数 vsync 才能写成当前对象 this。初始化 initState 里创建动画控制器 AnimationController，时长四百毫秒，并立刻向前播放 forward。释放方法 dispose 里先释放控制器，再调用父类的释放。构建方法用淡入过渡 FadeTransition 听这个控制器，文字的透明度就从零走向一。

### 你会看到
visual: phone
caption: 文字淡入
points: 控制器前进 | 文字渐渐出现 | 离开后停止

手机框顶上写着文字淡入，框里三行是控制器前进、文字渐渐出现、离开后停止。页面打开后，大约四百毫秒里，淡入两个字从透明变成清楚。离开这个页面，dispose 会把控制器释放，节拍不再继续打。手机框里的三行，就是进度、文字和停止这三件同时发生的事。

### 常见坑
visual: warning
caption: 节拍没有配成对
points: 缺少 vsync 混入 | dispose 里没释放 | 释放后又去驱动

错误卡上三行是缺少 vsync 混入、dispose 里没释放、释放后又去驱动。状态类没有混入节拍器，同步参数就没有节拍来源，控制器建不起来。页面已经释放却不释放控制器，节拍还会打到已经卸下的界面上。释放之后再让它前进，驱动的是已经停掉的控制器，会直接失败。

### 收束
visual: path
caption: 接着映射数值
points: 先管好节拍 | 再映射成宽度

路径上两步，先管好节拍，再映射成宽度，混入和释放要成对，零到一再变成具体尺寸。上面那条轴是控制器的进度，下面那条是跟着动的界面。淡入过渡直接把这段进度当成透明度，大约四百毫秒里从完全透明走到完全清楚。下一课是 Tween 与 Curve。

## lesson tween-curve
title: Tween 与 Curve

### 定义
visual: concept
caption: 进度映射成宽度
points: 零到一映射 | 起点和终点 | 曲线改速度感

画面上三行是零到一映射、起点和终点、曲线改速度感。Tween 把控制器的零到一映射到 begin 和 end，中间值按这个区间换算。CurvedAnimation 包在控制器外面，用曲线改变速度感，终点仍然是 Tween 的 end。进度走完时数值落到终点，曲线只改变前半段和后半段哪边更快。

### 类比
visual: compare
left: 路程
right: 走法
caption: 路程和走法
points: 起点对上终点 | 进度决定走到哪 | 前快后慢 | 终点并不改变

左边卡片是路程，两行写着起点对上终点、进度决定走到哪。右边卡片是走法，两行写着前快后慢、终点并不改变。从四十八走到一百六十，走到哪由进度决定。缓出让出发快、靠近终点时变慢，一百六十这个终点还留在原来的地方。

### 机制
visual: timeline
caption: 路程对上走法
points: 宽度跟着进度 | 速度前快后慢
headers: 起点到终点 | 曲线速度

上面一条时间轴标着起点到终点，绿色条子从起点铺向终点。下面一条标着曲线速度，黄色播放头的走法可以前快后慢。补间负责上面这条路程，起点是四十八，终点是一百六十。曲线动画负责下面这种速度感，换成缓出以后，靠近终点会慢下来。

### 示例
visual: code
caption: 映射到两个宽度
points: 曲线先快后慢 | 起点四十八 | 终点一百六十

```dart
Animation<double> slideWidth(AnimationController controller) {
  final curved = CurvedAnimation(parent: controller, curve: Curves.easeOut);
  return Tween<double>(begin: 48, end: 160).animate(curved);
}
```

画面上的函数先用曲线动画 CurvedAnimation 包住控制器，曲线是先快后慢的缓出 Curves.easeOut。补间 Tween 的起点 begin 是四十八，终点 end 是一百六十，再交给这条曲线去做 animate。控制器在零的时候宽度是四十八，走到一的时候宽度是一百六十。返回的动画要保存下来，界面读当前值 value，才看得到现在的宽度。

### 你会看到
visual: phone
caption: 先快后慢变宽
points: 从四十八起 | 到一百六十 | 先快后慢

手机框顶上写着先快后慢变宽，框里三行是从四十八起、到一百六十、先快后慢。色块一开始是四十八宽，结束时是一百六十宽，中间按控制器的进度换算。因为曲线是 easeOut，前半段拉得更快，靠近一百六十时慢下来。手机框里的三行，就是起点、终点和这种速度感。

### 常见坑
visual: warning
caption: 曲线改不了终点
points: 曲线改了终点 | 每帧重新包一层 | 读到的还是零到一

错误卡上三行是曲线改了终点、每帧重新包一层、读到的还是零到一。Curves.easeOut 只改变快慢，一百六十这个终点仍然来自 Tween 的 end。在 build 里每次都新建 CurvedAnimation，会反复向控制器登记监听。如果界面读的是控制器自己的 value，拿到的还是零到一，宽度不会变成四十八到一百六十。

### 收束
visual: path
caption: 接着看飞行
points: 先映射数值 | 再让图片飞

路径上两步，先映射数值，再让图片飞，零到一先变成起点和终点，两页之间的图再飞过去。上面那条轴是四十八到一百六十的路程，下面那条是缓出的速度感。曲线只改走得快还是慢，路程仍由补间决定，并不改一百六十这个终点。下一课是 Hero。

## lesson hero
title: Hero

### 定义
visual: concept
caption: 同一个标签飞过去
points: 两页同一个标签 | 同一屏标签唯一 | 飞行接在转场上

画面上三行是两页同一个标签、同一屏标签唯一、飞行接在转场上。Hero 用 tag 把两个路由里的同一张图对上，转场时它会从旧位置飞到新位置。同一个屏幕里这个 tag 必须唯一，重复了就无法确定是哪一个。两个路由里要写同一个 tag，飞行才知道落点在哪。

### 类比
visual: compare
left: 同一张照片
right: 两个路由
caption: 照片和两页
points: 桌上只能放一张 | 标签不能重复 | 两页贴同一个标签 | 切换时它飞过去

左边卡片是同一张照片，两行写着桌上只能放一张、标签不能重复。右边卡片是两个路由，两行写着两页贴同一个标签、切换时它飞过去。一张桌上贴两张同样的标签，就不知道该拿哪一张。列表页和详情页各贴一次 cover，切换时这张图才能从列表飞进详情。

### 机制
visual: routes
caption: 新页滑入再滑出
points: 列表页 | 详情页 | 同一个 tag

画面下层是列表页，字幕写着栈底还在。详情页从右侧滑入，停一会儿再滑出，页上的字是同一个 tag。滑入和滑出是路由转场，Hero 的飞行就发生在这一段里。两页的 tag 都是 cover 时，图片会从列表的位置飞到详情的位置，再随着滑出回到栈底那一页。

### 示例
visual: code
caption: 两页共用标签
points: 标签是 cover | 图片同一张 | 尺寸可以不同

```dart
class Cover extends StatelessWidget {
  const Cover({super.key, required this.size});
  final double size;
  @override
  Widget build(BuildContext context) {
    return Hero(
      tag: 'cover',
      child: Image.asset('assets/cover.png', width: size),
    );
  }
}
```

画面上的 Hero 把 tag 固定成 cover，子组件是同一张封面图。列表页和详情页都放这个 Cover，tag 写成同一个字符串，尺寸可以一个小、一个大。同一屏里不能再出现第二个 cover，否则框架分不清飞行对象。路由滑入滑出时，这张图会按这个 tag 从旧尺寸飞到新尺寸。

### 你会看到
visual: phone
caption: 图片跟着飞
points: 列表里的小图 | 详情里的大图 | 中途在飞

手机框顶上写着图片跟着飞，框里三行是列表里的小图、详情里的大图、中途在飞。打开详情时，小图离开列表上的位置，变大落到详情页。返回时，详情页滑出，图再飞回列表。两页的 tag 只要不一致，就只剩下普通的滑入滑出，图不会跟着飞。

### 常见坑
visual: warning
caption: 标签重复或不同
points: 同一屏标签重复 | 两页标签不一致 | 两页子组件差太远

错误卡上三行是同一屏标签重复、两页标签不一致、两页子组件差太远。同一屏里两个 Hero 都写 cover，框架会报重复标签，飞行对象不唯一。列表写 cover、详情写成别的字符串，转场时对不上，图就停在各自的页面里。两边的子组件一个是图片、一个换成完全不同的类型，飞行也难接上。

### 收束
visual: path
caption: 接着排先后
points: 先对上标签 | 再错开两段

路径上两步，先对上标签，再错开两段，两个路由先共用同一个标签，一段动画再拆成先后。画面上详情页滑入再滑出，列表页留在栈底，飞行就夹在这次转场里。同一屏的标签保持唯一，两页则必须写成同一个，封面才能飞过去。下一课是交错动画。

## lesson staggered
title: 交错动画

### 定义
visual: concept
caption: 一段晚一点开始
points: 一个控制器 | Interval 切一段 | 后一段晚开始

画面标题下面三行逐条出现，是一个控制器、Interval 切一段、后一段晚开始。交错动画只用一个动画控制器，再用区间从这段进度里切出每一段。后一段的区间起点写得比零大，它就会稍晚才开始动。两段仍听同一个进度，不会各跑各的节拍。

### 类比
visual: compare
left: 同一条曲子
right: 两段出场
caption: 一个拍子两段
points: 只打一个拍子 | 进度从零到一 | 第一段先动 | 第二段晚一点

左边卡片是同一条曲子，两行写着只打一个拍子、进度从零到一。右边卡片是两段出场，两行写着第一段先动、第二段晚一点。曲子只有一个拍子，两段乐器按乐谱的不同小节进入。Interval 就是这段乐谱，第二段从零点四才进入，所以会晚一点开始。

### 机制
visual: timeline
caption: 下轴晚一点
points: 前段先铺开 | 后段晚进入
headers: 第一段 | 第二段

上面一条时间轴标着第一段，绿色条子先沿着轨道铺开。下面一条标着第二段，黄色播放头代表稍晚进入的那一段。两段共用一个控制器的进度，Interval 把第二段的有效区间放到后半。进度还没到零点四时，上面这段已经在动，下面这段还停在起点。

### 示例
visual: code
caption: 区间错开
points: 第一段到零点六 | 第二段从零点四 | 曲线都是缓出

```dart
List<Animation<double>> stagger(AnimationController controller) {
  final first = CurvedAnimation(
    parent: controller,
    curve: const Interval(0, 0.6, curve: Curves.easeOut),
  );
  final second = CurvedAnimation(
    parent: controller,
    curve: const Interval(0.4, 1, curve: Curves.easeOut),
  );
  return [first, second];
}
```

画面上的函数用同一个控制器做出两段 CurvedAnimation。第一段的 Interval 从零到零点六，进度走到零点六时这段已经完成。第二段从零点四到一，所以要等进度过了零点四才开始，结束得更晚。两条都套了 Curves.easeOut，晚开始的是区间，曲线仍只管各自的快慢。

### 你会看到
visual: phone
caption: 两段先后动
points: 第一段先动 | 第二段晚起 | 共用一个进度

手机框顶上写着两段先后动，框里三行是第一段先动、第二段晚起、共用一个进度。控制器一开始，第一段就动起来。进度过了零点四，第二段才进入，这时第一段还没走完。整个过程只有一次向前播放，没有第二个控制器在旁边另计时。

### 常见坑
visual: warning
caption: 两段同时起步
points: 做成两个控制器 | 区间都从零开始 | 后一段起点写反

错误卡上三行是做成两个控制器、区间都从零开始、后一段起点写反。两个控制器各自 forward，节拍可能对不齐，也不再是一段进度里的交错。两段 Interval 的起点都写成零，它们会一起开始。后一段若从零写到零点四，它会先结束，晚开始要把起点放到后面。

### 收束
visual: path
caption: 接着看绘制
points: 先错开两段 | 再自己画

路径上两步，先错开两段，再自己画，一个控制器把区间错开，然后才到自己绘制的图形。上面那条是第一段，下面那条要到零点四以后才算开始，所以会晚一点进入。两段都从同一个进度里切出来，节拍只有一份，后一段稍晚才动。下一课是 CustomPainter。

## lesson custom-painter
title: CustomPainter

### 定义
visual: concept
caption: 自己画到画布
points: paint 画到画布 | shouldRepaint 决定重画 | 按钮列表别用它

画面标题下面三行逐条出现，是 paint 画到画布、shouldRepaint 决定重画、按钮列表别用它。自定义画笔的绘制方法拿到画布和尺寸，把图形直接画上去。是否重画会对比新旧委托，决定这块要不要再画一次。普通按钮和列表已经有现成组件，不要用它来画点击区和一行行文字。

### 类比
visual: compare
left: 现成控件
right: 自己下笔
caption: 控件和画笔
points: 按钮框架会画 | 列表按行复用 | 图形要自己算 | 画完还要决定重画

左边卡片是现成控件，两行写着按钮框架会画、列表按行复用。右边卡片是自己下笔，两行写着图形要自己算、画完还要决定重画。按钮和列表的点击、语义、复用都由框架准备好了。自己下笔只适合那些没有现成组件的图形，而且每次还要回答要不要重画。

### 机制
visual: concept
caption: 画布上三步
points: 拿到画布 | 画出图形 | 判断要不要重画

标题下面三行逐条出现，是拿到画布、画出图形、判断要不要重画。绘制方法的第一个参数是画布，第二个是这块区域的尺寸，圆就画在这个范围里。画完以后，是否重画看半径有没有变，没变就可以不重画。这三步是自定义画笔自己的工作，普通按钮走不到这里。

### 示例
visual: code
caption: 圆点自己画
points: 画到画布 | 半径十二 | 半径变了才重画

```dart
class DotPainter extends CustomPainter {
  const DotPainter({required this.radius});
  final double radius;
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = const Color(0xFF1F7A6D);
    canvas.drawCircle(size.center(Offset.zero), radius, paint);
  }
  @override
  bool shouldRepaint(covariant DotPainter old) => old.radius != radius;
}
const dot = CustomPaint(size: Size.square(48), painter: DotPainter(radius: 12));
```

画面上的 paint 往 Canvas 上画一个青绿圆，圆心在尺寸的正中，半径来自字段。shouldRepaint 只在新旧半径不同时返回真，半径没变就不必重画。下面的 CustomPaint 把画布定成四十八见方，半径是十二，圆画在这块里面。按钮和列表不要换成这种画法，它们的交互不是 paint 能顺便给的。

### 你会看到
visual: phone
caption: 青绿一块圆
points: 青绿圆点 | 半径十二 | 半径变了才重画

手机框顶上写着青绿一块圆，框里三行是青绿圆点、半径十二、半径变了才重画。四十八见方的区域中心有一个青绿圆，半径是十二。半径改成别的数，才会要求把这块重画一遍。半径不变时，这块可以继续用上一次画出的结果。

### 常见坑
visual: warning
caption: 普通控件也去画
points: 按钮用画笔来画 | 总是返回要重画 | 画的时候改状态

错误卡上三行是按钮用画笔来画、总是返回要重画、画的时候改状态。用 CustomPainter 画普通按钮和列表，点击、语义和行复用都要自己重做。shouldRepaint 永远返回真，半径没变也会反复重画。在 paint 里调用 setState 或改字段，绘制过程会反过来改界面，这一帧就乱了。

### 收束
visual: path
caption: 接着看重建
points: 先分清谁该画 | 再收紧重建

路径上两步，先分清谁该画，再收紧重建，按钮和列表留给现成组件，动画则别刷整页。绘制方法画到画布上，是否重画决定要不要再画，按钮和列表仍用现成组件。画面上的三步，就是拿到画布、画出图形、判断重画。下一课是避免整页每帧重建。

## lesson anim-performance
title: 避免整页每帧重建

### 定义
visual: concept
caption: 每帧只动一小块
points: 别每帧整页刷新 | 只建动画子树 | 静止区隔开重绘

画面上三行是别每帧整页刷新、只建动画子树、静止区隔开重绘。动画每一帧不要对整页 setState，否则页头和静止内容都会跟着重建。用 AnimatedBuilder 听动画，让重建停在这一小块子树上。很大的静止区域可以再包一层 RepaintBoundary，旁边的动画就不必带动它重画。

### 类比
visual: compare
left: 整页重做
right: 只动一块
caption: 整页和一块
points: 每帧全部重排 | 静止区跟着闪 | 只重建动画块 | 大块静止隔离开

左边卡片是整页重做，两行写着每帧全部重排、静止区跟着闪。右边卡片是只动一块，两行写着只重建动画块、大块静止隔离开。整页重做时，页头明明没变，也会被每一帧再走一遍。只动色块那一截，页头就可以留在原来的图层里。

### 机制
visual: rebuild
caption: 右边子树在闪
points: 子树 | 色块

左边一栏标题是保持不动，页头和标题停在原地，没有闪。右边一栏标题是 setState，计数后面写着子树，下面一行是色块，这两行正在闪。闪的是动画那一块子树，页头和标题不在里面，所以不会跟着每一帧重建。把 setState 收到 AnimatedBuilder 里，闪烁就停在右边，左边保持不动。

### 示例
visual: code
caption: 只重建位移
points: 页头单独隔开 | 只重建位移 | 色块作为 child

```dart
class Stage extends StatelessWidget {
  const Stage({super.key, required this.animation});
  final Animation<double> animation;
  @override
  Widget build(BuildContext context) {
    return Column(children: [
      const RepaintBoundary(child: Text('页头')),
      AnimatedBuilder(
        animation: animation,
        builder: (context, child) => Transform.translate(offset: Offset(animation.value, 0), child: child),
        child: const ColoredBox(color: Color(0xFF1F7A6D), child: SizedBox.square(dimension: 48)),
      ),
    ]);
  }
}
```

画面上页头包在重绘边界 RepaintBoundary 里，色块放进动画构建器 AnimatedBuilder 的 child。进度每变一次，只有构建函数 builder 里的位移重算，不会对整页刷新状态 setState。子组件里的青绿块沿用原来的配置，不必在每一帧里重新创建。页头这种静止区域因此留在自己的边界里，不会跟着色块的移动去重画。

### 你会看到
visual: phone
caption: 页头停着色块动
points: 页头不动 | 色块平移 | 大块不重绘

手机框顶上写着页头停着色块动，框里三行是页头不动、色块平移、大块不重绘。动画进行时，页头那一行停着，青绿块沿水平方向移动。很大的静止区域如果也包了 RepaintBoundary，就不会因为旁边这一块在动而整片重画。手机框里的三行，就是页头、色块和重绘范围。

### 常见坑
visual: warning
caption: 整页跟着每一帧
points: 每帧 setState 整页 | 监听加在页面根上 | 静止大图跟着重绘

错误卡上三行是每帧 setState 整页、监听加在页面根上、静止大图跟着重绘。给控制器加监听，再在页面状态里刷新，每一帧都会把整页构建走一遍。监听应交给动画构建器，重建就留在动画子树里。很大的静止图没有重绘边界，也会跟着旁边的动画一起重画。

### 收束
visual: path
caption: 进入平台能力
points: 先收紧每一帧 | 再看包和插件

路径上两步，先收紧每一帧，再看包和插件，每一帧只碰动画子树，平台能力接着再讲。动画构建器负责少重建，重绘边界负责把很大的静止区域隔开。左边页头和标题保持不动，右边色块在闪，就是每一帧正好该碰到的范围。下一课是包和插件。
