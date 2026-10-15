# Dart

## lesson types-final-const
title: 类型与 final / const

### 定义
visual: concept
caption: 三种写法怎么锁
points: var 推断 | 显式类型 | final 一次 | const 编译期

声明变量时，var 会按右边的值推断类型，你也可以把 int 或 String 直接写在名字前面。final 修饰的变量只能赋值一次，适合保存不再改的结果。const 要求这个值在编译阶段就能确定，它比 final 锁得更早。三种写法可以标在同一个位置，你要分清它还能不能改，以及什么时候彻底改不了。

### 类比
visual: compare
left: 草稿纸
right: 印刷厂
caption: 涂改对开印
points: 边写边推断 | 签字只一次 | 开印前定稿 | 全厂同一版

左边草稿纸还可以涂改。你写 var，编译器看你写下的值来推断类型，你也可以自己把类型写清楚。final 像在这张纸上签字，这一格填完就不能再涂。右边印刷厂在开印前就把版定死，const 就是编译期已经印好的那一版，后面谁来取都是同一份，你也改不了开印之后的内容。

### 机制
visual: compare
left: final
right: const
caption: 两次锁定
points: 运行时赋值 | 名字只写一次 | 编译期确定 | 内外都锁定

左边 final 可以等程序跑起来再赋值，比如读到当前时间再保存，但这个名字只能写一次。右边 const 必须在编译期就知道具体值，字面量和其他 const 才能放进去。final 的列表不能换成另一份，里面的元素却仍然可以增删。const 的集合从外到内都锁定，拿去当默认配置最稳。

### 示例
visual: code
caption: 四种声明并排
points: var 计数 | 显式分数 | final 名字 | const 圆周率

```dart
void main() {
  var count = 1;
  int score = 98;
  final String name = 'Ada';
  const double pi = 3.14159;
  final time = DateTime.now();
  print('$count $score $name $pi');
  print(time);
}
```

count 由右边的整数推断成 int，score 则把类型写在名字前面。name 用 final 锁一次，这个名字不能再换，pi 在编译期就是常量。time 要等运行才知道，所以只能用 final，写成 const 会被编译器拒绝。你跑一遍，就能对上谁是推断出来的，谁是提前印死的，前四个数字每次都相同，只有时间会变。

### 你会看到
visual: phone
caption: 两次打印
points: 计数分数名字 | 圆周率不变 | 时间每次不同

跑起来以后，控制台先打出计数、分数、名字和圆周率，这四个值每次都一样。下一行是当前时间，每次运行都会变。圆周率在所有编译结果里都是同一个数。你可以把不变的那一行和会变的那一行对照着看，两种锁定的差别就具体了。

### 常见坑
visual: warning
caption: 锁住哪一层
points: const 太早 | 列表仍能改 | 类型接不上

把运行时才知道的值写成 const，编译器会直接拒绝，别硬把它收成常量。final 只锁住变量这一格，final 的列表仍然可以添加元素。var 第一次推断成整数之后，再赋一个字符串，类型就会对不上。对象用 final 接住时，对象里面的字段仍可能被改掉，想整份都不许改，要用 const 集合。

### 收束
visual: path
caption: 带着锁定走
points: 分清三种写法 | 问还能改几次 | 进入空安全

这一课先把 var、显式类型、final 和 const 分开，以后看到声明，就先问还能改几次、什么时候锁死。下一课进入空安全，类型默认会不能是空，问号和感叹号都从那里开始。你把锁定的时机带走，下一课才不容易把空值和常量混在一起，这两件事要分开记。

## lesson null-safety
title: 空安全

### 定义
visual: concept
caption: 默认不能为空
points: 默认非空 | 问号可空 | 安全读取 | 断言会抛

类型默认是非空的，写成 String 就表示这里一定有字符串。你在类型后面加一个问号，这个位置才允许是空。读取时，问号点遇到空就停，双问号给你备用值，双问号等号只在还是空的时候写入，late 表示稍后再赋。感叹号用来断言它现在非空，判错的话，运行到那一行会抛错。

### 类比
visual: compare
left: 空盒子
right: 必有货
caption: 空盒和有货
points: 可能没装 | 先看再拿 | 保证有东西 | 打开就能用

左边空盒子可能没装东西，带问号的类型就是这样，你要先看一眼再伸手。问号点是看一眼，没有就停，双问号是顺手换一件备用的。右边必有货的盒子默认就有东西，普通类型可以直接拿来用。你若对空盒子断言里面肯定有，那就是感叹号，实际是空的就会当场摔一下。

### 机制
visual: compare
left: 安全读取
right: 断言非空
caption: 稳取或强取
points: 问号点停住 | 双问号兜底 | 感叹号强取 | 错了会抛错

左边安全读取不跟空值硬碰。问号点在对象为空时直接得到空，双问号再补上默认值，双问号等号只在还是空时才写入。late 适合这个非空值稍后再给，读得太早仍会抛错。右边断言非空用感叹号告诉编译器这里绝对有值，一旦其实是空，程序会在运行时抛错。

### 示例
visual: code
caption: 把空接住
points: 双问号备用 | 问号点停住 | late 后赋值 | 感叹号断言

```dart
String? pick(bool ok) => ok ? '阿花' : null;

void main() {
  String? nickname;
  final shown = nickname ?? '游客';
  final length = nickname?.length;
  nickname ??= '阿花';
  late String city;
  city = '杭州';
  final sure = pick(true)!;
  print('$shown $length $city $nickname $sure');
}
```

