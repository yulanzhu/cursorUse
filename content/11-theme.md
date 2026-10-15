# 主题、资源、国际化

## lesson theme-data
title: ThemeData 与 ColorScheme

### 定义
visual: concept
caption: 种子色铺开方案
points: 种子色 | 颜色方案 | 文字样式

画面上三行逐条出现，是种子色、颜色方案、文字样式。ThemeData 把颜色和文字收成一套主题，ColorScheme.fromSeed 用一颗种子色生成整套颜色方案。组件通过 Theme.of 传入 context，读取 colorScheme 和 textTheme，按钮和标题就不必各自写死色值。种子色一换，用到主色和标题样式的地方会一起换。

### 类比
visual: compare
left: 调色盘
right: 主题数据
caption: 一颗色铺开
points: 先挑一颗主色 | 其余颜色跟着配 | 种子色生成方案 | 文字样式一起给

左边卡片是调色盘，两行写着先挑一颗主色、其余颜色跟着配。右边卡片是主题数据，两行写着种子色生成方案、文字样式一起给。先定一颗主色，旁边的颜色按它来配，主题里也由种子色铺开整套方案。文字样式和颜色放在同一份 ThemeData 里，标题不用另起一套。

### 机制
visual: theme
caption: 一排浅色色块
points: 种子色 | 颜色方案 | 文字样式

画面上方一排四块浅色，从左到右是浅米、青绿、橙色、近黑。下面三行写着种子色、颜色方案、文字样式。青绿可以看成种子色生成出来的主色，浅米和近黑更接近表面和文字，橙色用来做强调。颜色方案负责这一排里的颜色，文字主题负责标题和正文的字号层级。

### 示例
visual: code
caption: 生成并读取主题
points: 种子色生成方案 | 读取文字主题 | 标题用主色

```dart
MaterialApp(
  theme: ThemeData(
    colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF1F7A6D)),
  ),
  home: Builder(
    builder: (context) {
      final theme = Theme.of(context);
      return Text(
        '标题',
        style: theme.textTheme.titleMedium?.copyWith(
          color: theme.colorScheme.primary,
        ),
      );
    },
  ),
)
```

画面上的代码分成内外两层，上面生成主题，下面读取主题。外层 MaterialApp 的 theme 用 ColorScheme.fromSeed，把这颗青绿收成一份 ThemeData，作为整棵应用的主题。里层用 Theme.of 传入 context，标题样式取文字主题里的中等标题，颜色取颜色方案里的主色。以后只改那颗种子色，这行标题的主色仍然从颜色方案里来，组件代码保持不动。

### 你会看到
visual: phone
caption: 标题跟着主色
points: 读到主色 | 标题字号 | 种子色决定

手机框顶上写着标题跟着主色，框里三行是读到主色、标题字号、种子色决定。跑起来以后，标题颜色来自 colorScheme 的主色，字号来自 textTheme 的中等标题。换掉 fromSeed 的种子色，框里这行字的颜色会变，文本组件不用逐个改色值。这三行提示的就是颜色、字号和种子色的来源。

### 常见坑
visual: warning
caption: 颜色写死在组件
points: 各自写死颜色 | 跳过颜色方案 | 文字样式各写各的

错误卡上三行是各自写死颜色、跳过颜色方案、文字样式各写各的。按钮上直接写死一个色值，换种子色时它不会跟着 ThemeData 变。跳过 colorScheme 之后，主色、表面色和文字色就各走各的，深浅也难一起换。标题如果不用 textTheme，字号层级会散落在每个文本里。

### 收束
visual: path
caption: 接着看明暗
points: 先收成一套 | 再分亮和暗

路径上两步，先收成一套，再分亮和暗，颜色和文字先收好，亮色和暗色再分开。ThemeData 配上 ColorScheme.fromSeed，组件只从 Theme.of 取颜色方案和文字主题。画面上那排浅色色块，从浅米排到近黑，就是一套方案铺开后的样子。下一课是明暗模式，会同时准备亮色和暗色两套主题。

## lesson dark-mode
title: 明暗模式

### 定义
visual: concept
caption: 两套主题一个开关
points: 亮色一套 | 暗色一套 | 模式来切换

画面标题下面三行逐条出现，是亮色一套、暗色一套、模式来切换。MaterialApp 要同时给出 theme 和 darkTheme，两套都可以用同一颗种子色，暗色那套把亮度设成暗。themeMode 决定用哪一套，可取 ThemeMode.system、ThemeMode.light 或 ThemeMode.dark。跟随系统时用系统那一项，固定浅色或固定深色时，界面就停在其中一种。

