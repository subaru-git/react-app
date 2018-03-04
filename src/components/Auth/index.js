import React, {Component} from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Auth extends Component {
  render () {
    return (
      this.props.isAuth ? (
        <Route children={this.props.children} />
      ) : (
        <Redirect to={'/login'} />
      )
    )
  }
}

const mapStateToProps = (state) => {
  return state.auth
}

export default withRouter(connect(mapStateToProps)(Auth))
