---
title: 从零开发一款Deno插件并发布
date: 2020-08-11 23:40:21
categories:
tags:
---

![](https://i.loli.net/2020/08/12/TBuR1bJgl4azw5n.png)

大家好，我是俊宁，那个写[《Deno从入门到跑路》](https://juejin.im/post/6854573220432248839)和[《基于 Deno 构建 HTTP Server 实践指南》](https://juejin.im/post/6856447982905065486)的作者，本来入手Deno只是为了白嫖掘金的大礼包，为此还挑战了零基础一天入门Deno。但是Deno真香，前后又花了一周的业余时间学习了MongoDB写出了一篇自认很完整的 HTTP Server 实践指南（后端同学轻喷）。

<!--more-->

本文是一篇介绍我如何开发了一款Deno插件并发布到Deno官方插件库的。插件的名字叫Duck，是一款自动扫描controller层并注册路由的小工具。如何使用这个插件请有需要的同学点击logo直达：

[<img src="https://i.loli.net/2020/08/05/XBzRTIeoSnQc5vH.png" width="150"/>](https://deno.land/x/duck@v1.0.1)

## 项目结构

这个项目诞生的因为写[《基于 Deno 构建 HTTP Server 实践指南》](https://juejin.im/post/6856447982905065486)时，为了实现自动扫描controller的功能。借鉴了廖雪峰大佬关于koa的[自动扫描controller](https://github.com/michaelliao/learn-javascript/blob/master/samples/node/web/koa/view-koa/controller.js)，除了使用的语言不一样，实现细节和思路上也不太一样。

```
./
├── LICENSE
├── README.md
├── addAbcControllers.ts
├── addOakControllers.ts
├── addServestControllers.ts
├── mod.ts
└── test
    ├── abc
    │   ├── controllers
    │   │   └── helloworld.ts
    │   └── server.ts
    ├── oak
    │   ├── controllers
    │   │   └── helloworld.ts
    │   └── server.ts
    └── servest
        ├── controllers
        │   └── helloworld.ts
        └── server.ts
```

- `mod.ts`：Deno官方推荐的插件入口文件
- `test`：一些测试的demo
- `add***Controllers.ts`：兼容的常见的Http Server中间件插件，自动判断，不需要用户传参数。

## 实现过程

### 自动扫描controller

> 注意：以下是代码片段，源码请点击开头的那只鸭子查看。

```ts
...
const realPath = Deno.realPathSync(dir);
...
for (const dirEntry of Deno.readDirSync(dir)) {
  if (dirEntry.name.endsWith(".ts") || dirEntry.name.endsWith(".js")) {
    const controller = await import(`file://${realPath}/${dirEntry.name}`);
    const method = controller.method || "get";
    const api = controller.api ||
    dirEntry.name.replace(/(.*\/)*([^.]+).*/ig, "$2");
    router[method](`/${api}`, controller.default);
  }
}
```

- 根据用户传递的 `dir` 获取的文件夹使用 `Deno.realPathSync` 获取真实的绝对路径，这里后边获取文件的时候用。
- 使用 `Deno.readDirSync` 接口读取文件夹下所有的文件，这里做了校验，必须是 `js` 或 `ts` 结尾的文件才可以。
- 使用 `import` 动态导入模块，这里有个坑就是不加 `file://` 前缀的话，实际运行会自动加`https://`。
- 这里假设如果controller没有导出name，自动读取文件名作为api名（这里借鉴了umijs）
- 最后动态把这个controller挂载到router上（router这个也是用户传递进来的）。

### 智能兼容

这个真没啥好说的，就是人工比对了这些插件带的独有的属性来识别是哪款插件的，目前支持 servest、oak、abc这三个关注度比较高的项目。

```ts
export default async function (router: any, dir: string = "controllers") {
  if (router.handle) {
    return  await addServestControllers(router,dir);
  } else if(router.middleware) {
    return  await addAbcControllers(router,dir);
  } else {
    return await addOakControllers(router,dir);
  }
}
```

### 开箱友好

使用duck之后，默认会给两个路由路径，而且`checkHealth`这个是项目必备的接口了基本上（后端同学告诉我的）。

```ts
...
router.get("/", (ctx: any) => {
  ctx.response.body = "Hello Oak!";
}).get("/checkHealth", (ctx: any) => {
  ctx.response.body = "The server is health. Just do it.";
});
...
```

## 发布插件

1、打开 [https://deno.land/x](https://deno.land/x)

2、点击 Add a module

![](https://i.loli.net/2020/08/12/9q5HPhsMZE6utyv.png)

3、按照下图的指引我们需要创建一个托管在GitHub的公有仓库

![](https://i.loli.net/2020/08/12/3alkvjy14qoJsB6.png)

4、起一个好听的名字，趁早注册，不然要被 justjavac 大佬抢完了，可能是怕我这种水逼水插件吧，哈哈哈哈。

![](https://i.loli.net/2020/08/12/SfHVQXqRdL2tF1C.png)

5、后边就是提示你去添加 GitHub 的 webhook，然后就发布成功了，我刚试了一下 superman 还没被注册。

最后狗头镇楼！！！

![](https://i.loli.net/2020/08/11/eJUIZ5l3CT1LPtM.png)

## Catch Me

> GitHub: [youngjuning](https://github.com/youngjuning) | 微信: `yang_jun_ning` | 公众号: `前端早茶馆` | 邮箱: youngjuning@aliyun.com

|                             微信                             |                             投食                             |                            公众号                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://i.loli.net/2020/02/22/q2tLiGYvhIxm3Fl.jpg" width="200px"/> | <img src="https://i.loli.net/2020/02/23/q56X1eYZuITQpsj.png" width="200px"/> | <img src="https://i.loli.net/2020/07/28/6AyutjZ1XI4aUDV.jpg" width="200px"/> |

本文首发于[杨俊宁的博客](https://youngjuning.js.org/)，创作不易，您的点赞👍是我坚持的动力！！！