### 类比
visual: compare
left: 两套窗帘
right: 两种主题
caption: 窗帘和主题
points: 白天拉开浅帘 | 夜里换成深帘 | 系统决定哪一套 | 也可以手动固定

左边卡片是两套窗帘，两行写着白天拉开浅帘、夜里换成深帘。右边卡片是两种主题，两行写着系统决定哪一套、也可以手动固定。窗帘随时有浅有深，不会临时现染一块布。主题也一样，亮色和暗色事先都备好，模式只负责挑选现在用哪一套。

### 机制
visual: theme
mode: dark
caption: 一排暗色色块
points: 跟随系统 | 固定浅色 | 固定深色

这一排色块是暗色，从左到右是近黑、橙色、薄荷绿、浅米。下面三行写着跟随系统、固定浅色、固定深色，对应 ThemeMode 的三种取值。近黑更像暗色表面，浅米更像暗色上的文字，橙色和薄荷绿是点缀。暗色方案来自 darkTheme，系统切到深色时就会用上这一排。

### 示例
visual: code
caption: 同时给出两套
points: 亮色用种子 | 暗色改亮度 | 模式跟随系统

```dart
MaterialApp(
  theme: ThemeData(
    colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF1F7A6D)),
  ),
  darkTheme: ThemeData(
    colorScheme: ColorScheme.fromSeed(
      seedColor: const Color(0xFF1F7A6D),
      brightness: Brightness.dark,
    ),
  ),
  themeMode: ThemeMode.system,
)
```

画面上的代码把亮色主题 theme 和暗色主题 darkTheme 写在一起，种子色都是那颗青绿。暗色那一份 ColorScheme.fromSeed 在生成颜色方案时把亮度设成 Brightness.dark，所以表面会靠近近黑。模式 themeMode 这一项现在跟随系统，写成 ThemeMode.system，系统是深色就用下面那套，是浅色就用上面那套。想固定住，就把模式改成 ThemeMode.light 或 ThemeMode.dark，不再跟着系统变。

### 你会看到
visual: phone
caption: 界面换成深色
points: 近黑表面 | 浅色文字 | 主色仍在

手机框顶上写着界面换成深色，框里三行是近黑表面、浅色文字、主色仍在。系统处于深色时，表面靠近近黑，文字改成浅色，主色仍从同一颗种子色来。把 themeMode 固定成 light，画面会回到上一课那排浅色。组件只要读 colorScheme，就不用自己判断现在是哪一种模式。

### 常见坑
visual: warning
caption: 暗色没带上种子
points: 只给了亮色 | 模式和主题不配套 | 组件里又写死色

错误卡上三行是只给了亮色、模式和主题不配套、组件里又写死色。只写 theme、不写 darkTheme 时，深色模式用的是框架自带的暗色，你的种子色进不去。themeMode 设成 dark，暗色却没有自己的 ColorScheme，品牌色也会丢。组件里若还写死浅色背景，暗色主题盖不住那一块。

### 收束
visual: path
caption: 接着看字体
points: 两套都备好 | 再换字体图标

路径上两步，先把亮色和暗色两套都备好，再换字体图标。两套主题共用同一颗种子色，暗色把亮度设成暗，模式在系统、浅色、深色之间选。画面上那排暗色色块，从近黑排到浅米，就是深色方案摊开的样子。下一课是自定义字体与图标。

## lesson fonts-icons
title: 自定义字体与图标

### 定义
visual: concept
caption: 字体和图标从哪来
points: 字体写进清单 | 家族名要对上 | 图标用码点

画面标题下面三行逐条出现，是字体写进清单、家族名要对上、图标用码点。自定义字体写在 pubspec 的 flutter/fonts 下面，家族名要和文字样式里的字体家族一致。字重也写在这份清单里，样式里的粗细才能对上对应的字体文件。图标字体同样登记成一个家族，再用图标数据写上码点和字体家族。

### 类比
visual: compare
left: 字库
right: 界面取用
caption: 字库和取用
points: 字先登记进库 | 名字就是取件号 | 家族名对上字体 | 码点取出图标

左边卡片是字库，两行写着字先登记进库、名字就是取件号。右边卡片是界面取用，两行写着家族名对上字体、码点取出图标。字没有登记，界面报出家族名也拿不到字形。图标也是一份字体，码点像字库里的编号，对上家族才能显示那一个图形。