shown 用双问号落到游客，因为当时昵称还是空。length 走问号点，空的时候不去读长度，所以结果也是空。双问号等号发现昵称仍是空，才写入阿花，late 的城市在打印前赋成杭州。sure 上的感叹号断言 pick 有值，这次传入 true 才安全，传入 false 就会在运行时抛错。

### 你会看到
visual: phone
caption: 游客和阿花
points: 游客在最前 | 长度是空 | 城市是杭州

控制台会打出游客、null、杭州，然后是两个阿花。null 那个词来自问号点，当时昵称还是空，长度没有被硬读，所以这一步没有抛错。杭州是 late 赋值之后才打出来的，赋值前去读就会失败。两个阿花一个来自双问号等号，一个来自感叹号取回的结果。

### 常见坑
visual: warning
caption: 断言用早了
points: 感叹号抛错 | late 读太早 | 空串不替换

感叹号用在仍可能为空的地方，运行到那一行会抛错，往往离真正的赋值很远。late 在赋值前就读取，也会在第一次读的时候失败。双问号和双问号等号只在左边是空时才用右边，左边若是空字符串，并不会被替换。问号点后面如果还要继续算，整段结果都可能是空。

### 收束
visual: path
caption: 接着看参数
points: 默认非空 | 问号才可空 | 少用感叹号

空值这几件工具先用到这里：问号表示可空，问号点、双问号和双问号等号负责安全读取，late 答应稍后再给。感叹号能用，但判错就会在运行时抛错，能不写就不写。下一课是函数与可选参数，方括号和花括号会决定参数能不能省。

## lesson functions
title: 函数与可选参数

### 定义
visual: concept
caption: 参数可以省略
points: 方括号按位 | 花括号点名 | required 必传

函数里有些参数每次都要给，有些可以省略。可以省略的位置参数放在方括号里，调用时按顺序补，不写就用默认值。命名参数放在花括号里，调用时要写出那个名字，顺序可以换。命名参数如果是非空又没有默认值，必须加上 required，否则编译器不让它省略。

### 类比
visual: compare
left: 套餐顺序
right: 菜单备注
caption: 套餐和备注
points: 按位补上 | 缺了用默认 | 点名才上 | required 必点

左边套餐按顺序上菜，方括号里的可选位置参数也按顺序补，不写就用默认的那一道。你少说一句，后厨仍知道该上哪一盘。右边菜单备注要写清菜名，命名参数必须带上名字，前后顺序可以调换。备注上画了必点，就是 required，非空的命名参数没有它就过不了编译。

### 机制
visual: code
caption: 两种参数列表
points: 方括号可省 | 花括号点名 | required 强制

```dart
String greet(String name, [String title = '同学']) {
  return '$title $name';
}

String book({required String seat, int bags = 0}) {
  return '$seat 行李 $bags';
}
```

方括号里的 title 可以不传，不传就用同学这两个字。花括号里的 seat 标了 required，调用时必须把这个名字写出来，并且传入一个非空字符串。bags 有默认值，省略时按零计算，传了就用你给的件数。看参数列表就能分清，方括号管顺序，花括号管名字。

### 示例
visual: code
caption: 四次调用
points: 默认同学 | 补上老师 | 座位必填 | 行李可换序

```dart
void greet(String name, [String title = '同学']) {
  print('$title $name');
}

void book({required String seat, int bags = 0}) {
  print('$seat 行李 $bags');
}

void main() {
  greet('林夏');
  greet('林夏', '老师');
  book(seat: 'A12');
  book(bags: 2, seat: 'B3');
}
```

greet 第一次只给名字，头衔落到默认的同学。第二次按位置补上老师，它靠顺序对准方括号里的那一格。book 必须写出 seat，行李件数可以省略，省略时就是零。最后一次把 bags 写在前面也行，命名参数靠名字配对，不靠先后，所以顺序换了仍然对得上。

### 你会看到
visual: phone
caption: 四行输出
points: 同学林夏 | 老师林夏 | 行李为零 | 行李两件

控制台会出现四行字。前两行是同学林夏和老师林夏，差别只在有没有把可选位置参数补上。第三行座位是 A12，行李件数是零，因为调用时没写 bags。第四行座位是 B3，行李是两件，名字写在前面也不影响配对，你能看见必填和可省各在哪一行。

### 常见坑
visual: warning
caption: 漏了必填标记
points: 缺 required | 两套不能混 | 默认值要常量

花括号里的非空参数忘了写 required，也没给默认值，编译器会直接拦住。方括号和花括号不能出现在同一份参数列表里，可选位置参数还得放在最后。调用命名参数时漏掉冒号和名字，会被当成位置参数然后报错。默认值要在声明时就能确定，运行才算得出来的结果不能写在那里。

### 收束
visual: path
caption: 接着装数据
points: 方括号按顺序 | 花括号靠名字 | 下一课看集合

参数怎么省略，你已经能分开写了：方括号是可选位置参数，花括号是命名参数，非空又要强制传入时加上 required。调用的时候先看它靠顺序还是靠名字。下一课看集合 List、Set、Map，把一组数据装进合适的结构里，有序、去重和键值各有各的盒子。

## lesson collections
title: 集合 List、Set、Map

### 定义
visual: concept
caption: 有序去重键值
points: List 有序 | Set 去重 | Map 键值 | if 与 for

