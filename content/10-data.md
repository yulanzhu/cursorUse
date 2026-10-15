# 异步、网络与数据

## lesson future-builder
title: FutureBuilder

### 定义
visual: concept
caption: 三行看一次快照
points: 连接状态 | 有没有错误 | 有没有数据

画面上的清单逐条出现，三行是连接状态、有没有错误、有没有数据。FutureBuilder 盯着一份事先放好的 Future，用 snapshot 的 connectionState、hasError 和 hasData 决定画什么。连接还没完成时先画等待，完成后再看有没有错误，有数据才画正文。这份 Future 要写在 initState 里，或放进 State 的字段，构建时不再新建。

### 类比
visual: compare
left: 取一次号
right: 反复下单
caption: 取号和反复下单
points: 号只发一次 | 好了再取餐 | 每次重建再点 | 厨房一直忙

左边卡片是取一次号，两行写着号只发一次、好了再取餐。右边卡片是反复下单，两行写着每次重建再点、厨房一直忙。State 创建时把 Future 领好，界面刷新只是在看这一单好了没有。若把 Future 写进 build，每次重建都会重新请求，厨房就会像右边那样不停做新的。

### 机制
visual: future
mode: cycle
caption: 三态轮流亮起
points: 等待 | 成功 | 失败

三张卡片在等待、成功、失败之间轮流亮起，界面跟着当前这一张画。等待下面写着请求还在路上，这时 connectionState 还没有完成，正文先不要出来。成功下面写着拿到数据后再画，hasData 为真时才把数据显示上去。失败下面写着超时或状态码不对，hasError 为真就要改画错误，不要继续停在等待。

### 示例
visual: code
caption: 字段里只请求一次
points: State 字段 | 完成才往下 | 错误和数据分开

```dart
class _NoteState extends State<NoteView> {
  late final Future<String> _note = loadNote();

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<String>(
      future: _note,
      builder: (context, snapshot) {
        if (snapshot.connectionState != ConnectionState.done) {
          return const Text('等待');
        }
        if (snapshot.hasError) return const Text('失败');
        if (snapshot.hasData) return Text(snapshot.data!);
        return const Text('无数据');
      },
    );
  }
}
```

代码面板里，State 的字段在创建时调用一次 loadNote，build 只把同一个字段交给 FutureBuilder，没有另开请求。先看 connectionState 有没有到达完成，没完成就在屏幕上显示等待。完成后再看 hasError，有错误就单独显示失败。最后用 hasData 取出正文，这一段也可以改成在 initState 里给字段赋值，效果同样是只请求一次。

### 你会看到
visual: phone
caption: 先等后出字
points: 转圈等待 | 成功换成正文 | 失败单独一行

手机框的标题是先等后出字，框里三行写着转圈等待、成功换成正文、失败单独一行。请求还在路上时，屏幕停在第一行的等待，正文还没出现。数据到达以后，中间那行换成笔记里的句子。若这次失败，第三行单独显示失败，不会和正文挤在同一句里。

### 常见坑
visual: warning
caption: 构建里又请求
points: 构建里新建 | 每次都重请求 | 漏看错误

错误卡上三行写着构建里新建、每次都重请求、漏看错误。Future 写在 build 里面，父组件每重建一次，网络请求就再发一次，加载会反复出现。只看有没有数据，失败也会被画成一直等待，hasError 必须单独分支。connectionState、hasError、hasData 要一起看，少看一处就会停在错误的画面上。

### 收束
visual: path
caption: 去看持续推送
points: 看清三态 | 请求留在 State | 接着看流

路径上三步，先看清等待、成功、失败这三态，再把请求留在 State，然后去接连续到来的事件。等待看 connectionState 有没有完成，失败看 hasError，正文看 hasData，三处一起决定这一帧该画成什么样。Future 在 initState 里赋值，或写成 State 的字段，build 只读已经存在的那一份，不再新建。下一课是 StreamBuilder。

## lesson stream-builder
title: StreamBuilder

### 定义
visual: concept
caption: 连续事件接到屏
points: 订阅一条流 | 来一项就重画 | 别在构建里新建

画面上三行是订阅一条流、来一项就重画、别在构建里新建。StreamBuilder 订阅一条 Stream，每来一项就按最新的 snapshot 重画界面，连接常停在 active。它同样看 connectionState、hasError 和 hasData，有数据就可以画当前这一项，不必干等整条流结束。这条 Stream 要放在 initState 或 State 字段里，不要在每次 build 里新开一条。

### 类比
visual: compare
left: 打开的收音机
right: 反复换新台
caption: 一台和反复开机
points: 打开就一直听 | 每段都更新 | 每次重建开机 | 节目被打断

左边卡片是打开的收音机，两行写着打开就一直听、每段都更新。右边卡片是反复换新台，两行写着每次重建开机、节目被打断。Stream 留在 State 里，就像收音机只开一次，后面的节目接着播。build 里每次新做一个 Stream，订阅会被打断再重来，计数和连接都会从头开始。

### 机制
visual: timeline
caption: 两条时间轴
points: 铺满以后停住 | 黄点一直往前
headers: 一次拉取 | 持续推送