### 机制
visual: phone
caption: 品牌字和图标
points: 家族名 Brand | 字重七百 | 码点自定义

手机框顶上写着品牌字和图标，框里三行是家族名 Brand、字重七百、码点自定义。Brand 这个家族名要写进 flutter/fonts，七百字重对应清单里的 weight。图标另有一个家族，IconData 用码点从那份字体里取出图形。这三行都要在清单和代码里对得上，缺一处就会落到默认字体或空白图标。

### 示例
visual: code
caption: 家族名和码点
points: 家族名 Brand | 字重七百 | 图标码点

```dart
const brand = TextStyle(fontFamily: 'Brand', fontWeight: FontWeight.w700);
const home = IconData(0xe001, fontFamily: 'AppIcons');
class BrandMark extends StatelessWidget {
  const BrandMark({super.key});
  @override
  Widget build(BuildContext context) {
    return const Row(
      children: [
        Icon(home),
        SizedBox(width: 8),
        Text('品牌', style: brand),
      ],
    );
  }
}
```

画面上两行常量先把字体和图标准备好。品牌样式的字体家族 fontFamily 是 Brand，字重 FontWeight.w700 是七百，要对上 flutter/fonts 清单里的家族名和字重。首页图标 IconData 的码点是十六进制 e001，字体家族 fontFamily 是 AppIcons，也要先登记。横排里图标和品牌两个字挨在一起，用的就是这两份已经登记的字体。

### 你会看到
visual: phone
caption: 品牌字配上图标
points: 品牌两个字 | 左边一个图标 | 字重是粗体

手机框顶上写着品牌字配上图标，框里三行是品牌两个字、左边一个图标、字重是粗体。跑起来后，文字用 Brand 家族，笔画按七百的字重来，图标来自 AppIcons 的那个码点。家族名只要写错一个字母，文字会退回默认字体，图标则变成方框。清单里的文件和这里的名字必须是同一套。

### 常见坑
visual: warning
caption: 名字和清单不一致
points: 家族名对不上 | 字重没有对应文件 | 图标只写了码点

错误卡上三行是家族名对不上、字重没有对应文件、图标只写了码点。pubspec 里的 family 和代码里的 fontFamily 差一个字母，框架就找不到这套字。只要常规文件、样式却写成七百，粗体也出不来。IconData 只写码点、不写 fontFamily，图标字体同样对不上，画面上会留下空框。

### 收束
visual: path
caption: 接着看图片
points: 先登记字体 | 再放图片

路径上两步，先登记字体，再放图片，家族名和字重都写进清单，图标码点也一起登记。文字靠家族名和字重，图标靠码点和同一个清单里的字体家族。手机框里的三行，就是家族名、字重和码点这三件要核对的事。下一课是图片资源与分辨率。

## lesson image-assets
title: 图片资源与分辨率

### 定义
visual: concept
caption: 一张图三档清晰度
points: 放进资源清单 | 准备两档高清 | 按像素比挑选

画面标题下面三行逐条出现，是放进资源清单、准备两档高清、按像素比挑选。图片放进 pubspec 的 flutter/assets，声明里写主图那一条路径。同一张图再准备 2.0x 和 3.0x 两个目录，里面放同名文件。框架按设备像素比挑选最接近的一档，代码里仍然只写主图路径。

### 类比
visual: compare
left: 三种印张
right: 同一条路径
caption: 印张和路径
points: 普通印一张 | 高清另放两档 | 路径只写主图 | 像素比决定用哪张

左边卡片是三种印张，两行写着普通印一张、高清另放两档。右边卡片是同一条路径，两行写着路径只写主图、像素比决定用哪张。柜台只报一个名字，仓库按来人的需求给普通张或高清张。Image.asset 也只写主图，2.0x 和 3.0x 由框架按像素比去拿。

### 机制
visual: phone
caption: 按像素比选图
points: 主图一倍 | 二倍目录 | 三倍目录

手机框顶上写着按像素比选图，框里三行是主图一倍、二倍目录、三倍目录。一倍是 flutter/assets 里声明的那张主图，二倍和三倍放在 2.0x、3.0x 目录，文件名与主图相同。像素比接近三时，框架选用三倍目录里的那一张。逻辑上的宽高不变，变的是用哪一张位图来画。

### 示例
visual: code
caption: 只写主图路径
points: 主图路径 | 宽九十六 | 高九十六

```dart
class Logo extends StatelessWidget {
  const Logo({super.key});
  @override
  Widget build(BuildContext context) {
    return Image.asset('assets/logo.png', width: 96, height: 96);
  }
}
```

