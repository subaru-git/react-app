import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import validator from 'validator'
import Actions from '../../actions/userprofile'
import error from './error.svg'
import './style.css'

export default connect(state => (
  state.userprofile
), dispatch => (
  {
    idError: payload => { dispatch(Actions.idError(payload)) },
    passwordError: payload => { dispatch(Actions.passwordError(payload)) },
    mailError: payload => { dispatch(Actions.mailError(payload)) },
    updateError: payload => { dispatch(Actions.updateError(payload)) },
    update: payload => { dispatch(Actions.update(payload)) },
    setUserProfile: payload => { dispatch(Actions.setUserProfile(payload)) },
    getUserProfile: payload => { dispatch(Actions.getUserProfile(payload)) }
  }
))(class extends Component {
  
  idElm = null
  mailElm = null
  passElm = null

  componentDidMount () {
    this.props.getUserProfile({})
  }

  handleMailChange(e, email) {
    this.props.setUserProfile({
      id: this.props.id,
      email,
      password: this.props.password
    })
  }

  handlePasswordChange(e, password) {
    this.props.setUserProfile({
      id: this.props.id,
      email: this.props.email,
      password
    })
  }

  onUpdate (e) {
    const { props, idElm, mailElm, passElm } = this
    e.preventDefault()
    props.idError(null)
    props.mailError(null)
    props.passwordError(null)
    props.updateError(null)

    const id = idElm.getValue()
    const email = mailElm.getValue()
    const password = passElm.getValue()

    if (!email) {
      props.mailError('メールアドレスは必須です')
    } else if (!validator.isEmail(email)) {
      props.mailError('メールアドレスが不正です')
    }
    if (!password) {
      props.passwordError('パスワードは必須です')
    }
    if (id && validator.isEmail(email) && password) {
      props.update({email, password})
    }
  }

  render () {
    const { props } = this
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
      <div className="Profile">
        <h1>Profile</h1>
        <TextField type="text" ref={el => {this.idElm = el}} floatingLabelText="userID" errorText={props.idErrorMessage} value={props.id} disabled/><br />
        <TextField type="text" ref={el => {this.mailElm = el}} floatingLabelText="mail address" onChange={(e, email) => this.handleMailChange(e, email)} errorText={props.mailErrorMessage} value={props.email || ''}/><br />
        <TextField type="password" ref={el => {this.passElm = el}} floatingLabelText="password" onChange={(e, password) => this.handlePasswordChange(e, password)} errorText={props.passwordErrorMessage} value={props.password || ''}/><br />
        <RaisedButton onClick={e => this.onUpdate(e)} label="Update"/><br />
        {errormsg}
      </div>
    )
  }
})