List 按顺序装元素，同一个值可以重复出现，下标从零开始数。Set 也装一组值，重复放进去会被收掉，只留一份。Map 是键和值，用键去取对应的值，同一个键只保留一条。写这些字面量时可以加上 if 和 for，也可以用扩展运算符把另一份摊进来。

### 类比
visual: compare
left: 排队名单
right: 查号台
caption: 名单和查号台
points: 顺序可重复 | 集合会去重 | 键对应值 | 按键查找

左边排队名单像 List，先来后到都保留，同名的人可以排两次。把名单收成一枚印章，重复的名字只盖一次，那就是 Set。右边查号台像 Map，每个号码对应一个窗口，同一个号码不会登记两遍。if、for 和扩展运算符，是在造这份名单时顺便筛选、循环和拼接。

### 机制
visual: boxes
mode: row
caption: 三个盒子
points: List | Set | Map

三个横排盒子从左到右是 List、Set 和 Map。List 记住顺序，同一个值可以出现很多次，你靠下标从零开始去取。Set 只关心这个值在不在，再放一次仍然只有一份。Map 把键和值绑在一起，你报出键就能拿到对应的值，列表、标签和配置以后都会落到这三格里。

### 示例
visual: code
caption: 边写边筛选
points: 扩展摊开 | if 补水 | for 去重 | 按键取价

```dart
void main() {
  const seeds = ['茶', '茶', '咖啡'];
  final drinks = [...seeds, if (seeds.length > 2) '水'];
  final kinds = {for (final item in drinks) item};
  final prices = {'茶': 12, '咖啡': 18};
  print(drinks);
  print(kinds);
  print(prices['茶']);
}
```

seeds 里茶出现了两次，List 会按原样保留顺序，不会偷偷删掉重复的那一杯。扩展运算符把它们摊进 drinks，if 看到长度大于二，再补上一杯水。for 放进 Set 之后，重复的茶只留第一次出现的那一份。Map 用茶这个键取出价格，打出来的是十二，咖啡那个键则对应十八。

### 你会看到
visual: phone
caption: 茶被收一次
points: 列表有两杯茶 | 集合只留一杯 | 价格是十二

第一行列表里有两个茶、一个咖啡，还有补上的水，顺序和写进去时一样。第二行集合里茶只出现一次，后面跟着咖啡和水。第三行是十二，因为键茶对应这个价格。三行并在一起，重复、去重和按键取值都能看见，这就是三种集合的差别。

### 常见坑
visual: warning
caption: 找错就会摔
points: 下标越界 | 缺键得到空 | 相等性去重

List 的下标如果越出长度，会在运行时抛错，取之前先看元素有多少。Map 里没有的键会得到空，接着把这个空当成非空字符串用，就会摔。Set 靠相等性去掉重复，自定义对象默认只认同一个实例，内容相同的两个新对象仍会同时留下。扩展运算符不能直接摊开一份可空的列表，那份若可能是空，要先判断再摊。

### 收束
visual: path
caption: 收成一个类
points: 有序可重复 | 去重和键值 | 下一课造对象

三种集合先分清：List 有序而且可以重复，Set 把重复收掉，Map 用键去找值。字面量里的 if、for 和扩展运算符，能在创建时就把数据筛选好，再拼到一起。下一课是类、构造函数与命名构造，把这些数据收成一个类型，以后造对象就有固定入口，字段也有了安放的地方。

## lesson classes
title: 类、构造函数与命名构造

### 定义
visual: concept
caption: 对象怎么造
points: 初始化列表 | 命名构造 | factory | const 构造

类把字段和方法放在一起，说明一种东西长什么样。构造函数负责造出对象，初始化列表会在进入函数体之前先把字段填好。命名构造写在类名后面，给同一种对象再开一条入口。factory 可以交出已有的实例，const 构造则要求这些字段在编译期就能确定。

### 类比
visual: compare
left: 图纸
right: 完工的房
caption: 图纸和房子
points: 类写在纸上 | 构造负责开工 | 对象才是房 | 每栋值不同

左边图纸是类，上面写着有哪些字段和方法，图纸本身还不能住人。构造函数像按图纸开工，初始化列表是砌墙前先把尺寸量好。命名构造是同一张图纸上的另一种开工方式，比如拿一段现成文字来换算。右边完工的房子才是对象，factory 有时直接给你一把已有的钥匙，const 构造则是提前盖好的样品房。

### 机制
visual: trees
caption: 三列往右看
points: 字段和方法 | 开工的入口 | 造出的实例
headers: 类 | 构造函数 | 对象

三列从左到右是类、构造函数和对象。类这一列写字段和方法，它是一份说明，自己还不会出现在业务数据里。构造函数这一列负责开工，初始化列表、命名构造、factory 和 const 构造都算入口。对象这一列才是造出来的实例，同一个类可以有很多个，各自带着自己的字段值。

### 示例
visual: code
caption: 四种造法
points: const 主构造 | 初始化列表 | 命名构造 | factory 交回

```dart
class Cup {
  final String name;
  final int ml;
  const Cup(this.name, this.ml);

  Cup.parsed(String raw) : name = raw, ml = raw.length * 10;

  factory Cup.shared() => const Cup('共享', 180);
}

void main() {
  const small = Cup('美式', 180);
  final custom = Cup.parsed('浓');
  final again = Cup.shared();
  print('${small.name} ${custom.ml} ${again.name}');
}
```

