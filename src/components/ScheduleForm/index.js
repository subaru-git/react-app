import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Actions from '../../actions/schedule'
import './style.css'

export default connect (state => (
  state.schedule
), dispatch => (
  {
    setRegisterSchedule: payload => { dispatch(Actions.setRegisterSchedule(payload)) },
    setSchedule: payload => { dispatch(Actions.setSchedule(payload)) }
  }
))(props => {
  const handleDateChange = (e, date) => {
    const timeStart = new Date(props.timeStart)
    timeStart.setFullYear(date.getFullYear())
    timeStart.setMonth(date.getMonth())
    timeStart.setDate(date.getDate())
    const timeEnd = new Date(props.timeEnd)
    timeEnd.setFullYear(date.getFullYear())
    timeEnd.setMonth(date.getMonth())
    timeEnd.setDate(date.getDate())
    props.setRegisterSchedule({
      ...props,
      day: date,
      timeStart,
      timeEnd
    })
  }

  const handleStartTimeChange = (e, date) => {
    const timeStart = new Date(props.day)
    timeStart.setHours(date.getHours())
    timeStart.setMinutes(date.getMinutes())
    props.setRegisterSchedule({
      ...props,
      timeStart
    })
  }

  const handleEndTimeChange = (e, date) => {
    const timeEnd = new Date(props.day)
    timeEnd.setHours(date.getHours())
    timeEnd.setMinutes(date.getMinutes())
    props.setRegisterSchedule({
      ...props,
      timeEnd
    })
  }

  const handleTitleChange = (e, title) => {
    props.setRegisterSchedule({
      ...props,
      title
    })
  }

  const handlePlaceChange = (e, place) => {
    props.setRegisterSchedule({
      ...props,
      place
    })
  }

  const handleContentsChange = (e, contents) => {
    props.setRegisterSchedule({
      ...props,
      contents
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { day, timeStart, timeEnd, title, place, contents } = props
    props.setSchedule({ day, startTime: timeStart, endTime: timeEnd, title, place, contents })
    props.cancelAction()
  }

  const handleUpdate = e => {

  }

  return (
    <div className="ScheduleForm">
      <DatePicker hintText="Date" mode="landscape" autoOk value={props.day} onChange={(e, date) => handleDateChange(e, date)} minDate={new Date()}/><br />
      <div className="Times">
        <TimePicker textFieldStyle={{width: '70px'}} format="24hr" hintText="start" minutesStep={30} value={props.timeStart} onChange={(e, date) => handleStartTimeChange(e, date)}/>
        <div className="Date-To">to</div>
        <TimePicker textFieldStyle={{width: '70px'}} format="24hr" hintText="end" minutesStep={30} value={props.timeEnd} onChange={(e, date) => handleEndTimeChange(e, date)}/>
      </div><br />
      <TextField floatingLabelText="Title" onChange={(e, title) => handleTitleChange(e, title)} value={props.title}/><br />
      <TextField floatingLabelText="Place" onChange={(e, place) => handlePlaceChange(e, place)} value={props.place}/><br />
      <TextField floatingLabelText="Contents" multiLine fullWidth rows={5} onChange={(e, contents) => handleContentsChange(e, contents)} value={props.contents}/><br />
      <div className="Dialog-buttons">
        {props.isInitial ? (
          <Fragment>
            <FlatButton label="Submit" primary onClick={e => handleSubmit(e)}/>
            <FlatButton label="Cancel" onClick={e => props.cancelAction(e)}/>
          </Fragment>
        ) : (
          <Fragment>
            <FlatButton label="Update" primary onClick={e => handleUpdate(e)}/>
            <FlatButton label="Delete" secondary onClick={e => handleUpdate(e)}/>
            <FlatButton label="Cancel" onClick={e => props.cancelAction(e)}/>
          </Fragment>
        )}
      </div>
    </div>
  )
})
