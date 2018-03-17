import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import NotFound from '../components/NotFound'
import Login from '../components/Login'
import Userpage from '../components/Userpage'
import Registration from '../components/Registration'

export default () => (
  <BrowserRouter className="Routes" >
    <Switch>
      <TopRoute path="/" exact/>
      <NoAuthRequiredRoute path="/login" component={Login} exact/>
      <NoAuthRequiredRoute path="/registration" component={Registration} exact/>
      <AuthRequiredRoute path="/:userid" component={Userpage} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

const AuthRequiredRoute = connect(state =>
  state.auth
)(props => (
  props.isAuth ? (
    <Route {...props} />
  ) : (
    <Redirect to={'/login'} />
  )
))

const NoAuthRequiredRoute = connect(state =>
  state.auth
)(props => (
  props.userId ? (
    <Redirect to={props.userId}/>
  ) : (
    <Route {...props}/>
  )
))

const TopRoute = connect(state =>
  state.auth
)(props => (
  props.userId ? (
    <Redirect to={props.userId}/>
  ) : (
    <Redirect to={'/login'}/>
  )
))
