---
title: 利用Metro配置React Native端口
date: 2020-02-25 16:02:10
categories:
  - [跨平台, React Native]
tags:
  - metro
---

当我们执行 `react-native start` 命令时，React Native 会启动一个默认端口号为 `8081`的本地服务，该 `8081` 的服务就是React Native项目的一个本地 Node 服务器，用于提供 JSBundle 包和一些静态资源。这一切都是 React Native 帮开发者配置好的，一切都是那么简便。

本文旨在告诉大家现在我们只需要简单地对 Metro 进行配置即可修改默认的版本号。

<!--more-->

我翻阅了一下网上的方案，都太麻烦了，想着这功能官方不该提供可配置的吗？于是翻阅了官方的脚手架工具[@react-native-community/cli](https://github.com/react-native-community/cli)。打开[loadMetroConfig.ts](https://bre.is/hDtBSjob) 文件我找到了以下代码：

```ts
server: {
  port: Number(process.env.RCT_METRO_PORT) || 8081,
},
```

当我看到 `RCT_METRO_PORT` 这个属性，顿感这玩意和项目根目录的 `metro.config.js` 有关系。于是照猫画虎，在这个文件中添加了一下配置：

```js
module.exports = {
  ...
  server: {
    port: 8082,
  },
}
```

抱着试一试的心态，运行了 `react-native run-android`,运行成功：

<img src="https://i.loli.net/2020/02/25/Zcs2rIDk5F9hoUS.png" style="zoom:60%;" />

知其然，知其所以然，这个为什么可行呢？打开 metro 的官方文档，我找到了下面的内容：

<img src="https://i.loli.net/2020/02/25/KDgRdMbToZLB1Vs.png" style="zoom:67%;" />

现在 metro 已经接手了所有 React Native 的打包任务，后期遇到任何打包相关的问题，都可以先阅读一下 Metro 的文档进行解决。顺便吐槽一下，这么基础的设施，竟然没有中文翻译的文档。

## 联系作者

|                           作者微信                           |                           知识星球                           |                           赞赏作者                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://user-gold-cdn.xitu.io/2020/2/24/17074acbb24c7412?w=200&h=200&f=jpeg&s=17183" style="width:200px"/> | <img src="https://user-gold-cdn.xitu.io/2020/2/24/17074acbb26af8e1?w=200&h=200&f=png&s=39093" style="width:200px"/> | <img src="https://user-gold-cdn.xitu.io/2020/2/24/17074acbb338c643?w=698&h=700&f=png&s=315492" style="width:200px"/> |
