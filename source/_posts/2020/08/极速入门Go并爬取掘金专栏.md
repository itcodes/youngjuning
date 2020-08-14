---
title: 极速入门Go并爬取掘金专栏
date: 2020-08-12 23:34:04
categories:
  - [后端,golang]
tags:
  - 爬虫
  - 掘金征文
  - 掘金专栏
---

![](https://i.loli.net/2020/08/13/92pykLqY7NFWi3f.png)

<!--more-->

## Go印象

2018年的某一天，我问公司后端架构师说我想学学后端语言，除了Java有啥推荐，他告诉我他在学Go。然后跟我讲了一些诸如分布式、协程、大数据、爬虫......巴拉巴拉的我也听不太懂的概念。然后我说我还是学NodeJs吧。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/386ee7328c5b451a93924c671f858269~tplv-k3u1fbpfcp-zoom-1.image)

之所以斗胆再战Go语言，完全是梁静茹（[上次征文](https://juejin.im/post/6854573219266887694)）给了我勇气。如果你是后端大佬，直接看后半篇的爬虫部分就可以。

本文的主题是极速、爬虫、掘金专栏，目的是使用Go写一个小工具把掘金专栏文章爬取下来，慢慢看。

## Let's Go

### 优势

- 语法简单，易上手（仅有25个关键保留字）
- 性能高、编译快，开发效率不比Python和Ruby低
- 部署方便，编译包小，几乎无依赖（二进制文件包可直接运行）这一点和Deno很像
- 原生支持并发（goroutine）
- 官方统一规范（gofmt、golint）又看到了Deno的影子
- 丰富的标准库，再次看到了Deno的影子

### 趋势

权威的趋势，优弧大佬已经讲的很清楚了，我这里补充一下GitHub的star趋势:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f1ea4ca5a4d457c8e93e07372b88e28~tplv-k3u1fbpfcp-zoom-1.image)

## Go简介

Go是Google开发的一种静态强类型、编译型、并发型并具有垃圾回收功能的编程语言。为了方便搜索和识别，有时会将其称为Golang。

## Go语言特点

1. Go是一种新的语言，是一种支持并发、带垃圾回收、可快速编译的静态语言。
2. Go为并发执行与通信提供了基本的支持，是天生的高性能服务开发语言。
3. Go结合了解释性语言的游刃有余，动态类型语言的开发效率，以及静态类型的安全性。
4. Go只需要用几秒的时间就可以编译一个大型的Go程序，部署也非常容易。
5. Go具有Python/Ruby的开发效率，同时又是C语言的运行性能（还是有一定差距的）。
6. Go简单易上手（只有25个关键保留字）
7. Go有自己的开发规范，还提供工具支持。

## Go安装配置

