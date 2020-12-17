---
title: 图解Google V8 学习笔记
date: 2020-12-16 13:29:10
categories:
  - [笔记]
tags:
  - V8
---

图解Google V8 学习笔记

<!--more-->

## 核心概念

JIT、作用域、词法环境、执行上下文

## V8 是什么

V8 是一个由 Google 开发的开源 JavaScript 引擎，目前用在 Chrome 浏览器和 Node.js 中，其核心功能是执行易于人类理解的 JavaScript 代码。

## Mac 安装 V8

### 预备条件

- Install Xcode (Avaliable on the Mac App Store)
- Install Xcode Command Line Tools (Preferences > Downloads)
- Install [depot_tools](https://www.chromium.org/developers/how-tos/install-depot-tools)
  - `cd ~ && git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git`
  - `sudo nano ~/.zshrc`(zsh) or `sudo nano ~/.bash_profile`(bash)
  - Add `export PATH=~/depot_tools:"$PATH"` (it's important that depot_tools comes first here)
  - `source ~/.zshrc`
  - From the directory you want to install V8 into, run `gclient`

## Build V8

  - `fetch v8`
  - `cd ~/v8`
  - `gclient sync`
  - `tools/dev/v8gen.py x64.optdebug`
  - `ninja -C out.gn/x64.optdebug` (prepare for lots of fan noise)

  I'd also recommend adding these to your `.zshrc`:

  - `sudo nano ~/.zshrc`
  - Add `alias d8=~/v8/out.gn/x64.optdebug/d8`
  - Add `alias tick-processor=~/v8/tools/mac-tick-processor`
  - Add `export D8_PATH="~/v8/out.gn/x64.optdebug"`
  - `source ~/.zshrc`

> 使用 Demo 请参考 [d8-shell-examples](https://gist.github.com/kevincennis/0cd2138c78a07412ef21#d8-shell-examples)