Cup 的字段都是 final，所以主构造可以写成 const。parsed 是命名构造，初始化列表在函数体之前就把名字和毫升填好，浓的长度是一，乘十得到十。shared 是 factory，它交出一份编译期就造好的常量杯子，每次要的都是同一份。main 里美式来自主构造，共享来自工厂交回的那一份。

### 你会看到
visual: phone
caption: 美式和共享
points: 美式在前 | 毫升是十 | 共享在后

控制台打出美式、十和共享这三个词。美式是 const 主构造写下的名字，一百八十毫升这次没有出现在输出里。十是 parsed 用初始化列表算出来的毫升，原料只有浓这一个字。共享来自 factory，每次要的都是那份提前造好的常量杯子，字段不能再改。

### 常见坑
visual: warning
caption: 入口用错了
points: const 要 final | 函数体里太晚 | factory 无 this

const 构造要求字段都是 final，而且用 const 去调用时，参数也得是编译期常量。普通 final 字段要在初始化列表或初始化形参里赋值，进了函数体再写就晚了。factory 里面没有 this，也不能写初始化列表，它得自己 return 一个实例。命名构造调用时要带上类名，只写 parsed 会找不到这个入口。

### 收束
visual: path
caption: 能力往下传
points: 类是说明 | 构造负责造 | 下一课看继承

类是图纸，构造函数是开工的入口，对象才是造出来的那一个。初始化列表、命名构造、factory 和 const 构造，是四条常用的开工方式，字段要在进入函数体之前准备好。下一课是继承、mixin 与抽象类，看一份能力怎么传给下一个类型，父类、子类和 mixin 会分成三列。

## lesson inheritance
title: 继承、mixin 与抽象类

### 定义
visual: concept
caption: 三条复用路
points: extends 单继承 | implements 接口 | with 混入 | 抽象不能 new

一个类只能 extends 一个父类，这叫单继承，父类的字段和方法会沿这一条传下来。想遵守一组方法约定，就用 implements 把它当接口，方法体要自己写。mixin 用 with 混进去，用来拼接一段可复用的行为。抽象类不能直接 new，Dart 3 的 interface class 表示别人只能实现、不能继承，这里记住名字即可。

### 类比
visual: compare
left: 家族
right: 工具箱
caption: 家族和工具箱
points: 父类传下去 | 子类只认一个 | mixin 拼能力 | with 接上

左边家族是继承，extends 只能认一个父类，家里的办法沿着这一条传给子类。implements 更像按家规办事，你要自己把约定的方法做出来，不会自动拿走现成的实现。右边工具箱是 mixin，with 把某一件工具接到类上，走路、计数这种横向能力常用它。抽象类像一张还没盖章的家谱，不能直接 new 出具体的一个。

### 机制
visual: trees
caption: 父类子类工具
points: 单继承来源 | extends 接上 | with 混入
headers: 父类 | 子类 | mixin

三列是父类、子类和 mixin。父类这一列只有一个来源，子类用 extends 接上它，不能同时再 extends 另一个类。子类也可以改用 implements，只履行接口，抽象类放在这边时不能直接 new。mixin 用 with 混进来，它是拼上的一段行为，走路这类能力常常从这里来，别把它看成又一条继承线。

### 示例
visual: code
caption: 猫和玩具
points: 抽象父类 | extends 与 with | implements 接口

```dart
abstract class Pet {
  String get name;
}
mixin Walker {
  String walk() => '走路';
}
class Cat extends Pet with Walker {
  @override
  String get name => '米粒';
}
class Toy implements Pet {
  @override
  String get name => '玩具';
}
void main() {
  final cat = Cat();
  print('${cat.name} ${cat.walk()} ${Toy().name}');
}
```

Pet 是抽象类，name 没有方法体，所以不能直接 new，你硬写构造会被编译器拒绝。Cat 用 extends 接上 Pet，再用 with 混入 Walker，于是既有名字也会走路，名字履行父类的约定，走路来自 mixin。Toy 用 implements，只自己实现名字，接口不会把走路一起带来。main 造的是子类和实现类，没有去构造 Pet，打印出来的是米粒、走路和玩具。

### 你会看到
visual: phone
caption: 米粒走路玩具
points: 名字是米粒 | 动作是走路 | 玩具只有名

控制台打出米粒、走路和玩具。米粒是猫实现的名字，走路来自 mixin，这两项打印时挨在一起，因为它们属于同一只猫。玩具是另一个类用接口交出来的名字，它没有走那一步。你不会看到直接造出来的 Pet，因为抽象类没有被实例化，输出里根本没有它。

### 常见坑
visual: warning
caption: 继承写重了
points: 不能继承两个 | mixin 有约束 | 接口无方法体

一个类不能 extends 两个父类，写了第二个会编译失败。mixin 如果在 on 后面写了约束，就只能混进符合那个类型的类，乱接会报错。抽象方法忘了在子类里实现，子类也会变成不能 new 的类型。implements 不会带来现成的方法体，每一条约定都要自己写出来。

### 收束
visual: path
caption: 取值加行为
points: 单继承 | 接口和 mixin | 下一课看枚举

这一课记住，extends 只能单继承，implements 是接口，with 用来混入 mixin，三条路不要并成一条。抽象类不能直接 new，方法约定还没实现完时，子类也造不出来。下一课看枚举与扩展方法，给有限的取值和已有类型补上行为，字段会跟每个值走，取值本身仍然有限。

