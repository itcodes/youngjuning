title: React必知必会
date: 2020-07-20 16:11:35
categories:
  - [前端开发,React]
tags:
  - 必知必会

![](https://i.loli.net/2020/07/20/cbTvGZFO87RkBei.png)

<!--more-->

## 理解声明式渲染

> React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时 React 能有效地更新并正确地渲染组件。
> 以声明式编写 UI，可以让你的代码更加可靠，且方便调试。- React 官网

理解声明式渲染，需要对比命令式渲染，这里我们以产品经理的视角进行场景模拟：

- 声明式: 产品经理只需要提出需求以及频繁地变更需求，至于怎么实现，他不关心！
- 命令式: 程序员受不鸟需求频繁变更，转行养猪🐖。产品经理频繁变更需求的同时，还要自己去敲代码实现！！！

> 翻译过来其实就是React解放了开发者的一只手，从此开发者只需要关心数据的声明和数据的更新。至于如何映射到DOM上，框架内部去处理（并且处理地更高效，更稳定）

## 理解受控组件

在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 [`setState()`](https://zh-hans.reactjs.org/docs/react-component.html#setstate)来更新。

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

换句话说，组件受控指的是其状态由props控制而非内部state控制。

### 使用@quid/react-use-controlled-state（推荐）

使用这个 hook，你可以让你的组件在受控和非受控之前切换，想要受控就传入 `value` 和 `onChange`。

```js
import React,{useState} from 'react';
import useControlledState from '@quid/react-use-controlled-state'

type Props =
  | {
      defaultValue?: undefined;
      value;
      onChange;
    }
  | {
      defaultValue;
      value?: undefined;
      onChange?: undefined;
    };

const ControlledComponent = (props: Props) => {
  const [value, setValue] = useControlledState(props.defaultValue, props.value, props.onChange);

  return (
    <button type="button" onClick={() => setValue(current => !current)}>
      {value === true ? 'component is open' : 'component is closed'}
    </button>
  );
};

export default () => {
  const [value, setValue] = useState(false)
  const handleChange = (params) => {
    setValue(params)
  }

  return (
    <div>
      <ControlledComponent value={value} onChange={handleChange}/>
    </div>
  );
}
```

### 使用useEffect

```tsx
import React, { useState, useEffect } from 'react';

type Props =
  | {
      defaultValue?: undefined;
      value;
      onChange;
    }
  | {
      defaultValue;
      value?: undefined;
      onChange?: undefined;
    };

const ControlledComponent = (props: Props) => {
  const [value, setValue] = useState(props.value || props.defaultValue);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <button type="button" onClick={() => setValue(current => !current)}>
      {value === true ? 'component is open' : 'component is closed'}
    </button>
  );
};

export default () => {
  const [value, setValue] = useState(false);
  const handleChange = params => {
    setValue(params);
  };

  return (
    <div>
      <ControlledComponent value={value} onChange={handleChange} />
    </div>
  );
};
```

## 类组件

### 正确使用 setState

1、不要在 `this.setState` 内访问 `this.state`([react/no-access-state-in-setstate](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md)) 

先来看下面的错误❌示例，两次打印出来的值都是 1。

```jsx
constructor(props) {
  super(props)
  this.state = {
    count: 0,
  }
}

componentDidMount() {
  this.setState({ count: this.state.count + 1 }, () => {
    console.log(this.state.count) // 1
  })
  this.setState({ count: this.state.count + 1 }, () => {
    console.log(this.state.count) // 1, not 2
  })
}
```

产生上面结果的原因是在开始重新渲染之前，React 会有意地进行“等待”，直到所有在组件的事件处理函数内调用的 `setState()` 完成之后。这样可以通过避免不必要的重新渲染来提升性能。解决办法是给 `setState` 第一个参数传入函数：

```jsx
constructor(props) {
  super(props)
  this.state = {
    count: 0,
  }
}

componentDidMount() {
  setInterval(() => {
    this.setState(
      prevState => {
        return { count: prevState.count + 1 }
      },
      () => {
        console.log('[count1]', this.state.count) // 1
      }
    )
    this.setState(
      prevState => {
        return { count: prevState.count + 1 }
      },
      () => {
        console.log('[count2]', this.state.count) // 2, not 1
      }
    )
  }, 1000)
}
```

## Hooks

### 正确使用useEffect

#### 1、Capture Value 陷阱

由于 useEffect 符合 Capture Value 的特性，拿到的 `count` 值永远是初始化的 `0`。所以打印出的 `count` 不会是1。

```js
const [count, setCount] = useState(0)
useEffect(() => {
  setCount(count + 1)
  console.log('[count]', count)
}, [])
```

`setCount` 还有一种函数回调模式，你不需要关心当前值是什么，只要对 “旧的值” 进行修改即可。这样我们就可以立即获取新值。这一点和 `setState` 有异曲同工之妙。

```jsx
const [count, setCount] = useState(0)
useEffect(() => {
  setCount(c => {
    console.log(c + 1)
    return c + 1
  })
}, [])
```

## 红线与原则

### 组件名称必须以大写字母开头。

React 会将以小写字母开头的组件视为原生 DOM 标签。例如，`<div />` 代表 HTML 的 div 标签，而 `<Welcome />` 则代表一个组件，并且需在作用域内使用 Welcome。

### Props 的只读性

组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props。

所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。

### 正确地使用 State

#### 不要直接修改 State

例如，此代码不会重新渲染组件：

```jsx
// Wrong
this.state.comment = 'Hello';
```

而是应该使用 `setState()`:

```jsx
// Correct
this.setState({comment: 'Hello'});
```

#### State 的更新可能是异步的

出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。

因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

例如，此代码可能会无法更新计数器：

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要解决这个问题，可以让 `setState()` 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```jsx
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

### 事件处理

1、React元素的事件处理和DOM元素的很相似，但是有一点语法上的不同

- React 事件的命名使用小驼峰式（camelCase），而不是纯小写。
- 使用JSX语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

2、在 React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault` 。

### 条件渲染

在组件的 `render` 方法中返回 `null` 并不会影响组件的生命周期。例如，上面这个示例中，`componentDidUpdate` 依然会被调用。但是返回 `undefined` 会报错，比如：

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  // wrong
  // return isLoggedIn && <GuestGreeting />;
  // right
  return isLoggedIn ? <GuestGreeting /> : null;
}

export default () => {
  return (
    <div>
      <Greeting isLoggedIn={undefined} />
    </div>
  );
}
```

> 条件渲染推荐使用三目运算符，并在值为 `false` 时返回 `null`

### 列表key

- 一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key
- 当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key
- 如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。

### 组合VS继承

React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用。

### React 哲学

1. 第一步：将设计好的 UI 划分为组件层级
2. 第二步：用 React 创建一个静态版本
3. 第三步：确定 UI state 的最小（且完整）表示
4. 确定 state 放置的位置
5. 添加反向数据流

## 注意事项

> React不支持那些不兼容 ES5 方法的旧版浏览器，但如果你的应用包含了 polyfill，例如 [es5-shim 和 es5-sham](https://github.com/es-shims/es5-shim) 你可能会发现你的应用仍然可以在这些浏览器中正常运行。但是如果你选择这种方法，你便需要孤军奋战了。 - 浏览器支持

> 因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。
> 例如，JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。 - JSX 特定属性

> 你可能会将元素与另一个被熟知的概念——“组件”混淆起来。我们会在下一个章节介绍组件。组件是由元素构成的。 - 元素渲染

## 参考链接

- [怎么理解“声明式渲染”？](https://www.zhihu.com/question/68121329/answer/1351295887)

## 联系作者

> 本文首发于[杨俊宁的博客](https://youngjuning.js.org/)

|                           作者微信                           |                           赞赏作者                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://i.loli.net/2020/02/22/q2tLiGYvhIxm3Fl.jpg" width="200px"/> | <img src="https://i.loli.net/2020/02/23/q56X1eYZuITQpsj.png" width="200px"/> |
