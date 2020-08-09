---
title: UmiJS开发技巧
date: 2020-06-08 10:17:55
categories:
 - [前端,React]
tags:
 - UmiJS
---

![](https://i.loli.net/2020/06/23/LYNpFyiax7mT1ZB.png)

<!--more-->

鉴于 UmiJS 是重度的封装了很多工具和功能，对于刚接触的人形成了一层技术壁垒（大佬请忽略这句话）。所以我总结了使用UmiJS 开发中遇到的坑和技巧。

## 本地开发 umi dev 时关闭 mock

> 参考: [希望本地开发 umi dev 时可以关闭 mock](https://github.com/umijs/umi/issues/486)

方案一（推荐）：在 npm scripts 中加入以下指令：

```json
{
  "scripts": {
    "dev": "MOCK=none umi dev"
  }
}
```

方案二：在 `.env` 文件里 设置 `MOCK=none` 也可以关闭

## jsx无法转到定义处

在 `jsconfig.json` 文件中进行如下配置：

```json
{
  "compilerOptions": {
    "jsx": "react"
  }
}
```

## 在umi中如何访问静态资源

在umi框架中，图片等静态资源主要放到三个地方：

1. 在 `/public` 目录下，一般放共享资源。
2. 在 `/src/assets/` 目录下，一般放全局静态资源。
3. 在 `/src/pages/` 里的各个页面目录下，放在这里的好处是更符合组件化开发的思想，便于拷贝复用。

由于静态资源会受 `context.config.publicPath` 的影响，所以在 `document.ejs` 中应该这样引入比较安全：

```html
<script type="text/javascript" src="<%= context.config.publicPath %>ol.js" />
```

## 如何访问静态图片

1、如果在/public目录下的静态图片，可以直接输入绝对路径，假设/public/yay.jpg,访问方式如下：

`<img src="/yay.jpg" />`

注意：以上必须构建后在dist中才能看到。

2、在 `/src/assets` 和 `/src/pages/` 目录下的图片，不能通过输入绝对路径访问，必须先 `import` 导入，才能访问。或者 `require` 导入。比如 `/src/assets/yay.jpg` 需：

```jsx
import yayImg from '/src/assets/yay.jpg';
<img src={yayImg} />

<img src={require('/src/assets/yay.jpg')}
```

为什么会这样呢？主要是因为构建时，`/public` 目录下的文件会原样复制到 `/dist/` 目录下，而 `/src/assets/` 和 `/src/pages/` 目录下的文件会被改名并复制到 `/dist/` 下。

## react-router三种传参方式

> 参考: [react-router三种传参方式](https://www.kelede.win/posts/react-router%E4%B8%89%E7%A7%8D%E4%BC%A0%E5%8F%82%E6%96%B9%E5%BC%8F/)

```jsx
import { Component } from 'react'
import router from 'umi/router'

const RouterDemo = () => {
  const onOk = () => {
    router.push({
      pathname: 'test/router',
      // 点击之后，页面会跳转且地址上会跟上query的参数，?id=1&code=123
      // 获取方式传值内容的方式: this.props.location.query
      query: {
        id: '1',
        code: '123',
      },
      // 点击之后，页面会跳转
      // 通过this.props.location.params可以获得params的值
      // params可以为其他名字，如text、nihao等，不一定是params
      // 刷新页面后，params的值会丢失。
      params: {
        d: '1',
        code: '123',
      },
      // 使用state传值和params传值一样，都不会再url中显示出来
      // state传值与params传值的区别是state传值刷新页面值还在，而使用params传值刷新后值不没有了。
      state: {
        d: '1',
        code: '123',
      },
    })
  }
  return <div onClick={this.onOk}>点击测试</div>
}
```

## 修改浏览器上方图标

> 参考: [HTML 配置模板](https://v2.umijs.org/zh/guide/html-template.html#配置模板)

```html
<!-- 图片在 /public 下 -->
<link rel="icon" type="image/x-icon" href="<%= context.publicPath %>favicon.png" />
<!-- 图片在 /src/assets/ 下-->
<link rel="icon" type="image/x-icon" href="<%= context.publicPath %>static/favicon.png" />
```

## 支持 ie11

> 参考: [ie11兼容问题](https://github.com/umijs/umi/issues/1394)

配置浏览器最低版本，会自动引入 polyfill 和做语法转换，配置的 targets 会和合并到默认值，所以不需要重复配置:

```js
// umi默认兼容最低浏览器版本
// Default: { chrome: 49, firefox: 45, safari: 10, edge: 13, ios: 10 }
export default {
  targets: {
    ie: 11,
  },
};
```

## 编译 node_modules 下的包

### UmiJS 2.x

> 参考: [How to configure extraBabelIncludes](https://github.com/umijs/umi/issues/2117#issuecomment-539982434)

```js
const path = require('path');
{
  extraBabelIncludes: [path.resolve(__dirname, 'node_modules/<package_name>')],
}
```

### UmiJS 3.1+

> 参考: [nodeModulesTransform](https://umijs.org/zh-CN/config#nodemodulestransform-31)、[如何做编译提速](https://umijs.org/zh-CN/guide/boost-compile-speed)

UmiJS 3 删除了 `extraBabelIncludes` 和 `es5ImcompatibleVersions`，`node_modules` 也走 babel 编译后就没有意义了，无需配置

UmiJS 3 默认编译 `node_modules` 下的文件，带来一些收益的同时，也增加了额外的编译时间。如果不希望 `node_modules` 下的文件走 babel 编译，可通过以下配置减少 40% 到 60% 的编译时间。

```js
export default {
  nodeModulesTransform: {
    type: 'none',
    exclude: [], // 忽略的依赖库，包名，暂不支持绝对路径；可通过 exclude 配置添加额外需要编译的
  },
}
```

## 并行运行任务

### call

> 参考: [求教多个异步的请求问题？](https://github.com/dvajs/dva/issues/756#issuecomment-317770608)、[同时执行多个任务](https://redux-saga-in-chinese.js.org/docs/advanced/RunningTasksInParallel.html)

`yield` 指令可以很简单的将异步控制流以同步的写法表现出来，但与此同时我们将也会需要同时执行多个任务，我们不能直接这样写：

```js
// 错误写法，effects 将按照顺序执行
const users = yield call(fetch, '/users')
const repos = yield call(fetch, '/repos')
```

由于第二个 effect 将会在第一个 call 执行完毕才开始。所以我们需要这样写：

```js
// 正确写法, effects 将会同步执行
*effects({}, { all, call }) {
  const [users, repos] = yield all([
    call(fetch, '/users'),
    call(fetch, '/repos')
  ])
}
```

当我们需要 `yield` 一个包含 effects 的数组， generator 会被阻塞直到所有的 effects 都执行完毕，或者当一个 effect 被拒绝 （就像 `Promise.all` 的行为）。

### put

> 参考: [yield all中放put而出现的问题](https://github.com/dvajs/dva/issues/2094)

```js
*effects({}, { all, call }) {
  const [users, repos] = yield all([
    yield put({ type: 'getUsers' }),
    yield put({ type: 'getRepos' })
  ])
}
```

或者使用 `put.resolve`:

```js
*effects({}, { all, call }) {
  const [users, repos] = yield all([
    put.resolve({ type: 'getUsers' }),
    put.resolve({ type: 'getRepos' })
  ])
}
```

## 局部覆盖antd 样式

由于业务的个性化需求，我们经常会遇到需要覆盖组件样式的情况，这里举个简单的例子。

antd Select 在多选状态下，默认会展示所有选中项，这里我们给它加一个限制高度，超过此高度就出滚动条。

```tsx
<Select
  mode="multiple"
  style={{ width: 300 }}
  placeholder="Please select"
  className={styles.customSelect}
>
  {children}
</Select>
```

```css
.customSelect {
  :global {
    .ant-select-selection {
      max-height: 51px;
      overflow: auto;
    }
  }
}
```

方法很简单，有两点需要注意：

- 引入的 antd 组件类名没有被 CSS Modules 转化，所以被覆盖的类名 `.ant-select-selection` 必须放到 `:global` 中。
- 因为覆盖是全局性的。为了防止对其他 Select 组件造成影响，所以需要包裹额外的 className 限制样式的生效范围。

## 优化包大小

> 参考: [H5 分包实现首屏加载时间优化](https://juejin.im/post/5ef8581ce51d4534c14d9a5f)、[webapck4 玄妙的 SplitChunks Plugin](https://juejin.im/post/5c08fe7d6fb9a04a0d56a702)、[请问如何单独打包组件](https://github.com/umijs/umi/issues/3535#issuecomment-617590579)

### UmiJS 2.x

```js
{
  // 忽略 moment 的 locale 文件，用于减少尺寸。
  // https://v2.umijs.org/zh/config/#ignoremomentlocale
  ignoreMomentLocale: true,
  // 配置是否开启 treeShaking，默认关闭。
  // https://v2.umijs.org/zh/config/#treeshaking
  treeShaking: true,
  // 通过 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的 API 扩展或修改 webpack 配置。
  // https://v2.umijs.org/zh/config/#chainwebpack
  chainWebpack(config) {
    config.optimization.splitChunks({
      chunks: 'all',
      automaticNameDelimiter: '～',
      name: true,
      minSize: 30000,
      minChunks: 1,
      cacheGroups: {
        echarts: {
          name: 'echarts',
          test: /[\\/]node_modules[\\/](echarts)[\\/]/,
          priority: -9,
          enforce: true,
        },
        antd: {
          name: 'antd',
          test: /[\\/]node_modules[\\/](@ant-design|antd|antd-mobile)[\\/]/,
          priority: -10,
          enforce: true,
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -11,
          enforce: true,
        },
      },
    });
  },
  plugins: [
    [
      // 这是官方封装的一个插件集，包含 18 个常用的进阶功能。
      // https://v2.umijs.org/zh/plugin/umi-plugin-react.html#%E5%AE%89%E8%A3%85
      'umi-plugin-react',
      {
        // 默认是 ['umi']，可修改，比如做了 vendors 依赖提取之后，会需要在 umi.js 之前加载 vendors.js
        // https://v2.umijs.org/zh/plugin/umi-plugin-react.html#chunks
        chunks: ['vendors', 'antd', 'echarts', 'umi'],
      },
    ],
  ],
}
```

### UmiJS 3.x

> 参考 [升级 umi-plugin-react 为 @umijs/preset-react](https://umijs.org/zh-CN/docs/upgrade-to-umi-3#%E5%8D%87%E7%BA%A7-umi-plugin-react-%E4%B8%BA-umijspreset-react)

由于 Umi 3 的配置方式是拍平的方式，还需要修改配置:

```js
{
  // 忽略 moment 的 locale 文件，用于减少尺寸。
  // https://v2.umijs.org/zh/config/#ignoremomentlocale
  ignoreMomentLocale: true,
  // 配置是否开启 treeShaking，默认关闭。
  // https://v2.umijs.org/zh/config/#treeshaking
  treeShaking: true,
  // 通过 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) 的 API 扩展或修改 webpack 配置。
  // https://v2.umijs.org/zh/config/#chainwebpack
  chainWebpack(config) {
    config.optimization.splitChunks({
      chunks: 'all',
      automaticNameDelimiter: '～',
      name: true,
      minSize: 30000,
      minChunks: 1,
      cacheGroups: {
        echarts: {
          name: 'echarts',
          test: /[\\/]node_modules[\\/](echarts)[\\/]/,
          priority: -9,
          enforce: true,
        },
        antd: {
          name: 'antd',
          test: /[\\/]node_modules[\\/](@ant-design|antd|antd-mobile)[\\/]/,
          priority: -10,
          enforce: true,
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -11,
          enforce: true,
        },
      },
    });
  },
  // https://umijs.org/zh-CN/config#chunks
  chunks: ['vendors', 'antd', 'echarts', 'umi'],
}
```

## momentjs

### 使用中文配置

> 参考: [antd design国际化配置为中文时，日期组件中月与星期显示为英文，其他显示为中文](https://blog.csdn.net/hu_lanlan/article/details/91043696)

```js
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
...

return <LocaleProvider locale={zh_CN}><App /></LocaleProvider>;
```

### 替换 momentjs

> 参考: [antd-dayjs-webpack-plugin](https://github.com/ant-design/antd-dayjs-webpack-plugin)、[替换 Moment.js](https://ant.design/docs/react/replace-moment-cn)、[基于umi、antd的前端工程优化实践](https://zhuanlan.zhihu.com/p/136510620)

请先删除 `ignoreMomentLocale: true` 配置再进行以下操作：

```sh
yarn add antd-dayjs-webpack-plugin -D
```

```js
export default {
  chainWebpack(config) {
    // antd moment -> dayjs
    // 如果在 Ant Design 3.x 的项目中使用本插件，需要传入以下配置，指定 preset。
    config.plugin('moment2dayjs').use('antd-dayjs-webpack-plugin', [
      {
        preset: 'antdv3'
      }
    ])
  }
}
```

如果项目中需要使用中文语言，还要引入dayjs的中文语言包并与antd的ConfigProvider配合服用。

```js
// 设置dayjs中文
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
export default ({children}) => <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
```

通过上述配置后，使用DatePicker组件拿到的日期与之前一致，但可以直接使用dayjs的API操作日期，moment不复存在。最终dayjs打包体积为14.64KB，减小了330KB之多。

注：目前dayjs@1.8.20后有个bug会导致替换后WeekPicker显示不正常，1.8.21版本之后已修复。

## dva-loading 使用

> 参考: [dva-loading 实践用法](https://www.jianshu.com/p/61fe7a57fad4)

loading 分为四种使用情况，下面依次用代码展示：

**1、全局**

监听的是应用中所有 effect 是否执行完毕，若执行完毕。loading 的值就变为 `false`。


```js
import React from 'react'
const {useSelector,useDispatch} = 'dva'
import {Spin} from 'antd'
const DemoPage = () => {
  const {loading} = useSelector(stores => ({
    loading: stores.loading
  }))
  return (
    <Spin spinning={loading.global}/>
  )
}
```

**2、model**

监听某个模块的所有 effect 是否执行完毕，若执行完毕。loading 的值就变为 `false`。

```js
import React from 'react'
const {useSelector,useDispatch} = 'dva'
import {Spin} from 'antd'
const DemoPage = () => {
  const {loading,demoModel} = useSelector(stores => ({
    loading: stores.loading,
    demoModel: stores.loading,
  }))
  return (
    <Spin spinning={loading.models.demoModel}/>
  )
}
```

**3、effect:**

监听某个 effect 是否执行完毕，若执行完毕。loading 的值就变为 `false`。

```js
import React from 'react'
const {useSelector,useDispatch} = 'dva'
import {Spin} from 'antd'
const DemoPage = () => {
  const {loading,demoModel} = useSelector(stores => ({
    loading: stores.loading,
    demoModel: stores.loading,
  }))
  return (
    <Spin spinning={loading.effects['demoModel/effect1']/>
  )
}
```

**4、effects**

如果想监听某个 model 中的某几个 effect，可以使用 `||` 连接，当全部执行完毕时，返回的是 `undefined`，所以必须在末尾拼接 `|| false`：

```js
import React from 'react'
const {useSelector,useDispatch} = 'dva'
import {Spin} from 'antd'
const DemoPage = () => {
  const {loading,demoModel} = useSelector(stores => ({
    loading: stores.loading,
    demoModel: stores.loading,
  }))
  return (
    <Spin spinning={
      loading.effects['demoModel/effect1'] ||
      loading.effects['demoModel/effect3'] ||
      loading.effects['demoModel/effect4'] || false
      }
    />
  )
}
```

## 关闭 Umi UI

umi 项目默认启动 `umi ui`，会出现一个mini图标气泡浮在右下角，关闭有两种方式，一种是直接用样式 `display none`。另一种是在启动时加上 `UMI_UI=none` 环境变量。

```json
{
  "scripts": {
    "start": "UMI_UI=none umi dev",
    "dev": "MOCK=none UMI_UI=none umi dev",
  }
}
```

## 配置多环境

> 参考: [umi如何配置多环境](https://github.com/umijs/umi/issues/1142#issuecomment-435803746)、[umi define config](https://umijs.org/zh-CN/config#define)

1、安装 cross-env 插件: `yarn add cross-env -D`

2、在 `.umirc.js` 文件中添加 `define`

```js
export default {
  define: {
    // 添加这个自定义的环境变量
    // 本地开发环境：dev，test环境：test，生产环境：prod
    "process.env.PRO_ENV": process.env.PRO_ENV
  },
}
```

3、package.json 添加 npm scripts

```json
{
  "scripts": {
    "start": "cross-env PRO_ENV=dev umi dev",
    "test": "cross-env PRO_ENV=test umi dev",
    "build": "cross-env PRO_ENV=prod umi build",
  }
}
```

## Catch Me

> GitHub: [youngjuning](https://github.com/youngjuning) | 微信: `yang_jun_ning` | 公众号: `前端早茶馆` | 邮箱: youngjuning@aliyun.com

|                           微信                           |                           投食                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://i.loli.net/2020/02/22/q2tLiGYvhIxm3Fl.jpg" width="200px"/> | <img src="https://i.loli.net/2020/02/23/q56X1eYZuITQpsj.png" width="200px"/> |

本文首发于[杨俊宁的博客](https://youngjuning.js.org/)，创作不易，您的点赞👍是我坚持的动力
