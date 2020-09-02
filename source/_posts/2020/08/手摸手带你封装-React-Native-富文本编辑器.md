---
title: 手摸手带你封装 React Native 富文本编辑器
date: 2020-08-27 21:52:32
categories:
  - [Hybrid,React Native]
tags:
  - quill
  - zx-editor
  - 富文本编辑器
---

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6cc0c871ddd47d0a27b4d146273b807~tplv-k3u1fbpfcp-zoom-1.image)

<!--more-->

大家好，我是俊宁，最近研究了下如何实现一个 React Native 富文本编辑器，并产出了两个富文本编辑器插件，特此分享一下我是如何实现的。

## 背景

你是否接到过在 React Native 项目里实现富文本编辑的需求呢？你是否像我一样找不到一款合适的 React Native 富文本编辑器插件呢？你是否想过自己实现一款富文本编辑器呢？

曾经就有掘友加我微信请教我 React Native 下如何实现富文本编辑器。当时我就说等等我，我将要用 Webview 封装一个移动端富文本编辑器。然而，那是三个月以前的flag了。那个掘友是谁我也不记得了！🐶🐶🐶

## React Native Webview

实现一个React Native 富文本编辑器我有两个思路。一个是基于已有的原生编辑器，通过桥接来实现；另一个是基于已有的H5编辑器通过WebView实现。基于H5的编辑器比较多，所以我选用了第二个方案。

### 安装

```sh
$ yarn add react-native-webview
# pod install for ios
$ cd ios & pod install
```

### 使用

#### 引入 URL 资源

这是最常见的 WebView  用例。

```jsx
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{ uri: 'https://infinite.red' }}
      />
    );
  }
}
```

#### 加载本地 HTML 文件

```jsx
import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const source={Platform.OS === 'ios' ? require('./assets/quill.html') : { uri: 'file:///android_asset/quill.html' }};

class MyWeb extends Component {
  render() {
    return <WebView source={source} />;
  }
}
```

- iOS 直接使用 `require('')` 的形式即可引入本地文件

- Android需要先将文件复制到 `your-project/android/app/src/main/assets/` 文件夹下，然后使用 `{uri: ''}` 的形式引入

#### Web 和 React Native 的通信

1. React Native -> Web:  `injectedJavaScript`、`injectedJavaScriptBeforeContentLoaded` 属性
2. Web -> React Native:  `window.ReactNativeWebView.postMessage` 方法和 `onMessage` 属性

`injectedJavaScriptBeforeContentLoaded` 属性：

这是一个在 web 页面第一次加载前执行的脚本。它只会执行一次，即使页面重载或者导航走了。当你想要往 window、localstorage或者document上注入东西时非常有用。

`window.ReactNativeWebView.postMessage` 方法和 `onMessage` 属性：

`window.ReactNativeWebView.postMessage` 只接受一个参数并且只能是字符串类型。接收数据的是 `event.nativeEvent.data`。

## react-native-quill-editor 封装

> 插件已封装完毕可用，源码在 https://github.com/youngjuning/react-native-quill-editor , 欢迎大佬们使用完善。

### html 文件准备

1. css文件：`https://cdn.quilljs.com/1.3.6/quill.snow.css`
2. js文件：`https://cdn.quilljs.com/1.3.6/quill.min.js`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no">
  <style>
  <!-- 放置CSS文件内容 -->
  </style>
  </style>
</head>

<body>
  <div id="editor"></div>
  <script>
    <!-- 放置js文件内容 -->
  </script>
  <!-- 初始化 quill 编辑器 -->
  <script>
    // 这里的 options 是通过 injectedJavaScriptBeforeContentLoaded 属性注入的
    const quill = new Quill('#editor', window.options)
    quill.on('text-change', function(delta, oldDelta, source) {
      const html = document.querySelector('#editor').children[0].innerHTML
      const message = {
        type: 'onChange',
        message: html,
      }
      // 触发 onMessage 事件
      window.ReactNativeWebView.postMessage(JSON.stringify(message))
    });
  </script>
</body>
</html>
```

### React Native 侧封装

> 注意：这里亮点是通过 `injectedJavaScriptBeforeContentLoaded` 属性实现 options 的自定义配置。

```jsx
import React from 'react'
import { Dimensions, Platform, ViewStyle } from 'react-native'
import { WebView, WebViewMessageEvent } from 'react-native-webview'

type Props = {
  style?: ViewStyle
  defaultValue?: string
  options?: any
  onChange?: (html: string) => void
}

const Quill = (props: Props) => {
  // 默认的quill配置
  const options = JSON.stringify({
    placeholder: '请输入...',
    modules: {
      toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline'], ['image', 'code-block']],
    },
    ...props.options,
    theme: 'snow',
  })
  const injectedJavaScriptBeforeContentLoaded = `window.options=${options}`
  const injectedJavaScript = `document.querySelector('#editor').children[0].innerHTML="${props.defaultValue}"`

  const onMessage = (e: WebViewMessageEvent) => {
    const data = JSON.parse(e.nativeEvent.data)
    if (data.type === 'onChange') {
      props.onChange(data.message)
    }
  }

  return (
    <WebView
      onMessage={onMessage}
      source={Platform.OS === 'ios' ? require('./assets/quill.html') : { uri: 'file:///android_asset/quill.html' }}
      javaScriptEnabled
      injectedJavaScriptBeforeContentLoaded={injectedJavaScriptBeforeContentLoaded}
      injectedJavaScript={injectedJavaScript}
      style={{ height: Dimensions.get('window').height - 42, width: Dimensions.get('window').width, ...props.style }}
    />
  )
}

Quill.defaultProps = {
  style: {},
  defaultValue: '',
  onChange: () => {},
  options: {},
}

export default Quill
```

### 使用体验优化

前面提到的，Android 下边需要先把 html 文件复制到 `your-project/android/app/src/main/assets/` 下并通过 `{uri: 'file:///'}` 的形式引用才会起作用。这就很不美丽了。人家的机制我改不了，只能想办法优化我的插件的用户的体验。我的方法是使用 `postinstall` 方法，在用户 `yarn install` 时，自动复制文件到指定文件夹下，亲测很好用。

```json
{
  "scripts": {
    "postinstall": "cpy 'assets/quill.html' '../../android/app/src/main/assets/'"
  }
}
```

### 调试技巧

本地开发时，有个问题就是如何实时看到自己修改的效果。方案有两个，一个是直接在 RN 项目中写，然后导出指定文件夹。另一个是使用我之前博客提到的[使用 wml 进行npm模块调试真香](https://juejin.im/post/6847902225356980232)。我用的后者，亲测好用，具体配置看博客和源码即可。

<img src="https://i.loli.net/2020/08/27/LvuyxVr3R2mlk9p.png" width="300px" />

本文首发于[杨俊宁的博客](https://youngjuning.js.org/)，创作不易，您的点赞👍是我坚持的动力！！！
