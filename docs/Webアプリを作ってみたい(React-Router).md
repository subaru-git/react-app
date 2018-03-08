Webアプリを作ってみたい(React-Router)

**書くのをサボっていたので思い出になっている。**
**ところどころ違うかも。**

Reactでルーティングしてみる。
サーバーのルーティングと一緒？
expressとか絡めたときにどうなるかよくわからない。

## React-Router

アドレス指定をどのようにルーティングするか？
SPAなのでサーバー側のルーティングをフロントでやる感じ。
実際は、指定されたアドレスに対してどのComponentをレンダリングするかを設定する機能。

## やってみる

_BrowserRouter_を使ってやってみる。（HashRouterもある）

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