---
title: Jest单元测试入门指南
date: 2020-10-16 15:23:13
categories:
  - [工具]
tags:
  - Jest
  - 单元测试
  - 端到端测试
---

![](https://i.loli.net/2020/11/18/cnIAURFYCOsGfDk.png)

<!--more-->

## 工具介绍

- jest：Jest是一个令人愉快的 JavaScript 测试框架，专注于简洁明快。
- enzyme：Enzyme是用于React的JavaScript测试实用程序，可以更轻松地测试React组件的输出。您还可以根据给定的输出进行操作，遍历并以某种方式模拟运行时。
- jest-enzyme: Jest assertions for enzyme
- enzyme-adapter-react-16: React Native 测试所需的桥接器
- enzyme-to-json: 将 Enzyme wrappers 转换成符合 Jest 快照测试的JSON格式。
- react-native-mock-render: A fully mocked and test-friendly version of react native

## 安装依赖

```shell
$ yarn add jest -D
# babel
$ yarn add babel-jest -D
# enzyme
$ yarn add enzyme enzyme-adapter-react-16 enzyme-to-json -D
# react-native-mock-render
$ yarn add react-native-mock-render -D
# types
$ yarn add @types/enzyme @types/jest @types/react @types/react-native -D
```

## 配置

### jest.config.js

- setupFilesAfterEnv：使用Jest运行安装文件以配置Enzyme和适配器（如下文`jest.setup.js`中所示），之前是`setupTestFrameworkScriptFile`，也可以使用`setupFiles`
- snapshotSerializers：推荐使用序列化程序使用`enzyme-to-json`，它的安装和使用非常简单，并允许您编写简洁的快照测试。

```js
module.exports = {
  preset: 'react-native',
  verbose: true,
  collectCoverage: true,
  moduleNameMapper: { // for https://github.com/facebook/jest/issues/919
    '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
    '^[@./a-zA-Z0-9$_-]+\\.(png|gif)$': 'RelativeImageStub',
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  snapshotSerializers: ['enzyme-to-json/serializer']
};
```

> Jest 在 [24.1.0](https://stackoverflow.com/questions/55752673/option-setuptestframeworkscriptfile-was-replaced-by-configuration-setupfilesa) 之后只能使用 `setupFilesAfterEnv`

### jest.setup.js

```js
import 'react-native';
import 'react-native-mock-render/mock';
import 'react-native/Libraries/Animated/src/bezier'; // for https://github.com/facebook/jest/issues/4710
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
```

## 覆盖率指标

- [代码覆盖率工具 Istanbul 入门教程](https://www.ruanyifeng.com/blog/2015/06/istanbul.html)

- Statements（stmts）：表达式覆盖率，是不是每个表达式都执行了？
- Branches（Branch）：分支覆盖率，是不是每个if代码块都执行了？
- Functions（Funcs）：函数覆盖率，是不是每个函数都调用了？
- Lines（Lines）：行覆盖率，是不是每一行都执行了？

## enzyme 入门

- shallow render（shallow）
- full render（mount）
- static render（render）

## 常用函数

### jest.useFakeTimers()

- [Jest 中 如何测试 setTimeout](https://yes-1-am.gitbook.io/blog/ce-shi/jest-zhong-ru-he-ce-shi-settimeout)

## 组件测试

### 生命周期测试

- [组件生命周期测试 - jest+enzyme](http://echizen.github.io/tech/2017/04-24-component-lifycycle-test)

### UI测试

### 组件函数调用

## FAQ

### 如何忽略某一块代码

添加以下格式的注释到要忽略的代码块前即可：

```js
/* istanbul ignore next */
```

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

### How to Remove warnings when rendering react-native components

- 参考自：[Remove warnings when rendering react-native components](https://github.com/enzymejs/enzyme/issues/831#issuecomment-352934963)

```js
describe('mounting', () => {
    const origConsole = console.error;
    beforeEach(() => {
      console.error = () => {};
    });
    afterEach(() => {
      console.error = origConsole;
    });
    it ...... 
       mount....
});
```

### 其他 issues

- @enzyme
  - [Create Adapter for React Native & React 16](https://github.com/enzymejs/enzyme/issues/1436)
  - [Can't simulate press event in react-native](https://github.com/enzymejs/enzyme/issues/991)
  - [Shallow with New React Context API. Consumer not getting context](https://github.com/enzymejs/enzyme/issues/1636)
- @jest
  - [requiring image in react-native](https://github.com/facebook/jest/issues/919) @react-native
  - [ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.](https://github.com/facebook/jest/issues/6434)

## 其他选型

### react-test-renderer & react-dom/test-utils

### react-native-testing-library

### Sinon

- [Testing React with Jest, Enzyme, and Sinon](https://www.leighhalliday.com/testing-react-jest-enzyme-sinon)
- [Sinon 入门,看这篇文章就够了](https://segmentfault.com/a/1190000010372634)

## 参考链接

- [Difference between enzyme, ReactTestUtils and react-testing-library](https://stackoverflow.com/questions/54152562/difference-between-enzyme-reacttestutils-and-react-testing-library)
- [利用 Jest 为 React 组件编写单元测试](https://loveky.github.io/2018/06/05/unit-testing-react-component-with-jest/)
- [Enzyme笔记](http://blog.leanote.com/post/haitang.reg@qq.com/Enzyme%E7%AC%94%E8%AE%B0)
- [使用jest+enzyme测试react组件](https://github.com/frontend9/fe9-library/issues/244)
- [使用Jest测试JavaScript(Mock篇)](https://zhuanlan.zhihu.com/p/47009664)
- [使用 Jest 和 Enzyme 测试 React 组件](https://juejin.im/post/6844903828228161544)
- [一杯茶的时间，上手 Jest 测试框架](https://tuture.co/2020/04/04/9e7496d/)
- [用jest+enzyme來寫Reactjs的單元測試吧！](https://github.com/Hsueh-Jen/blog/issues/1)
- [Jest单元测试配置和所遇问题解决办法](https://github.com/yinxin630/blog/issues/22)
- [使用Jest和Enzyme模拟自定义事件](https://www.thinbug.com/q/49772497)
- [Enzyme is not finding component by props](https://stackoverflow.com/questions/40776121/enzyme-is-not-finding-component-by-props)
- [TypeError: Cannot read property 'Object.<anonymous>' of null](https://github.com/facebook/jest/issues/4710)
- [Jest - how to test if a component does not exist?](https://stackoverflow.com/questions/46252396/jest-how-to-test-if-a-component-does-not-exist)
- [How to test React with Jest & Enzyme](https://www.robinwieruch.de/react-testing-jest-enzyme)
- [Better Testing with Enzyme](https://www.newline.co/fullstack-react/30-days-of-react/day-25/)
- [react前端自动化测试： jest + enzyme](https://www.cnblogs.com/susu8/p/9512393.html)
- [React Enzyme: Testing componentWillReceiveProps, the Clean Way](https://medium.com/@tjhubert/react-enzyme-testing-componentwillreceiveprops-the-clean-way-4dba4f02be0b)
- [Test suite failed to run. "RelativeImageStub" error](https://github.com/facebook/jest/issues/9680)
- [It looks like you called `mount()` without a global document being loaded.](https://github.com/enzymejs/enzyme/issues/341)
- [Refs not working in component being shallow rendered](https://github.com/enzymejs/enzyme/issues/316)
- [Testing React Component using Enzyme + Jest Part 1: Setup](https://ttfb.test.traveloka.com/testing-react-component-using-enzyme-jest-part-1/)


### react native

- [携程租车React Native单元测试实践](https://cloud.tencent.com/developer/news/578421)
- [Jest+enzyme测试React-native项目（从配置到案例）](https://juejin.im/post/6844903929998737416)

### 实战

- [react-native-elements](https://github.com/youngjuning/react-native-elements)
- [JavaScript 测试系列实战（三）：使用 Mock 模拟模块并处理组件交互](https://my.oschina.net/u/4088983/blog/4544477)