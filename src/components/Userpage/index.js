import React, { Component } from 'react'
import Form from '../Form'
import Day from '../Day'

class Userpage extends Component {
  render () {
    return (
      <div className="Userpage">
        <Form title={this.props.match.params.userid}>
          <Day />
        </Form>
      </div>
    )
  }
}

export default Userpage