## lesson enums-extensions
title: 枚举与扩展方法

### 定义
visual: concept
caption: 有限值与外挂
points: 枚举带字段 | 构造填数据 | 扩展加方法 | 不改原类型

枚举用来列举有限的几种取值，每种还可以带字段，由构造函数把数据填进去。你用它避免满代码的魔术字符串，外面也只能拿到声明过的那几个值。extension 给已经存在的类型增加方法，调用时看起来像原类型自带的。扩展不改原来的类，只有导入它的地方才看得见这些新方法。

### 类比
visual: compare
left: 固定菜单
right: 外挂口袋
caption: 菜单和外挂
points: 选项有限 | 每项带字段 | 不改原类型 | 方法挂上去

左边固定菜单是枚举，菜品就那几样，每样还可以标上价格这样的字段。你点菜时只能从菜单里选，不能临时发明一道没写过的。右边外挂口袋是扩展方法，口袋挂在已有类型上，比如给枚举加一句说明。口袋不改衣服本身，没把这个扩展导入进来，新方法就看不见。

### 机制
visual: compare
left: 枚举
right: 扩展
caption: 取值对行为
points: 字段加构造 | 只能取已有 | 给旧类型 | 加新方法

左边枚举的每个值都可以带字段，构造负责把字段填上，外面只能使用已经声明的值。你改价格，就改这个值自己的字段，不用另找一个散落的字符串。右边扩展给已有类型加方法，方法里用 this 指当前这个值。扩展不改原始类的源码，两个扩展若定义了同一个方法，导入时就会撞在一起。

### 示例
visual: code
caption: 边距写在值上
points: 值带字段 | const 构造 | 扩展出说明

```dart
enum Size {
  small(8),
  large(16);

  final int pad;
  const Size(this.pad);
}

extension SizeLabel on Size {
  String get label => '${name} 边距 $pad';
}

void main() {
  const size = Size.large;
  print(size.label);
}
```

Size 有 small 和 large 两个值，const 构造把边距写进字段，这个构造少了 const 就过不了编译。large 的 pad 是十六，small 的是八，两个值各带各的数字。扩展 SizeLabel 给枚举加了 label，里面用名字和边距拼成一句说明。main 只拿枚举值去读这个新方法，不必回头改枚举原来的声明，原声明仍然只负责那几个值。

### 你会看到
visual: phone
caption: 十六的边距
points: 名字是 large | 边距十六 | 句子来自扩展

控制台打出 large、边距和十六，三个部分连成一句。large 是枚举值自己的名字，十六来自它的字段，名字和数字被拼进同一句里。这句话是扩展挂上去的 label，枚举声明里并没有手写这个方法。你若改用 small，边距会变成八，句子的样子还是同一套。

### 常见坑
visual: warning
caption: 扩展会撞名
points: 构造须 const | switch 要穷尽 | 扩展不存字段

枚举的构造必须是 const，字段也要能在编译期确定，漏了 const 会编译失败。Dart 3 里对枚举做 switch，分支要覆盖全部值，漏一个会被编译器拦住，这样能逼你把每种取值都考虑到。两个扩展若给同一类型定义了同名方法，一起导入时编译器不知道该用哪一个。扩展不能给类型添加实例字段，它只能加方法、getter 这一类成员。

### 收束
visual: path
caption: 类型先留空
points: 枚举带数据 | 扩展加行为 | 下一课看泛型

枚举可以带字段，每个值自己拿着数据，外面只能从这有限的几项里选，不能临时加一项。扩展方法挂到已有类型上，不改原来的源码，导入了才用得上。下一课进入泛型，用一个写法装下不同的具体类型，槽位先留着，等使用时再填上材料。

## lesson generics
title: 泛型

### 定义
visual: concept
caption: 类型做成参数
points: List<String> | Cache<T> | 使用时再填

泛型是把类型留成参数，等使用的时候再填上具体类型。List<String> 表示这份列表里应该都是字符串，塞进别的类型会被编译器拦住。你也可以自己写 class Cache<T>，T 先不规定到底装什么。类型参数把检查提前到编译期，后面就少做运行时的硬转换。

### 类比
visual: compare
left: 通用模具
right: 指定材料
caption: 模具和材料
points: 槽位叫做 T | 类里先不填 | 使用时写上 | 列表跟着定

左边通用模具是带类型参数的类，Cache 的 T 就是模具上的槽位，写类的时候先不规定材料。模具只做一次，以后换材料不用另开一条生产线。右边指定材料发生在使用的地方，你把 String 填进槽位，这个缓存就只收字符串。List<String> 也是同一件事，列表这只模具被指定成装字符串。

### 机制
visual: concept
caption: 三行泛型
points: List<String> | Cache<T> | 使用时再填

这一屏有三行，先看 List<String>，尖括号把元素限定成字符串。再看 Cache<T>，类在定义时留下这个槽位，类的内部先用 T 代替具体类型。最后是使用时再填，调用的地方写成 Cache<String>，缓存就只收字符串。三行合起来，就是把装错类型这件事拦在编译之前，运行期少做硬转换。

### 示例
visual: code
caption: 缓存只装字符串
points: 类留下 T | 填成 String | 读出可空 | 列表也标明

