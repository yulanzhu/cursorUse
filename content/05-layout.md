# 布局与约束

## lesson constraint-rules
title: 约束向下、尺寸向上、父决定位置

### 定义
visual: concept
caption: 清单逐条出现
points: 约束向下 | 尺寸向上 | 父定位置

画面上的清单逐条出现，三行是约束向下、尺寸向上、父定位置。父组件先把可用的宽高范围传给子组件，子组件只能在这个范围里挑一个尺寸，再把结果报上去。坐标不由子组件自己写，父组件拿到尺寸之后才决定把它放在哪。这三步就是 Flutter 布局每次都会走的顺序。

### 类比
visual: compare
left: 分房间
right: 排组件
caption: 同一套交接
points: 限定可用面积 | 住户回报占用 | 约束向下传递 | 父级决定位置

左边卡片标题是分房间，两行写着限定可用面积、住户回报占用。右边卡片标题是排组件，两行写着约束向下传递、父级决定位置。房东先划定这间房能用的面积，住户再报自己实际占了多少，家具靠哪一边仍要房东来定。组件布局是同一套交接，子组件负责选尺寸，不负责给自己安坐标。

### 机制
visual: constraints
caption: 先变高再挪位置
points: 约束向下 | 尺寸向上 | 父定位置

虚线框是父盒子，里面的实心块是子盒子。实心块先在框里变高，变到一定高度后，父盒子再把它挪到旁边的新位置。右侧三行黄字写着约束向下、尺寸向上、父定位置。变高就是子组件在约束里选定尺寸并向上回报，挪动则是父级单独决定位置。

### 示例
visual: code
caption: 居中一块色块
points: 放松最小边 | 选定宽高 | 父级居中

```dart
class TightChild extends StatelessWidget {
  const TightChild({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: SizedBox(
        width: 120,
        height: 48,
        child: ColoredBox(color: Color(0xFF1F7A6D)),
      ),
    );
  }
}
```

代码从外往里是 Center、固定宽高的 SizedBox，最里面是一块纯色。Center 会把最小宽高放松，把父级允许的最大范围继续往下传。SizedBox 在这个范围里选定一百二十宽、四十八高，并把这个尺寸向上回报。把它摆到正中的是外层的 Center，色块自己没有写坐标，父级要是更窄，这个宽高还会被夹小。

### 你会看到
visual: phone
caption: 绿块停在中间
points: 父级给范围 | 绿块定尺寸 | 居中摆好

手机框顶上写着绿块停在中间，框里三行是父级给范围、绿块定尺寸、居中摆好。跑起来以后，屏幕中央是一块绿色矩形，宽高就是一百二十和四十八。它四周留有空白，因为父级收到尺寸之后才把它放到中间，色块并没有自己贴住某一条边。

### 常见坑
visual: warning
caption: 写大了也会被夹
points: 超过最大会被夹 | 子级定不了坐标 | 方向反了就乱

错误卡上三行写着超过最大会被夹、子级定不了坐标、方向反了就乱。子组件把宽高写得再大，也不能超过父级给的最大约束，多出来的部分会被夹掉。位置同样不听子组件的，你如果把约束理解成从子级往上传，后面的尺寸和坐标都会对不上。

### 收束
visual: path
caption: 接着看四个数
points: 记下三步流向 | 拆开四条边界

路径上两步，先记下三步流向，再去拆开四条边界。约束向下、尺寸向上、父级决定位置，后面每一种布局都可以套这三句来看。看画面时也可以对一下，子盒子先变高是在报尺寸，随后被挪走才是父级在定位置。下一课是 BoxConstraints，会把最小宽度、最大宽度、最小高度、最大高度四项分开讲。

## lesson box-constraints
title: BoxConstraints

### 定义
visual: concept
caption: 四个边界数字
points: 最小宽度 | 最大宽度 | 最小高度 | 最大高度

画面上四行字是最小宽度、最大宽度、最小高度、最大高度。BoxConstraints 就是这四个数字，父组件用它们划出子组件可以占用的范围。宽和高要分开判断，同一侧的最小值可以小于最大值，也可以和最大值相等。子组件向上回报的尺寸，必须落在这四个数围出来的区间里。

### 类比
visual: compare
left: 固定窗框
right: 放开窗框
caption: 窗框松紧不同
points: 宽高被钉死 | 只能用这一号 | 最小可以为零 | 最大可以无穷

左边卡片是固定窗框，两行写着宽高被钉死、只能用这一号。右边卡片是放开窗框，两行写着最小可以为零、最大可以无穷。紧的窗框只容得下一种尺寸，松的窗框允许画得更小，只要不超出外沿。无界则是某一侧没有尽头，子组件得自己停在一个有限的数字上。

### 机制
visual: constraints
caption: 长高时看边界
points: 紧约束 | 松约束 | 无界

父盒子里的子盒子先变高，再被父级挪到新位置，旁边三行是紧约束、松约束、无界。紧约束指这一侧最小值等于最大值，变高会被锁在那一个高度。松约束指最小高度是零，子盒子可以停得更矮。无界指最大高度是无穷，单靠这一侧的上限，变高不会被拦住。

### 示例
visual: code
caption: 紧松与无界
points: 最小等于最大 | 最小是零 | 最大是无穷

```dart
const tight = BoxConstraints.tightFor(width: 120, height: 48);
const loose = BoxConstraints.loose(Size(120, 48));
const unbounded = BoxConstraints(
  maxWidth: double.infinity,
  maxHeight: double.infinity,
);
```

代码里第一行 tight 用 tightFor 把宽和高都写成唯一值，最小值因此等于最大值。第二行 loose 用 loose 包住同一个尺寸，最小宽高是零，最大宽高仍是一百二十和四十八。第三段 unbounded 的最大宽高都是 double.infinity，也就是无穷，最小宽高保持默认的零。无界只说明上限不封顶，子组件仍然要回报一个有限尺寸。

### 你会看到
visual: phone
caption: 三种约束结果
points: 高度被钉死 | 宽度还能缩 | 无限要自定

手机框顶上是三种约束结果，框里三行写着高度被钉死、宽度还能缩、无限要自定。紧约束那一行，色块的高被锁成四十八。松约束那一行，色块可以比最大宽度更窄。无界那一行如果子组件不自己选一个有限宽度，布局就无法完成。

