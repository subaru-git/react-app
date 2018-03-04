import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './style.css'

class About extends Component {
  render () {
    return (
      <div className="About">
        <p>Login ... success</p>
        <Link to={this.props.userid}>user page</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state.user
}
export default withRouter(connect(mapStateToProps)(About))