上面一条时间轴标着一次拉取，色条铺满以后就停，那是只交付一次的结果。下面一条标着持续推送，黄点沿着轴一直往前走，事件会反复出现。StreamBuilder 看的是下面这条，每来一项就更新 snapshot。上面那种一次拉取接不住后面的事件，两条轴不要用同一种等法。

### 示例
visual: code
caption: 字段里订一次
points: 流放在字段 | 错误先返回 | 有数据再显示

```dart
class _TickState extends State<TickView> {
  final _ticks = Stream<int>.periodic(
    const Duration(seconds: 1),
    (count) => count,
  );

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<int>(
      stream: _ticks,
      builder: (context, snapshot) {
        if (snapshot.hasError) return const Text('失败');
        if (!snapshot.hasData) return const Text('等待');
        return Text('${snapshot.data}');
      },
    );
  }
}
```

代码面板里，周期流写在 State 的字段上，每秒送出一个整数，build 只是把这个字段交给 StreamBuilder。有错误先显示失败，还没有数据就显示等待。一旦 hasData 为真，就画出最新的数字，这时 connectionState 多半是 active，流还没结束。构建函数里没有新的 Stream，所以刷新页面不会把计数打回起点。

### 你会看到
visual: phone
caption: 数字往上跳
points: 先是等待 | 数字逐秒增加 | 失败另起一行

手机框的标题是数字往上跳，框里三行写着先是等待、数字逐秒增加、失败另起一行。订阅刚建立时，屏幕先停在等待。随后每一秒换一个更大的数字，因为流还在持续推送。若这条流发出错误，失败单独占一行，数字不再继续跳。

### 常见坑
visual: warning
caption: 构建里换新流
points: 每次构建新建 | 订阅被重置 | 干等流结束

错误卡上三行写着每次构建新建、订阅被重置、干等流结束。Stream 写在 build 里，父组件每重建一次就换一条新流，旧的订阅被取消。计数、连接和动画都会从头再来，看起来像数据在闪。持续推送时不要拿 connectionState 等于 done 当成功，那表示流已经结束，活着的事件在 active。

### 收束
visual: path
caption: 接着发一次请求
points: 流留在 State | 按项更新画面 | 去发一次请求

路径上三步，先把流留在 State，再按每一项更新画面，然后去发一次真正落到服务器的网络请求。StreamBuilder 和 FutureBuilder 一样，不要在 build 里新建异步来源，否则每次重建都会重新订阅。一次拉取和持续推送是画面上的两条时间轴，接法不要混用。下一课是一次 GET。

## lesson http-get
title: 一次 GET

### 定义
visual: concept
caption: 取回一次响应
points: http 的 get | 先看状态码 | 再解析 JSON

画面上三行是 http 的 get、先看状态码、再解析 JSON。一次 GET 用 package:http 里的 http.get，地址写成 Uri，等响应回来以后先看 statusCode。状态码成功再把 body 交给 jsonDecode，变成可以读取的对象。dio 也能发同样的请求，它额外提供拦截器和取消，入门先把状态码和解析这两步走通，拦截器留到以后再加。

### 类比
visual: compare
left: 跑一趟腿
right: 门卫可取消
caption: 跑腿和门卫
points: 按地址去取 | 对一下回执 | 进出都登记 | 半路可以取消

左边卡片是跑一趟腿，两行写着按地址去取、对一下回执。右边卡片是门卫可取消，两行写着进出都登记、半路可以取消。http.get 加上状态码检查，就是左边这一趟，取回来再核对。右边的登记和半路取消，是 dio 的拦截器和取消，入门不必先搭这套。

### 机制
visual: flow
caption: 四步往下走
points: 提出要笔记 | 组织这一次 | 发出 GET | 解析成对象
headers: 界面 | 仓库 | http.get | JSON

纵向四步的标签是界面、仓库、http.get、JSON，旁边的小字是提出要笔记、组织这一次、发出 GET、解析成对象。界面提出要笔记，仓库把这一次读取组织好。http.get 这一格把 GET 发出去并带回响应，回来以后要先看状态码。JSON 这一格用 jsonDecode 把正文变成对象，界面自己不去碰网络库。

