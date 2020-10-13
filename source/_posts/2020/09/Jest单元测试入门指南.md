---
title: Jest单元测试入门指南
date: 2020-09-29 15:23:13
categories:
  - [工具]
tags:
  - Jest
  - 单元测试
  - 端到端测试
---

<!--more-->

## Jest 配置

## Matchers（匹配器）

### 普通匹配器

#### toBe

测试值的方法是看是否精确匹配。

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

### toEqual 

检查对象的值是否相等。

```js
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

## 覆盖率指标

- Statements（stmts）：表达式覆盖率，是不是每个表达式都执行了？
- Branches（Branch）：分支覆盖率，是不是每个if代码块都执行了？
- Functions（Funcs）：函数覆盖率，是不是每个函数都调用了？
- Lines（Lines）：行覆盖率，是不是每一行都执行了？

## react-test-renderer & react-dom/test-utils

## enzyme

- shallow render（shallow）
- full render（mount）
- static render（render）

## FAQ

### 如何使用 ES6 的 import 和 export

首先安装 `@babel/plugin-transform-modules-commonjs`

```shell
$ yarn add -D @babel/plugin-transform-modules-commonjs
```

首先新建一个 `babel.config.js` 文件，添加以下内容：

```js
module.exports = {
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
};
```

## 组件测试

### 生命周期测试

### UI测试

### 组件函数调用

## 参考链接

- [3分钟生成开源项目的测试覆盖率](https://zhuanlan.zhihu.com/p/54958391)
- [利用 Jest 为 React 组件编写单元测试](https://loveky.github.io/2018/06/05/unit-testing-react-component-with-jest/)
- [携程租车React Native单元测试实践](https://cloud.tencent.com/developer/news/578421)
- [JavaScript 测试系列实战（三）：使用 Mock 模拟模块并处理组件交互](https://my.oschina.net/u/4088983/blog/4544477)
- [Jest+enzyme测试React-native项目（从配置到案例）](https://juejin.im/post/6844903929998737416)
- [「基于 Jest + Enzyme 的 React 单元测试 | 掘金技术征文 」](https://juejin.im/post/6844903476061814797)
- [使用jest+enzyme测试react组件](https://github.com/frontend9/fe9-library/issues/244)
- [组件生命周期测试 - jest+enzyme](http://echizen.github.io/tech/2017/04-24-component-lifycycle-test)
- [使用Jest测试JavaScript(Mock篇)](https://zhuanlan.zhihu.com/p/47009664)
- [使用 Jest 和 Enzyme 测试 React 组件](https://juejin.im/post/6844903828228161544)
- [expect(jest.fn()).toHaveBeenCalled() error](https://stackoverflow.com/questions/45182959/expectjest-fn-tohavebeencalled-error)
- [Testing custom events react-native](https://stackoverrun.com/cn/q/12348569)
- [React组件中的Enzyme测试事件监听器](https://xbuba.com/questions/52279478)
- [Jest 中 如何测试 setTimeout](https://yes-1-am.gitbook.io/blog/ce-shi/jest-zhong-ru-he-ce-shi-settimeout)
- [代码覆盖率工具 Istanbul 入门教程](https://www.ruanyifeng.com/blog/2015/06/istanbul.html)
- [一杯茶的时间，上手 Jest 测试框架](https://tuture.co/2020/04/04/9e7496d/)
- [用jest+enzyme來寫Reactjs的單元測試吧！](https://github.com/Hsueh-Jen/blog/issues/1)
- [Jest单元测试配置和所遇问题解决办法](https://github.com/yinxin630/blog/issues/22)
- [使用Jest和Enzyme模拟自定义事件](https://www.thinbug.com/q/49772497)
- [Enzyme is not finding component by props](https://stackoverflow.com/questions/40776121/enzyme-is-not-finding-component-by-props)
- [TypeError: Cannot read property 'Object.<anonymous>' of null](https://github.com/facebook/jest/issues/4710)
- [Jest: Ignore lines for code coverage](https://stackoverflow.com/questions/38740165/jest-ignore-lines-for-code-coverage)
- [Jest - how to test if a component does not exist?](https://stackoverflow.com/questions/46252396/jest-how-to-test-if-a-component-does-not-exist)

# 使用Jest和Enzyme进行React Native单元测试

## 工具介绍

- jest
- enzyme：Enzyme是用于React的JavaScript测试实用程序，可以更轻松地测试React组件的输出。您还可以根据给定的输出进行操作，遍历并以某种方式模拟运行时。
- enzyme-adapter-react-16：React Native 测试所需的桥接器
- enzyme-to-json：将 Enzyme wrappers 转换成符合 Jest 快照测试的JSON格式。
- jest-enzyme：Jest assertions for enzyme

## 安装依赖

```shell
$ yarn add jest -D
$ yarn add enzyme enzyme-adapter-react-16 enzyme-to-json -D
$ yarn add @types/react-test-renderer @types/enzyme @types/jest @types/react @types/react-native -D
```

## 配置

### jest.config.js

- setupFilesAfterEnv：使用Jest运行安装文件以配置Enzyme和适配器（如下文`jest.setup.js`中所示），之前是`setupTestFrameworkScriptFile`，也可以使用`setupFiles`
- snapshotSerializers：推荐使用序列化程序使用`enzyme-to-json`，它的安装和使用非常简单，并允许您编写简洁的快照测试。

```js
module.exports = {
  ...
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  ...
};
```

> Jest 在 [24.1.0](https://stackoverflow.com/questions/55752673/option-setuptestframeworkscriptfile-was-replaced-by-configuration-setupfilesa) 之后只能使用 `setupFilesAfterEnv`

### jest.setup.js

```js
import 'react-native';
import 'react-native/Libraries/Animated/src/bezier'; // for https://github.com/facebook/jest/issues/4710
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

### .gitignore

新增忽略快照文件代码：

```
__tests__/__snapshots__/
```

## 忽略

### 忽略整个文件

### 文件内忽略