import React, { Fragment } from 'react'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import './style.css'

export default props => {
  const onClick = e => {
    console.log(e)
    props.onPlanClick(props.data)
  }
  const style = {
    top: `${props.top}px`,
    height: `${props.height}px`,
    backgroundColor: `rgb(241, 221, 207)`
  }
  const buttonStyle = {
    height: '100%'
  }
  const {title, place, member} = props.data
  return (
    <Fragment>
      <Paper className="Plan" style={style} zDepth={3}>
        <FlatButton className="PlanButton" onClick={e => onClick(e)} style={buttonStyle} fullWidth>
          <span className="PlanTitle">{title || 'no title'}</span>
        </FlatButton>
      </Paper>
    </Fragment>
  )
}
