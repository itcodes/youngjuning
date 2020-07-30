---
title: Deno从入门到跑路 | 掘金征文
date: 2020-07-26 16:30:25
categories:
  - [前端开发]
tags:
  - deno
---

![](https://i.loli.net/2020/07/27/4ltXAYazmVvgWfZ.png)

<!--more-->

## 印象Deno

2018 年时，一篇 [如何看待ry的项目deno的issue被中文刷屏的事件？](https://www.zhihu.com/question/279348266/answer/406131605) 的文章成功引起了我对 Deno 的注意，cnode有一篇文章严厉斥责这是中国开发者的耻辱，对此我不敢完全认同，毕竟996的大环境下，是很难孵化出国外这种创新精神的。但我并不否认学不学的动，全看个人。本人近期最敬佩的 [蜗牛老湿_大圣](https://juejin.im/user/59532176f265da6c317d8e14)坚持每日5点多起床，做到如此勤奋与持久，何愁学不动？

996的我吃瓜之余尽管有着 Deno 是什么？Deno会取代NodeJS吗？我需要学Deno吗？等等的疑惑，也只能将之收藏吃灰。

### 为什么学Deno？

1、热度，虽说关于学不动的问题造成了负面影响，但是deno成功地因此赚足了噱头和流量。

![](https://i.loli.net/2020/07/27/xnK6EqFH1hGoJSR.png)

2、趋势，下图中我们可以清楚地看到，Deno从2018年创建至今已斩获近70K的star，尤其是 2020-05-13 发布 1.0 之后，更是迎来一波高峰。

<img src="https://i.loli.net/2020/07/27/CBkE2ldHmheSvZz.png" style="zoom:70%;" />

3、掘金征文活动，上次沸点活动有幸获赠豪华升降桌，但是我最想要的其实是掘金周边大礼包。

### Deno 是什么？

- Deno 是一个简单、现代且安全的 JavaScript 和 TypeScript 运行时环境，其基于 V8 引擎并采用 Rust 编程语言构建。
- Deno 由 [Ryan Dahl 瑞安·达尔](https://github.com/ry) 创建，他同样是 Node.js 的作者。

### 功能亮点

- 默认安全设置。除非显式开启，否则没有文件、网络，也不能访问运行环境。
- 天生支持 TypeScript。
- 只有一个单一的可执行文件。
- 自带实用工具，例如依赖检查器（deno info）和 代码格式化工具（deno fmt）。
- 有一套经过审核（审计）的标准模块，确保与 Deno 兼容： [deno.land/std](https://deno.bootcss.com/std)
- 脚本代码能被打包为一个单独的 JavaScript 文件。
- 去中心化Package：没有 node_modules 和 package.json；Package 通过 URL 来加载--http://deno.land/x/；加载时缓存到硬盘
- Top Level Await：在 Deno 中编写代码，不需要将 await 包裹在异步函数里。真香！
- 其他：内置测试、浏览器兼容的API、执行Wasm二进制文件、Modern JS、ES Modules

### 为什么开发 Deno？

从 Deno 的名字就可以看出和 Node 的关系：De（Destroy）no(Node)，销毁Node, ry 在演讲中曾列举了 Node存在的一些问题：

1. 曾放弃原生支持 Promise： 造成了核心 API 的老化问题，得都一一更新成 Promise 版本才能解決。

2. 沒有谨慎思考安全性问题：使用 V8 的 Node.js 不需要『授权』，即可访问网络、档案系统，甚至是内存信息，在数据安全考量越来越重要的时代，会是 Node.js 被质疑的问题之一

3. Build System：在 Node 开发早期，Chrome V8 是以 GYP 构建系统，而 Node 也就沿用了 GYP，但不久后 Chrome 放弃 GYP 转而使用 GN，而 Node 已经无法挽回。因此 Node 成了目前在 V8 上唯一使用 GYP 的用戶，而 GN 速度比 GYP 快了将近 20 倍、文件可读性高且支持许多依赖。

4. Package.json 与 Npm 的集权问题

5. node_modules：node_modules 里的每一個 folder 并沒有标准，因此可以放置多余的版本或是任何其他档案和文件，这导致增加了模块解析复杂度。另外社区早已苦 node_modules 久已，嘲讽之是比黑洞更黑的存在：

<img src="https://i.loli.net/2020/07/27/zTDH1eEXtYKpqfs.png" alt="image.png" style="zoom:50%;" />

6. index.js：若有了 package.json，其实就不需要默认加载 index.js，這确实让模块加载更加地复杂化了。

基于以上问题，ry 决定利用JavaScript和浏览器最新特性开发一款现代的JavaScript运行时。更多问题，大家请观看参考资料的演讲。

### Deno 正在杀死 Node.js的担忧

Deno 刚发布的时候，社区除了各种"学不动"的声音之外，还有就是 Deno 是否会取代 Node.js。我认为活在当下（NodeJs），未雨绸缪（Deno）是最佳态度。

- Nodejs远没有到被取代的时候
- Nodejs 非常成熟且有一个巨大的生态
- Deno 是一项崭新的技术，在未来几年它可能会受到更多关注，成为 nodejs 的竞争者
- 对于过去用 bash 或 python 编写的工具脚本来说，Deno 是一个优秀的替代品。

## 环境准备

Deno 没有外部依赖，以单一可以执行文件发布。你可以 使用下面的安装程序安装 Deno，或者先从 [版本发布页面](https://github.com/denoland/deno/releases)下载已发布的二进制可执行文件。

### 下载安装

**使用 Shell (Mac, Linux)：**

```bash
$ curl -fsSL https://deno.land/x/install/install.sh | sh
```

**使用 PowerShell (Windows):**

```bash
$ iwr https://deno.land/x/install/install.ps1 -useb | iex
```

**使用 Homebrew (Mac):**

```bash
$ brew install deno
```

### 测试安装

- 运行 `deno -V`，如果它打印出 Deno 版本，说明安装成功。

- 运行 `deno help` 以查看帮助文档。

- 运行 `deno help <subcommand>` 以查看子命令的选项。

### 相关路径

- DENO_DIR location（Deno安装位置）: "/Users/yangjunning/Library/Caches/deno"
- Remote modules cache（远程模块缓存）: "/Users/yangjunning/Library/Caches/deno/deps"
- TypeScript compiler cache（TypeScript编译缓存）: "/Users/yangjunning/Library/Caches/deno/gen"

### 升级

要升级已安装的版本，运行：

```shell
deno upgrade
```

这会从 [github.com/denoland/deno/releases](https://github.com/denoland/deno/releases) 获取最新的发布版本，然后解压并替换现有的版本。

您也可以用此来安装一个特定的版本：

```shell
deno upgrade --version 1.0.1
```

### IDE及插件

推荐使用 VSCode 及 VSCode Deno进行开发，VSCode Deno 是 [justjavac](https://juejin.im/user/55b9d25600b09db36bbe2e9a) 大佬开发的。

为了解决与其他正常 node 项目的冲突，建议大家请在项目中新建 `.vscode/settings.json` 文件并填入以下配置：

```json
{
  "deno.enable": true, // set false for user setting
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "denoland.vscode-deno"
  },
}
```

## 快速上手

### Hello World

试着运行如下的简单程序：

```bash
$ deno run https://deno.land/std/examples/welcome.ts
```

![](https://i.loli.net/2020/07/27/rQOJ7pFbWIXtCTf.png)

### 搭建文件服务器

```shell
$ deno run --allow-read --allow-net https://deno.land/std@0.62.0/http/file_server.ts
```

<img src="https://i.loli.net/2020/07/27/vWp2eqOTbZ9arB7.png" style="zoom:60%;" />

### 创建一个http服务器

创建一个名为 `index.ts` 的文件

```ts
import { serve } from "https://deno.land/std@0.62.0/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

执行 `deno run xxx` 命令执行文件：

```shell
$ deno run --allow-net --reload index.ts // --reload 是第一次执行时缓存模块用的
```

### 发出一个 HTTP 请求

通过 HTTP 请求从服务器获取数据是一件很常见的事。让我们编写一个简单的程序来获取文件并打印到终端。

就像浏览器一样，您可以使用 web 标准的 [`fetch`](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) API 来发出请求。

```ts
// 我们取得了第一个命令行参数，存储到变量 url。
const url = Deno.args[0];
// 我们向指定的地址发出请求，等待响应，然后存储到变量 res。
const res = await fetch(url);

// 我们把响应体解析为一个 ArrayBuffer，等待接收完毕，将其转换为 Uint8Array，最后存储到变量 body。
const body = new Uint8Array(await res.arrayBuffer());
// 我们把 body 的内容写入标准输出流 stdout。
await Deno.stdout.write(body);
```

```shell
$ deno run --allow-net sendHttp.ts http://example.com
// 或
$ deno run --allow-net=example.com https://deno.land/std/examples/curl.ts https://example.com
```

### 写一个文件

```ts
const encoder = new TextEncoder();
const greetText = encoder.encode("Hello World\nMy name is youngjuning!")

await Deno.writeFile("greet.txt", greetText)
```

### 读取一个文件

Deno 也提供内置的 API，它们都位于全局变量 `Deno` 中。您可以在此找到相关文档：[doc.deno.land](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts)。

文件系统 API 没有 web 标准形式，所以 Deno 提供了内置的 API。

在这个程序中，每个命令行参数都是一个文件名，参数对应的文件将被依次打开，打印到标准输出流。

```ts
const filenames = Deno.args;
for (const filename of filenames) {
  const file = await Deno.open(filename);
  await Deno.copy(file, Deno.stdout);
  file.close();
}
```

除了内核到用户空间再到内核的必要拷贝，这里的 `copy()` 函数不会产生额外的昂贵操作，从文件中读到的数据会原样写入标准输出流。这反映了 Deno I/O 流的通用设计目标。

尝试一下：

```shell
$ deno run cat.ts /etc/passwd
```

### TCP 服务

新建 `cat.ts`，这个示例是一个 TCP echo 服务，接收 8080 端口的连接，把接收到的任何数据返回给客户端。

```ts
const hostname = "127.0.0.1";
const port = 8080;
const listener = Deno.listen({ hostname, port });
console.log(`Listening on ${hostname}:${port}`);
for await (const conn of listener) {
  Deno.copy(conn, conn);
}
```

尝试用 netcat 向它发送数据。

![](https://i.loli.net/2020/07/27/XOyv57NVZwbHzKx.png)

像示例 `cat.ts` 一样，`copy()` 函数不会产生不必要的内存拷贝。它从内核接收数据包，然后发送回去，就这么简单。

## 依赖管理

在任何地方导入 URL 似乎都不方便。如果其中一个 URL ，链接到了一个稍微不同的库版本呢？在大型项目中，维护 URL 是否容易出错？解决方案是在中心deps.ts文件，导入和重新导出外部库（与 Node 的package.json文件目的相同）。例如，假设您在一个大型项目中，使用了上述测试库。要做的，不是在任何地方导入"https://deno.land/std/testing/mod.ts"，而是可以创建一个 `deps.ts`，用来导出第三方代码：

```ts
export * from "https://deno.land/std/http/server.ts"; // 推荐
export * as Server from "https://deno.land/std/http/server.ts";
export { default as Server } from "https://deno.land/std/http/server.ts";
```

在整个项目中，都可以从deps.ts导入，这样就可以避免对同一个 URL 进行多次引用：

```ts
import {test, assertEquals} from './deps.ts';
```

这种设计避免了，由于包管理软件、集中的代码库和多余的文件格式，而产生的过多复杂性。

## 打包

`deno bundle` 自带打包和 tree shaking 功能，可以将我们的代码打包成单文件

```shell
#!/bin/sh
deno bundle ./src/index.ts ./dist/index.js
```

`deno install` 可以将我们的代码生成可执行文件进行直接使用

```shell
#!/bin/sh
deno install --allow-read  --allow-net --allow-write -n youngjuning ./src/index.ts
```

> 我们也可以直接安装远程的库: `deno install --allow-read --allow-net https://deno.land/std/http/file_server.ts`

deno的可执行文件默认都放在 `/Users/yangjunning/.deno/bin/` 目录下，我们需要将它注册到环境变量中:

```sh
$ export PATH="/Users/yangjunning/.deno/bin:$PATH"
```

## 权限

我们已经知道了默认情况下，Deno是安全的。因此 Deno 模块没有文件、网络或环境的访问权限，除非您为它授权。在命令行参数中为 deno 进程授权后才能访问安全敏感的功能。

### 权限列表

以下权限是可用的：

- `-A`, `--allow-all`：允许所有权限，这将禁用所有安全限制。
- `--allow-env`：允许环境访问，例如读取和设置环境变量。
- `--allow-hrtime`: 允许高精度时间测量，高精度时间能够在计时攻击和特征识别中使用。
- `--allow-net=<allow-net>`： 允许网络访问。您可以指定一系列用逗号分隔的域名，来提供域名白名单。
- `--allow-plugin`： 允许加载插件。请注意：这是一个不稳定功能。
- `--allow-read=<allow-read>` 允许读取文件系统。您可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单。
- `--allow-run` 允许运行子进程。请注意，子进程不在沙箱中运行，因此没有与 deno 进程相同的安全限制，请谨慎使用。
- `--allow-write=<allow-write>` 允许写入文件系统。您可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单。

### 权限白名单

Deno 还允许您使用白名单控制权限的粒度。

这是一个用白名单限制文件系统访问权限的示例，仅允许访问 `/usr` 目录，但它会在尝试访问 `/etc` 目录时失败。

![](https://i.loli.net/2020/07/27/pztu5K3H2N7lWy8.png)

`--allow-write` 也一样，代表写入权限。

### 网络访问

`fetch.ts`:

```ts
const result = await fetch("https://deno.land/");
```

这是一个设置 host 或 url 白名单的示例：

```shell
$ deno run --allow-net=github.com,deno.land fetch.ts
```

如果 `fetch.ts` 尝试与其他域名建立网络连接，那么这个进程将会失败。

允许访问任意地址：

```shell
$ deno run --allow-net fetch.ts
```

## FAQ

### 1、权限标志符位置的问题

我们都知道， deno 默认是安全的，就是导致了默认情况下是不允许访问网络、读写文件等。比如有个名为 index.ts 的文件内容如下：

```ts
import { serve } from "https://deno.land/std@0.50.0/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

如果直接执行 `deno run index.ts`, 会报错：

```
error: Uncaught PermissionDenied: network access to "0.0.0.0:8000", run again with the --allow-net flag
```

所以我们很自然的就会在启动命令的最后加上 `--allow-net` ，如下：

```shell
$ deno run index.ts --allow-net
```

但是，这样仍然会报错。查了资料才知道 ，`--allow-net` 、`--allow-read` 之类的标志是不可以放到文件名后面的，必须紧跟在 `deno run` 后面，比如，如下才是正确的：

```shell
$ deno run --alow-net index.ts
```

### 2、远程模块缓存

远程代码在第一次运行时获取并缓存，直到代码通过 `--reload` 选项运行。（所以它在飞机上也能工作）。否则 TSC 编译器会报 ts(10002) 的警告⚠️。

![](https://i.loli.net/2020/07/27/2ahxfNB7jLCbTyY.png)

> 注意：从远程 URL 加载的模块或文件应当是不可变且可缓存的。

## 为什么跑路？

ry 大佬自己在演讲中也坦诚，短时间内Deno还无法替代NodeJS，而且还有很长的路要走，所以实际项目还是要用Node。相信大家从 deno和node的npm下载趋势对比也能有所判断。

![](https://i.loli.net/2020/07/27/KAgnsMy5zt98oOH.png)

但是时机成熟我胡汉三还会回来的，文章名字我都想好了《Deno从跑路到实战》，我相信以ry的勤奋，这个等待不会很久，大家从下图自行感受什么叫优秀的人还比你努力吧：

![](https://i.loli.net/2020/07/27/QLXvUIts1a8J9Gl.png)

## 参考资料

- [我对 Node.js 遗憾的十件事 - Ryan Dahl - JSConf EU 2018](https://www.bilibili.com/video/BV1fp4y1Q7bi/)
- [Deno快速入门指南](https://www.bilibili.com/video/BV1A5411x7bg)
- [Deno 运行时入门教程：Node.js 的替代品](https://www.ruanyifeng.com/blog/2020/01/deno-intro.html)
- [深入理解-node-js-的設計錯誤-從-ryan-dahl-的演講中反思](https://urlify.cn/JRrM32)
- [Node 之父 Ryan Dahl：我不想被定义](https://www.infoq.cn/article/2017/09/Node-Ryan-Dahl)
- [Deno中文网](https://deno.bootcss.com/)
- [Deno中文社区](https://denocn.org/)

## Catch Me

> GitHub: [youngjuning](https://github.com/youngjuning) | 微信: `yang_jun_ning` | 公众号: `前端早茶馆` | 邮箱: youngjuning@aliyun.com

|                             微信                             |                             投食                             |                            公众号                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://i.loli.net/2020/02/22/q2tLiGYvhIxm3Fl.jpg" width="200px"/> | <img src="https://i.loli.net/2020/02/23/q56X1eYZuITQpsj.png" width="200px"/> | <img src="https://i.loli.net/2020/07/29/BiWte5F2xjnI1f8.jpg" width="200px"/> |

本文首发于[杨俊宁的博客](https://youngjuning.js.org/)，创作不易，您的点赞👍评论是我坚持的动力！！！

[🏆 技术专题第一期 | 聊聊 Deno的一些事儿......](https://juejin.im/post/5f1d1d97f265da22b6495ed2)
