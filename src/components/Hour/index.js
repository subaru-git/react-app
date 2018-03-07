import React, { Component } from 'react'
import classNames from 'classnames'
import Row from '../Row'
import './style.css'

class Hour extends Component {
  render () {
    const classname = classNames(
      'Hour',
      {
        saturday: this.props.saturday,
        sunday: this.props.sunday,
      }
    )
    return (
      <div className={classname}>
        <Row position="first" selected={this.props.selected} selectableKey={this.props.selectableKey}/>
        <Row position="second"selected={this.props.selected} selectableKey={this.props.selectableKey + 1}/>
      </div>
    )
  }
}

export default Hour