```dart
class Cache<T> {
  final List<T> items = [];

  void put(T value) {
    items.add(value);
  }

  T? read() => items.isEmpty ? null : items.last;
}

void main() {
  final names = Cache<String>();
  names.put('林夏');
  final List<String> copy = [...names.items];
  print('${names.read()} ${copy.length}');
}
```

Cache 在类名上声明 T，put 只接受这个 T，你换成另一种类型就放不进去。main 把 T 填成 String，再放进林夏，要是改放整数就会被编译器拦住。read 在还没有元素时返回空，所以返回类型带问号，调用的人要准备好遇到空。copy 写成 List<String>，扩展运算符把缓存里的字符串摊到一份新列表。

### 你会看到
visual: phone
caption: 林夏和一
points: 读出林夏 | 长度是一 | 整数放不进

控制台打出林夏和一。林夏是缓存读到的最后一项，一是复制出来的列表长度，说明只放进了一个字符串。如果你试图 put 一个整数，这一行会在编译时失败，程序不会跑起来。屏幕上不会出现执行到一半才发现装错类型的情况。

### 常见坑
visual: warning
caption: 空列表太宽
points: 推断成 dynamic | 不能直接 new T | 问号是另一种

空列表如果写成 var items 再赋一个中括号，类型常常变成 dynamic，后面什么都能塞。类型参数不能像普通类那样直接拿来构造，T 后面加括号造对象是不行的。Cache 的 T 和带问号的 T 是两种槽位，只有后者允许把空放进去。把 List<String> 看成更宽的列表再塞进别的类型，运行时仍可能抛错。

### 收束
visual: path
caption: 等一个结果
points: 列表标明类型 | 类留下 T | 下一课等结果

List<String> 这种写法，是在使用时把元素类型填上，列表里就只该出现字符串。class Cache<T> 则把 T 留在类上，等调用时再决定装什么，两种都是把类型当成参数来传。下一课看 Future 与 async / await，接一个稍后再来的结果或错误，用 await 去等它完成，别写空转循环把界面卡住。

## lesson futures
title: Future 与 async / await

### 定义
visual: concept
caption: 稍后的结果
points: 一个结果或错误 | async 才能等 | await 暂停函数 | 别写忙等

Future 表示稍后才会到来的一个结果，也可能是一个错误，它只会完成一次。函数标上 async，里面就可以用 await 停在这一处，等那个 Future 完成再往下写。await 暂停的是这个函数，界面的事件循环还能继续处理绘制和点击。不要写忙等循环去反复查看有没有完成，那样会把界面卡住。

### 类比
visual: compare
left: 取餐号
right: 窗口干等
caption: 取餐号和干等
points: 先给一个号 | 稍后再来取 | 人站着不走 | 后面全部堵住

左边取餐号像 Future，柜台先给你一个号，菜好了再来取，期间你可以做别的事。await 就是听到叫号再继续后面的句子，async 表示这个函数里允许这样等。取餐可能成功，也可能告诉你卖完了，那就是 Future 里的错误。右边窗口干等像忙等循环，你占着队伍不走，后面的界面刷新都被堵住。

### 机制
visual: future
mode: cycle
caption: 三态轮流亮
points: 等待 | 成功 | 失败

画面会在等待、成功、失败之间轮流亮起来。等待的时候，Future 还在路上，你还没有可以拿去画界面的数据。成功的时候，await 已经拿到值，这时再去更新界面。失败的时候等来的是错误，要单独处理，别用空转循环去盯这三态，那会把界面卡住。

### 示例
visual: code
caption: 停一下再打印
points: 函数标 async | await 停住 | 返回字符串

```dart
Future<String> loadName() async {
  await Future<void>.delayed(const Duration(milliseconds: 10));
  return '林夏';
}

Future<void> main() async {
  final name = await loadName();
  print(name);
}
```

loadName 返回一个 Future，里面先等待很短的时间，再把林夏这个结果交出来。main 也标了 async，await 会停在这一行，直到字符串到来才继续，暂停的只是这个函数本身。到来之后才打印名字。等待的那一小段里没有用循环空转，事件循环仍然可以去处理别的事。

### 你会看到
visual: phone
caption: 晚一点的林夏
points: 稍晚才出现 | 打出的是林夏 | 失败就没有名字

运行后控制台会打出林夏，但会比同步代码稍晚一点。这段空白就是等待，程序并没有卡死在一个空转循环里，界面仍能响应。如果把返回改成抛错，你就看不到名字，而会走到失败。成功和失败都是同一次等待的结局，不会同时出现。

### 常见坑
visual: warning
caption: 干等会卡住
points: 忙等卡住界面 | 忘了 await | await 要有 async

在界面里用循环反复检查 Future 有没有完成，这个 isolate 会被占住，画面就停住了。忘了写 await，你打印出来的是一个 Future 对象，字符串还包在里面。async 函数里抛出的错误，会变成这个 Future 的失败，调用方不接就会漏掉。await 只能写在 async 函数里，普通函数里写它会编译失败。

### 收束
visual: path
caption: 换成一串事件
points: 一次结果 | 用 await 去等 | 下一课看流

一个 Future 只代表稍后的一个结果或一个错误，你用 async 和 await 去等它就好。等待的时候把执行权让出来，不要写忙等循环把界面卡住。下一课是 Stream 入门，事件会一份接一份地连续到来，到了那里就要改成连续接收，一次结果接不住后面的事件。

## lesson streams
title: Stream 入门

### 定义
visual: concept
caption: 连续的事件
points: 一串事件 | listen 回调 | await for | 用完可取消