### 常见坑
visual: warning
caption: 无界仍要有限
points: 无界仍要有限 | 不能突破父级 | 宽高分开算

错误卡上写着无界仍要有限、不能突破父级、宽高分开算。最大高度是无穷，并不表示子组件应该变成无限高，它仍要选出一个有限数字。若子组件也去追那个无穷大，调试时会看到无限宽或无限高的失败。宽和高可以一边紧、一边松，不要拿一个词概括四个数字。

### 收束
visual: path
caption: 接着看两条轴
points: 分清四个数字 | 主轴和交叉轴

路径上两步，先分清四个数字，再去看主轴和交叉轴。最小值等于最大值，这一侧就是紧约束。最小值写成零，这一侧就是松约束，最大值写成无穷，这一侧就是无界。下一课是 Row、Column 与主轴交叉轴，横排和竖排都会把父级的约束继续往下传。

## lesson row-column
title: Row、Column 与主轴交叉轴

### 定义
visual: concept
caption: 主轴和交叉轴
points: 水平主轴 | 竖直主轴 | 交叉轴垂直 | 默认撑满主轴

画面上四行是水平主轴、竖直主轴、交叉轴垂直、默认撑满主轴。Row 的主轴是水平方向，Column 的主轴是竖直方向，交叉轴永远和主轴垂直。mainAxisAlignment 沿主轴分配空隙，crossAxisAlignment 管交叉轴上的对齐。mainAxisSize 不写的时候默认是 max，主轴会尽量用满父级给出的有限最大长度，整行或整列就被拉满。

### 类比
visual: compare
left: 排队
right: 两条轴
caption: 横队和纵队
points: 横队肩并肩 | 纵队前后站 | 主轴定方向 | 交叉轴管侧向

左边卡片是排队，两行写着横队肩并肩、纵队前后站。右边卡片是两条轴，两行写着主轴定方向、交叉轴管侧向。人在横队里左右移动，走的是 Row 的主轴，上下对齐则落到交叉轴。换成纵队以后，前后方向变成 Column 的主轴，左右才是交叉轴。

### 机制
visual: boxes
mode: cycle
caption: 横排竖排来回换
points: 主轴 | 交叉轴 | 分配

三个盒子先排成一行，过几秒收成一列，横竖来回切换。盒子上的字是主轴、交叉轴、分配。横排时主轴水平，竖排时主轴竖直，交叉轴始终和当前主轴垂直。分配对应 mainAxisAlignment，它只管主轴上的空隙，交叉轴上的对齐要另看 crossAxisAlignment，绿橙蓝三块是一起变换的。

### 示例
visual: code
caption: 两端留白并居中
points: 主轴撑满 | 两端拉开 | 交叉轴居中

```dart
class AxisRow extends StatelessWidget {
  const AxisRow({super.key});

  @override
  Widget build(BuildContext context) {
    return const Row(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text('左'),
        Text('中'),
        Text('右'),
      ],
    );
  }
}
```

代码是一个 Row，mainAxisSize 写成 max，这就是默认值，主轴会占满父级给的最大宽度。mainAxisAlignment 用 spaceBetween，左中右三个字被分到主轴的两端和正中。crossAxisAlignment 用 center，交叉轴也就是竖直方向上，三个字向中间对齐。父级如果没有有限的最大宽度，max 就无法算出这条 Row 该有多长，三个字也撑不出整行。

### 你会看到
visual: phone
caption: 三个字拉开
points: 靠左 | 居中 | 靠右

手机框顶上是三个字拉开，框里三行写着靠左、居中、靠右。三个字排成一行，分别贴向可用宽度的左边、正中和右边，中间的空隙被拉开。它们的竖直位置落在这一行的中线，因为交叉轴用了居中。如果父级很窄，三个字仍在同一条水平主轴上，不会自动改成竖排。

### 常见坑
visual: warning
caption: 两条轴容易混
points: 主轴交叉轴混了 | 垂直居中改错轴 | 默认会撑满

错误卡上写着主轴交叉轴混了、垂直居中改错轴、默认会撑满。想让 Row 里的文字在竖直方向居中，要改的是 crossAxisAlignment，因为 Row 的主轴是水平的。去改 mainAxisAlignment，只会把字左右挪动。Column 正好相反，竖直方向才归 mainAxisAlignment 管，左右才落到交叉轴，默认还会去占满可用高度。

### 收束
visual: path
caption: 去分剩余空间
points: 分清两条轴 | 去分剩余空间

画面上的路径先写着分清两条轴，再写着去分剩余空间。Row 横着排，Column 竖着排，交叉轴跟主轴垂直，mainAxisSize 默认会把主轴撑满。记的时候可以看着那三个盒子，它们一会儿横排、一会儿竖排，轴就跟着换。下一课是 Expanded、Flexible 与 Spacer，专门讲多个子组件怎么分主轴上剩下的空间。

## lesson expanded-flexible
title: Expanded、Flexible 与 Spacer

### 定义
visual: concept
caption: 占满剩余空间
points: 按比例占满 | 可以小于配额 | 空白也占一份

画面上三行是按比例占满、可以小于配额、空白也占一份。Expanded 必须放在 Row、Column 或 Flex 里面，并按 flex 把主轴剩余空间占满。Flexible 的 fit 可以是 loose，这时子组件最多用到分给它的那一段，也可以更小。Spacer 里面没有内容，它就是一个空的 Expanded，专门在主轴上撑开一段空白，相同的 flex 会平分剩余长度。

### 类比
visual: compare
left: 占座位
right: 留空位
caption: 弹性座位和空位
points: 固定座位不拉伸 | 弹性座位按份数 | 空位也占一份 | 必须坐在这一排

左边卡片是占座位，两行写着固定座位不拉伸、弹性座位按份数。右边卡片是留空位，两行写着空位也占一份、必须坐在这一排。已经坐下的人宽度不变，剩下的椅子按 flex 分给弹性座位。空着的座位同样算一份，不能把 Expanded 拿到这一排外面单独放。

### 机制
visual: boxes
mode: row
caption: 横排四种占位
points: 固定 | Expanded | Flexible | Spacer

