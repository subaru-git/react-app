import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import Actions from '../../actions/register'
import './style.css'
import validator from 'validator'
import error from './error.svg'

class Registration extends Component {
  onRegistration (e) {
    e.preventDefault()
    this.props.idError(null)
    this.props.mailError(null)
    this.props.passwordError(null)
    this.props.registrationError(null)

    const id = this.refs.id.getValue()
    const mail = this.refs.mail.getValue()
    const pass = this.refs.pass.getValue()

    if (!id) {
      this.props.idError('ユーザーIDは必須です')
    }
    if (!mail) {
      this.props.mailError('メールアドレスは必須です')
    } else if (!validator.isEmail(mail)) {
      this.props.mailError('メールアドレスが不正です')
    }
    if (!pass) {
      this.props.passwordError('パスワードは必須です')
    }
    if (id && validator.isEmail(mail) && pass) {
      this.props.register({id, mail, pass})
    }
  }
  render () {
    let errormsg
    if (this.props.registrationErrorMessage) {
      errormsg = (
        <div className="errormsg">
          <img src={error} alt="error" /><br />
          {this.props.registrationErrorMessage}<br />
        </div>
      )
    }
    return (
      <div className="Registration">
        <h1>Registration</h1>
        <TextField type="text" ref="id" hintText="userID" errorText={this.props.idErrorMessage}/><br />
        <TextField type="text" ref="mail" hintText="mail address" errorText={this.props.mailErrorMessage}/><br />
        <TextField type="password" ref="pass" hintText="password" errorText={this.props.passwordErrorMessage}/><br />
        <RaisedButton onClick={this.onRegistration.bind(this)} label="Registration"/><br />
        {errormsg}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return state.register
}

const mapDispatchToProps = dispatch => {
  return {
    idError: payload => { dispatch(Actions.idError(payload)) },
    passwordError: payload => { dispatch(Actions.passwordError(payload)) },
    mailError: payload => { dispatch(Actions.mailError(payload)) },
    registrationError: payload => { dispatch(Actions.registrationError(payload)) },
    register: payload => { dispatch(Actions.register(payload)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