Stream 是一串异步事件，不像 Future 那样只交付一次，结束之前都可能再来一项。事件会陆续到来，也可能在某一刻出错，或者告诉你已经结束。你可以用 listen 注册回调，每来一项就处理一次。也可以在 async 函数里写 await for，按顺序把每一项取出来，不再需要时记得取消订阅。

### 类比
visual: compare
left: 一次快递
right: 连续广播
caption: 快递和广播
points: 一个包裹 | 送到就结束 | 一段段播出 | 可以一直听

左边一次快递像 Future，包裹送到就结束，你只签收一次。签完这一单，就不会再有下一包跟着同一张单子来。右边连续广播像 Stream，节目一段段往外播，你要么一直听，要么主动关掉。listen 像把收音机打开，await for 像坐下来按顺序收听，这一段处理完再等下一段。

### 机制
visual: timeline
caption: 两条时间轴
points: 一个结果就停 | 事件反复出现
headers: 一次 Future | 连续 Stream

上面一条时间轴是一次 Future，它走到成功或失败就停，轴上只有一个结果。下面一条是连续 Stream，事件会在轴上反复出现，结束之前都可能再来一项。你可以用 listen 注册回调，每来一项就进一次回调。也可以在 async 函数里用 await for，处理完这一项再等下一项。

### 示例
visual: code
caption: 逐个交出数字
points: async 星号 | yield 送出 | await for 接收

```dart
Stream<int> ticks() async* {
  for (var i = 1; i <= 2; i++) {
    await Future<void>.delayed(const Duration(milliseconds: 1));
    yield i;
  }
}

Future<void> main() async {
  await for (final n in ticks()) {
    print(n);
  }
}
```

ticks 是一个 Stream，async 星号配上 yield，把一和二先后送出来。每送出一个数字之前，都会先等待极短的时间，这一等不会把界面占死。main 用 await for 挨个取出，打印完第一项才等下一项。若改成 listen，则是注册回调，每来一个数字就进一次回调，两种听法不要混用。

### 你会看到
visual: phone
caption: 先后出现一二
points: 先打出一 | 再打出二 | 中间有间隔

控制台会先打出一，再打出二，中间有极短的间隔。这是连续的两次事件，Future 那种只交付一次的结果接不住后面的数字。如果在第一项之后就取消订阅，二可能就不会再被处理。你能感到这些数字在排队，每一份都要单独接住，不能并成一次拿完。

### 常见坑
visual: warning
caption: 第二次再听
points: 普通流只能听一次 | await for 要 async | 错误要接住

一个普通 Stream 只能 listen 一次，第二次再听会抛错，多个听众需要广播流。用 await 直接等整个 Stream，类型对不上，也拿不到里面的每一项。await for 要写在 async 函数里，普通函数里写它会编译失败。listen 的回调里如果忘了处理错误，失败会变成没人接住的异常，页面离开时也要记得取消。

### 收束
visual: path
caption: 失败怎么接
points: 一串事件 | listen 或 await for | 下一课看异常

Stream 是一串异步事件，可以 listen，也可以在 async 函数里用 await for，一项一项往下处理。它会连续交付很多次，和只完成一次的 Future 要分开记，别用等一次的写法去接后面的事件。下一课看异常处理，把预料之中的失败和程序错误分开接住，失败和程序错误留到那一课再拆。

## lesson exceptions
title: 异常处理

### 定义
visual: concept
caption: 失败与程序错
points: try 包住 | on 与 catch | finally 收尾 | Exception 与 Error

try 后面放可能失败的代码，catch 用来接住抛出的对象，on 可以只接某一种类型。finally 无论成功还是失败都会走到，适合做收尾。Exception 表示可预期的失败，比如格式不对，业务里应该处理。Error 表示程序错误，比如断言失败或类型用错，更应该回去改代码。

### 类比
visual: compare
left: 绕路牌
right: 路塌了
caption: 绕路和塌方
points: 事先知道 | 可以换条路 | 不该发生 | 该回去改

左边绕路牌像 Exception，你知道这里可能过不去，准备好另一条路就行。格式错误、找不到数据，都属于这种可预期的失败。右边路塌了像 Error，那是程序不该走到的状态，接住之后继续硬开，问题还在原地。finally 像无论是否绕路，离开前都要关上的那扇门。

### 机制
visual: flow
caption: 四步往下
points: throw 交出去 | on 或 catch | 提示或默认 | finally 收尾
headers: 抛出 | 接住 | 处理 | 继续

抛出这一步用 throw，把 Exception 或 Error 交出去，业务上过不去的失败请选 Exception。接住这一步写 on 或 catch，on 只接你点名的类型，catch 能拿到错误对象。处理这一步由你决定，可以提示用户，也可以换成一个默认值。继续这一步是 finally，收尾做完，后面的代码才接着走，四步的顺序不要跳。

### 示例
visual: code
caption: 二十解析失败
points: try 里解析 | on 接格式错误 | finally 印结束

```dart
void main() {
  try {
    final age = int.parse('二十');
    print(age);
  } on FormatException catch (error) {
    print(error.message);
  } finally {
    print('结束');
  }
}
```

int.parse 遇到二十，会抛出格式异常，这是可预期的失败，属于 Exception 这一类。on 只接 FormatException，别的类型仍会继续往外走，不会被这个分支误接住。catch 拿到错误对象，这里打印它的说明，年龄那个数字不会被打出来。finally 不管解析有没有成功，都会再打印结束，结束两个字一定会出现。

