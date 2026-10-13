# Flutter 老师讲解课

屏幕上是知识点总结。老师用另一套口语讲，带语调、多音字和函数名读音。没有测验。

建议按下面的顺序听。

## 全貌与环境

1. Flutter 解决什么问题
2. Framework、Engine 和 Embedder
3. 为什么用 Dart
4. 安装、flutter doctor 和项目目录
5. 热重载和热重启
6. 调试、分析和发布

## Dart 语言

7. var、final、const 和 late
8. 空安全
9. 函数、闭包和命名参数
10. 字符串与集合
11. 控制流、记录和模式匹配
12. 类和构造函数
13. 继承、接口、mixin 和 extension
14. 枚举和 sealed
15. 泛型
16. 相等与 identical
17. 异常和 Error
18. 库、条件导入和 pub

## 异步与并发

19. Future 和错误传播
20. 事件循环
21. Stream 的单订阅和广播
22. Isolate 与 compute
23. 取消和超时

## Widget 心智

24. 组合优于继承
25. Stateless 与 Stateful
26. State 生命周期和 mounted
27. BuildContext
28. 四类 Key
29. const 组件
30. 三棵树先分工

## 布局

31. 约束三原则
32. 有界和无界约束
33. Row 与 Column
34. Expanded 与 Flexible
35. Stack 与 Wrap
36. 盒子家族
37. LayoutBuilder、MediaQuery 和安全区
38. 溢出和何时才自定义布局

## 界面组件

39. 文本和字体
40. 图片和图标
41. 按钮
42. Scaffold 及其槽位
43. 列表项和卡片
44. 对话框、底部弹层和 SnackBar
45. Opacity、Offstage 和 IgnorePointer

## 滚动

46. 滚动协议和 ScrollController
47. ListView 懒加载
48. GridView 和 PageView
49. Sliver 家族
50. 刷新、分页和列表 Key

## 手势与表单

51. 指针和手势竞技场
52. InkWell
53. 拖拽和滑动删除
54. 焦点和键盘
55. TextField 与 Form 校验
56. 选择控件和键盘遮挡

## 状态

57. setState 与状态提升
58. ValueNotifier 与 ChangeNotifier
59. InheritedWidget 与 InheritedModel
60. Notification 向上冒泡
61. 临时状态、应用状态和异步界面
62. Riverpod 这条写法
63. Provider、Bloc 和释放

## 导航

64. 路由栈和返回值
65. 替换和清空栈
66. 命名路由为什么不够
67. Navigator 2.0 为什么出现
68. go_router

## 数据

69. FutureBuilder 与 StreamBuilder
70. 请求、失败和分层
71. JSON 与模型
72. 本地偏好、文件和数据库
73. Repository
74. 缓存和密钥

## 动画与绘制

75. 隐式动画
76. AnimationController 和 vsync
77. Hero 和页面过渡
78. CustomPainter 与 shouldRepaint
79. Clip、Transform 和 Opacity
80. 什么时候该自己画

## 主题与适配

81. Theme 与深色模式
82. 资源、字体和图片倍率
83. 国际化和复数
84. 无障碍
85. 响应式、桌面和 Web

## 平台通道

86. package 与 plugin
87. 三种 Channel
88. 线程与 Pigeon
89. PlatformView、FFI 和权限

## 测试

90. 测试金字塔
91. 单元测试和替身
92. Widget 测试
93. 集成测试和黄金测试

## 性能

94. 重建、const 和拆 Widget
95. build 里不该做的事
96. RepaintBoundary 和图片缓存
97. 着色器卡顿和 Impeller
98. DevTools 与没有 dispose

## 框架原理

99. 三棵树与 canUpdate
100. markNeedsBuild、Layout 和 Paint
101. drawFrame 的顺序
102. 布局边界和 ParentData
103. Layer、命中测试和 Semantics
104. 四条线程

## 编译与热重载

105. 为什么不是脚本桥
106. JIT、AOT 和 tree shaking
107. 热重载能换什么

## 工程与发布

108. 按功能拆目录
109. lint 与 dart-define
110. 调试、分析和发布产物
111. 把一次功能串起来