四个盒子横着排成一行，从左到右写着固定、Expanded、Flexible、Spacer。这一排表示它们待在同一个主轴上，画面里四块一样大，字只是在标明角色。固定只占内容自己的宽度，Expanded 会把分到的长度占满。Flexible 在 loose 时可以停得更短，Spacer 是没有子组件的 Expanded，用来空出一段。

### 示例
visual: code
caption: 一行里分配弹性
points: 文字原宽 | 两份占满 | 可以更小 | 空白一份

```dart
Row(
  children: const [
    Text('固定'),
    Expanded(flex: 2, child: ColoredBox(color: Color(0xFF1F7A6D))),
    Flexible(fit: FlexFit.loose, child: Text('可更小')),
    Spacer(),
  ],
)
```

代码的 Row 里，第一个 Text 宽度随文字走。Expanded 的 flex 是二，会把分到的剩余宽度全部占满，里面的色块跟着拉宽。Flexible 的 fit 是 loose，文字可以比配额更窄，没用完的宽度不会再分给旁边。最后的 Spacer 没有子内容，作用和一个空的 Expanded 一样，默认 flex 是一，三份配额按二比一比一划分，没用完的宽度也不会让出来。

### 你会看到
visual: phone
caption: 一行被撑开
points: 文字原宽 | 绿色占满 | 可缩更窄 | 空白占位

手机框顶上是一行被撑开，框里四行写着文字原宽、绿色占满、可缩更窄、空白占位。这四行对应跑起来后的那一条横排，框里本身只是四行说明。固定文字停在左侧，绿色区域按较大的 flex 占满配额。loose 那一段只包住短文字，行尾还有一段没有内容的空白。

### 常见坑
visual: warning
caption: 弹性放错了地方
points: 放错父级 | 中间隔了别的组件 | 无界主轴不能伸

错误卡上写着放错父级、中间隔了别的组件、无界主轴不能伸。Expanded、Flexible、Spacer 都要作为 Row、Column 或 Flex 的直接子组件。中间夹一层 Padding 或 Align，父级就收不到这份弹性数据。主轴的最大约束如果是无穷，剩余空间算不出来，弹性子组件也无法布局，最常见的是父级根本没有高度上限。

### 收束
visual: path
caption: 下一课看堆叠
points: 留在排列里 | 看重叠摆放

路径上两步，先让弹性子组件留在排列里，再去看重叠摆放。Expanded 占满分到的空间，Flexible 的 loose 允许更小，Spacer 是空的 Expanded。这三个都要直接放在水平或竖直的弹性盒子里，不能单独搁在外面。下一课是 Stack 与 Positioned，到那里看叠在一起时，谁来决定整叠的尺寸。

## lesson stack
title: Stack 与 Positioned

### 定义
visual: concept
caption: 谁来决定尺寸
points: 未定位撑尺寸 | 边距负责定位 | 全定位会撑满

画面上三行是未定位撑尺寸、边距负责定位、全定位会撑满。Stack 里没有 Positioned 的子组件决定这一叠有多大。写了 Positioned 的子组件改用 top、right、bottom、left 这些边距来定位，不再把整叠撑大。若每一个子组件都定位了，Stack 会尽量用满父级给的最大范围，父级这一侧没有上限时尺寸就定不住。

### 类比
visual: compare
left: 桌上的照片
right: 堆叠组件
caption: 底片和便签
points: 底片决定大小 | 便签不改桌面 | 未定位撑尺寸 | 边距只定位置

左边卡片是桌上的照片，两行写着底片决定大小、便签不改桌面。右边卡片是堆叠组件，两行写着未定位撑尺寸、边距只定位置。底片有多大，这一叠看起来就有多大。角上的便签用离桌边的距离来贴，它自己的大小不会把整张桌子撑开。

### 机制
visual: boxes
mode: stack
caption: 三块叠在一起
points: 未定位 | 再叠一层 | 边距定位

三块盒子叠在一起，后一块压住前一块的一角。盒子上的字是未定位、再叠一层、边距定位。前两块没有写边距，按规则由它们决定这一叠有多大。第三块用边距贴进来，只改变自己相对堆叠边缘的位置，不负责把整叠变大，画面上能看到三者错开。

### 示例
visual: code
caption: 底图加右上角标
points: 底图定尺寸 | 距顶为八 | 距右为八

```dart
Stack(
  children: const [
    SizedBox(
      width: 160,
      height: 80,
      child: ColoredBox(color: Color(0xFF1F7A6D)),
    ),
    Positioned(
      top: 8,
      right: 8,
      child: Text('角标'),
    ),
  ],
)
```

代码的 Stack 里，第一项是一百六十宽、八十高的色块，它没有 Positioned，因此这一叠的尺寸由它决定。第二项 Positioned 写了 top 和 right，都是八，文字会被放到距顶八、距右八的位置。角标没有参与把 Stack 撑大。父级若把约束收得很紧，整叠仍要服从外层的最大宽高，一百六十乘八十也会被夹小。

### 你会看到
visual: phone
caption: 角标贴在右上
points: 绿色底块 | 一百六十乘八十 | 右上角文字

手机框顶上是角标贴在右上，框里三行写着绿色底块、一百六十乘八十、右上角文字。底块决定这块区域的大小。角标离顶边和右边都有一点空隙，文字叠在绿色上面。底块如果拿掉，又没有别的未定位子组件，这块区域会改去撑满父级允许的最大范围。

### 常见坑
visual: warning
caption: 全定位会失尺寸
points: 全都定位了 | 边距和宽高冲突 | 离开堆叠就失效

错误卡上写着全都定位了、边距和宽高冲突、离开堆叠就失效。每个子组件都包上 Positioned 之后，就没有人再提供堆叠的内容尺寸，Stack 只能尽量撑满父级。left 和 right 都写了以后，宽度已经能算出来，不要再同时写 width。Positioned 离开 Stack，父级也不认识这些边距，布局会直接失败。

### 收束
visual: path
caption: 下一课看间距
points: 定下尺寸 | 边距放角标

路径上两步，先用未定位子组件定下尺寸，再用边距放角标。Stack 负责重叠，Positioned 负责相对边缘的位置。底图决定这一叠有多大，角标只是贴在顶边和右边，画面上三块错开就是这个关系。下一课是间距、内边距与对齐，讲组件周围的空白，以及在父级里面怎么摆。

