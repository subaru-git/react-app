import React, { Component } from 'react'
import './style.css'

class NotFound extends Component {
  render () {
    return (
      <div className="NotFound">
        <h1>404 Page Not Found</h1>
        <section className="error-container">
          <span><span>4</span></span>
          <span>0</span>
          <span><span>4</span></span>
        </section>
      </div>
    )
  }
}

export default NotFound