### 示例
visual: code
caption: 状态码后再解析
points: 发出 GET | 核对状态码 | 解析标题

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<String> fetchTitle() async {
  final response = await http.get(
    Uri.parse('https://example.com/note'),
  );
  if (response.statusCode != 200) {
    throw Exception('状态码 ${response.statusCode}');
  }
  final data = jsonDecode(response.body) as Map<String, Object?>;
  return data['title'] as String;
}
```

代码先用 http.get 按 Uri 发出一次 GET，await 等到整份响应回到这个函数。状态码一旦偏离二百就抛出错误，后面不再解析那一段正文。通过之后，jsonDecode 把 body 转成 Map，再从里面取出标题字段。这段适合放在仓库里，界面只等这个字符串回来，dio 的拦截器和取消这里没有展开。

### 你会看到
visual: phone
caption: 标题出现在屏上
points: 请求发出去 | 状态码通过 | 标题被显示

手机框的标题是标题出现在屏上，框里三行写着请求发出去、状态码通过、标题被显示。地址正确且状态码是二百时，屏幕上出现笔记标题。状态码不对时，标题不会出现，错误交给上一层去画。解析失败同样走错误，不会把乱码当成标题。

### 常见坑
visual: warning
caption: 状态码没看
points: 不看状态码 | 错误页拿去解析 | 地址写成字符串

错误卡上三行写着不看状态码、错误页拿去解析、地址写成字符串。服务器返回错误页时，body 可能是网页，直接 jsonDecode 会抛格式错误。http.get 要的是 Uri，把普通字符串塞进去会在编译时就对不上。状态码要先看，解析放在成功之后，dio 也替代不了这次检查。

### 收束
visual: path
caption: 接着写成对象
points: 发 GET | 看状态码 | 再变对象

路径上三步，先把一次 GET 发出去，再核对返回的状态码，然后把正文解析成可以读取的对象。package:http 里的 http.get、statusCode 和 jsonDecode 要按这个顺序连起来，地址先包成 Uri，成功以后才解析。dio 额外提供拦截器和取消，这一课只记这两个能力，不必把用法展开。下一课是 JSON 序列化。

## lesson json
title: JSON 序列化

### 定义
visual: concept
caption: 键要落到字段
points: 手写 fromJson | 键对上字段 | 生成样板代码

画面上三行逐条出现，写着手写 fromJson、键对上字段、生成样板代码。手写 fromJson 就够入门，把 JSON 里的键读进对象的字段，字段类型也由你自己来转换。json_serializable 配合 build_runner，会生成重复的 fromJson 和 toJson。生成解决的是一遍遍抄写的样板代码，键和字段怎么对应，仍和手写时一样。

### 类比
visual: compare
left: 自己抄录
right: 机器誊写
caption: 抄录和机器誊
points: 键对上字段 | 方法自己写 | 按同一张表抄 | 少写重复稿

左边卡片是自己抄录，两行写着键对上字段、方法自己写。右边卡片是机器誊写，两行写着按同一张表抄、少写重复稿。手写 fromJson 是左边，你自己把 title 这类键抄进对应字段。json_serializable 加 build_runner 是右边，它按同一规则生成样板，免得每个类都把同样的方法重写一遍。

### 机制
visual: code
caption: 面板上的转换
points: 读出 title | 交给构造 | 类型自己转

```dart
factory Note.fromJson(Map<String, Object?> json) {
  return Note(title: json['title'] as String);
}
```

代码面板上是手写的 fromJson，它从 Map 里取出 title 这个键，再交给 Note 的构造函数。键名和字段要自己对上，as String 是在做类型转换，对不上就会失败。json_serializable 配合 build_runner 时，生成出来的方法也是做这件事。它省掉的是每个类都写一遍的样板，不会替你决定哪个键该进哪个字段。

### 示例
visual: code
caption: 类里一对方法
points: 字段 title | fromJson 读入 | toJson 写回

```dart
class Note {
  const Note({required this.title});

  final String title;

  factory Note.fromJson(Map<String, Object?> json) {
    return Note(title: json['title'] as String);
  }

  Map<String, Object?> toJson() => {'title': title};
}
```

代码面板是一个完整的 Note，上面只有标题这一个需要读写的字段。fromJson 用工厂从 Map 造出对象，toJson 再把标题放回同一个键。来回都对着同一个标题键，入门阶段这样手写一对方法就已经够用。类多了以后，json_serializable 和 build_runner 会生成这对方法，免得每个类都把同样的样板抄很多遍。

### 你会看到
visual: phone
caption: 标题被读出来
points: 键是 title | 字段装进标题 | 再写回同一个键

手机框的标题是标题被读出来，框里三行写着键是 title、字段装进标题、再写回同一个键。JSON 里的 title 变成笔记上的一行字，屏幕上能直接读到。写回时仍然用这个键，对象和正文对得上。键若写错一个字母，这一行会空，或在转换时直接失败。

### 常见坑
visual: warning
caption: 键和类型对不上
points: 键名写错 | 根是数组 | 生成当魔法

错误卡上三行写着键名写错、根是数组、生成当魔法。键和服务器差一个字母，读出来就会是空，或者在转换时直接抛错。整段 JSON 若是数组，不能直接当成 Map 再去取 title。build_runner 只生成重复样板，键怎么对应仍要你在类上说清楚，生成不会猜服务器的格式。

### 收束
visual: path
caption: 接着画四种状态
points: 手写转换 | 样板可以生成 | 去画四种状态

路径上三步，先把手写的字段转换记熟，再记住样板可以交给工具生成，然后去把请求过程中的几种画面分开画。fromJson 和 toJson 把键和字段对上，入门时手写这一对方法就够用。json_serializable 配合 build_runner，只是少写那些重复的样板代码。下一课是加载、错误与超时。

## lesson async-states
title: 加载、错误与超时

### 定义
visual: concept
caption: 四种画面分开
points: 加载 | 错误 | 空数据 | 成功

界面要把加载、错误、空数据和成功分成四幅来画。加载是请求还没结束，错误是失败或超时，空数据是成功了但内容是空的，成功才画出正文。超时写在 Future 上，调用 timeout 并给一个时限，到点还没完成就走错误。四幅各画各的，不要挤进同一种占位里。

### 类比
visual: compare
left: 门口四种告示
right: 空白当正常
caption: 告示和空白页
points: 四种告示分开贴 | 超时也算失败 | 空白当成没事 | 客人不知道原因

左边卡片是门口四种告示，两行写着四种告示分开贴、超时也算失败。右边卡片是空白当正常，两行写着空白当成没事、客人不知道原因。加载、错误、空数据、成功要像左边那样分开写。右边把几种情况都画成空白，人就分不清是在等、出错，还是真的没有内容。

### 机制
visual: future
mode: error
caption: 失败被突出
points: 等待 | 成功 | 失败

三张卡片里，失败这一张被突出，上面写着超时或状态码不对。等待仍写着请求还在路上，成功仍写着拿到数据后再画，这两张现在不抢眼。调用 timeout 以后，到点没完成会进入这张失败卡，状态码不对也进这里。空数据要另画一幅，它不在这张失败卡上。

### 示例
visual: code
caption: 超时和四分支
points: 八秒超时 | 加载和错误 | 空数据和成功

```dart
Future<String> loadNote() {
  return fetchNote().timeout(const Duration(seconds: 8));
}