## lesson spacing-align
title: 间距、内边距与对齐

### 定义
visual: concept
caption: 内边距和对齐
points: 只加内边距 | 父级里对齐 | 默认尽量撑开 | 容器可以兼做

画面上四行是只加内边距、父级里对齐、默认尽量撑开、容器可以兼做。Padding 只在子组件内侧留白，不会顺便做装饰或外边距。Align 在父级约束里摆放子组件，宽高因子留空并且最大值有限时，会尽量撑满这个范围。Center 是对齐点固定在正中的 Align，Container 可以同时写装饰、内边距和约束。

### 类比
visual: compare
left: 相框
right: 组件
caption: 衬纸和照片
points: 衬纸只留在框内 | 照片在框里挪 | 内边距不改外边 | 容器能一起做

左边卡片是相框，两行写着衬纸只留在框内、照片在框里挪。右边卡片是组件，两行写着内边距不改外边、容器能一起做。衬纸只垫在画和框之间，框外到墙的距离仍算外边距。Align 像在框内挪照片，Container 则把框、衬纸和尺寸限制收成一个组件。

### 机制
visual: boxes
mode: row
caption: 横排三个角色
points: 内边距 | 对齐 | 容器

三个盒子横排，上面写着内边距、对齐、容器。内边距那一块只表示 Padding 往里缩一圈，子组件的外边距要另找办法。对齐那一块表示 Align 在父级给出的范围内摆放，默认会尽量撑开。容器那一块表示 Container 能把装饰、内边距和额外约束放在一起。

### 示例
visual: code
caption: 内边距对齐容器
points: 四边留八 | 文字靠左 | 绿色含内边距

```dart
Column(
  children: [
    const Padding(padding: EdgeInsets.all(8), child: Text('内边距')),
    const Align(alignment: Alignment.centerLeft, child: Text('靠左')),
    Container(
      padding: const EdgeInsets.all(12),
      decoration: const BoxDecoration(color: Color(0xFF1F7A6D)),
      child: const Text('容器'),
    ),
  ],
)
```

代码从上到下有三行。Padding 的四边都是八，空白留在文字和组件边缘之间，组件变高后会把下面的兄弟隔开。Align 的 alignment 是靠左，在父级宽度有限时会先撑满，再把文字放到左侧。Container 同时写了十二的内边距和一块绿色装饰，文字包在装饰里面，绿色会铺满包含内边距的那一整块。

### 你会看到
visual: phone
caption: 留白和靠左
points: 四周空白 | 文字靠左 | 绿色底

手机框顶上是留白和靠左，框里三行写着四周空白、文字靠左、绿色底。第一行文字周围有一圈内边距，这圈空白算进该行自己的高度。第二行文字贴着左侧，那是对齐的结果。第三行文字坐在绿色区域里，绿色和文字之间还有一圈内边距，框里的三行就是这三种效果。

### 常见坑
visual: warning
caption: 居中和装饰易错
points: 居中没有撑开 | 底色包不住空隙 | 颜色和装饰冲突

错误卡上写着居中没有撑开、底色包不住空隙、颜色和装饰冲突。把 Center 直接放进 Row，水平方向的最大约束是无穷，Center 就无法撑满整行，只会缩成文字那么宽。Padding 留下的是子组件内侧的空白，底色若要连这圈空白一起铺满，装饰得画在 Padding 的外层。Container 的 color 和 decoration 不能同时写，否则这个组件会直接报错。

### 收束
visual: path
caption: 下一课定尺寸
points: 分清内边距 | 明确尺寸

路径上两步，先分清内边距和对齐，再去给子组件一个明确尺寸。Padding 只留内侧，Align 默认会撑开，Center 是居中的 Align。Container 可以把装饰、内边距和约束合在一个组件里，横排的三个盒子可以把这三件事对上号。下一课是 SizedBox、ConstrainedBox 与 FittedBox，专门看固定尺寸、附加约束和缩放。

## lesson size-boxes
title: SizedBox、ConstrainedBox 与 FittedBox

### 定义
visual: concept
caption: 三种尺寸盒子
points: 固定宽高 | 再加一道约束 | 按方式缩放

画面上三行是固定宽高、再加一道约束、按方式缩放。SizedBox 在宽和高都写明时，给子组件一个固定尺寸。ConstrainedBox 在父级已经传来的约束上再附加限制，不能把父级的最大值放宽。FittedBox 按 BoxFit 缩放子组件，让它装进自己分到的区域，具体是放大、缩小还是保持，要看选了哪一种装法。

### 类比
visual: compare
left: 裁纸
right: 缩放
caption: 先裁再缩放
points: 先裁成固定大小 | 再加一条不能超过的边 | 画大了就缩小 | 比例由装法决定

左边卡片是裁纸，两行写着先裁成固定大小、再加一条不能超过的边。右边卡片是缩放，两行写着画大了就缩小、比例由装法决定。裁纸对应 SizedBox 和 ConstrainedBox，画布大小仍不能超过外层房间。缩放对应 FittedBox，BoxFit 决定整幅放进去的办法，contain 会保住比例，左右两张卡片就是这个对照。

### 机制
visual: constraints
caption: 变高受三道限制
points: 固定尺寸 | 附加约束 | 缩放装入

父盒子里的子盒子先变高，再被挪走，旁边三行是固定尺寸、附加约束、缩放装入。固定尺寸对应 SizedBox，变高会被写成一个确定的数。附加约束对应 ConstrainedBox，它只能在父级范围内再收紧。缩放装入对应 FittedBox，子组件先按自己的尺寸布局，再被缩放进这块区域。

### 示例
visual: code
caption: 固定后再缩放
points: 最大宽二百 | 固定一百六十 | 等比装入

```dart
ConstrainedBox(
  constraints: const BoxConstraints(maxWidth: 200, minHeight: 48),
  child: const SizedBox(
    width: 160,
    height: 48,
    child: FittedBox(
      fit: BoxFit.contain,
      child: Text('固定、再约束、再缩放'),
    ),
  ),
)
```

