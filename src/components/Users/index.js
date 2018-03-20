import React from 'react'
import { connect } from 'react-redux'
import Form from '../Form'
import UserList from '../UserList'

export default connect(state =>
  state.auth
)(props => (
  <Form title={props.match.params.userid} type='Users'>
    <UserList/>
  </Form>
))
