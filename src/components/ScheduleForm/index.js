import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Actions from '../../actions/schedule'
import './style.css'

class ScheduleForm extends Component {
  handleDateChange(e, date) {
    console.log(date);
    const timeStart = new Date(this.props.timeStart)
    timeStart.setFullYear(date.getFullYear())
    timeStart.setMonth(date.getMonth())
    timeStart.setDate(date.getDate())
    const timeEnd = new Date(this.props.timeEnd)
    timeEnd.setFullYear(date.getFullYear())
    timeEnd.setMonth(date.getMonth())
    timeEnd.setDate(date.getDate())
    this.props.setRegisterSchedule({
      ...this.props,
      day: date,
      timeStart,
      timeEnd
    })
  }

  handleStartTimeChange(e, date) {
    console.log(date)
    const timeStart = new Date(this.props.day)
    timeStart.setHours(date.getHours())
    timeStart.setMinutes(date.getMinutes())
    this.props.setRegisterSchedule({
      ...this.props,
      timeStart
    })
  }

  handleEndTimeChange(e, date) {
    console.log(date)
    const timeEnd = new Date(this.props.day)
    timeEnd.setHours(date.getHours())
    timeEnd.setMinutes(date.getMinutes())
    this.props.setRegisterSchedule({
      ...this.props,
      timeEnd
    })
  }

  handleTitleChange(e, title) {
    this.props.setRegisterSchedule({
      ...this.props,
      title
    })
  }

  handlePlaceChange(e, place) {
    this.props.setRegisterSchedule({
      ...this.props,
      place
    })
  }

  handleContentsChange(e, contents) {
    this.props.setRegisterSchedule({
      ...this.props,
      contents
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { day, timeStart, timeEnd, title, place, contents } = this.props
    this.props.setSchedule({ day, startTime: timeStart, endTime: timeEnd, title, place, contents })
    this.props.cancelAction()
  }

  render () {
    return (
      <div className="ScheduleForm">
        <DatePicker hintText="Date" mode="landscape" autoOk value={this.props.day} onChange={this.handleDateChange.bind(this)} minDate={new Date()}/><br />
        <div className="Times">
          <TimePicker textFieldStyle={{width: '70px'}} format="24hr" hintText="start" minutesStep={30} value={this.props.timeStart} onChange={this.handleStartTimeChange.bind(this)}/>
          <div className="Date-To">to</div>
          <TimePicker textFieldStyle={{width: '70px'}} format="24hr" hintText="end" minutesStep={30} value={this.props.timeEnd}  onChange={this.handleEndTimeChange.bind(this)}/>
        </div><br />
        <TextField floatingLabelText="Title" onChange={this.handleTitleChange.bind(this)}/><br />
        <TextField floatingLabelText="Place" onChange={this.handlePlaceChange.bind(this)}/><br />
        <TextField floatingLabelText="Contents" multiLine fullWidth rows={5} onChange={this.handleContentsChange.bind(this)}/><br />
        <div className="Dialog-buttons">
          <FlatButton label="Submit" primary onClick={this.handleSubmit.bind(this)}/>
          <FlatButton label="Cancel" onClick={this.props.cancelAction}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state.schedule
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRegisterSchedule: payload => { dispatch(Actions.setRegisterSchedule(payload)) },
    setSchedule: payload => { dispatch(Actions.setSchedule(payload))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleForm)