# Webアプリを作ってみたい(react-redux)

***書くのをサボっていたので思い出になっている。***
***ところどころ違うかも。***

なんかreactとセットみたいなので使ってみる。

## 何ができるの？

- react-componentのstateを集中管理できる。
- stateの変更がreact-componentに反映される。

## reducer

呼ばれたらswitchしてstateを返すもの？

```javascript
const initialState = {
  idErrorMessage: null,
  passwordErrorMessage: null,
  authErrorMessage: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.ID_ERROR:
      console.log('reducer ID_ERROR: ', action.payload)
      return {
        ...state,
        idErrorMessage: action.payload
      }
    case Types.PASSWORD_ERROR:
      console.log('reducer PASS_ERROR', action.payload)
      return {
        ...state,
        passwordErrorMessage: action.payload
      }
    case Types.AUTH_ERROR:
      console.log('reducer AUTH_ERROR', action.payload)
      return {
        ...state,
        authErrorMessage: action.payload
      }
    default:
      return state
  }
}
```

## action

typeを返すもの？

```javascript
export default {
  idError: payload => ({
    type: Types.ID_ERROR,
    payload
  }),
  passwordError: payload => ({
    type: Types.PASSWORD_ERROR,
    payload
  }),
  authError: payload => ({
    type: Types.AUTH_ERROR,
    payload
  })
}
```

## store

データプール？

```javascript
const store = createStore(reducer)
```

## Provider

こいつ各Componentにつなぐ？

```javascript
import { Provider } from 'react-redux'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'))
```

## componentの設定

reducerのstateを自分のpropsに割り当てる設定と、
関数を割り当てる設定をする。

```javascript
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    idError: (payload) => { dispatch(Logins.idError(payload)) },
    passwordError: (payload) => { dispatch(Logins.passwordError(payload)) },
    authError: (payload) => { dispatch(Logins.authError(payload)) },
    getAuth: payload => { dispatch(Auths.getAuth(payload)) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
```

こうすると、`this.props.id`とかでアクセスできるようになる。

けど、正直何がそんなに嬉しいのかよくわからない。stateの集中管理はデバッグとかはしやすいけど、Componentの使い回しが難しくなりそうな気がする。
「使い回しできる=stateを持たない」と、もともとしているのであれば問題ないけど。別にstateとの両立もいいのか？何が不満だったのか？
> 後でもう少し踏み込んでみる