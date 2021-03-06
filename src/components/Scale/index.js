import React from 'react'
import './style.css'

export default () => {
  const scaleRows = []
  for (let i = 0; i < 24; i++) {
    scaleRows.push(
      <div className="Scale-Row" key={i}>{('00' + i).slice(-2)}:00</div>
    )
  }
  return (
    <div className="Scale">
      <br />
      {scaleRows}
    </div>
  )
}
