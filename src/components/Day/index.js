import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import { SelectableGroup } from 'react-selectable-fast'
import classNames from 'classnames'
import Hour from '../Hour'
import ScheduleForm from '../ScheduleForm'
import Schedule from '../Schedule'
import Actions from '../../actions/schedule'
import { GetScheduleGroups } from '../../utils/schedules'
import './style.css'

class Day extends Component {
  state = {
    selectedItems: [],
    open: false
  }

  SelectableGroupEl = null

  componentDidMount () {
    this.props.getSchedule({day: this.props.date})
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.date !== nextProps.date) {
      this.props.getSchedule({day: nextProps.date})
    }
  }
  
  handleSelection (keys) {
    if (keys.length === 0) return
    this.setState({
      selectedItems: keys,
      open: true
    })
    const start = keys[0].props.selectableKey
    const end = keys[keys.length - 1].props.selectableKey + 1
    const { setRegisterSchedule, date } = this.props
    setRegisterSchedule({
      day: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), start / 2, start % 2 * 30),
      end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), end / 2, end % 2 * 30),
      title: '',
      place: '',
      contents: '',
      isInitial: true
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

  handlePlanClick (data) {
    console.log(data);
    
    const {day, start, end, title, place, contents, id} = data
    console.log(day);
    this.props.setRegisterSchedule({
      day : new Date(day),
      start: new Date(start),
      end: new Date(end),
      title,
      place,
      contents,
      id
    })   
    this.setState({
      selectedItems: [],
      open: true
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
    const schedules = []
    if (this.props.data.has(this.props.date.getTime())) {
      for (let i = 0; i < this.props.data.get(this.props.date.getTime()).length; i++) {
        const planDay = new Date(this.props.data.get(this.props.date.getTime())[i].day)
        if (planDay.getFullYear() !== this.props.date.getFullYear() || 
            planDay.getMonth() !== this.props.date.getMonth() || 
            planDay.getDate() !== this.props.date.getDate())
            continue

        const planStart = new Date(this.props.data.get(this.props.date.getTime())[i].start)
        const planEnd = new Date(this.props.data.get(this.props.date.getTime())[i].end)
        const top = (((planStart.getHours() * 60) + planStart.getMinutes()) / 30) * 15
        const height = ((((planEnd.getHours() - planStart.getHours()) * 60) + (planEnd.getMinutes() - planStart.getMinutes())) / 30) * 15
        schedules.push({
          top,
          height,
          schedule: this.props.data.get(this.props.date.getTime())[i]
        })
      }
      const groups = GetScheduleGroups(schedules) || []
      for (let i = 0; i < groups.length; i++) {
        plans.push(
          <div className="Plans" key={i}>
            {groups[i].map(data => {
              return <Schedule key={data.schedule.id}
                top={data.top} height={data.height} data={data.schedule}
                onPlanClick={this.handlePlanClick.bind(this)} />
            })
            }
          </div>
        )
      }
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
          {plans}
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