Widget noteBody(AsyncSnapshot<String> snapshot) {
  if (snapshot.connectionState != ConnectionState.done) {
    return const Text('加载');
  }
  if (snapshot.hasError) return const Text('错误');
  final text = snapshot.data ?? '';
  if (text.isEmpty) return const Text('空数据');
  return Text(text);
}
```

代码里 loadNote 给原来的请求加了八秒超时，到点还没完成，错误会进 snapshot。noteBody 先看 connectionState，没完成就画加载，屏幕上先显示等待。完成后有错误就画错误，这一支盖住超时和状态码不对。文本是空的画空数据，有字才画成功，四幅因此各走各的分支。

### 你会看到
visual: phone
caption: 错误停在屏上
points: 加载转圈 | 错误说明 | 空数据另写 | 成功才是正文

手机框的标题是错误停在屏上，框里四行写着加载转圈、错误说明、空数据另写、成功才是正文。超时或状态码不对时，屏幕停在错误说明上，转圈已经停了。列表成功但一条都没有，会单独写空数据。只有真有内容时，最后一行才换成正文。

### 常见坑
visual: warning
caption: 空数据被当成等
points: 空数据画成加载 | 超时没有上限 | 错误画成空白

错误卡上三行写着空数据画成加载、超时没有上限、错误画成空白。请求已经成功但内容为空，若只看有没有数据，会永远停在加载。不调用 timeout，网络一直挂着时，加载也不会自己结束。失败时留一块空白，人不知道是出错了，还是没有内容。

### 收束
visual: path
caption: 接着把层分开
points: 四幅分开画 | 超时走进错误 | 再分仓库

路径上三步，先把加载、错误、空数据、成功四幅分开画，再让超时走进错误，然后把取数的层分开。加载还在等，错误包括超时和状态码，空数据是成功但没有内容，成功才画正文。future 上的 timeout 负责到点失败，不要让加载无限转下去。下一课是仓库分层。

## lesson repository
title: 仓库分层

### 定义
visual: concept
caption: 界面不碰网络
points: 界面调仓库 | 仓库调接口 | 组件不导入 http

画面上三行是界面调仓库、仓库调接口、组件不导入 http。界面调用仓库的方法，仓库再去调用接口，地址和解析都留在仓库里。Widget 的文件里不要直接 import http，这样换接口时界面不用跟着改。每一层只做自己的一段，网络库不出现在组件文件里。

### 类比
visual: compare
left: 柜台点单
right: 自己进厨房
caption: 柜台和后厨
points: 柜台只下单 | 厨房去备菜 | 客人冲进后厨 | 步骤搅在一起

左边卡片是柜台点单，两行写着柜台只下单、厨房去备菜。右边卡片是自己进厨房，两行写着客人冲进后厨、步骤搅在一起。界面是柜台，只调用仓库，仓库是厨房，里面才使用 http 去访问接口。Widget 直接 import http，就像客人自己去开关火，步骤全堆在页面里。

### 机制
visual: flow
caption: 四格默认顺序
points: 只调仓库 | 记下这次结果 | 组织读取 | 真正发请求

纵向四步按默认标签排列，依次是界面、状态、仓库、网络。界面这一格只调用仓库，不写请求，状态这一格记下加载、错误或数据。仓库组织这一次读取，网络那一格才真正把请求发出去。http 只出现在最下面，组件文件里不要 import 它，页面只负责把结果画出来。

### 示例
visual: code
caption: 请求留在仓库
points: 仓库类 | 里面发 GET | 界面只调用

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class NoteRepository {
  Future<String> loadTitle() async {
    final response = await http.get(Uri.parse('https://example.com/note'));
    if (response.statusCode != 200) throw Exception('失败');
    final data = jsonDecode(response.body) as Map<String, Object?>;
    return data['title'] as String;
  }
}
```