> 作者还有一篇[程序员的Mac开发环境【持续更新】](https://juejin.im/post/6844904083489308685)，记录了我的Mac上的开发环境，读者大大可以顺便给个Star吗？

```sh
$ brew install go
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ac7ef0acc5b4d2480c802d586f3ae44~tplv-k3u1fbpfcp-zoom-1.image)

> 小技巧1：`ctrl+c` 可以跳过 `Updating Homebrew...`，要不卡到你怀疑人生。

> 小技巧2：如果你有时间等，可以带上 `-verbose` 参数，这样下载的时候会告诉你更新进度。

> 小技巧3：Homebrew 是同步的 GitHub 仓库，如果实在卡，请自行换 Homebrew 代理源

安装成功后，查看go版本：

```sh
$ go version
go version go1.14.7 darwin/amd64
```

配置环境变量：

```sh
$ open /usr/local/Cellar/go/
```

> 然后看一下自己的libexec在什么地方然后记录下整体的地址，我的地址是 `/usr/local/Cellar/go/1.14.7/libexec`

需要将这部分写入到 `nano ~/.zshrc`：

```sh
#GO
export GOROOT=/usr/local/Cellar/go/1.14.7/libexec
export GOPATH=~/.go
export PATH=${PATH}:$GOPATH/bin
```

记得执行 ` source ~/.zshrc` 命令后才会生效。然后执行 `go env` 命令查看是否成功

<details>
<summary>输出过长，请点开查看！！！</summary>

```xml
GO111MODULE="on"
GOARCH="amd64"
GOBIN=""
GOCACHE="/Users/yangjunning/Library/Caches/go-build"
GOENV="/Users/yangjunning/Library/Application Support/go/env"
GOEXE=""
GOFLAGS=""
GOHOSTARCH="amd64"
GOHOSTOS="darwin"
GOINSECURE=""
GONOPROXY=""
GONOSUMDB=""
GOOS="darwin"
GOPATH="/Users/yangjunning/go"
GOPRIVATE=""
GOPROXY="https://goproxy.cn,direct"
GOROOT="/usr/local/Cellar/go/1.14.7/libexec"
GOSUMDB="sum.golang.org"
GOTMPDIR=""
GOTOOLDIR="/usr/local/Cellar/go/1.14.7/libexec/pkg/tool/darwin_amd64"
GCCGO="gccgo"
AR="ar"
CC="clang"
CXX="clang++"
CGO_ENABLED="1"
GOMOD="/dev/null"
CGO_CFLAGS="-g -O2"
CGO_CPPFLAGS=""
CGO_CXXFLAGS="-g -O2"
CGO_FFLAGS="-g -O2"
CGO_LDFLAGS="-g -O2"
PKG_CONFIG="pkg-config"
GOGCCFLAGS="-fPIC -m64 -pthread -fno-caret-diagnostics -Qunused-arguments -fmessage-length=0 -fdebug-prefix-map=/var/folders/zn/17xnqr8s1pjbpzt9_t38tyhc0000gn/T/go-build998676802=/tmp/go-build -gno-record-gcc-switches -fno-common"
```
</details>

## 七牛云镜像代理

打开你的终端并执行，Go 1.13 及以上可行，其他版本请阅读[Goproxy中国](https://goproxy.cn/) 查看文档

```shell
$ go env -w GO111MODULE=on
$ go env -w GOPROXY=https://goproxy.cn,direct
```

## Go 常用命令

1、`go build`：用于编译我们指定的源码文件或代码包以及它们的依赖包

2、`go clean`：用来移除当前源码包里面编译生成的文件

3、`go doc`：打印附于Go语言程序实体上的文档。我们可以通过把程序实体的标识符作为该命令的参数来达到查看其文档的目的。

4、`go fmt`：帮助格式化你的代码文件，你只需要执行 go fmt xxx.go 你的代码将会被修改为标准格式

5、`go get`：根据要求和实际情况从互联网上下载或更新指定的代码败一级依赖包，并对他们进行编译和安装

6、`go install`：用于编译并安装指定的代码包及它们的依赖包

7、`go run`：可以遍历源码并运行命令源码文件

## Go标准库

1、sync：提供了基本的同步原语。在多个goroutine访问共享资源的时候，需要使用sync中提供的锁机制。

2、os：提供了对操作系统功能的非平台相关访问接口。接口为Unix风格。提供的功能包括文件操作、进程管理、信号和用户账号等。

3、time：时间相关的处理

4、fmt：实现格式化的输入输出操作。

5、io：实现了一系列非平台相关的IO相关接口和实现，比如提供了对os中系统相关的IO功能的封装。我们在进行流式读写（比如读写文件）时，会用到该包。

6、http：提供web服务

7、string：处理字符串的一些函数集合，包括合并、查找、分割、比较、后缀检查、索引、大小写处理等等。

## VsCode插件推荐

- Go：Rich Go language support for Visual Studio Code

## Hello World

创建`helloworld.go`写入下面内容:

```go
package main  // 代码包声明语句。
import "fmt" // 系统包用来输出的

func main() {
  // 打印函数调用语句。用于打印输出信息。
  fmt.Println(sayHello("掘金"))
}

func sayHello(juejin string) string {
  return "Hello "+juejin
}
```

然后执行`go run helloworld.go`，好了你已经入门了,下面可以一起开启爬虫的学习了，下面我会循序渐进地带大家实现一个爬取掘金专栏并转成Markdown的格式保存到本地的小爬虫，取名叫[juejin-spider](https://github.com/youngjuning/juejin-spider)。

## 爬虫是什么

百度百科和维基百科对网络爬虫的定义：简单来说爬虫就是抓取目标网站内容的工具，一般是根据定义的行为自动进行抓取, 对网页或数据的分析与过滤；抓取的网页URL进行爬行策略。

简单来说就是把目标网页下载下来，然后通过解析、过滤、去重等一系列操作获得自己想要的数据并以相应的格式保存下来。大致流程如下图：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb67f112c5234a97b12eb690ab58435f~tplv-k3u1fbpfcp-zoom-1.image)

## colloy极速上手

gocolly是用go实现的网络爬虫框架，目前在github上具有11K+星，名列go版爬虫程序榜首。gocolly快速优雅，在单核上每秒可以发起1K以上请求；以回调函数的形式提供了一组接口，可以实现任意类型的爬虫；依赖goquery库可以像jquery一样选择web元素。

gocolly的官方网站是[http://go-colly.org/](http://go-colly.org/)，提供了详细的文档和示例代码。安装colly:

```sh
$ go get -u github.com/gocolly/colly/...
```

### 人生第一个爬虫

在 `go.mod` 中管理依赖：

```go
module juejin.im/junning

go 1.14

require (
  github.com/gocolly/colly/v2 latest
)
```

新建 `main.go` 文件并编写代码：

> 这段代码不长，但是我看了官方文档以及五六篇博客，才搞定，就为了让我人生第一个爬虫足够完整。

```go
package main

import (
	"fmt"
	// 1、导入 colly。
	"github.com/gocolly/colly"
	"github.com/gocolly/colly/extensions"
)

func main() {
	// 2、创建 collector
	c := colly.NewCollector(colly.AllowedDomains("juejin.im")) // 要限定域名，否则就把全网都爬下来了
	extensions.RandomUserAgent(c)                              // 使用随机的UserAgent，最好能使用代理。这样就不容易被ban
	extensions.Referer(c)                                      // 在访问的时候带上Referrer，意思就是这一次点击是从哪个页面产生的

	// 3、事件监听，通过 callback 执行事件处理。
	c.OnError(func(_ *colly.Response, err error) {
		fmt.Println("Something went wrong:", err)
	})
	c.OnRequest(func(r *colly.Request) {
		// fmt.Println("Visiting", r.URL)
	})
	// Find and visit all links
	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		fmt.Println(e.Text)
		e.Request.Visit(e.Attr("href"))
	})

	// 4、启动网页访问
	c.Visit("https://juejin.im/")
}
```

- `:=` 的方式声明变量并赋值，JS写多了好不习惯（语法学习推荐大家看[漫画 Go 语言 纯手绘版](https://juejin.im/book/6844733833401597966/section) ）
- `*clolly.HTMLElement` 的语法是声明参数类型的

### 回调及其调用顺序

gocolly 的原理就是监听网络访问，并提供了7事件和回调来供开发者来发挥。

1. OnRequest：请求执行之前调用
2. OnError：请求出错的时候调用
3. OnResponseHeaders：Called after response headers received响应头接收到时调用
4. OnResponse：响应完成后调用
5. OnHTML：如果接收到的内容是HTML，则在OnResponse之后立即调用
6. OnXML：如果接收到的内容是HTML或者XML，则在OnHTML之后立即调用
7. OnScraped：在OnXML之后立即调用

### 类型定义

这里列出了 `*colly.HTMLElement` 和 `*colly.Request` 的类型定义，在开发过程中，你可以随时跳转到类型定义文件，或者查看 https://github.com/gocolly/colly/ 中对应的文件都可以（据说源码写的很优秀，有时间研究一下）。PS：和TypeScript其实有很多相似之处，可以类比学习，这也是为啥我可以一夜入门。

#### *colly.HTMLElement

> 在线链接：https://github.com/gocolly/colly/blob/master/htmlelement.go

```go
// HTMLElement is the representation of a HTML tag.
type HTMLElement struct {
	// Name is the name of the tag
	Name       string
	Text       string
	attributes []html.Attribute
	// Request is the request object of the element's HTML document
	Request *Request
	// Response is the Response object of the element's HTML document
	Response *Response
	// DOM is the goquery parsed DOM object of the page. DOM is relative
	// to the current HTMLElement
	DOM *goquery.Selection
	// Index stores the position of the current element within all the elements matched by an OnHTML callback
	Index int
}
```

#### *colly.Request

> 在线链接：https://github.com/gocolly/colly/blob/master/request.go

```go
// Request is the representation of a HTTP request made by a Collector
type Request struct {
	// URL is the parsed URL of the HTTP request
	URL *url.URL
	// Headers contains the Request's HTTP headers
	Headers *http.Header
	// Ctx is a context between a Request and a Response
	Ctx *Context
	// Depth is the number of the parents of the request
	Depth int
	// Method is the HTTP method of the request
	Method string
	// Body is the request body which is used on POST/PUT requests
	Body io.Reader
	// ResponseCharacterencoding is the character encoding of the response body.
	// Leave it blank to allow automatic character encoding of the response body.
	// It is empty by default and it can be set in OnRequest callback.
	ResponseCharacterEncoding string
	// ID is the Unique identifier of the request
	ID        uint32
	collector *Collector
	abort     bool
	baseURL   *url.URL
	// ProxyURL is the proxy address that handles the request
	ProxyURL string
}
```

## 爬取掘金专栏

爬虫的原理就是模拟一个网页访问，获取文档信息，并对信息以各种手段解析出自己需要的数据，并保存数据。

由于作者是仓促间一夜入门Go语言，无力实现一个数据爬取的爬虫，我实现的是：

```sh
访问掘金专栏详情页
		⏬
