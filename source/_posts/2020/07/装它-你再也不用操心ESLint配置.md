---
title: 装它|再也不用操心ESLint配置
date: 2020-07-24 07:33:15
categories:
 - [前端开发]
tags:
 - [ESLint]
---

![](https://i.loli.net/2020/07/24/aGtwAFpOXledCUc.png)

<!--more-->

> 大家好，我是俊宁，[wx-promise-pro](https://github.com/youngjuning/wx-promise-pro) 的作者，微信`yang_jun_ning`，公众号`前端早茶馆`

大家是否像我一样苦 ESlint 久已呢？只是配置一个代码格式化工具，动辄10几个依赖。依赖之间又相互依赖，版本错误，配置顺序错误都会导致失效。

就算熟练掌握了 ESLint 配置，但是换了项目，又要重新配置。如果是从React切换到Vue项目，情况会更糟糕，你不得不额外做一些无意义的配置工作。而我今天带来的 [@youngjuning/eslint-config-airbnb](https://github.com/youngjuning/eslint-config-airbnb) 便是用来把你从繁琐的 ESLint 配置工作中解放出来的一款插件。

## 介绍

一款基于 airbnb 的强大的 eslint 配置插件，支持 vue、jsx、js、ts、tsx、html、jest，致力于把你从繁琐的 ESLint 配置工作中解放出来。

## 安装

> 首先，为了避免冲突，请移除项目中已存在的配置，你可以保留 rules

```sh
$ yarn add -D @youngjuning/eslint-config-airbnb
```

## 配置

Add to your eslint config (`.eslintrc.js`):

```js
module.exports = {
  root: true,
  extends: '@youngjuning/airbnb',
}
```

### react native

```js
module.exports = {
  root: true,
  extends: '@youngjuning/airbnb',
  env: {
    'react-native/react-native': true,
  },
}
```

### vue with typescript

```js
module.exports = {
  root: true,
  extends: '@youngjuning/airbnb',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
}
```

## 更多

### .eslintignore

```
!.eslintrc.js
!.prettierrc.js
```

### .prettierrc.js

```js
module.exports = {
  ...require('@youngjuning/eslint-config-airbnb/.prettierrc.js'),
}
```

### .prettierignore

```
**/node_modules/*
```

### .editorconfig

```
# EditorConfig is awesome: http://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[*.gradle]
indent_size = 4

[BUCK]
indent_size = 4
```

## yorkie & lint-staged

```sh
$ yarn add -D yorkie lint-staged
```

```json
{
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "git add"
    ],
    // you can add wxml/html...
    "*.{less,md,json}": [
      "prettier --write",
      "git add"
    ]
  },
}
```

## 联系作者

> 本文首发于[杨俊宁的博客](https://youngjuning.js.org/)

|                           作者微信                           |                           赞赏作者                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://i.loli.net/2020/02/22/q2tLiGYvhIxm3Fl.jpg" width="200px"/> | <img src="https://i.loli.net/2020/02/23/q56X1eYZuITQpsj.png" width="200px"/> |