代码面板是仓库类 NoteRepository，http.get、状态码和 jsonDecode 都写在 loadTitle 这一个方法里。界面只调用这个方法，再把得到的字符串画出来，组件文件因此不必 import http。换地址或换解析时，改的是这个类。页面上的加载、错误和成功可以不动，网络细节没有散落到各个组件里。

### 你会看到
visual: phone
caption: 页面只见标题
points: 页面调用仓库 | 仓库访问接口 | 屏幕只出标题

手机框的标题是页面只见标题，框里三行写着页面调用仓库、仓库访问接口、屏幕只出标题。页面上看不到地址和状态码，那些留在仓库的方法里。接口成功时，屏幕中央是笔记标题。失败时仍由页面画错误，但请求代码不在 Widget 文件中，组件没有导入网络库。

### 常见坑
visual: warning
caption: 界面直接导入
points: 组件导入 http | 地址散落各页 | 解析写在 build

错误卡上三行写着组件导入 http、地址散落各页、解析写在 build。Widget 直接 import http，每个页面都会复制地址和状态码判断，改一处就要改很多页。解析若再写进 build，重建时还可能反复请求。仓库把这些收成一个方法，界面只留下加载、错误、空数据和成功四幅画面。

### 收束
visual: path
caption: 接着一页页加
points: 界面调仓库 | 仓库调接口 | 再谈翻页

路径上三步，先让界面调用仓库，再让仓库去调接口，然后去处理一页装不下、还要继续加行的长列表。Widget 不 import http，地址、状态码和解析都留在仓库的方法里。状态只负责记下这一次的加载、错误或数据，不负责自己发请求。下一课是分页。

## lesson pagination
title: 分页

### 定义
visual: concept
caption: 新页接在后面
points: 页码或游标 | 追加到已有列表 | 避免重复请求

分页可以用页码，也可以用游标，两种都是向服务器再要下一截。新的一页要追加到已经有的列表后面，不要把前面的行清掉。请求还在进行时不要再发一次，避免同一切片被要两遍。翻页因此只增长列表，不把已有内容替换掉。

### 类比
visual: compare
left: 续上一杯
right: 整桌重做
caption: 续杯和重做
points: 新的倒进原杯 | 记号往前移 | 整桌倒掉重做 | 同一杯要两次

左边卡片是续上一杯，两行写着新的倒进原杯、记号往前移。右边卡片是整桌重做，两行写着整桌倒掉重做、同一杯要两次。页码或游标就是那个往前移的记号，新行追加进原列表。右边会把已经显示的内容清掉，或者在进行中又请求一次。

### 机制
visual: boxes
mode: scroll
caption: 新页向上滚
points: 第一页 | 第二页 | 接在后面 | 进行中跳过

色块列表在窗口里向上滚，四块写着第一页、第二页、接在后面、进行中跳过。第一页先在，第二页滚进来时接在已有内容后面。页码加一，或把游标换成服务器给的下一页标记，列表都用追加。进行中跳过表示这次还没回来时，不再发同样的请求。

### 示例
visual: code
caption: 追加并挡住重入
points: 进行中直接返回 | 新页追加 | 页码往前

```dart
Future<void> loadMore() async {
  if (_loading) return;
  _loading = true;
  try {
    final page = await api.fetch(page: _nextPage);
    setState(() {
      _items.addAll(page.items);
      _nextPage += 1;
    });
  } finally {
    _loading = false;
  }
}
```

代码在 _loading 为真时直接返回，这样同一次翻页不会发出去两遍。取回的一页用 addAll 追加到已经显示的列表后面，页码再往前加一。换成游标时，把页码改成服务器返回的下一页标记，新行仍然追加，已有的行留在原处。finally 里把进行中的标记放回去，失败以后还能再试下一次。

### 你会看到
visual: phone
caption: 第二页接上来
points: 第一页还在 | 新行接在下面 | 进行中不再请求

手机框的标题是第二页接上来，框里三行写着第一页还在、新行接在下面、进行中不再请求。滚到末尾时，新的一行出现在原列表后面，上面的旧行还在。请求没回来之前，再次触发不会再要同一页。页码或游标只往前走，不会把列表换成只剩新的一页。

### 常见坑
visual: warning
caption: 整表被换掉
points: 新页覆盖旧页 | 进行中又请求 | 失败后标记不放回

错误卡上三行写着新页覆盖旧页、进行中又请求、失败后标记不放回。若用新数组替换 _items，前面的页会从屏幕上消失。进行中不再判断，同页会被要两次，列表里出现重复行。请求抛错时若忘记把标记放回，后面的翻页会一直被挡住。

### 收束
visual: path
caption: 接着记小开关
points: 追加新页 | 挡住重复请求 | 去记小开关