画面上的路径只有 assets/logo.png，宽和高都是九十六。这里没有写 2.0x 或 3.0x，倍率目录要放在这张主图旁边，由框架自己选。九十六是逻辑像素，三倍图会画进这一块区域，不会按文件的像素宽度再放大。主图必须在 flutter/assets 里声明过，否则这条路径加载不到。

### 你会看到
visual: phone
caption: 逻辑尺寸不变
points: 标志一块 | 逻辑九十六 | 高清来自三倍

手机框顶上写着逻辑尺寸不变，框里三行是标志一块、逻辑九十六、高清来自三倍。屏幕上的标志占九十六逻辑像素见方，像素比高的设备会自动换上 3.0x 里的同名图。像素比接近二时，换上的是 2.0x 目录。区域大小看起来一样，只是边缘更清楚。

### 常见坑
visual: warning
caption: 路径带上了倍率
points: 路径写成倍率目录 | 漏了资源声明 | 把像素当成逻辑宽

错误卡上三行是路径写成倍率目录、漏了资源声明、把像素当成逻辑宽。把 Image.asset 直接写成 3.0x 里的路径，框架会把它当成另一张图，还可能再缩放一次。主图没有写进 flutter/assets，旁边的倍率目录也不会被这条路径用到。把三倍图的像素宽度填进 width，标志会变得过大。

### 收束
visual: path
caption: 接着看文案
points: 主图加两档 | 再把文案提出去

路径上两步，主图加两档，再把文案提出去，高清目录按像素比挑，逻辑尺寸先不动。代码只写主图路径，二倍和三倍目录按设备像素比挑选，逻辑宽高保持九十六。手机框里的三行，就是这块区域和它的清晰度从哪一档来。下一课是 arb 国际化。

## lesson l10n
title: arb 国际化

### 定义
visual: concept
caption: 文案不写在组件里
points: 文案放在 arb | 命令生成代码 | 界面读取本地化

画面标题下面三行逐条出现，是文案放在 arb、命令生成代码、界面读取本地化。国际化把句子写进 arb 文件，用 flutter gen-l10n 生成 AppLocalizations。界面只读这个生成类，不要把问候和按钮文案写死在组件里。占位也写在 arb 里，生成之后会变成带参数的方法，调用时把名字传进去。

### 类比
visual: compare
left: 一本词典
right: 界面取词
caption: 词典和界面
points: 词条先写好 | 生成时变成代码 | 组件只去取词 | 按钮上不留原文

左边卡片是一本词典，两行写着词条先写好、生成时变成代码。右边卡片是界面取词，两行写着组件只去取词、按钮上不留原文。词典改一句，所有来查的页面都拿到新句子。组件里如果写死原文，换一种语言就要改每一处按钮。

### 机制
visual: compare
left: 写死文案
right: 生成词条
caption: 写死对上词条
points: 句子在组件里 | 换语言要改代码 | 句子在 arb 里 | 界面读本地化

左边一栏是写死文案，两行写着句子在组件里、换语言要改代码。右边一栏是生成词条，两行写着句子在 arb 里、界面读本地化。左边每换一种语言都要打开组件改字。右边改的是词条文件，再跑生成命令，界面继续读生成出来的本地化类。

### 示例
visual: code
caption: 读取生成的问候
points: 取出本地化 | 调用问候 | 传入名字

```dart
class Greeting extends StatelessWidget {
  const Greeting({super.key, required this.name});
  final String name;
  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    return Text(l10n.hello(name));
  }
}
```

画面上的组件没有写死问候句子，只从生成的本地化类 AppLocalizations.of 取出当前语言。问候方法 hello 来自词条文件里的同名词条，名字 name 是那个占位，生成后变成一个方法。应用入口还要挂上本地化代理 localizationsDelegates 和支持的语言列表 supportedLocales，否则这里取到的是空。换语言时改的是词条和生成结果，这个组件不用改字。

### 你会看到
visual: phone
caption: 问候随语言变
points: 问候一句 | 名字嵌进去 | 换语言换句子

手机框顶上写着问候随语言变，框里三行是问候一句、名字嵌进去、换语言换句子。当前语言的 arb 决定这句怎么说，名字按占位嵌进句子。切换支持的语言之后，同一处文本会换成另一份 arb 里的说法。组件树还是这个 Greeting，变的是 AppLocalizations 交出来的字符串。

### 常见坑
visual: warning
caption: 句子还写在按钮上
points: 文案写死在组件 | 忘了挂上代理 | 占位和调用不一致

