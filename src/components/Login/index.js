import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Logins from '../../actions/login'
import Auths from '../../actions/auth'
import error from './error.svg'
import './style.css'

export default connect(state => (
  {
    auth: state.auth,
    login: state.login
  }
), dispatch => (
  {
    idError: (payload) => { dispatch(Logins.idError(payload)) },
    passwordError: (payload) => { dispatch(Logins.passwordError(payload)) },
    authError: (payload) => { dispatch(Logins.authError(payload)) },
    getAuth: payload => { dispatch(Auths.getAuth(payload)) }
  }
))(props => {
  let idElm = null
  let passElm = null

  const onLogin = e =>  {
    e.preventDefault()
    props.idError(null)
    props.passwordError(null)
    props.authError(null)

    const id = idElm.getValue()
    const pass = passElm.getValue()

    if (!id) {
      props.idError('ユーザーIDは必須です')
    }
    if (!pass) {
      props.passwordError('パスワードは必須です')
    }
    if (id && pass) {
      props.getAuth({id, pass})
    }
  }

  let errormsg = null
  if (props.login.authErrorMessage) {
    errormsg = (
      <div className="errormsg">
        <img src={error} alt="error" /><br />
        {props.login.authErrorMessage}
      </div>
    )
  }
  return (
    <div className="Login">
      <h1>Login</h1>
      <TextField type="text" ref={el => {idElm = el}} hintText="userID" errorText={props.login.idErrorMessage} /><br />
      <TextField type="password" ref={el => {passElm = el}} hintText="password" errorText={props.login.passwordErrorMessage} /><br />
      <RaisedButton onClick={e => onLogin(e)} label="Submit"/><br />
      <Link to="/registration">create user</Link><br />
      {errormsg}
    </div>
  )
})
