import React, { Fragment } from 'react'
import Paper from 'material-ui/Paper'
import FlatButton from 'material-ui/FlatButton'
import ReactTooltip from 'react-tooltip'
import './style.css'
import account from './account.svg'

export default props => {
  const onClick = e => {
    console.log(e)
    props.onPlanClick(props.data)
  }
  const style = {
    top: `${props.top}px`,
    height: `${props.height}px`,
    backgroundColor: `#FFF176`
  }
  const buttonStyle = {
    height: '100%'
  }
  const {title, place, member, id} = props.data
  const members = (
    <div className="PlanMembers" >
      {
        member.map(member => (
          <div className="PlanMember" key={id + member}>
            <img src={account} alt="avatar"/><span>{member}</span>
          </div>
        ))
      }
    </div>
  )
  const tooltipName = id + 'plan'
  return (
    <Fragment>
      <Paper className="Plan" style={style} zDepth={3}>
        <FlatButton className="PlanButton" onClick={e => onClick(e)} style={buttonStyle} fullWidth>
          <div className="PlanData" data-tip data-for={tooltipName}>
            <span className="PlanTitle">{title || 'no title'}</span>
          </div>
        </FlatButton>
      </Paper>
      <ReactTooltip className="Tooltip" id={tooltipName} type="info">
          <p className="PlanInfoTitle">{title || 'no title'}</p>
          <span className="PlanInfoSubHeader">place</span><br/>
          <span className="PlanInfoPlace">{place || 'no title'}</span><br/>
          <span className="PlanInfoSubHeader">members</span><br/>
          {members}
      </ReactTooltip>
    </Fragment>
  )
}
