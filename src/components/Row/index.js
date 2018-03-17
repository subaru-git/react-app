import React from 'react'
import { createSelectable } from 'react-selectable-fast'
import classNames from 'classnames'
import './style.css'

export default createSelectable( ({ selectableRef, selected, selecting, saturday, sunday, position }) => {
  const classname = classNames(
    'Row',
    {
      selected,
      selecting
    },
    position
  )

  return (
    <div className={classname} ref={selectableRef}></div>
  )
})