获取指定的内容和标题部分
		⏬
将标题作为文件名
		⏬
把内容转为Markdown格式存入文件
		⏬
保存文件到本地
```

### 分析页面结构

**专栏标题结构**

```html
<h1 data-v-23a9d5ed="" class="article-title">(.*?)<\/h1>
```

**专栏正文结构**

```html
<div class="markdown-body">(.*?)<\/div>
```

### 获取专栏标题和内容

```go
func main() {
	c := colly.NewCollector(
		colly.Async(true),
	)

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	c.OnError(func(_ *colly.Response, err error) {
		log.Println("Something went wrong:", err)
	})

	c.OnHTML(".article-title", func(e *colly.HTMLElement) {
		// Code Here
	})

	c.OnHTML(".markdown-body", func(e *colly.HTMLElement) {
		// Code Here
	})

	c.Visit("https://juejin.im/post/" + *post)
	c.Wait()
}
```

- `colly.NewCollector`里面加了一项`colly.Async(true)`，表示抓取时异步的，这能让抓取速度显著提高
- 使用 `OnHTML` 事件分别抓取带有`article-title`和`.markdown-body`的元素，这里边就是我们下边要实现功能的逻辑实现地。
- `OnHTML` 第一个参数是符合CSS选择器规则的，可以使用任意选择器搞事情。

### 转HTML为Markdown

这里我们借助的是[html-to-markdown](https://github.com/JohannesKaufmann/html-to-markdown) 这个库提供的功能，我们将其简单封装一下：

```go
// 将Html转为Markdown
func convertHTMLToMarkdown(selection *goquery.Selection) string {
	converter := md.NewConverter("", true, nil)
	markdown := converter.Convert(selection)
	return markdown
}
```

### 保存文件到本地

```go
...
// 写入文件
func writeFile(fileName string,content string) {
	filePath := fileName + ".md"
	var file *os.File

	if checkFileIsExist(filePath) {
		// 如果文件存在，则删除
		err := os.Remove(filePath)
		if err != nil {
			log.Fatal(err)
		}
	}

	// 创建文件并写入内容
	file, _ = os.Create(filePath)
	n, _ := io.WriteString(file, "## "+fileName+"\n\n"+content)
	// 关闭文件
	file.Close()
	if n == 0 {
		return
	}
}

