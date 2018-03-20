import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import Form from '../Form'
import Profile from '../Profile'
import NotFound from '../NotFound'

export default connect(state =>
  state.auth
)(props => (
  props.userId === props.match.params.userid ? (
    <Form title={props.match.params.userid} type='Profile'>
      <Profile/>
    </Form>
  ) : (
    <Route path={props.path} component={NotFound} />
  )
))
