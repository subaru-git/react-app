# Webアプリを作ってみたい(Login処理)

***書くのをサボっていたので思い出になっている。***
***ところどころ違うかも。***

UIには[Material-UI](http://www.material-ui.com/#/)を使う。

## UIを作る

*TextField*と*RaisedButton*で作る。

```javascript
  <div className="Login">
    <h1>Login</h1>
    <TextField type="text" ref="id" hintText="userID" errorText={this.props.login.idErrorMessage} /><br />
    <TextField type="password" ref="pass" hintText="password" errorText={this.props.login.passwordErrorMessage} /><br />
    <RaisedButton onClick={this.onLogin.bind(this)} label="Submit"/><br />
    <Link to="/registration">create user</Link><br />
  </div>
```

`<form>`は使わない方式。

## submit処理

*RaisedButton*の*onLogin*として実装。
もしかしたらES2015以降では他のやり方がいい？素直に`e => this.onLogin(e)`とかにするほうがいいかも

やることは、

- useidのチェック
- passwordのチェック
- post

コードはこんな感じ

```javascript
  onLogin (e) {
    e.preventDefault()
    this.props.idError(null)
    this.props.passwordError(null)
    this.props.authError(null)

    const id = this.refs.id.getValue()
    const pass = this.refs.pass.getValue()

    if (!id) {
      this.props.idError('ユーザーIDは必須です')
    }
    if (!pass) {
      this.props.passwordError('パスワードは必須です')
    }
    if (id && pass) {
      this.props.getAuth({id, pass}) // post
    }
  }
```

### `e.preventDefault()`

ここで必要なのかは微妙なきがするが、確か`<form>`だと*submit*したらすぐにFormの内容を消しに行くとかがあってそれを止めるためだった気がする。

### `this.refs`

`ref`で指定した名前でelementが取得できる*React*の機能。今は非推奨。
`ref={el => localElm = el}`のように変数コピーして使うのがいい。

### post

*axios*を使ってpostしているけど、*react-redux*の*Middleware*でpostしているのでここでは見えない。
コードはこんな感じ。

```javascript
    let params = new URLSearchParams()
    params.append('username', id)
    params.append('password', pass)
    axios
      .post('api/login', params)
      .then((result) => {
        console.log('OK : ', result)
        if (result.data.status === 'OK') {
          dispatch(Actions.auth.setAuth({
            token: result.data.token,
            id
          }))
          dispatch(push(id))
        } else {
          dispatch(Actions.login.authError(result.data.message))
        }
      })
      .catch((e) => {
        console.log('NG : ', e)
        dispatch(Actions.login.authError('ネットワークを確認してください'))
      })
```

`URLSearchParams`を使って*param*を作らないと、`application/x-www-form-urlencoded`にならなくて、サーバーサイドの*passport*がうまく動かなかった。
