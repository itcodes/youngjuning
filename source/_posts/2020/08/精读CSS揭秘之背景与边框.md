---
title: 精读CSS揭秘之背景与边框
date: 2020-08-06 08:30:35
categories:
  - [前端开发,CSS]
tags:
  - CSS3
---

![](https://i.loli.net/2020/08/08/NbqGOWrvzUhHY3g.png)

<!--more-->

CSS对于前端工程师来说是基础中的基础，如果基础不扎实，就得日常跪求UED给图来实现效果。

>《CSS揭秘》这本书读来让人有满满的安全感，LEA VEROU 是CSS方面的专家，对CSS3的设计和未来的发展了解很多。描述的47个css技巧也很接地气，值得一读再读。

> 本文是精读《CSS揭秘》系列文章的第一篇，预计有8篇，以一（kan）周（wo）一（xin）篇（qing）的进度发布。

> 如无特殊说明，样式对应的html结构都是 `<div class="box"></div>`

> 由于掘金限制，无法嵌入 iframe 标签，我把 codepen 的示例链接都附在了每一节，方便大家边读边练。

## 半透明边框

> view demo on [codepen](https://codepen.io/youngjuning/pen/KKzKroB)

CSS 背景的工作原理是默认延伸到border区域的，CSS3 中，我们可以使用 `background-clip` 属性来调整这个默认行为带来的不便。将它设为 `padding-box`，便可以不让背景侵入边框所在的范围。

```css
.box {
  border: 10px solid rgba(255,255,255,0.5);
  background: pink;
  background-clip: padding-box;
}
```

<img src="https://i.loli.net/2020/08/09/WzDYntbHJx49kaI.png" style="zoom:50%;" />

## 多重边框

> view demo on [codepen](https://codepen.io/youngjuning/pen/rNeaOob)

### box-shadow 方案

1. 利用 `box-shadow` 属性第四个参数（扩张半径）控制投影面积，其他两个偏移量和模糊半径都设置为。
2. 利用 `box-shadow` 支持逗号分隔的语法，我们可以创建任意数量的投影。

```css
.box {
  width: 100px;
  height: 100px;
  margin: 15px;
  background: yellowgreen;
  border-radius: 5px;
  box-shadow: 0 0 0 10px #655, 0 0 0 15px deeppink,
    0 2px 5px 15px rgba(0, 0, 0, 0.6);
}
```

![](https://i.loli.net/2020/08/08/PzA4XJSi8eME7UK.png)

注意：

1. 投影的行为跟外边框不完全一致，因为它不会影响布局，而且也不会受到 `box-sizing` 属性的影响。不过，你还是可以通过内边距或外边距（这取决于投影是内嵌还是外扩的）来额外模拟出边框
2. 上述代码创建出的假边框出现在元素的**外圈**。它们并不会响应鼠标事件，比如悬停或点击。如果这一点非常重要，你可以给 `box-shadow` 属性加上 `inset` 关键字，来使投影绘制在元素的**内圈**。请注意，此时你需要增加额外的内边距来腾出足够的空隙。

### outline 方案

如果你只需要两层边框，那就可以先设置一层常规边框，再加上 `outline`（描边）属性来产生外层的边框。

该方案还可以利用 `outline-offset` 属性来控制描边和元素边缘之间的距离（可以为负值），下面代码的效果就是一个缝边的效果。

```css
.box {
  width: 100px;
  height: 100px;
  margin: 5px;
  background: yellowgreen;
  border-radius: 5px;
  outline: 1px dashed deeppink;
  outline-offset: -10px;
}
```

![](https://i.loli.net/2020/08/08/Orcg4ytVRuKNbGS.png)

## 灵活的背景定位

> view demo on [codepen](https://codepen.io/youngjuning/pen/WNwbmRj)

### background-position 的扩展语法方案

在CSS3中，`background-position` 属性已经得到扩展，它允许我们制定背景图片**距离任意角的偏移量**，只要我们**在偏移量前面加上指定关键字**：

```css
.box {
  background: url(https://i.loli.net/2020/08/08/jWNPK6e3ucf47LV.png) no-repeat
    right bottom/50px #6a99bf;
  background-position: right 15px bottom 15px;
  width: 200px;
  height: 120px;
  border-radius: 8px;
}
```

![](https://i.loli.net/2020/08/08/yIVnde16BwN3bSk.png)

### background-origin 方案

`background-origin` 是用来控制背景起始点的属性，默认是以`padding-box` 为准的，如果我们想让背景的的起点以内容区的边缘为基准（也就是说，此时背景图片距离边角的偏移量就跟内边距保持一致了）。

如果你想要背景偏移量与容器的内边距一致，那么就可以使用这个方案，代码实现如下：

```css
.box {
  box-sizing: border-box;
  width: 200px;
  height: 120px;
  border-radius: 8px;
  background: url(https://i.loli.net/2020/08/08/jWNPK6e3ucf47LV.png) no-repeat
    right bottom/50px #6a99bf;
  padding: 10px;
  background-origin: content-box;
  background-clip: content-box;
  border: 1px solid #000;
}
```

![](https://i.loli.net/2020/08/08/CufS4jGV75qhgJL.png)

### calc() + background-position 方案

calc() 函数可以传入形似 `100% - 20px` 的表达式（注意，`-` 两边必须有空格。）。我们可以利用这个特性来结合 `background-position` 以右上角为基准定位：

```css
.box {
  width: 200px;
  height: 120px;
  border-radius: 8px;
  background: url(https://i.loli.net/2020/08/08/jWNPK6e3ucf47LV.png) no-repeat
    right bottom/50px #6a99bf;
  background-position: calc(100% - 20px) calc(100% - 10px)
}
```

![](https://i.loli.net/2020/08/08/yIVnde16BwN3bSk.png)

## 边框内圆角

> view demo on [codepen](https://codepen.io/youngjuning/pen/ZEWYNxe)

有时，我们需要一个容器，只在内侧有圆角，而边框或描边的四个角在外部仍然保持直角的形状。

```css
.box {
  margin: 20px;
  width: 100px;
  height: 100px;
  background: #d9c2bc;
  border-radius: 10px;
  box-shadow: 0 0 0 5px #655;
  outline: 10px solid #655;
}
```

![](https://i.loli.net/2020/08/08/jesrqO2BW1yXuDp.png)

能实现以上的效果，主要得益于两个事实：描边（outline）不会跟着元素的圆角走（因而显示出直角），但`box-shadow`却是会的。

我们把这两者叠加到一起，`box-shadow` 会刚好填补描边和容器圆角之间的空隙，这两者的组合达成了我们想要的效果。

> 注意：`box-shadow` 的颜色需要和 `outline` 保持一致，`box-shadow` 的扩张半径设为`outline`的一半即可。

## 条纹背景

条纹背景在CSS中是基于 `linear-gradient`、`repeat-linear-gradient` 实现的，本节为大家展示了一些可快速食用的例子。

### 1、德国国旗🇩🇪

> view demo on [codepen](https://codepen.io/youngjuning/pen/gOrbVGo)

```css
.box {
  width: 130px;
  height: 78px;
  background: linear-gradient(
    #000 0,
    #000 33.3%,
    #cc2a1d 33.3%,
    #cc2a1d 66.6%,
    #f8cf47 66.6%,
    #f8cf47 100%
  );
  background-size: 100% 100%;
}
```

![](https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/260px-Flag_of_Germany.svg.png)

### 2、法国国旗🇫🇷

> view demo on [codepen](https://codepen.io/youngjuning/pen/gOrbVGo)

```css
.box {
  width: 130px;
  height: 78px;
  background: linear-gradient(
    to right,
    #002590 0,
    #002590 33.3%,
    #ffffff 33.3%,
    #ffffff 66.6%,
    #db3c3f 66.6%,
    #db3c3f 100%
  );
  background-size: 100% 100%;
}
```

![](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/260px-Flag_of_France.svg.png)

### 3、地址栏红蓝分割线

> view demo on [codepen](https://codepen.io/youngjuning/pen/mdPyZBe)

代码搬运自vant的联系人组件，使用了循环式的加强版`linear-gradient`：`repeating-linear-gradient`，它的色标是无限循环重复的，直到铺满整个背景。

重复线性渐变完美适用于——条纹效果！这得益于它们可以无限循环的天赋是，一个渐变图案就可以自动重复并铺满整个背景。

```css
.box {
  background: #fff;
  width: 200px;
  position: relative;
}
.box::before {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  /* 这里的语法在CSS4中可能会被简化 */
  background: repeating-linear-gradient(
    -45deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
  content: "";
}
```

![](https://i.loli.net/2020/08/09/d9olAseI1npxgFw.png)

### 4、老式信封边框样式

> view demo on [codepen](https://codepen.io/youngjuning/pen/ZEWGYKN)

使用 `border-image` + `repeating-linear-gradient` 很容易实现：

```html
<div class="box">
  My name is 俊宁
</div>
```

```css
.box {
  text-align: center;
  line-height: 70px;
  box-sizing: padding-box;
  width: 200px;
  height: 70px;
  background: #fff;
  border: 5px solid transparent;
  border-image: 5
    repeating-linear-gradient(
      -45deg,
      #ff6c6c 0,
      #ff6c6c 10%,
      transparent 0,
      transparent 15%,
      #1989fa 0,
      #1989fa 25%,
      transparent 0,
      transparent 30%
    );
}
```

> border-image 第一个值不能带单位，否则没有效果！

![](https://i.loli.net/2020/08/09/IXDHzKROQhyLsxu.png)

### 5、🐜蚂蚁行军边框

> view demo on [codepen](https://codepen.io/youngjuning/pen/BaKNymx)

```css
.box {
  width: 100px;
  height: 100px;
  border: 1px solid transparent;
  background: linear-gradient(white, white) padding-box,
    repeating-linear-gradient(
        -45deg,
        black 0,
        black 25%,
        transparent 0,
        transparent 50%
      )
      0% 0% / 0.6em 0.6em;
  animation: ants 10s linear infinite;
}
@keyframes ants {
  to {
    background-position: 100% 100%;
  }
}
```

- 首先要设置容器的边框宽度为1px，颜色要设置成透明，以便稍后设置的背景能够显示出来。
- 可以设置多重背景，并用逗号隔开，设置在前面的总是会覆盖后面的。这里设置了两层背景，第一层背景使用线性渐变`linear-gradient`设置了从白色到白色的渐变，`padding-box`是`background-clip`属性的值，表示背景图片绘制在内边距方框内。其实就是绘制了一个白色的块，用来遮盖第二层背景的中间部分，保留边框部分。
- 把 `background-size` 改为某个合适的值。
- 最后将背景图片的位置从左上角（0% 0%）逐渐过渡到右下角（100% 100%），看起来的效果就像边框动起来了一样。

> 本文首发于[杨俊宁的博客](https://youngjuning.js.org/)，创作不易，您的点赞👍是我坚持的动力！！！