路径上三步，先把新的一页追加上去，再挡住还在进行的重复请求，然后去记几个很小的开关。页码和游标都只是下一截的记号，新行接在已有列表后面，以前的旧行继续留在屏幕上。进行中的标记让同一次不要发出去两遍。下一课是 shared_preferences。

## lesson preferences
title: shared_preferences

### 定义
visual: concept
caption: 小键值异步存
points: 适合开关 | 适合上次输入 | 不存大文件 | 不存密码

shared_preferences 是一份异步的小键值，适合记住开关和上次输入。画面上四行是适合开关、适合上次输入、不存大文件、不存密码。读写都要等待插件把值送到本机存储，键名由你自己定。大段文件和密码不要放进来，文件另走目录，密码另走系统的安全存储。

### 类比
visual: compare
left: 一张便签
right: 大箱和保险柜
caption: 便签和保险柜
points: 记下开关 | 记下上次输入 | 大文件另放 | 密码不进便签

左边卡片是一张便签，两行写着记下开关、记下上次输入。右边卡片是大箱和保险柜，两行写着大文件另放、密码不进便签。shared_preferences 就是那张小便签，开关和上次输入的词都可以记，读写都要等待。整篇笔记和密码都太重，不要塞进这几个小键里。

### 机制
visual: concept
caption: 先拿到再读写
points: 异步实例 | 写入开关和词 | 读不到给默认

画面上的清单三行是异步实例、写入开关和词、读不到给默认。SharedPreferencesAsync 每次读写都去问本机存储，所以前面都要 await，不能当成立刻完成。setBool 记下开关，setString 记下上次输入的词。getString 读不到这个键时，自己给一个默认值，例如空字符串，避免拿到空还继续往下用。

### 示例
visual: code
caption: 开关和上次词
points: 异步实例 | 写入两项 | 读出或默认

```dart
import 'package:shared_preferences/shared_preferences.dart';

Future<void> saveDraft(bool dark, String query) async {
  final prefs = SharedPreferencesAsync();
  await prefs.setBool('dark', dark);
  await prefs.setString('lastQuery', query);
}

Future<String> readQuery() async {
  final prefs = SharedPreferencesAsync();
  return (await prefs.getString('lastQuery')) ?? '';
}
```

代码用 SharedPreferencesAsync，写入和读出都要等待，实例本身不先缓存一整份。saveDraft 把暗色开关和上次输入的词分别存进两个不同的键。readQuery 再把上次的词读出来，没有这个键就得到空字符串。这里没有存文件内容，也没有存密码，只留这两个很小的值。

### 你会看到
visual: phone
caption: 再次打开还在
points: 开关保持上次 | 输入框带旧词 | 没有大段正文

手机框的标题是再次打开还在，框里三行写着开关保持上次、输入框带旧词、没有大段正文。关掉页面再进来，暗色开关仍是上次的选择。输入框里可以放回上次的词。笔记正文不在这里，它太大，也不该把密码显示在这种存储里。

### 常见坑
visual: warning
caption: 大文件和密码
points: 塞进整篇文件 | 明文存密码 | 忘记等待

错误卡上三行写着塞进整篇文件、明文存密码、忘记等待。把长文或图片塞进键值，会又慢又容易超出这种小存储合适的大小。密码放在这里只是明文小键，不该替代系统专门的安全存储。setBool 和 setString 都是异步的，不 await 就立刻去读，读到的可能还是旧值。

### 收束
visual: path
caption: 接着找文件
points: 只留小键 | 开关和上次词 | 去写文件

路径上三步，先只留下小键值，再记住开关和上次输入这两类内容，然后去找真正能放文件的目录。shared_preferences 是异步的，适合很小的数据，大文件和密码不要放进来。读不到键时自己给一个默认值，不要假设键一定存在。下一课是文件与路径。

## lesson files
title: 文件与路径

### 定义
visual: concept
caption: 文档目录里的文件
points: 先拿文档目录 | 用 File 读写 | 网页没有完整文件库

画面上三行是先拿文档目录、用 File 读写、网页没有完整文件库。path_provider 的 getApplicationDocumentsDirectory 拿来应用自己的文档目录，这是应用文件该落盘的地方。拿到目录以后，用 dart:io 的 File 拼上路径，再把文本读出来或写进去。网页端没有完整的 dart:io，这段 File 代码不能原样在 Web 上编译运行。

### 类比
visual: compare
left: 抽屉里的纸条
right: 浏览器没抽屉
caption: 抽屉和网页
points: 先拉开抽屉 | 纸条放进去 | 网页没有这层 | 文件接口不齐

左边卡片是抽屉里的纸条，两行写着先拉开抽屉、纸条放进去。右边卡片是浏览器没抽屉，两行写着网页没有这层、文件接口不齐。getApplicationDocumentsDirectory 是找应用自己的抽屉，File 是放进去的那张纸条。Web 没有完整的 dart:io，所以右边不能照搬左边这套文件写法。

### 机制
visual: flow
caption: 四步落到读写
points: 拿到文档目录 | 拼上文件名 | 包成 File | 读或写文本
headers: 目录 | 路径 | 文件 | 读写

