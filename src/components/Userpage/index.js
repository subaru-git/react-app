import React, { Component } from 'react'
import Form from '../Form'
import Days from '../Days'
import './style.css'

class Userpage extends Component {
  render () {
    return (
      <div className="Userpage">
        <Form title={this.props.match.params.userid}>
          <Days />
        </Form>
      </div>
    )
  }
}

export default Userpage
