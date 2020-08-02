---
title: 程序员的Mac开发环境
date: 2020-03-05 01:06:42
categories:
  - [杂谈]
tags:
  - Mac
  - 开发环境
---

![](https://i.loli.net/2020/03/07/dPCm6qwpsZn8k1o.png)

<!--more-->

## ohmyzsh

```sh
# 切换 shell 为 zsh
$ chsh -s /bin/zsh
# 通过 curl 安装 ohmyzsh
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## vim

> 建议使用：https://github.com/amix/vimrc

```shell
$ git clone --depth=1 https://github.com/amix/vimrc.git ~/.vim_runtime
$ sh ~/.vim_runtime/install_awesome_vimrc.sh
$ echo "set number" >> ~/.vimrc
$ echo "set showcmd" >> ~/.vimrc
$ source ~/.vimrc
```

### Agnoster 主题配置

- 终端执行 `open ~/.zshrc`
- 找到 ZSH_THEME 修改为: `ZSH_THEME="agnoster"`
- `source ~/.zshrc`
- 安装 Powerline 对应的字体库
   - `git clone https://github.com/powerline/fonts.git`
   - `cd fonts`
   - `install.sh`
   - `cd ..`
   - `rm -rf fonts`
   - 进入：终端 > 偏好设置 > 字体修改为 ：`Meslo LG S DZ Regular for Powerline`。
      ![](https://i.loli.net/2020/03/25/wHBrfAs2kScPjYR.png)

### 插件

#### zsh-syntax-highlighting

- 安装: `brew install zsh-syntax-highlighting`
- Oh-my-zsh
   - `git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`
   - `plugins=( [plugins...] zsh-syntax-highlighting)`
   - `source ~/.zshrc`

#### WakaTime for Terminal

- `sudo easy_install pip`
- `sudo pip install wakatime`
- `cd ~/.oh-my-zsh/custom/plugins`
- `git clone https://github.com/sobolevn/wakatime-zsh-plugin.git wakatime`
-  在你的 `~/.zshrc` 文件的 [list of plugins](https://github.com/robbyrussell/oh-my-zsh/wiki/External-plugins) 添加 `wakatime`
- `source ~/.zshrc`
- 确保你的  [~/.wakatime.cfg](https://github.com/wakatime/wakatime#configuring) 文件中配置了 [API key](https://wakatime.com/settings/api-key) 。


## Homebrew

访问 [brew.sh](https://brew.sh/index_zh-cn) 安装。使用 Homebrew 安装 Apple（或您的 Linux 系统）没有预装但 [你需要的东西](https://formulae.brew.sh/formula/)。Homebrew

将大大降低维护环境的时间。本文后面将尽可能使用HomeBrew。

- `brew install` : 安装
- `brew uninstall`:  卸载
- `brew update`: 更新 homebrew
- `brew upgrade` : 更新已安装软件
- `brew cleanup`: 清理
- 一键清理: `brew update && brew upgrade && brew cleanup`

## Git

### 命令行工具

```sh
// Re-installing Git on Mac OSX with Brew
$ alias git='/usr/local/bin/git'
$ brew install git
```

### 可视化工具

- [GitHub Desktop](https://desktop.github.com/): GitHub Desktop简化了您的开发工作流程
- [Sourcetree](https://www.sourcetreeapp.com/): Simplicity and power in a beautiful Git GUI

### 命令行配置

```bash
# 1、初始化设置
$ git config --global user.name 'youngjuning'
$ git config --global user.email 'youngjuning@aliyun.com'
# 2、将 `color.ui` 设置为 `auto` 可以让命令的输出拥有更高的可读性。
$ git config --global color.ui auto
# 3、git 记住用户名和密码
$ git config --global credential.helper store
# 4、core.autocrlf
$ git config --global core.autocrlf input
```

> Linux或Mac系统使用LF作为行结束符，因此你不想 Git 在签出文件时进行自动的转换；当一个以 `CRLF` 为行结束符的文件不小心被引入时你肯定想进行修正，把 `core.autocrlf` 设置成 `input` 来告诉 Git 在提交时把 `CRLF` 转换成 `LF`，签出时不转换：
> 这样会在 Windows 系统上的签出文件中保留 `CRLF`，会在 Mac 和 Linux 系统上，包括仓库中保留 `LF`。

## GitHub 加速

```sh
export ALL_PROXY="socks5://127.0.0.1:7891"
```

7981 是你的代理端口，每个人的不一定一样！！！

![12851588067873_ pic_hd](https://user-images.githubusercontent.com/13204332/80474227-ce18c780-8979-11ea-8024-31bc0503f964.jpg)

### 学习资料

- [官方Book](https://git-scm.com/book/zh/v2)
- [git - 简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)：助你入门 git 的简明指南，木有高深内容
- [廖雪峰的git教程](http://t.cn/RK0tLXB)
- [猴子都能懂的GIT入门](https://backlog.com/git-tutorial/cn/)

## Node

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。我们使用 `n` 模块来维护 Node 的版本：

```shell
$ brew install n
# 安装最新版
$ sudo n latest
## 其他命令##
# 安装指定版本
$ sudo n 10.16.0
# 安装最新的稳定版
$ sudo n lts
# 删除指定版本
$ n rm 12.10.0
# 除去当前版本以外的所有缓存版本
$ n prune
```

### 更新npm

```shell
$ sudo npm install -g npm
```

### nrm 管理 registry

```shell
$ sudo i -g nrm
# 列出可用的代理
$ nrm ls
# 添加私有代理
$ nrm add sigma http://192.168.2.116:4873 http://192.168.2.116:4873
# 切换代理到 sigma 源
$ nrm use sigma
```

## React Native

强烈建议一步一步按照官方的 [搭建开发环境](https://reactnative.cn/docs/getting-started.html) 进行配置。

## Navicat Premium

Navicat Premium 是一套数据库开发工具，让你从单一应用程序中同时连接 MySQL、MariaDB、MongoDB、SQL Server、Oracle、PostgreSQL 和 SQLite 数据库。它与 Amazon RDS、Amazon Aurora、Amazon Redshift、Microsoft Azure、Oracle Cloud、MongoDB Atlas、腾讯云和华为云等云数据库兼容。你可以快速轻松地创建、管理和维护数据库。

> Mac版: 链接:https://pan.baidu.com/s/1SlL1_bd4qirMnF0sLwRLhA  密码:4jq6

## Java

### 下载安装

- [javase-jdk8-downloads](https://www.oracle.com/hk/java/technologies/javase/javase-jdk8-downloads.html)
- [Oracle Java 存档](https://www.oracle.com/cn/java/technologies/oracle-java-archive-downloads.html)

### 实用命令

- Mac下查看已安装的jdk版本及其安装目录: `/usr/libexec/java_home -V`
   ```sh
   Matching Java Virtual Machines (2):
    1.8.0_221, x86_64:	"Java SE 8"	/Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home
    1.7.0_80, x86_64:	"Java SE 7"	/Library/Java/JavaVirtualMachines/jdk1.7.0_80.jdk/Contents/Home

   /Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home
   ```
- 查看jre版本: `java -version`
- 查看jdk版本: `javac -version`

### 管理 jdk 版本

> 参考 [Mac 多版本 JDK 管理](https://www.cnblogs.com/magexi/p/12053401.html)

1、下载 jenv:

```sh
$ brew install jenv
```

2、安装成功后进行配置

```sh
# Shell: bash
$ echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(jenv init -)"' >> ~/.bash_profile
# Shell: zsh
$ echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.zshrc
$ echo 'eval "$(jenv init -)"' >> ~/.zshrc
$ exec $SHELL -l
```

> 注：一定要使用命令 `source ~/.zshrc` 来编译 `~/.zshrc` 文件

3、执行 `jenv doctor` 验证 jenv 是否安装成功，出现以下信息，说明成功了。

```sh
[OK]	No JAVA_HOME set
[ERROR]	Java binary in path is not in the jenv shims.
[ERROR]	Please check your path, or try using /path/to/java/home is not a valid path to java installation.
	PATH : /Users/user/.jenv/libexec:/Users/user/.jenv/shims:/Users/user/.jenv/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
[OK]	Jenv is correctly loaded
```

4、输入以下命令查看找到的java版本

```
$ jenv versions
   * system (set by /Users/yangjunning/.jenv/version)
```

只找到了系统默认的 Java，想要切换版本，请先下载安装不同的版本。

5、使用 `jenv add` 命令将 JDK 1.7 加入 jenv 中

> 版本及路径请通过 `/usr/libexec/java_home -V` 查看。

```sh
$ jenv add /Library/Java/JavaVirtualMachines/jdk1.7.0_80.jdk/Contents/Home/
oracle64-1.7.0.80 added
1.7.0.80 added
1.7 added
```

6、添加最新的 JDK

```sh
$ jenv add $(/usr/libexec/java_home)
```

7、使用 `jenv add` 命令将 JDK 1.8 加入 jenv 中

```
$ jenv add /Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home/
oracle64-1.8.0_221 added
1.8.0_221 added
1.8 added
```

8、选择一个JDK版本，运行 jenv local 命令

- `jenv global`: 用来设置全局 JDK
- `jenv local`: 用来设置当前目录 JDK
- `jenv shell`: 用来设置 `shell session` 中的 JDK

> 每次切换 JDK 之后，执行 `exec $SHELL -l` 或者重启终端

9、Maven 修改

Maven 仍然会使用 `/usr/libexec/java_home -v` 输出的 JDK，可能与当前使用的 JDK 版本不同。用 `jenv enable-plugin maven` s命令启用 Maven 插件即可

## maven

### 安装

```sh
$ brew install maven
```

### 配置 Maven 本地仓库

`setting.xml` 路径为 `${Maven Home}/conf/settings.xml` ，Maven Home 可以通过 `mvn --version 获取`

```xml
<localRepository>~/maven_repo</localRepository>
```

可将 `settings.xml` 直接拷贝到 `.m2` 文件夹下，进行配置。

如果没有 `.m2` 文件夹时,运行命令

```sh
$ mvn help:system
```

然后打开当前用户的目录，可以在其中找到 `.m2` 文件夹

### 配置阿里镜像

```xml
<mirror>
  <id>alimaven</id>
  <name>aliyun maven</name>
  <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
  <mirrorOf>central</mirrorOf>
</mirror>
```

### 升级 maven

```sh
$ brew unlink
$ brew update
$ brew install maven
```

## MySql

```shell
$ brew install mysql
```

### 修改配置文件

```shell
$ nano /usr/local/etc/my.cnf
```

### 启动服务

```shell
brew services start mysql
# 重启
brew services restart mysql
# 停止
brew services stop mysql
```

> Or, if you don't want/need a background service you can just run: `mysql.server start`

### 安全设置

```shell
$ mysql_secure_installation
```

1. 建立密码验证插件

   ```shell
   Securing the MySQL server deployment.

   Connecting to MySQL using a blank password.

   VALIDATE PASSWORD PLUGIN can be used to test passwords and improve security. It checks the strength of password and allows the users to set only those passwords which are secure enough. Would you like to setup VALIDATE PASSWORD plugin?

   Press y|Y for Yes, any other key for No: y
   ```

2. 选择密码规则

   ```shell
   There are three levels of password validation policy:

   LOW    Length >= 8
   #长度大于等于8
   MEDIUM Length >= 8, numeric, mixed case, and special characters
   #长度大于等于8，数字、大小写字母、特殊符号
   STRONG Length >= 8, numeric, mixed case, special characters and dictionary                  file
   #长度大于等于8，数字、大小写字母、特殊符号和字典文件（慎选！）

   Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 1
   Please set the password for root here.

   New password: （输入你的密码）
   Re-enter new password: （再次输入你的密码）
   ```

3. 创建符合规则的新密码

   ```shell
   Estimated strength of the password: 50 		#密码强度
   Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) : y
   ```

4. 删除匿名用户

   ```
   By default, a MySQL installation has an anonymous user, allowing anyone to log into MySQL without having to have a user account created for them. This is intended only for testing, and to make the installation go a bit smoother.
   You should remove them before moving into a production environment.

   Remove anonymous users? (Press y|Y for Yes, any other key for No) : y
   Success.
   ```

5. 禁止远程登录

   ```shell
   Normally, root should only be allowed to connect from 'localhost'. This ensures that someone cannot guess at the root password from the network.

   Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y
   Success.
   ```

6. 删除测试数据表

   ```shell
   By default, MySQL comes with a database named 'test' that anyone can access. This is also intended only for testing, and should be removed before moving into a production environment.

   Remove test database and access to it? (Press y|Y for Yes, any other key for No) : y
    - Dropping test database...
   Success.

    - Removing privileges on test database...
   Success.
   ```

7. Done

   ```shell
   Reloading the privilege tables will ensure that all changes made so far will take effect immediately.

   Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y
   #是否重新加载权限表
   Success.

   All done!
   ```

#### Your password does not satisfy the current policy requirements.

如果你在选择密码规则的时候不小心选择了2，也就是数字、大小写字母、特殊符号和字典文件的组合。这时你会发现 `mysql_secure_installation`不会再给你机会重新设置了。手动微笑，mmp。方法还是有的：

```shell
SHOW VARIABLES LIKE 'validate_password%';
```

![](https://i.loli.net/2020/03/09/m2GRbrPeHDkC7pQ.png)

使用命令 `mysql -u root` 登陆，执行：

```shell
set global validate_password.policy=0;
set global validate_password.length=4;
#将密码规则设置为LOW，就可以使用纯数字纯字母密码
```

### 登陆

```shell
$ mysql -u root -p
```

## mongodb

> 参考: [Mac OSX 平台安装 MongoDB](https://www.runoob.com/mongodb/mongodb-osx-install.html)、[Mac下安装MongoDB数据库-启动-停止-开启验证-登陆](https://www.32e.top/system/mac/article-87.html)、[【环境搭建：二】Mac安装、配置MongoDB](https://uizph.com/article/5db177e4a9f13d7f535810c5)、[MongoDB的用户创建更新及删除](https://www.jianshu.com/p/f5afc6488f9e)、[MongoDB 用户名密码登录 认证登陆](https://cloud.tencent.com/developer/article/1446551)

### 下载安装

```sh
$ brew install mongodb/brew/mongodb-community
$ mongod -version
```

### 配置

#### 启动 mongo

1、新建 dbpath

```sh
$ sudo mkdir ~/data/db
$ sudo mkdir ~/data/log
```

2、启动

```sh
$ sudo mongod --dbpath ~/data/db --fork --logpath ~/data/log/mongo.log
```

> 注意：Mac OS 10.15.1版本之后， `/data/db` 文件夹消失了，重新创建文件夹提示 `mkdir: /data/db: Read-only file system`，解决办法也可以是 `sudo mkdir ~/data/db && sudo mongodb --dbpath ~/data/db`

#### 设置验证和用户名密码

```sh
$ mongo
# 创建超级管理员
> db.createUser({ user: "root" , pwd: "123456", roles: ["root"]});
Successfully added user: {
   "user" : "root",
   "roles" : ["root"]
}
# 尝试使用上面创建的用户信息进行连接。
> db.auth("root","123456")
1
# 创建一个名为 admin，密码为 123456 的用户。
> db.createUser({ user: "admin", pwd: "123456", roles:["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]});
Successfully added user: {
   "user": "admin",
   "roles": [
   {
      "role": "userAdminAnyDatabase",
      "db": "admin"
   }
  ]
}
# 尝试使用上面创建的用户信息进行连接。
> db.auth("admin","123456")
1
```

### 开启验证模式登录

开启 mongod 时，指定 `--auth` 参数即可以验证模式打开：

```sh
$ sudo mongod --dbpath ~/data/db --fork --logpath ~/data/log/mongo.log --auth
```

#### 登录时验证

```shell
$ mongo 127.0.0.1:27017/admin -u admin -p 123456
# 等价于
$ mongo --port 27017 -u "adminUser" -p "adminPass" --authenticationDatabase "admin"
```

#### 登录后验证

```shell
$ mongo
> use admin
> ab.auth("admin","123456")
```

### 退出mongo

```sh
#先停止mongod服务
$ use admin;
$ db.shutdownServer();

然后退出mongo
$exit；
```

## natapp

开启您的内网穿透之旅,调试微信的利器，请至[官网](https://natapp.cn/)下载

## IDE

- [VSCode](https://code.visualstudio.com/): Visual Studio Code是一个由微软开发，同时支持Windows 、 Linux和macOS等操作系统且开放源代码的代码编辑器，它支持测试，并内置了Git 版本控制功能，同时也具有开发环境功能，例如代码补全、代码片段和代码重构等。

  > 为了备份和分享IDE的配置，无论是 Atom 还是 VSCode 都有相应的插件，在 VSCode 中这个插件是 [Settings Sync](https://bre.is/Ar7QVWF8)。该插件是通过 GitHub Gist 来托管配置文件。我的 Gist Id: `248fa0aed5c2c89fc342599a1cceb423`

## 设置 SSH Key

在用户主目录下，看看有没有 `.ssh` 目录，如果有，再看看这个目录下有没有 `id_rsa` 和 `id_rsa.pub` 这两个文件，如果已经有了，可直接跳到下一步。如果没有，打开 Shell（Windows下打开Git Bash），创建 SSH Key：

```bash
$ ssh-keygen -t rsa -C "young_email@aliyun.com"
```

## Pock

让 Touch Bar 「变废为宝」的免费小工具，点击图片进入官网了解详情：

[![](https://i.loli.net/2020/03/26/vGRUVX5ACxfasTi.png)](https://pock.dev/)

## Catch Me

> GitHub: [youngjuning](https://github.com/youngjuning) | 微信: `yang_jun_ning` | 公众号: `前端早茶馆` | 邮箱: youngjuning@aliyun.com

|                             微信                             |                             投食                             |                            公众号                            |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://i.loli.net/2020/02/22/q2tLiGYvhIxm3Fl.jpg" width="200px"/> | <img src="https://i.loli.net/2020/02/23/q56X1eYZuITQpsj.png" width="200px"/> | <img src="https://i.loli.net/2020/07/28/6AyutjZ1XI4aUDV.jpg" width="200px"/> |

本文首发于[杨俊宁的博客](https://youngjuning.js.org/)，创作不易，您的点赞👍是我坚持的动力！！！