外层 ConstrainedBox 附加了最大宽度二百和最小高度四十八。中间 SizedBox 把区域定成一百六十宽、四十八高，这一层是固定尺寸。最里面的 FittedBox 使用 BoxFit.contain，文字会按比例放进这块区域，装不下时就缩小，留空时也可能放大。三层都还要服从更外层父级传来的约束。

### 你会看到
visual: phone
caption: 字被装进框
points: 宽一百六十 | 高四十八 | 文字被缩放

手机框顶上是字被装进框，框里三行写着宽一百六十、高四十八、文字被缩放。区域的宽高来自 SizedBox。文字不再按原始字号直接画出，FittedBox 会按 contain 把它放进这块矩形。若父级最大宽度小于一百六十，这块区域还会被再夹小，框里三行就是在提示这三层结果。

### 常见坑
visual: warning
caption: 约束不能放宽父级
points: 附加约束破不了父级 | 子组件收到无界 | 固定尺寸会被夹

错误卡上写着附加约束破不了父级、子组件收到无界、固定尺寸会被夹。ConstrainedBox 不能把父级的最大宽度改大，超出的最小值会被夹回父级范围内。FittedBox 默认让子组件在无界约束里先布局，子组件如果还想无限撑开，就会失败。SizedBox 写了一百六十，父级只允许一百，实际仍是一百。

### 收束
visual: path
caption: 下一课会换行
points: 记住三种盒子 | 怎么换行

路径上两步，先记住三种盒子各管什么，再看一行放不下时怎么换行。SizedBox 负责固定尺寸，ConstrainedBox 负责在父级范围内再加限制，FittedBox 按 BoxFit 把子组件缩放进去。三种可以叠着写，但谁也突破不了更外层的最大约束。下一课是 Wrap 与 Flow，一行排不下时就该换行了。

## lesson wrap-flow
title: Wrap 与 Flow

### 定义
visual: concept
caption: 换行与底层流
points: 一行放不下就换 | 底层要自己摆 | 日常很少直接写

画面上三行是一行放不下就换、底层要自己摆、日常很少直接写。Wrap 在当前这一行排不下下一个子组件时，会把它放到下一行，并可以用 spacing 和 runSpacing 控制缝隙。Flow 更底层，子组件的位置要交给 FlowDelegate 计算。普通的标签、关键字这种换行，日常很少直接写 Flow。

### 类比
visual: compare
left: 货架
right: 两种组件
caption: 满了就放下层
points: 这一层满了就放下层 | 货物之间留缝 | Wrap 会自动换 | Flow 要自己算

左边卡片是货架，两行写着这一层满了就放下层、货物之间留缝。右边卡片是两种组件，两行写着 Wrap 会自动换、Flow 要自己算。货架不会把多出来的盒子硬挤在层外，放不下就掉到下一层。Flow 像让你自己写每一件货的坐标，所以一般界面不会先选它。

### 机制
visual: boxes
mode: wrap
caption: 排不下就换行
points: 布局 | 约束 | 滚动 | 溢出

四个盒子排在有限的宽度里，字是布局、约束、滚动、溢出。一行的宽度不够时，后面的盒子掉到下一行，这就是换行，画面上能看到它们分成上下两排。盒子之间还能留出水平和竖直的缝。Flow 不做这种自动换行，它等 FlowDelegate 逐个告诉它画在哪。

### 示例
visual: code
caption: 标签之间留缝
points: 行内缝是八 | 行距也是八 | 放不下换行

```dart
Wrap(
  spacing: 8,
  runSpacing: 8,
  children: const [
    Text('布局'),
    Text('约束'),
    Text('滚动'),
    Text('溢出'),
  ],
)
```

代码是一个 Wrap，spacing 和 runSpacing 都是八，分别管同一行里的缝和行与行之间的缝。四个文字是布局、约束、滚动、溢出。当父级宽度容不下四项时，后面的文字会换到下一行，不会沿着主轴继续挤出边界。这里没有 FlowDelegate，因为这段只演示日常会写的自动换行。

### 你会看到
visual: phone
caption: 标签换了行
points: 布局 | 约束 | 滚动 | 溢出

手机框顶上是标签换了行，框里四行写着布局、约束、滚动、溢出。前几个标签横着排，空隙大约是八。宽度不够以后，后面的标签出现在下一行，两行之间也有缝。它们是一次性排好的，不会因为滚出屏幕才开始创建，框里四行就是这些标签的名字。

### 常见坑
visual: warning
caption: 横排不会自动换
points: 横排不会换行 | 单项比行还宽 | 换行仍建完全部

错误卡上写着横排不会换行、单项比行还宽、换行仍建完全部。把会变长的标签放进 Row，超出后不会换行，调试时会在末尾看到溢出。Wrap 只在下一项放不下时换行，单个子组件本身比一行还宽，这一项仍然会溢出。Wrap 也会把子组件都建出来，它不做懒加载。

### 收束
visual: path
caption: 长内容改滚动
points: 内容换行 | 需要滚动的列表

路径上两步，先让放不下的内容换行，再处理长到需要滚动的列表。Wrap 会在一行排不下时自动换行，行距和列距可以分开写。Flow 更底层，位置交给 FlowDelegate，日常很少直接写。下一课是滚动三件套与 CustomScrollView，内容长过一屏时就改用滚动，短标签继续用换行就够。

## lesson scrolling
title: 滚动三件套与 CustomScrollView

### 定义
visual: concept
caption: 四种滚动容器
points: 整页都建 | 按需建行 | 排成网格 | 交给片段

画面上四行是整页都建、按需建行、排成网格、交给片段。SingleChildScrollView 把整个子组件一次建出来，滚动时不做懒加载。ListView.builder 只创建接近视口的行，GridView 用来画网格，条目多时用带 builder 的写法才会按需创建。CustomScrollView 不直接摆普通盒子，它接收的是 sliver，几种段落要一起滚时就用它来装。

### 类比
visual: compare
left: 翻书
right: 滚动组件
caption: 整本和抽页
points: 整本一起装订 | 用到哪页才抽哪页 | 短内容可以整页 | 长列表应该懒加载

