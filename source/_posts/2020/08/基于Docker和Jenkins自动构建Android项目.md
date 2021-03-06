---
title: 基于Docker和Jenkins自动构建Android项目
date: 2020-08-04 19:16:43
categories:
  - [运维,Jenkins]
tags:
  - android
---

![](https://i.loli.net/2020/08/09/M9PfYQahL2F5Z8C.png)

<!--more-->

## 环境准备

- [Docker](https://juejin.im/post/6844904111243001869#heading-11)
- [Jenkins](https://juejin.im/post/6844904152003248136)

## android-sdk

### 安装 android-sdk

```shell
$ apt update | apt install android-sdk
```

### 复制到 jenkins volume

```shell
$ cp -R /usr/lib/android-sdk/ /var/lib/docker/volume/jenkins_home/_data/
```

android-sdk 的安装位置可以通过 `adb --version` 查看：

<img src="https://user-gold-cdn.xitu.io/2020/5/9/171f7fae7cf4ff7a?w=864&h=230&f=png&s=176444" alt="" style="zoom: 75%;" />

### 设置环境变量

将下面的的配置加入到 `~/.bash_profile` 或 `~/.zshrc` 中，并执行 `srouce ~/.bash_profile` 或 `srouce ~/.zshrc`：

```
export ANDROID_HOME=/var/lib/docker/volumes/jenkins_home/_data/android-sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
```

## sdkmagager

```shell
$ apt update | apt install snapd
$ snap install androidsdk
```

## accepted licences

> 如果不授权会报错： Failed to install the following Android SDK packages as some licences have not been accepted.

```shell
$ yes | sdkmanager --sdk_root=${ANDROID_HOME} --licenses
```

> 如果不指定 `--sdk_root=${ANDROID_HOME}` 会报错：[SDKmanager : Warning: Could not create setting. java.lang.IllegalArgumentException](https://stackoverflow.com/questions/60730615/sdkmanager-warning-could-not-create-setting-java-lang-illegalargumentexcepti)

## Jenkins ANDROID_HOME

进入 **系统管理** -> **系统配置** -> **全局属性** 新增环境变量 `ANDROID_HOME`：

![](https://user-gold-cdn.xitu.io/2020/5/9/171f7fae8171f318?w=1980&h=486&f=png&s=65179)

## 新建任务

然后你就可以为所欲为了！！！

![](https://user-gold-cdn.xitu.io/2020/5/9/171f7fae81791d69?w=1890&h=1120&f=png&s=263338)

## Catch Me

> GitHub: [youngjuning](https://github.com/youngjuning) | 微信: `yang_jun_ning` | 公众号: `前端早茶馆` | 邮箱: youngjuning@aliyun.com

|                             微信                             |                             投食                             |                            公众号                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://i.loli.net/2020/02/22/q2tLiGYvhIxm3Fl.jpg" width="200px"/> | <img src="https://i.loli.net/2020/02/23/q56X1eYZuITQpsj.png" width="200px"/> | <img src="https://i.loli.net/2020/07/28/6AyutjZ1XI4aUDV.jpg" width="200px"/> |

本文首发于[杨俊宁的博客](https://youngjuning.js.org/)，创作不易，您的点赞👍是我坚持的动力！！！
