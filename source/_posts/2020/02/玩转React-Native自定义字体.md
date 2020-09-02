---
title: 玩转 React Native 自定义字体
date: 2020-02-29 16:52:39
categories:
  - [Hybrid,React Native]
tags:
  - 字体
  - fonts
---

![](https://i.loli.net/2020/02/29/4AacpxzRh8nfY2B.png)

<!--more-->

1. 下载[免费商用字体](http://hao.ziticq.com/)

   > 法棍体：链接:https://pan.baidu.com/s/1M-CDEqsJ06qj-42uRyF0WA  密码:83er

2. 使用 FontLab 查看字体的 `fontFamily`

   > FontLab 破解版 Mac：
   >
   > 链接:https://pan.baidu.com/s/1Wb3xgB9mJqF4YGX0xXddMg  密码:1cfb

   <img src="https://i.loli.net/2020/03/01/m9A5CK2cZMYswBF.png"  style="zoom:40%;" />

3. 将字体放到放在项目根目录：



4. 在根目录新建 `react-naitve.config.js`:

   ```js
   module.exports = {
     project: {
       ios: {},
       android: {},
     },
     assets: ['./fonts'],
   }
   ```

5. 在根目录执行 `react-native link` 命令

6. 使用字体：

   ```jsx
   // 全局
   const TextRender = Text.render
   Text.render = (...args) => {
     const originText = TextRender.apply(this, args)
     const { style } = originText.props
     return React.cloneElement(originText, {
       allowFontScaling: false,
       style: [{ fontFamily: 'Baguette' }, style],
     })
   }
   // 局部
   <Text style={{ fontSize: 50, fontFamily: 'Baguette' }}> 法棍体🥖 </Text>
   ```

7. 效果：

   <img src="https://i.loli.net/2020/03/01/6YZlpi3ar87LKQd.jpg" alt="WechatIMG1166.jpeg" style="zoom:50%;" />

## 附录

- [React Native 中开箱即用的字体](https://github.com/react-native-training/react-native-fonts)

## 联系作者

|                           作者微信                           |                           知识星球                           |                           赞赏作者                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://user-gold-cdn.xitu.io/2020/2/24/17074acbb24c7412?w=200&h=200&f=jpeg&s=17183" style="width:200px"/> | <img src="https://user-gold-cdn.xitu.io/2020/2/24/17074acbb26af8e1?w=200&h=200&f=png&s=39093" style="width:200px"/> | <img src="https://user-gold-cdn.xitu.io/2020/2/24/17074acbb338c643?w=698&h=700&f=png&s=315492" style="width:200px"/> |