纵向四步的标签是目录、路径、文件、读写，小字是拿到文档目录、拼上文件名、包成 File、读或写文本。目录这一格调用 getApplicationDocumentsDirectory，路径这一格把目录和 note.txt 接起来。文件这一格用 dart:io 的 File 包住这条路径，读写这一格调用 writeAsString 或 readAsString。网页端没有完整的 dart:io，这四步不能原样搬到 Web 上。

### 示例
visual: code
caption: 写进文档目录
points: 取得目录 | 拼出文件 | 写入文本

```dart
import 'dart:io';
import 'package:path_provider/path_provider.dart';

Future<void> saveNote(String text) async {
  final dir = await getApplicationDocumentsDirectory();
  final file = File('${dir.path}/note.txt');
  await file.writeAsString(text);
}

Future<String> readNote() async {
  final dir = await getApplicationDocumentsDirectory();
  final file = File('${dir.path}/note.txt');
  return file.readAsString();
}
```

代码先 await 文档目录，再用目录路径拼出 note.txt，交给 dart:io 的 File，这就是从目录走到文件的那几步。saveNote 把整段文字写进去，readNote 再把同一个文件读出来。这两步都在应用自己的文档目录里，不写进任意的系统路径。网页端没有完整的 dart:io，这段不能原样拿到 Web 上跑。

### 你会看到
visual: phone
caption: 笔记留在本机
points: 保存写进文件 | 再次打开仍在 | 网页走不了这条

手机框的标题是笔记留在本机，框里三行写着保存写进文件、再次打开仍在、网页走不了这条。点保存以后，文字进了文档目录里的 note.txt，文件真的落在本机。杀掉进程再打开，readNote 仍能读回这段话。若目标是网页，这条 File 路径不会按手机上的样子工作，因为网页没有完整的 dart:io。

### 常见坑
visual: warning
caption: 网页没有这套
points: 网页照搬 dart:io | 写到任意路径 | 目录还没等到

错误卡上三行写着网页照搬 dart:io、写到任意路径、目录还没等到。Web 没有完整的 dart:io，直接使用 File 会在网页目标上编译失败，这段不能当通用代码。路径不要自己拼到系统根目录，应使用 getApplicationDocumentsDirectory 给的那个目录。这个函数是异步的，目录还没回来就去写，文件还没有着落。

### 收束
visual: path
caption: 接着看一张表
points: 拿到目录 | 用 File 读写 | 去看一张表

路径上三步，先拿到应用的文档目录，再用 File 完成读写，然后去看一张结构化的表。getApplicationDocumentsDirectory 负责目录，dart:io 的 File 负责把路径变成可以读写的文件。网页端没有完整的 dart:io，这条限制要单独记住，不要把移动端写法直接拿去编网页。下一课是 sqlite 与 drift 入门。

## lesson sqlite-drift
title: sqlite 与 drift 入门

### 定义
visual: concept
caption: 一张表一次查
points: sqflite 是插件 | drift 类型安全 | 只看一张表

画面上三行是 sqflite 是插件、drift 类型安全、只看一张表。sqflite 是 Flutter 里的 SQLite 插件，可以直接对数据库发 SQL，查出来的结果是一行行记录。drift 建在它上面，用类型安全的写法描述表和查询。入门只看一张表和一次查询，建库、版本和代码生成的工程配置先不展开。

### 类比
visual: compare
left: 手写账单
right: 带格子的账本
caption: 账单和格子账
points: SQL 自己写 | 结果仍是行 | 字段带类型 | 查询跟着表走

左边卡片是手写账单，两行写着 SQL 自己写、结果仍是行。右边卡片是带格子的账本，两行写着字段带类型、查询跟着表走。sqflite 靠近左边，SQL 字符串由你写，drift 在同一份 SQLite 上加了类型，表和查询的关系由字段说清楚。两边这一课都只处理一张表和一次查询，工程配置先不摊开。

### 机制
visual: flow
caption: 从表查到界面
points: 一张笔记表 | 按编号查找 | 取出标题 | 界面只负责画
headers: 表 | 查询 | 行 | 界面

纵向四步的标签是表、查询、行、界面，小字是一张笔记表、按编号查找、取出标题、界面只负责画。表这一格是一张叫做 notes 的笔记表，查询这一格按编号查找，只取需要的列。行这一格得到标题等字段，界面这一格只把标题画出来，不再写 SQL。drift 的类型安全也落在查询这一层，生成工程这里不写，配置留到以后。

### 示例
visual: code
caption: 按编号取标题
points: 表名 notes | 按 id 查询 | 取出 title

```dart
import 'package:sqflite/sqflite.dart';

Future<String?> readTitle(Database db) async {
  final rows = await db.query(
    'notes',
    columns: ['title'],
    where: 'id = ?',
    whereArgs: [1],
    limit: 1,
  );
  if (rows.isEmpty) return null;
  return rows.first['title'] as String?;
}
```

代码用 sqflite 的 query 查一张 notes 表，只取 title，条件是编号等于一，最多一行。有行就把标题交出去，没有行就交回空。打开数据库、版本号和建表语句都没有写进这段，那些属于工程配置。drift 会把同样的表和这次查询写成带类型的接口，生成步骤这一课不展开。