左边卡片是翻书，两行写着整本一起装订、用到哪页才抽哪页。右边卡片是滚动组件，两行写着短内容可以整页、长列表应该懒加载。只有几段说明时，整页建出来很直接。行数会增加到几十上百，就该换成按需创建，否则一进页面就把所有行都建完。

### 机制
visual: boxes
mode: scroll
caption: 列表向上滚
points: 整页建完 | 按需创建 | 画成网格 | 交给 sliver

一列盒子不断向上滚，重复出现的字是整页建完、按需创建、画成网格、交给 sliver。整页建完对应 SingleChildScrollView，滚动前子组件已经都在。按需创建对应 ListView.builder，滚进视口附近才建那一行。网格和 sliver 是另外两种排法，画面上它们排成同一条向上移动的列表。

### 示例
visual: code
caption: 按需建出一行
points: 共四十行 | 接近视口才建 | 四周留白

```dart
class LazyList extends StatelessWidget {
  const LazyList({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: 40,
      itemBuilder: (context, index) {
        return Padding(
          padding: const EdgeInsets.all(12),
          child: Text('第 $index 行'),
        );
      },
    );
  }
}
```

代码用 ListView.builder，itemCount 是四十，itemBuilder 按序号返回一行文字，四周留十二的内边距。滑到哪一段，接近视口的行才会被创建，不会先把四十行都建好。这里没有使用 SingleChildScrollView，因为内容是重复的长列表。网格要用 GridView，多种滚动段落叠在一起时再换 CustomScrollView，那是下一种容器。

### 你会看到
visual: phone
caption: 只看到几行
points: 当前行 | 下一行 | 尚未创建

手机框顶上是只看到几行，框里三行写着当前行、下一行、尚未创建。屏幕里只有视口附近的几行文字，下面的行还在列表里等着滚上来。继续向上滚，新的行才出现，离开视口的行可以被回收。若换成整页滚动，这四十行会在第一帧就全部建完。

### 常见坑
visual: warning
caption: 长列表别整页建
points: 长列表用了整页 | 收缩后失去懒加载 | 网格孩子太多

错误卡上写着长列表用了整页、收缩后失去懒加载、网格孩子太多。只有两三行说明时可以用 SingleChildScrollView。行数很多仍用它包一个 Column，所有子组件都会被建出来。给 ListView 打开 shrinkWrap，再放进另一个可滚动组件，列表也会按全部内容算高度，懒加载的好处就没了。

### 收束
visual: path
caption: 按长短选滚动
points: 按内容长短 | 同一个视图

路径上两步，先按内容长短选滚动组件，再把一段段滚动拼到同一个视图里。短内容可以整页建完，长列表用 builder 按需创建，网格交给 GridView。多种段落要共享一条滚动时，用 CustomScrollView 把它们装在一起。下一课是 Sliver 是什么，会解释这种段落本身怎么布局。

## lesson slivers
title: Sliver 是什么

### 定义
visual: concept
caption: 滚动里的一段
points: 滚动中的一段 | 按滚动约束布局 | 可以懒构建 | 普通盒子要适配

画面上四行是滚动中的一段、按滚动约束布局、可以懒构建、普通盒子要适配。Sliver 是滚动区域里的一段，拿到的是滚动约束，跟普通盒子的宽高约束不一样。SliverList、SliverAppBar、SliverGrid 都可以作为这样的一段，其中列表和网格可以懒构建。SliverToBoxAdapter 把一个普通盒子放进滚动视图，这一段会立刻建出它的子组件。

### 类比
visual: compare
left: 一列火车
right: 滚动视图
caption: 车厢要连成列
points: 每节车厢单独定长 | 没靠近的车厢先不装 | 每段按滚动约束 | 普通箱子要先改装

左边卡片是一列火车，两行写着每节车厢单独定长、没靠近的车厢先不装。右边卡片是滚动视图，两行写着每段按滚动约束、普通箱子要先改装。车厢连起来才是整趟车，对应一个 CustomScrollView 里的多个 sliver。普通的文字或色块不能直接当车厢，得先放进适配的那一节。

### 机制
visual: boxes
mode: scroll
caption: 几段一起上滚
points: 顶栏 | 列表 | 网格 | 普通盒

几块盒子接成一列，整列向上滚。盒子上的字是顶栏、列表、网格、普通盒。每一块都是滚动区域里的一段，滚出窗口的部分让出位置，下面的段接着出现。列表和网格这两段可以懒构建，普通盒那一段则是把一个现成的盒子放进这条滚动里。

### 示例
visual: code
caption: 顶栏列表和盒子
points: 标题顶栏 | 十二行列表 | 两列网格 | 末尾普通文字

```dart
CustomScrollView(
  slivers: [
    const SliverAppBar(title: Text('标题')),
    SliverList.builder(
      itemCount: 12,
      itemBuilder: (context, index) => Text('行 $index'),
    ),
    SliverGrid.builder(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
      ),
      itemCount: 4,
      itemBuilder: (context, index) => Text('$index'),
    ),
    const SliverToBoxAdapter(child: Text('普通盒子')),
  ],
)
```

代码是一个 CustomScrollView，slivers 里依次放了顶栏、列表、两列网格和末尾的普通文字。顶栏用 SliverAppBar 写出标题，列表用 SliverList.builder 按需建十二行，网格用 SliverGrid.builder 固定成两列四个格子。末尾的 SliverToBoxAdapter 把一行普通文字装进同一条滚动，这一段会马上建出来。这四段都得是 sliver，裸的容器不能直接写进这个数组。

### 你会看到
visual: phone
caption: 顶栏带着内容滚
points: 标题栏 | 列表行 | 两列格子 | 末尾文字

手机框顶上是顶栏带着内容滚，框里四行写着标题栏、列表行、两列格子、末尾文字。标题先出现在上方，列表行随着向上滚动接上来，格子按两列排开。最后一行普通文字也在同一条滚动里，并没有另起一页。框里这四行按从上到下的顺序，对应代码里的四段。

### 常见坑
visual: warning
caption: 普通盒子要先装
points: 普通组件直接放入 | 适配段不会懒加载 | 顶栏离开组合滚动

