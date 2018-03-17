# Webアプリを作ってみたい(React-Router)

***書くのをサボっていたので思い出になっている。***
***ところどころ違うかも。***

Reactでルーティングしてみる。
サーバーのルーティングと一緒？
expressとか絡めたときにどうなるかよくわからない。

## React-Router

アドレス指定をどのようにルーティングするか？
SPAなのでサーバー側のルーティングをフロントでやる感じ。
実際は、指定されたアドレスに対してどのComponentをレンダリングするかを設定する機能。

## やってみる

*BrowserRouter*を使ってやってみる。（HashRouterもある）

```javascript:routes.js
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './components/App'
import About from './components/About'
import NotFound from './components/NotFound'

class Routes extends Component {
  render () {
    return (
      <BrowserRouter className="Routes" >
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/app" component={App} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routes
```

とりあえずこんな感じ。
`<Switch>`で`<Route>`囲むと`<Route>`に指定した_path_にしたがってルーティングしてくれる。
判定は、上から順番。_path_を指定しないと全てのケースがヒットするので、エラーページとかを用意しているのであれば使える。

## 条件分岐させる

何を作るか決めてないけど、ログインはしたい。
未ログイン状態で`/about`にアクセスすると、`/login`にリダイレクトされるみたいな。

ということで、ログイン済みか？を判断して`<Route>`を組み替える。
[ここを参考にする](https://qiita.com/doruji/items/4dbc96554d8ed77aed02)

```jacascript:auth.js
class Auth extends Component {
  render () {
    return (
      this.props.isAuth ? (
        <Route children={this.props.children} />
      ) : (
        <Redirect to={'/login'} />
      )
    )
  }
}
```

`this.props.isAuth`でログイン済みか？を判定する。（react-reduxを使っているのでこんな書き方）
ログイン済みなら子供(`this.props.children`)を展開しますよ。ログインしていなければ、`/login`にリダイレクトしますよってこと。

完成させるとこんな感じ

```javascript:routes.js
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './components/App'
import About from './components/About'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Top from './components/Top'
import Auth from './components/Auth'
import Userpage from './components/Userpage'
import Registration from './components/Registration'
import Create from './components/Create'

class Routes extends Component {
  render () {
    return (
      <BrowserRouter className="Routes" >
        <Switch>
          <Route path="/login" component={Login} exact/>
          <Route path="/registration" component={Registration} exact/>
          <Route path="/" component={Top} exact/>
          <Auth>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/app" component={App} />
              <Route path="/new" component={Create} />
              <Route path="/:userid" component={Userpage} />
              <Route component={NotFound} />
            </Switch>
          </Auth>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routes
```

この例だと、`/`の*Top*も*Auth*と同じように分岐している。

```javascript:top.js
class Top extends Component {
  render () {
    return (
      this.props.userid ? (
        <Redirect to={this.props.userid}/>
      ) : (
        <Redirect to={'/login'} />
      )
    )
  }
}
```

ログインしていて*userid*がわかるのであれば`/:userid`にリダイレクトされる。
ログインしていなければ`/login`にリダイレクトされる。

ログイン前提のWebアプリのTopページって何を用意すればいいの？