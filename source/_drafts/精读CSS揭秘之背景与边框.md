---
title: 精读CSS揭秘之背景与边框
date: 2020-08-06 08:30:35
categories:
  - [前端开发,CSS]
tags:
  - CSS3
---

![](https://i.loli.net/2020/08/06/3pijNMR12rt6nCT.png)

<!--more-->

## 背景与边框

### 半透明边框

本节涉及 `background-clip` 等知识点。

> view demo on [codepen](https://codepen.io/youngjuning/pen/KKzKroB)

CSS 背景的工作原理是默认延伸到border区域的，CSS3 中，我们可以使用 `background-clip` 属性来调整这个默认行为带来的不便。将它设为 `padding-box`，便可以不让背景侵入边框所在的范围。

```css
.box {
  background: pink;
  background: padding-clip;
  border: 10px solid rgba(255,255,255,.5);
}
```

### 多重边框

本节涉及 `box-shadow`、`outline`、`outline-offset` 等属性。

#### box-shadow 方案

1. 利用 `box-shadow` 属性第四个参数（扩张半径）控制投影面积，其他两个偏移量和模糊半径都设置为。
2. 利用 `box-shadow` 支持逗号分隔的语法，我们可以创建任意数量的投影。

```css
.box1 {
  width: 100px;
  height: 100px;
  margin: 15px;
  background: yellowgreen;
  border-radius: 5px;
  box-shadow: 0 0 0 10px #655, 0 0 0 15px deeppink,
    0 2px 5px 15px rgba(0, 0, 0, 0.6);
}
```

注意：

1. 投影的行为跟外边框不完全一致，因为它不会影响布局，而且也不会受到 `box-sizing` 属性的影响。不过，你还是可以通过内边距或外边距（这取决于投影是内嵌还是外扩的）来额外模拟出边框
2. 上述代码创建出的假边框出现在元素的**外圈**。它们并不会响应鼠标事件，比如悬停或点击。如果这一点非常重要，你可以给 `box-shadow` 属性加上 `inset` 关键字，来使投影绘制在元素的**内圈**。请注意，此时你需要增加额外的内边距来腾出足够的空隙。

#### outline 方案

如果你只需要两层边框，那就可以先设置一层常规边框，再加上 `outline`（描边）属性来产生外层的边框。

该方案还可以利用 `outline-offset` 属性来控制描边和元素边缘之间的距离（可以为负值），下面代码的效果就是一个缝边的效果。

```css
.box2 {
  width: 100px;
  height: 100px;
  margin: 5px;
  background: yellowgreen;
  border-radius: 5px;
  outline: 1px dashed deeppink;
  outline-offset: -10px;
}
```

## Catch Me

> GitHub: [youngjuning](https://github.com/youngjuning) | 微信: `yang_jun_ning` | 公众号: `前端早茶馆` | 邮箱: youngjuning@aliyun.com

本文首发于[杨俊宁的博客](https://youngjuning.js.org/)，创作不易，您的点赞👍是我坚持的动力！！！
