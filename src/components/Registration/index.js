import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import validator from 'validator'
import Actions from '../../actions/register'
import error from './error.svg'
import './style.css'

export default connect(state => (
    state.register
), dispatch => (
  {
    idError: payload => { dispatch(Actions.idError(payload)) },
    passwordError: payload => { dispatch(Actions.passwordError(payload)) },
    mailError: payload => { dispatch(Actions.mailError(payload)) },
    registrationError: payload => { dispatch(Actions.registrationError(payload)) },
    register: payload => { dispatch(Actions.register(payload)) }
  }
))(props => {
  let idElm = null
  let mailElm = null
  let passElm = null

  const onRegistration = e => {
    e.preventDefault()
    props.idError(null)
    props.mailError(null)
    props.passwordError(null)
    props.registrationError(null)

    const id = idElm.getValue()
    const mail = mailElm.getValue()
    const pass = passElm.getValue()

    if (!id) {
      props.idError('ユーザーIDは必須です')
    }
    if (!mail) {
      props.mailError('メールアドレスは必須です')
    } else if (!validator.isEmail(mail)) {
      props.mailError('メールアドレスが不正です')
    }
    if (!pass) {
      props.passwordError('パスワードは必須です')
    }
    if (id && validator.isEmail(mail) && pass) {
      props.register({id, mail, pass})
    }
  }
  let errormsg = null
  if (props.registrationErrorMessage) {
    errormsg = (
      <div className="errormsg">
        <img src={error} alt="error" /><br />
        {props.registrationErrorMessage}<br />
      </div>
    )
  }
  return (
    <div className="Registration">
      <h1>Registration</h1>
      <TextField type="text" ref={el => {idElm = el}} hintText="userID" errorText={props.idErrorMessage}/><br />
      <TextField type="text" ref={el => {mailElm = el}} hintText="mail address" errorText={props.mailErrorMessage}/><br />
      <TextField type="password" ref={el => {passElm = el}} hintText="password" errorText={props.passwordErrorMessage}/><br />
      <RaisedButton onClick={e => onRegistration(e)} label="Registration"/><br />
      {errormsg}
    </div>
  )
})
