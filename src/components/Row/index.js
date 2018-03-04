import React from 'react'
import { createSelectable } from 'react-selectable'
import classNames from 'classnames'
import './style.css'

const Row = ({ selectableRef, selected, selecting }) => {
  const classname = classNames(
    'Row',
    {
      selected,
      selecting
    })
  return (
    <div className={classname} ref={selectableRef}>aaa</div>
  )
}

export default createSelectable(Row)
