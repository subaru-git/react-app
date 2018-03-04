import React, { Component } from 'react'
import { Redirect, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Logins from '../../actions/login'
import Auths from '../../actions/auth'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import './style.css'
import error from './error.svg'

class Login extends Component {
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
      this.props.getAuth({id, pass})
    }
  }

  render () {
    let errormsg = null
    if (this.props.login.authErrorMessage) {
      errormsg = (
        <div className="errormsg">
          <img src={error} alt="error" /><br />
          {this.props.login.authErrorMessage}
        </div>
      )
    }
    return (
      this.props.auth.access_token ? (
        <Redirect to={this.props.auth.userId} />
      ) : (
        <div className="Login">
          <h1>Login</h1>
          <TextField type="text" ref="id" hintText="userID" errorText={this.props.login.idErrorMessage} /><br />
          <TextField type="password" ref="pass" hintText="password" errorText={this.props.login.passwordErrorMessage} /><br />
          <RaisedButton onClick={this.onLogin.bind(this)} label="Submit"/><br />
          <Link to="/registration">create user</Link><br />
          {errormsg}
        </div>
      )
    )
  }
}

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
