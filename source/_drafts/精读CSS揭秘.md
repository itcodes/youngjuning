---
title: 精读CSS揭秘
date: 2020-08-06 08:30:35
categories:
  - [前端开发,CSS]
tags:
  - CSS3
---

![](https://i.loli.net/2020/08/06/3pijNMR12rt6nCT.png)

<!--more-->

## 背景与边框

本章涉及 `background-clip` 等知识点。

### 半透明边框

> view demo on [codepen](https://codepen.io/youngjuning/pen/KKzKroB)

CSS 背景的工作原理是默认延伸到border区域的，CSS3 中，我们可以使用 `background-clip` 属性来调整这个默认行为带来的不便。将它设为 `padding-box`，便可以不让背景侵入边框所在的范围。

```css
body {
  background: black;
}
.box {
  background: pink;
  background: padding-clip;
  border: 10px solid rgba(255,255,255,.5);
}
```

## Catch Me

> GitHub: [youngjuning](https://github.com/youngjuning) | 微信: `yang_jun_ning` | 公众号: `前端早茶馆` | 邮箱: youngjuning@aliyun.com

本文首发于[杨俊宁的博客](https://youngjuning.js.org/)，创作不易，您的点赞👍是我坚持的动力！！！