### 你会看到
visual: phone
caption: 标题来自那一行
points: 表里有笔记 | 查到编号一 | 屏幕显示标题

手机框的标题是标题来自那一行，框里三行写着表里有笔记、查到编号一、屏幕显示标题。库里那一行的 title 出现在屏幕上。查不到时标题不会编出来，界面可以改画空数据。你看不到整库的配置，这一屏只体现一次查询的结果。

### 常见坑
visual: warning
caption: 配置先不展开
points: 把建库写进界面 | 一次查出整库 | 生成配置当成查询

错误卡上三行写着把建库写进界面、一次查出整库、生成配置当成查询。打开数据库和升级版本是另一段准备工作，不要塞进 Widget 的 build。一次入门查询只取需要的列和一行条件，不必把整张表都拉进内存。drift 的代码生成用来得到类型安全的查询，它不代替这张表和这次查询本身。

### 收束
visual: path
caption: 接着谈离线
points: 认清一张表 | 写一次查询 | 去看离线

路径上三步，先认清这一张表，再把一次查询写完，然后去处理没有网络时怎么先显示旧数据。sqflite 是 SQLite 插件，drift 在它上面做类型安全的 SQL，两者看的是同一层数据。建库、版本和生成代码的工程配置，这一课没有展开。下一课是缓存与离线。

## lesson cache-offline
title: 缓存与离线

### 定义
visual: concept
caption: 快的和留得住的
points: 内存快但易失 | 磁盘能跨启动 | 离线先显示旧数据

画面上三行是内存快但易失、磁盘能跨启动、离线先显示旧数据。内存缓存读得快，进程一结束，里面的内容就没了。磁盘缓存写在文件或数据库里，下次启动还能读到上一次的结果。离线时先把上一次成功的数据画出来，同时告诉用户网络失败，不要只留空白。

### 类比
visual: compare
left: 桌上的便签
right: 抽屉里的副本
caption: 便签和抽屉
points: 伸手就拿到 | 离开就清掉 | 下次还能找到 | 断网先拿副本

左边卡片是桌上的便签，两行写着伸手就拿到、离开就清掉。右边卡片是抽屉里的副本，两行写着下次还能找到、断网先拿副本。内存像桌上的便签，快，但进程结束就没了。磁盘像抽屉里的副本，能跨过启动，断网时先把它拿出来，并写明网络失败。

### 机制
visual: compare
left: 内存缓存
right: 磁盘缓存
caption: 左右两层缓存
points: 读起来快 | 进程结束就没 | 重启之后还在 | 离线先显示

左边卡片是内存缓存，两行写着读起来快、进程结束就没。右边卡片是磁盘缓存，两行写着重启之后还在、离线先显示。没网时先用上一次成功的数据，内存还在就用左边，进程已经没了就用右边。无论用哪一层，都要同时告诉用户网络失败，不要只留一块空白。

### 示例
visual: code
caption: 失败仍留旧文
points: 先内存后磁盘 | 没有就说明 | 失败单独提示

```dart
Widget offlineNote({String? memory, String? disk, Object? error}) {
  final text = memory ?? disk ?? '还没有缓存';
  return Column(
    children: [
      if (error != null) const Text('网络失败'),
      Text(text),
    ],
  );
}
```

代码先用内存里的字符串，没有再用磁盘上的那一份，两层都没有才说还没有缓存。请求出错时，上面就单独写网络失败，下面仍保留上次成功的正文。进程结束后内存那一份会消失，磁盘那一份还在，所以重启后仍能看到旧文。网络失败和旧数据同时出现，人知道现在是离线。

### 你会看到
visual: phone
caption: 旧文加一句失败
points: 顶上写网络失败 | 下面仍是旧标题 | 重启后磁盘还在

手机框的标题是旧文加一句失败，框里三行写着顶上写网络失败、下面仍是旧标题、重启后磁盘还在。请求失败时，旧标题不会被清掉。顶上的一句说明现在没有网。若进程刚结束，内存缓存已经没了，能留下来的是磁盘上一次成功的内容。

### 常见坑
visual: warning
caption: 失败变成空白
points: 失败就清掉旧数据 | 只放内存 | 不说明网络失败

错误卡上三行写着失败就清掉旧数据、只放内存、不说明网络失败。一失败就把界面换成空白，用户看不到上一次已经成功的内容。只放在内存里，进程一结束缓存就没了，下次打开无从显示。旧数据留着时也要写出网络失败，不然人会以为这是刚刚请求到的新结果。

### 收束
visual: path
caption: 接着看颜色
points: 分清两层缓存 | 离线留旧数据 | 去看颜色

路径上三步，先分清内存和磁盘两层缓存，再在离线时留下旧数据，然后去看界面的颜色从哪来。内存读得快，但进程结束就没了，不能指望它撑过下次启动。磁盘能跨过启动，没网时先显示上一次成功的数据，并告诉用户网络失败。下一课是 ThemeData 与 ColorScheme。