// 检查文件是否存在
func checkFileIsExist(fileName string) bool {
	_, err := os.Stat(fileName)
	if err != nil {
		return false
	}
	return true
}
...
```

- `os.Stat`：用来获取文件或文件信息，基于它封装了`checkFileIsExist` 判断文件是否存在
- `os.Create`+`io.WriteString`实现了文件的创建和写入文件
- 判断文件存在则用`os.Remove(filePath)` 删除文件，以覆盖文件（懒得看覆盖文件的方法）

### 获取命令行参数

这个写法我用NodeJS写CLI工具的时候写法差不多，有兴趣的可以[看一下，](https://github.com/youngjuning/cli)下次不一定，就这次呗。

```go
func main() {
	var post = flag.String("post", "6859538537830858759", "文章编号")
	var rootDir = flag.String("root", root, "文件保存的根目录")
  flag.Parse()
}
```

### 获取环境变量

GO语言中不支持使用`~`号代表家目录，经过一番折腾，找到这个解决办法，这不和Deno一个德行，这语言设计都是互相借鉴（抄）的吧。

```go
os.Getenv("HOME")
```

### 获取图片

测试脚本的时候发现有图片的文章，图片都丢失了，这怎么行，没有图片的文章是没有灵魂的。分析的结果是掘金的图片是懒加载的，标签大概长这样：

```html
<img class="lazyload inited loaded" data-src="https://i.loli.net/2020/08/13/cVomW7L9YOTw2uA.png" data-width="800" data-height="600" src="https://i.loli.net/2020/08/13/cVomW7L9YOTw2uA.png">
```

我盲猜是这个`data-`属性的问题，遂在脚本中加入了下面的代码将`data-`删掉：

```go
...
reg := regexp.MustCompile(`data-`)
		html, _ := e.DOM.Html()
		markdown := convertHTMLToMarkdown(reg.ReplaceAllString(html, ""))