错误卡上写着普通组件直接放入、适配段不会懒加载、顶栏离开组合滚动。CustomScrollView 的 slivers 只接受 sliver，把 Text 或 Container 直接放进去，滚动视图会拒绝这个子组件。SliverToBoxAdapter 只是把盒子装进去，它不会因此变成懒加载。SliverAppBar 也要放在这种滚动视图里，不能塞进普通的 Column，否则类型对不上。

### 收束
visual: path
caption: 去读溢出提示
points: 滚动内容 | 失败时的提示

路径上两步，先把滚动内容分成 sliver，再学会读布局失败时的提示。一段可以是顶栏、列表或网格，普通盒子要用 SliverToBoxAdapter 装进去。列表和网格可以懒构建，适配段则会立刻建出那个盒子。下一课是布局溢出怎么读，专门看无界高度和黄黑条纹分别是什么意思。

## lesson overflow
title: 布局溢出怎么读

### 定义
visual: concept
caption: 两种布局报错
points: 竖直方向无界 | 给剩余或固定高度 | 超出后出条纹

画面上三行是竖直方向无界、给剩余或固定高度、超出后出条纹。Column 里直接放 ListView，竖直方向会得到无界高度，列表无法确定视口。修正时用 Expanded 把剩余高度交给列表，或外包一个固定高度。内容已经有边界却仍然放不下时，调试画面会出现黄黑条纹，并提示 overflowed by N pixels。

### 类比
visual: compare
left: 箱子太矮
right: 两种失败
caption: 没箱高和超高
points: 箱盖没有高度 | 货物多到盖不上 | 无界是没给箱高 | 条纹是已经超高

左边卡片是箱子太矮，两行写着箱盖没有高度、货物多到盖不上。右边卡片是两种失败，两行写着无界是没给箱高、条纹是已经超高。没给箱高时，列表不知道自己该有多高。箱高已经定了，货物仍堆过箱沿，才会在边上画出那圈黄黑条纹。

### 机制
visual: warning
caption: 错误卡上的三句
points: 竖直无界 | 黄黑条纹 | 溢出像素

错误卡上三行是竖直无界、黄黑条纹、溢出像素。竖直无界通常出现在 Column 直接包住 ListView 的时候，提示说竖直视口拿到了无限高度。黄黑条纹是另一种情况，父级已经有最大高度，子组件仍超出这块范围。条纹旁的提示会写 overflowed by N pixels，N 就是超出的逻辑像素。

### 示例
visual: code
caption: 剩余高度包列表
points: 标题在上 | 剩余交给列表 | 高度必须有限

```dart
Column(
  children: [
    const Text('标题'),
    Expanded(
      child: ListView.builder(
        itemCount: 20,
        itemBuilder: (context, index) => Text('第 $index 行'),
      ),
    ),
  ],
)
```

代码在 Column 里先放标题，再用 Expanded 包住 ListView.builder。Expanded 取走标题以外的剩余高度，列表因此得到有限的最大高度，不会再面对竖直方向的无界约束。这段 Column 自己也要放在高度有限的父级里，例如页面的正文区域。如果只是想要一块固定高的列表，可以改用一个写明高度的 SizedBox。

### 你会看到
visual: phone
caption: 标题下接着列表
points: 标题占一行 | 列表吃掉剩余 | 行数按需出现

手机框顶上是标题下接着列表，框里三行写着标题占一行、列表吃掉剩余、行数按需出现。标题停在上方，下面的列表一直铺到这块区域的底部，没有黄黑条纹。向上滚时，新的行从底部进来。若把 Expanded 拿掉，这一帧就无法给列表一个有限高度。

### 常见坑
visual: warning
caption: 两种报错别混读
points: 两种报错混着看 | 条纹只在调试出现 | 外层无界仍会失败

错误卡上写着两种报错混着看、条纹只在调试出现、外层无界仍会失败。无界高度是父级没给最大高度，黄黑条纹是已经有边界却超出了若干像素，修法不一样。条纹是调试模式的提示，发布版本里不一定还能看见。Column 自己已经处在无界高度里时，再套 Expanded，主轴仍然算不出剩余空间。

### 收束
visual: path
caption: 再看屏幕有多宽
points: 分清无界和溢出 | 实际有多宽

路径上两步，先分清无界和溢出，再按父级实际有多宽来排。Column 直接放 ListView 会得到竖直方向的无界高度，要用 Expanded 或固定高度给它一个上限。内容已经有边界却仍然超出时，调试画面才出现黄黑条纹，并提示 overflowed by N pixels。下一课是 MediaQuery、LayoutBuilder 与断点，去看屏幕尺寸和父级约束怎么读。

## lesson adaptive
title: MediaQuery、LayoutBuilder 与断点

### 定义
visual: concept
caption: 尺寸从哪读
points: 读整屏尺寸 | 读父级约束 | 断点自己定

画面上三行是读整屏尺寸、读父级约束、断点自己定。MediaQuery.sizeOf 传入 context，读到的是屏幕的逻辑像素，宽度和高度都在这个尺寸里。LayoutBuilder 在布局时拿到父级约束，最大宽度可能比屏幕窄，窄父级里不能照着整屏来排。断点没有统一数值，六百或别的分界都由应用自己定。

### 类比
visual: compare
left: 整层楼
right: 两种尺子
caption: 楼宽和房宽
points: 楼有多宽 | 房间往往更窄 | 屏幕尺看整层 | 约束尺看这间房

左边卡片是整层楼，两行写着楼有多宽、房间往往更窄。右边卡片是两种尺子，两行写着屏幕尺看整层、约束尺看这间房。用整层楼的宽度决定一件家具，家具可能比房间还宽。LayoutBuilder 量的是这间房当下允许的最大宽高，断点也该按这个房间来定。

### 机制
visual: phone
caption: 屏幕和父级
points: 屏幕尺寸 | 父级约束 | 应用定断点

手机框的标题是屏幕和父级，框里三行写着屏幕尺寸、父级约束、应用定断点。屏幕尺寸来自 MediaQuery.sizeOf，它描述整台设备现在的逻辑像素。父级约束来自 LayoutBuilder，对话框或侧栏里的最大宽度可以小得多。应用定断点这行提醒你，框架并不附带一个必须遵守的宽度表。

### 示例
visual: code
caption: 屏幕和父级分开
points: 读屏幕宽度 | 读父级最大宽 | 六百是自己定的

