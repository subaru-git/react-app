import React from 'react'
import classNames from 'classnames'
import Row from '../Row'
import './style.css'

export default props => {
  const classname = classNames(
    'Hour',
    {
      saturday: props.saturday,
      sunday: props.sunday
    }
  )
  return (
    <div className={classname}>
      <Row position="first" selected={props.selected} selectableKey={props.selectableKey}/>
      <Row position="second"selected={props.selected} selectableKey={props.selectableKey + 1}/>
    </div>
  )
}