...
```

[youngjuning/homebrew-juejin-spider@0.1.0](https://github.com/youngjuning/homebrew-juejin-spider/releases/tag/v0.1.0) 已经发布，可以完美地抓取掘金专栏啦。

### 成品

> 代码太长，源码在这里 》》》[https://github.com/youngjuning/juejin-spider](https://github.com/youngjuning/juejin-spider)《《《，都读到这里了，给个star呗。

## 打包并使用Homebrew发布脚本

黑客是要有追求的，不可能做个玩具出来。而且Go本身就是运行起来不靠任何依赖和环境，我不能要求使用工具的人还得装个go的环境。我第一个想到的就是将我的脚本发到Homebrew，谢天谢地，[使用HomeBrew发布脚本](https://www.jianshu.com/p/e88831aac62a) 详细地讲解了这个过程。

### 1、打包成可执行文件

```sh
$ go build juejin.go
```

会在当前目录下生成一个叫 juejin 的可执行文件，`./juejin` 是可以执行的，也可以使用`go build -o=/usr/local/bin juejin.go` 或 `go build -o=$GOPATH/bin/ juejin.go` 放到已经注册的系统路径中。

### 2、将可执行文件打包成 tar.gz 的格式

```shell
$ tar zcvf juejin_0.0.1.tar.gz juejin
```

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f64f139d9578418fa7eaae6a33191266~tplv-k3u1fbpfcp-zoom-1.image)

上传到git，供配方软连接到这个脚本文件。

### 3、使用 `brew create <git-url> --tab user/repo` 创建药方

```sh
$ brew create \
    https://github.com/youngjuning/homebrew-juejin-spider/raw/master/juejin_0.0.1.tar.gz \
    --tap youngjuning/homebrew-juejin-spider
```

我们需要对安装方式做一下调整:

```ruby
def install
    bin.install "juejin"
end
```

做完这些操作后，保存，提交到git上。

### 4、安装脚本

```shell
$ brew install youngjuning/juejin-spider/juejin
```

执行 `juejin -h` 检查是否成功：

```shell
$ juejin -h
Usage of juejin:
  -post string
    	文章编号 (default "6859538537830858759")
  -root string
    	文件保存的根目录 (default "/Users/yangjunning/juejin")
```

### 在其他人的设备安装自己的脚本

```sh
// 在执行这个命令的时候，brew会自动去更新自己的formula仓库，会耗时几分钟。。。
$ brew tap youngjuning/juejin-spider https://github.com/youngjuning/homebrew-juejin-spider.git
// 下载、安装脚本
$ brew install youngjuning/juejin-spider/juejin
```

## 超级赛亚人镇

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcd91045ddd8472f857afccf3dff1b15~tplv-k3u1fbpfcp-zoom-1.image)

> 感谢你耐心看完了这篇文章，点赞等于学会，收藏等于精通，点赞加收藏是真爱！！！也期待在评论区和我讨论！！！

[🏆 技术专题第二期 | 我与 Go 的那些事......](https://juejin.im/post/6859784103621820429)