```dart
class AdaptiveBody extends StatelessWidget {
  const AdaptiveBody({super.key});

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 600;
        return Text(wide ? '宽布局 $width' : '窄布局');
      },
    );
  }
}
```

代码先用 MediaQuery.sizeOf 读取屏幕的逻辑像素宽度，记在 width 里。LayoutBuilder 再拿到父级的 constraints，最大宽度达到六百就走宽布局，否则走窄布局。六百只是这个应用自己定的断点，换成八百四十也完全可以。屏幕宽度和父级最大宽度可能不同，真正决定这一块怎么排的是 constraints。

### 你会看到
visual: phone
caption: 窄屏一行字
points: 窄布局 | 父级不到六百 | 屏幕宽度另计

手机框顶上是窄屏一行字，框里三行写着窄布局、父级不到六百、屏幕宽度另计。这块区域因为父级最大宽度小于六百，文字显示窄布局。把同一个组件放到更宽的父级里，文字会换成宽布局。只把手机横过来，而父级仍然很窄，结果还是看父级约束。

### 常见坑
visual: warning
caption: 别拿整屏套窄处
points: 拿屏幕宽套窄父级 | 无穷最大宽失效 | 尺寸变化才该重建

错误卡上写着拿屏幕宽套窄父级、无穷最大宽失效、尺寸变化才该重建。父级只有三百宽，却按屏幕的四百宽去排两栏，多出来的一百就会溢出。父级最大宽度如果是无穷，它也会大于六百，宽布局会被错选。读尺寸时用 sizeOf，这样只有屏幕尺寸变化才让这一段重建。

### 收束
visual: path
caption: 再处理遮挡
points: 屏幕尺寸 | 系统遮挡和键盘

路径上两步，先把屏幕尺寸和父级约束分开，再处理系统遮挡和键盘。断点由应用自己定，例子里的六百只是这个应用选的分界，框架没有规定必须用它。父级有多宽，仍然要问 LayoutBuilder。下一课是 SafeArea 与键盘，看刘海、底部手势条和键盘怎么让出位置。

## lesson safe-area
title: SafeArea 与键盘

### 定义
visual: concept
caption: 安全区和键盘
points: 躲开刘海 | 躲开底部手势条 | 键盘另算高度

画面上三行是躲开刘海、躲开底部手势条、键盘另算高度。SafeArea 按系统安全边距把内容往里推，避开刘海和底部手势条。键盘顶起时看 MediaQuery.viewInsetsOf 的 bottom，这段高度不属于 SafeArea 使用的那一圈边距。Scaffold 的 resizeToAvoidBottomInset 默认是 true，会把正文缩短到键盘上方，避免输入区域被盖住。

### 类比
visual: compare
left: 屏幕遮挡
right: 两种让法
caption: 边框和抽屉
points: 刘海咬掉一角 | 手势条占住底边 | 安全区躲开装饰 | 键盘另算垫起高度

左边卡片是屏幕遮挡，两行写着刘海咬掉一角、手势条占住底边。右边卡片是两种让法，两行写着安全区躲开装饰、键盘另算垫起高度。刘海和手势条像固定在屏幕上的边框。键盘像从底下推进来的抽屉，高度会变，所以要用 viewInsets 的 bottom 单独看。

### 机制
visual: phone
caption: 系统遮挡
points: 避开刘海 | 底部手势条 | 键盘高度

手机框里三行写着避开刘海、底部手势条、键盘高度，顶上的标题是系统遮挡。上面两行是 SafeArea 会处理的区域，内容被推进安全范围。键盘高度那一行来自 viewInsetsOf 的 bottom，它会随键盘弹出变大、收起变回零。默认情况下，Scaffold 会用这个底部 inset 去缩短正文。

### 示例
visual: code
caption: 正文躲开键盘
points: 外层读键盘高 | 正文会被缩短 | 安全区包正文

```dart
class SafeForm extends StatelessWidget {
  const SafeForm({super.key});

  @override
  Widget build(BuildContext context) {
    final bottom = MediaQuery.viewInsetsOf(context).bottom;
    return Scaffold(
      resizeToAvoidBottomInset: true,
      body: SafeArea(
        child: Text('键盘高度 $bottom'),
      ),
    );
  }
}
```

代码在返回 Scaffold 之前，用外层的 context 读取 viewInsetsOf 的 bottom，所以这里能看到键盘真正的高度。resizeToAvoidBottomInset 写成 true，和默认值一样，正文区域会被缩短，文字就留在键盘上方。SafeArea 包在 body 里面，只处理刘海和底部手势条。因为正文已经缩短，这里没有再把 bottom 加进额外的内边距，避免底部空两截。

### 你会看到
visual: phone
caption: 键盘上方还有字
points: 躲开刘海 | 躲开手势条 | 显示键盘高度

手机框顶上是键盘上方还有字，框里三行写着躲开刘海、躲开手势条、显示键盘高度。内容没有钻进顶部的刘海，也没有贴死底部的手势条。键盘弹出后，这段文字留在键盘上方，数字是当时的 bottom。键盘收起后，这个数字回到零，正文恢复原来的高度。

### 常见坑
visual: warning
caption: 安全区不管键盘
points: 安全区不管键盘 | 缩短后又垫一次 | 包住整个脚手架

错误卡上写着安全区不管键盘、缩短后又垫一次、包住整个脚手架。SafeArea 看的是刘海和手势条那一圈边距，不会因为键盘弹出就留下键盘那么高的空。resizeToAvoidBottomInset 已经是 true 时，再按 bottom 加一层内边距，底部会空出两份。把 SafeArea 包在整个 Scaffold 外面，顶栏也可能被再往下推一截。

### 收束
visual: path
caption: 下一课看文字
points: 躲开系统遮挡 | 文字本身的样式

路径上两步，先让内容躲开系统遮挡，再去处理文字本身的样式。SafeArea 管刘海和底部手势条，键盘高度看 viewInsetsOf 的 bottom。脚手架的 resizeToAvoidBottomInset 默认是 true，会把正文缩短到键盘上方。下一课是 Text 与 TextStyle，开始看文字怎么写、字号和颜色怎么定，这一课先让输入框躲开刘海和键盘。