错误卡上三行是文案写死在组件、忘了挂上代理、占位和调用不一致。按钮上直接写确定两个字，gen-l10n 不会替你翻译它。MaterialApp 没有挂上 AppLocalizations 的代理和支持语言，of 会得到空，后面的调用就失败。arb 里的占位叫 name，调用时却少传或多传，生成的方法也对不上。

### 收束
visual: path
caption: 接着看方向
points: 文案先提出去 | 再看排布方向

路径上两步写着文案先提出去、再看排布方向，先把文案放进词条文件并生成本地化代码，语言换了再看排布往哪边走。界面只读生成出来的本地化类，句子和占位都留在词条文件里。手机框里的问候会随语言更换，组件本身不保存原文。下一课是布局方向。

## lesson directionality
title: 布局方向

### 定义
visual: concept
caption: 起始边会跟着翻
points: 方向包住子树 | 对齐用起始边 | 边距也用起始边

画面标题下面三行逐条出现，是方向包住子树、对齐用起始边、边距也用起始边。方向组件 Directionality 把 TextDirection.rtl 交给子树，从右到左的语言就从右边起排。对齐用 AlignmentDirectional，边距用 EdgeInsetsDirectional，起始边会跟着翻过去。同一套起始边，从左到右时在左边，从右到左时就到了右边。

### 类比
visual: compare
left: 从左装订
right: 从右装订
caption: 左右两种起笔
points: 起始边留在左 | 边距贴着左边 | 起始边改到右 | 同一数字翻过去

左边卡片是从左装订，两行写着起始边留在左、边距贴着左边。右边卡片是从右装订，两行写着起始边改到右、同一数字翻过去。书可以从左边打开，也可以从右边打开，页边距仍然留在起笔的那一侧。布局用起始边，就不用为从右到左的语言再写一套左边距。

### 机制
visual: compare
left: 从左到右
right: 从右到左
caption: 两栏方向相反
points: 对齐靠左 | 边距在左 | 对齐靠右 | 边距在右

左边一栏是从左到右，两行写着对齐靠左、边距在左。右边一栏是从右到左，两行写着对齐靠右、边距在右。两栏用的是同一套起始对齐和起始边距，方向不同，结果就翻过来。从右到左时文字靠向右边，十六的边距也留在右边，左边那一栏则是默认从左到右时的样子。

### 示例
visual: code
caption: 起始边距十六
points: 方向从右到左 | 对齐用起始边 | 边距用起始边

```dart
Directionality(
  textDirection: TextDirection.rtl,
  child: const Align(
    alignment: AlignmentDirectional.centerStart,
    child: Padding(
      padding: EdgeInsetsDirectional.only(start: 16),
      child: Text('开始侧'),
    ),
  ),
)
```

画面上的 Directionality 把文字方向设成 TextDirection.rtl，也就是从右到左。对齐用的是 AlignmentDirectional.centerStart，内边距用 EdgeInsetsDirectional 的 start，数值是十六。方向翻到从右到左以后，起始边到了右边，这十六的边距也留在右边。文字会贴着右侧，左侧则空出一截明显的空白，起始边已经跟着翻过去了。

### 你会看到
visual: phone
caption: 文字靠向右边
points: 方向从右起 | 文字贴右 | 左侧留白

手机框顶上写着文字靠向右边，框里三行是方向从右起、文字贴右、左侧留白。因为方向是从右到左，开始侧三个字靠右，右边还有十六的起始边距。改回从左到右时，同一段代码会把文字和边距一起翻到左边。手机框里的三行，描述的就是现在这种从右起的结果。

### 常见坑
visual: warning
caption: 左边被写死了
points: 用了绝对的左侧 | 边距写死 left | 方向包在外面才生效

错误卡上三行是用了绝对的左侧、边距写死 left、方向包在外面才生效。靠左对齐和只写左边的边距都钉在左边，换成从右到左也不会翻。起始边要对齐和边距都生效，得用会跟着方向走的那两种写法。方向组件包在更外层，里面的起始边才知道该往哪边算。

### 收束
visual: path
caption: 进入动画
points: 方向先翻对 | 再看属性变化

路径上两步，方向先翻对，再看属性变化，对齐和边距都要跟着翻。从右到左时起始边会到右边，对齐和边距都要用会翻转的写法。右边那一栏就是翻过去之后，文字靠右、边距也在右的样子。下一课是隐式动画，看同一位置的属性怎么自己补上。