### 你会看到
visual: phone
caption: 说明然后结束
points: 没有年龄数字 | 一行错误说明 | 最后是结束

控制台不会打出年龄数字，因为二十没能解析成整数。你会先看到一行格式错误的说明，那是 catch 打出来的，里面说的是格式不对。接着看到结束两个字，它来自 finally，所以排在处理之后。如果字符串本身就是数字，就会先打出年龄，再打出结束。

### 常见坑
visual: warning
caption: 别把错误吞掉
points: 空 catch 吞 Error | on 写窄了 | finally 再抛

用空的 catch 把所有东西吞掉，Error 也会被藏住，后面的程序错误就更难查。on 的类型写得太窄，实际抛出的是别的类型，异常会从这段代码漏出去。finally 里再抛一个新错误，原来正在传递的那个错误可能被盖住。正常的空数据用 if 判断就够了，不必为了分支去抛异常。

### 收束
visual: path
caption: 拆开再导入
points: 抛出再接住 | 分清两种失败 | 下一课看导入

try、catch、on 和 finally 是一套连续的动作：先抛出来，再按类型接住，处理完，最后做收尾。Exception 是可预期的失败，Error 是程序错误，后者更该回到代码里修，别用空的 catch 把它们藏起来。下一课是库与导入，把代码拆到文件里再引进来，拆开的文件以后靠导入再见面。

## lesson libraries
title: 库与导入

### 定义
visual: concept
caption: 把库引进来
points: package 路径 | 相对路径 | show 与 hide | as 前缀

一个 Dart 文件通常就是一个库，别的文件用 import 把它引进来。package 冒号指向包里的公开文件，相对路径指向你旁边的文件，dart 冒号则是 SDK 自带的库。show 只露出列出的名字，hide 把某些名字藏起来，as 给这次导入加一个前缀。前缀加上之后，使用时要先写前缀，再点出里面的名字。

### 类比
visual: compare
left: 整架书
right: 只抽几本
caption: 整架和抽书
points: 一次引进 | 路径分几种 | show 和 hide | as 加前缀

左边整架书像一次把库导入进来。package 路径指向包里的公开文件，相对路径指向你自己的邻文件。右边只抽几本，show 点名要哪几个，hide 把容易撞名的留在架上。as 给这架书加一个前缀，拿的时候先说前缀再点名字，两个库里的同名类就不会搅在一起。

### 机制
visual: flow
caption: 四步导入
points: 库就在文件里 | 写出路径 | as 起短名 | 点名来用
headers: 文件 | import | 前缀 | 使用

文件这一步，一个 Dart 文件通常就是一个库，类和函数写在里面。import 这一步写出路径，package 冒号指向包，相对路径指向旁边的文件，还可以加 show 或 hide。前缀这一步用 as 起一个短名字，避免和当前文件里的名字撞上。使用这一步，加了前缀就写前缀再点名字，没加前缀就直接用原来的名字。

### 示例
visual: code
caption: 前缀与路径
points: package 加前缀 | hide 藏起 Point | 相对路径 show

```dart
import 'package:flutter/foundation.dart' as foundation show kDebugMode;
import 'dart:math' as math hide Point;
import 'src/tea.dart' show Tea;

void main() {
  final drink = Tea('龙井');
  final root = math.sqrt(9);
  print('${drink.name} $root ${foundation.kDebugMode}');
}
```

第一行用 package 路径引进 foundation，as 加上前缀，show 只露出 kDebugMode 这一个名字。第二行是 SDK 自带的 dart 冒号库，hide 把 Point 藏起来，sqrt 仍然留着，调用时要先写 math 这个前缀。第三行用相对路径只引进 Tea，所以下面可以直接写 Tea，不用再加点号。调试运行时 kDebugMode 是 true，发布时它会变成 false，这三行刚好是三种路径。

### 你会看到
visual: phone
caption: 名字从哪来
points: 龙井来自相对路径 | 根号是三点零 | 调试标记是 true

src/tea.dart 里若有一个带名字的 Tea，调试运行会打出龙井、三点零和 true 三个部分。三点零来自 math.sqrt，true 是调试模式下的 kDebugMode，换成发布模式就会变成 false。foundation 和 math 都要带前缀才能点出名字，Tea 没有前缀。相对路径少写一层时，红线会画在 import 那一行，程序还没开始跑，你可以对着这三样对号入座。

### 常见坑
visual: warning
caption: 路径和裸名字
points: 相对路径写错 | show 漏了名字 | 有前缀仍裸用

相对路径写错一层目录，编译器会说找不到这个库，问题标在引号里的路径上。show 把要用的名字漏了，下面一用就会报未定义。as 前缀加了之后仍写原来的裸名字，也会失败，要带着前缀点出来。你还会看到 part 和 part of，那是把一个库拆成几段的写法，入门先用普通 import 来组织文件。

### 收束
visual: path
caption: 走到界面上
points: 路径引进来 | 前缀点名字 | 下一课看组件

import 可以用 package 路径或相对路径，SDK 自带的库则写成 dart 冒号，三种路径不要写混。show、hide 和 as 前缀用来控制这次到底引进哪些名字、叫什么，名字撞上时先加前缀隔开。下一课进入一切皆 Widget，从语言走到界面，看屏幕上的东西怎么都变成组件，语言部分到这里先告一段落。
