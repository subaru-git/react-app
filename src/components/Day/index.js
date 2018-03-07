import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import Paper from 'material-ui/Paper'
import { SelectableGroup } from 'react-selectable-fast'
import classNames from 'classnames'
import Hour from '../Hour'
import ScheduleForm from '../ScheduleForm'
import Actions from '../../actions/schedule'
import './style.css'

class Day extends Component {
  state = {
    selectedItems: [],
    open: false
  }

  SelectableGroupEl = null

  componentDidMount () {
    this.props.getSchedule({})
  }
  
  handleSelection (keys) {
    if (keys.length === 0) return
    this.setState({
      selectedItems: keys,
      open: true
    })
    console.log(keys);
    const timeStart = keys[0].props.selectableKey
    const timeEnd = keys[keys.length - 1].props.selectableKey + 1
    this.props.setRegisterSchedule({
      day: new Date(this.props.date.getFullYear(), this.props.date.getMonth(), this.props.date.getDate()),
      timeStart: new Date(this.props.date.getFullYear(), this.props.date.getMonth(), this.props.date.getDate(), timeStart / 2, timeStart % 2 * 30),
      timeEnd: new Date(this.props.date.getFullYear(), this.props.date.getMonth(), this.props.date.getDate(), timeEnd / 2, timeEnd % 2 * 30)
    })
    
  }

  handleSelecting (keys) {
  }

  handleClose () {
    this.SelectableGroupEl.clearSelection()
    this.setState({
      selectedItems: [],
      open: false
    })
  }
  render () {
    const date = this.props.date.getDate()
    const day = ["日","月","火","水","木","金","土"][this.props.date.getDay()]
    const saturday = this.props.date.getDay() === 6
    const sunday = this.props.date.getDay() === 0
    const hours = []
    for (let i = 0; i < 24; i++) {
      hours.push(<Hour selectableKey={i * 2} key={i} selected={this.state.selectedItems.indexOf(i) > -1}
        saturday={saturday} sunday={sunday}/>)
    }
    const classname = classNames(
      'Day',
      {
        saturday,
        sunday
      }
    )
    const plans = []
    for (let i = 0; i < this.props.schedules.length; i++) {
      const planDay = new Date(this.props.schedules[i].day)
      if (planDay.getFullYear() !== this.props.date.getFullYear() || 
          planDay.getMonth() !== this.props.date.getMonth() || 
          planDay.getDate() !== this.props.date.getDate())
          continue

      const planTimeStart = new Date(this.props.schedules[i].startTime)
      const planTimeEnd = new Date(this.props.schedules[i].endTime)
      const top = (((planTimeStart.getHours() * 60) + planTimeStart.getMinutes()) / 30) * 15
      const height = ((((planTimeEnd.getHours() - planTimeStart.getHours()) * 60) + (planTimeEnd.getMinutes() - planTimeStart.getMinutes())) / 30) * 15
      console.log(this.props.schedules[i].startTime, ' : ', planTimeStart.getHours(), ' : ', top);
      
      const style = {
        top: `${top}px`,
        height: `${height}px`,
        'background-color': `rgb(241, 221, 207)`
      }
      plans.push(<Paper className="Plan" key={i} style={style} zDepth={3}>{this.props.schedules[i].title}</Paper>)
    }
    return (
      <div className={classname}>
        <span>{date} ({day})</span>
        <SelectableGroup
          ref={el => {this.SelectableGroupEl = el}}
          className="main"
          enableDeselect
          tolerance={0}
          globalMouse={true}
          onSelectionFinish={this.handleSelection.bind(this)}
          duringSelection={this.handleSelecting.bind(this)}
          allowClickWithoutSelected={false}
          selectOnMouseMove={false}
          fixedPosition={false}>
          {hours}
          <div className="Plans">
            {plans}
          </div>
        </SelectableGroup>
        <Dialog title="Register Schedule"
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}>
          <ScheduleForm cancelAction={this.handleClose.bind(this)}/>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state.schedules
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRegisterSchedule: payload => { dispatch(Actions.setRegisterSchedule(payload)) },
    getSchedule: payload => { dispatch(Actions.getSchedule(payload)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Day)
