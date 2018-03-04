import React, {Component} from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Top extends Component {
  render () {
    return (
      this.props.userid ? (
        <Redirect to={this.props.userid}/>
      ) : (
        <Redirect to={'/login'} />
      )
    )
  }
}

const mapStateToProps = (state) => {
  return state.user
}

export default withRouter(connect(mapStateToProps)(Top))
