# Webアプリを作ってみたい(サーバーサイド)

***書くのをサボっていたので思い出になっている。***
***ところどころ違うかも。***

## ログインがしたい

ユーザの作成とユーザ認証が必要。削除は後で。

### nodejs + express + passport + mongoose(mongodb)でやってみる

これはよくある構成なので、適当に情報を集めて構築してみる。~~どこ見たか忘れただけ~~

フロントエンドがReactでSPAの構成なので、サーバーサイドはAPIの提供だけにする。

>この構成が難しかった。通常？はサーバ側でアクセスに対してhtmlをクライアントに返却していると思う。SPAの場合はルーティングがクライアントで行われるので、サーバーで何しよう？になるので良くわからなくなっていた。実際はサーバはなくてもいいが正解っぽい。
例えば、静的テキストだけを扱う企業紹介ページとかはサーバらしいサーバは必要ない。

APIは取り合えずこんな感じで作ってみる

|method|URI|param|return|認可|
|:--:|:--:|:--:|:--:|:--:|
|post|`/api/login`|username, password|token|×|
|post|`/api/registration`|username, email, password|`/api/login`にリダイレクトしてログイン処理|×|
|get|`/api/list`|-|['aaa', 'bbb']|○|

`/api/list`はテスト用。`/api/login`で渡した*token*がないとNGになるAPI。

### login

passportのLOCAL認証をして、tokenを返す。tokenはJWT(JsonWebToken)を使ってみる。

```javascript
app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err)
      return next(err)
    }
    if (!user) { return res.json({status: 'NG', message: info.message}) }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      let token = jwt.sign(user.toJSON(), app.get('superSecret'))
      return res.json({status: 'OK', token: token, message: 'login success'})
    })
  })(req, res, next)
})
```

passportの設定はこんな感じ。

```javascript
module.exports = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, (username, password, done) => {
  process.nextTick(() => {
    User.findOne({ name: username }, (error, user) => {
      if (error) {
        return done(error)
      }
      if (!user) {
        return done(null, false, { message: 'ユーザーIDを確認してください' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'パスワードが違います' })
      }
      return done(null, user)
    })
  })
})
```

*User*はmongooseのshema

```javascript
const mongoose = require('mongoose')

let schema = mongoose.Schema({
  'id': String,
  'email': String,
  'name': String,
  'password': String,
  'role': String
})
schema.methods.validPassword = function (password) {
  console.log(this)
  console.log(this.password, ' : ', password)
  return (this.password === password)
}
module.exports = mongoose.model('User', schema, 'user')
```

中身はまだ精査できていないので適当。*name(=id)*と*password*をチェックしてるだけ。

### ユーザ登録

```javascript
app.post('/api/registration', (req, res, next) => {
  const query = { $or: [
    { name: req.body.username },
    { email: req.body.email }
  ]}
  User.findOne(query, (error, user) => {
    if (error) {
      console.log(error)
      return res.json({status: 'NG', error})
    }
    if (user) {
      console.log(user)
      return res.json({status: 'NG', message: 'ユーザーIDまたはメールアドレスが登録済みです'})
    }
    const newUser = new User({
      id: req.body.username,
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 'group1'
    })
    console.log(newUser)
    newUser.save((err) => {
      if (err) console.log(err)
      return res.redirect(307, '/api/login')
    })
  })
})
```

登録済みか？は*username*か*email*が登録されていないかをチェックする。
登録されていなければ登録して、`/api/login`にリダイレクトして、そのままlogin処理を行う。

### 認可

tokenの検証を行うように設定する。
expressの設定はapp(express())への登録順なので、

1. 認可不要
1. 認可チェック
1. 認可必要

の順に登録すればOK。認可チェック以降に登録した処理はすべて認可チェック後に実施され、認可チェックでエラーなら弾かれる。

```javascript
app.use((req, res, next) => {
  let token = req.body.token || req.query.token || req.header['x-access-token']
  console.log(token)
  if (!token) {
    return res.status(403).json({success: false, message: 'No token provided.'})
  }
  jwt.verify(token, app.get('superSecret'), (err, decoded) => {
    if (err) {
      return res.json({success: false, message: 'Invalid token.'})
    }
    req.decoded = decoded
    next()
  })
})
```

*verify*した結果をまた、検証してとかするのが正解？とか思わなくもない。
jwtに何を含ませるか？で決まる気がする。

### 認可後の処理

こんな感じ。（適当）

```javascript
app.get('/api/list', (req, res, next) => {
  return res.json({success: true, list: ['aaa', 'bbb']})
})
```