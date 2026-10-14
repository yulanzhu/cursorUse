---
id: 68-go-router
module: 导航
title: go_router
order: 68
---

# 总结

`go_router` 用路径描述页面。路径参数、查询、嵌套和 `redirect` 都写在路由上。深链和网页路径栏靠路径，不靠你手动堆栈。守卫放在 `redirect` 里，不要散在每个按钮上。

<!-- section: 专业讲解 -->
## 路径是事实来源

- `GoRoute` 的 `path` 写页面在哪。路径参数放在路径里，比如用户 id
- 查询挂在问号后面，适合筛选这种可有可无的信息
- `ShellRoute` 做嵌套。外壳是共享骨架，里面再换子页面
- 底部几项来回切、又要各自留着栈时，用 `StatefulShellRoute`
- `go` 让栈去匹配一条新路径。`push` 是在当前栈上再压一页
- `redirect` 看当前路径和登录状态。要拦住就返回另一条路径，不拦截就返回 `null`
- 登录和权限这种全站规则放在 `redirect`，不要复制到每个按钮

<!-- section: 大白话 -->
## 大白话

- 路径像门牌。深链和路径栏念的是门牌，不是你脑子里那叠纸的顺序
- 守卫像门口的人。规则写在门口，不要让每一扇门自己再问一遍你有没有钥匙

<!-- section: 怎么用 -->
## 怎么用

```dart
GoRoute(
  path: '/orders/:id',
  builder: (context, state) {
    final id = state.pathParameters['id']!;
    final tab = state.uri.queryParameters['tab'];
    return OrderPage(id: id, tab: tab);
  },
)
```

```dart
redirect: (context, state) {
  final atLogin = state.matchedLocation == '/login';
  if (!signedIn && !atLogin) return '/login';
  return null;
}
```

- `context.go` 按路径改位置。能返回的临时页，才用 `context.push`
- 某一页自己的表单校验，仍然留在那一页，不要写进 `redirect`

<!-- section: 再讲深一点 -->
## 再讲深一点

- `redirect` 可以写在整个 `GoRouter` 上，也可以写在某一条 `GoRoute` 上
- 返回 `null` 表示不改道。返回一条路径，就会改去那里
- 嵌套的外壳用 `ShellRoute` 保住共享的 `Scaffold`，子路由只换 `body`
- 网页刷新以后，应该仍然能靠路径回到同一页。这要求路径里带齐必要的 id

<!-- section: 边界 -->
## 边界

- 不要另外维持一份容易和路径打架的页面栈
- 守卫散在按钮上，总会漏掉深链和路径栏直接进来的那条路
- 查询不要拿来装必须有的 id。必须有的，放进路径参数

<!-- section: 收束 -->
## 留下这句

- 路径、参数、查询、嵌套和改道，都收在 `go_router` 里。守卫放在 `redirect`，不要散在每个按钮上

# 口播

## 开场

- tone: 放慢
  pause: 440
  say: 这节把路由库落到 `go_router`。你要记住，事实来源是路径，不是你在内存里手动堆出来的栈。
- tone: 平稳
  pause: 320
  say: 路径参数、查询、嵌套，还有进门前的守卫，都写在路由上。

## 专业讲解

- tone: 平稳
  pause: 360
  say: `GoRoute` 用 `path` 描述页面。用户 id 这种必须有的，写成路径参数。筛选这种可有可无的，放进查询。
- tone: 平稳
  pause: 340
  say: 嵌套用 `ShellRoute`。外壳留着共享的骨架，里面的子页面再换。底部几项要各自留栈时，用 `StatefulShellRoute`。
- tone: 加重
  pause: 420
  stress: 靠路径
  say: 深链和网页的路径栏靠路径，不靠你手动堆栈。`go` 会让栈去匹配新路径。`push` 只是在上面再压一页，返回时仍然能回到刚才那页。
- tone: 平稳
  pause: 360
  say: 守卫放在 `redirect` 里。没登录就返回登录路径，不拦截就返回 `null`。不要在每个按钮上各写一遍同样的判断。
- tone: 问句
  pause: 480
  say: 用户从路径栏直接打开一个订单页，按钮上的判断还有机会跑吗？

## 大白话

- tone: 放慢
  pause: 420
  say: 路径像门牌。别人念的是门牌号，不是你刚才走过的那几步。刷新以后，门牌仍然在，步子已经没了。
- tone: 平稳
  pause: 340
  say: 守卫像站在门口的人。规则写在门口，每一扇房门就不必再各自问一遍钥匙。漏掉一扇，深链就会从那扇门钻进去。

## 怎么用

- tone: 平稳
  pause: 360
  say: 屏幕上的路径是 `/orders/:id`。`pathParameters` 取出 id，`queryParameters` 取出可选的 `tab`。
- tone: 平稳
  pause: 340
  say: `redirect` 先看是不是已经在登录页。没登录、又不是去登录，就返回 `/login`。不需要拦时，返回 `null`。
- tone: 加重
  pause: 380
  say: 要改掉当前的位置，用 `go`。只是临时盖上一页、仍然想返回，才用 `push`。不要两套都当成同一种跳转。

## 再讲深一点

- tone: 平稳
  pause: 380
  say: 这种改道可以写在整个路由器上，也可以写在某一条路由上。全站的登录规则适合放在上面。某一页的表单校验，仍然留在那一页。
- tone: 放慢
  pause: 400
  say: `ShellRoute` 保住外壳的 `Scaffold`。子路由换的是里面的 `body`，不是把顶栏也拆掉重建。
- tone: 平稳
  pause: 340
  say: 网页一刷新，内存里的栈没了。路径里如果带着 id，刷新以后仍然能回到同一页。所以必须有的 id 不要只放在查询或按钮参数里。

## 边界

- tone: 加重
  pause: 400
  say: 路径已经是事实来源，就不要再私下维持另一份页面栈。两份说法会打架，深链进来时你不知道该信谁。
- tone: 平稳
  pause: 340
  say: 守卫若只写在按钮上，路径栏和深链不经过那些按钮，规则就漏了。所以守卫放在 `redirect`。

## 收束

- tone: 收束
  pause: 480
  say: `go_router` 用路径、参数、查询和嵌套来描述页面。
- tone: 收束
  pause: 520
  say: 深链和路径栏靠路径。守卫放在 `redirect` 里，不要散在每个按钮上。

# 可以向老师问

- q: go 和 push 该用哪个
  tone: 平稳
  pause: 360
  say: `go` 让当前路径换成新的，栈去匹配这条路径。`push` 是在上面再压一页，用户仍然能返回。临时页用 `push`，改位置用 `go`。
- q: 为什么守卫不写在按钮上
  tone: 平稳
  pause: 380
  say: 因为深链和路径栏不会去点那些按钮。规则放在 `redirect` 里，每一条进来的路径都会先被看一遍。
