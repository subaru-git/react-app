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
    setSchedule: payload => { dispatch(Actions.setSchedule(payload)) },
    updateSchedule: payload => { dispatch(Actions.updateSchedule(payload)) },
    deleteSchedule: payload => { dispatch(Actions.deleteSchedule(payload))}
  }
))(props => {
  const handleDateChange = (e, date) => {
    const start = new Date(props.start)
    start.setFullYear(date.getFullYear())
    start.setMonth(date.getMonth())
    start.setDate(date.getDate())
    const end = new Date(props.end)
    end.setFullYear(date.getFullYear())
    end.setMonth(date.getMonth())
    end.setDate(date.getDate())
    props.setRegisterSchedule({
      ...props,
      day: date,
      start,
      end
    })
  }

  const handleStartTimeChange = (e, date) => {
    const start = new Date(props.day)
    start.setHours(date.getHours())
    start.setMinutes(date.getMinutes())
    props.setRegisterSchedule({
      ...props,
      start
    })
  }

  const handleEndTimeChange = (e, date) => {
    const end = new Date(props.day)
    end.setHours(date.getHours())
    end.setMinutes(date.getMinutes())
    props.setRegisterSchedule({
      ...props,
      end
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
    const { day, start, end, title, place, contents } = props
    props.setSchedule({ day, start, end, title, place, contents })
    props.cancelAction()
  }

  const handleUpdate = e => {
    e.preventDefault()
    const { day, start, end, title, place, contents, id } = props
    props.updateSchedule({ day, start, end, title, place, contents, id })
    props.cancelAction()
  }

  const handleDelete = e => {
    e.preventDefault()
    const { day, id } = props
    props.deleteSchedule({ day, id }) // 削除後の更新のため、dayも送る
    props.cancelAction()
  }

  return (
    <div className="ScheduleForm">
      <DatePicker hintText="Date" mode="landscape" autoOk value={props.day} onChange={(e, date) => handleDateChange(e, date)} minDate={new Date()}/><br />
      <div className="Times">
        <TimePicker textFieldStyle={{width: '70px'}} format="24hr" hintText="start" minutesStep={30} value={props.start} onChange={(e, date) => handleStartTimeChange(e, date)}/>
        <div className="Date-To">to</div>
        <TimePicker textFieldStyle={{width: '70px'}} format="24hr" hintText="end" minutesStep={30} value={props.end} onChange={(e, date) => handleEndTimeChange(e, date)}/>
      </div><br />
      <TextField floatingLabelText="Title" onChange={(e, title) => handleTitleChange(e, title)} value={props.title}/><br />
      <TextField floatingLabelText="Place" onChange={(e, place) => handlePlaceChange(e, place)} value={props.place}/><br />
      <TextField floatingLabelText="Contents" multiLine fullWidth rows={5} onChange={(e, contents) => handleContentsChange(e, contents)} value={props.contents}/><br />
      <div className="Dialog-buttons">
        {props.id ? (
          <Fragment>
            <FlatButton label="Update" primary onClick={e => handleUpdate(e)}/>
            <FlatButton label="Delete" secondary onClick={e => handleDelete(e)}/>
            <FlatButton label="Cancel" onClick={e => props.cancelAction(e)}/>
          </Fragment>
        ) : (
          <Fragment>
            <FlatButton label="Submit" primary onClick={e => handleSubmit(e)}/>
            <FlatButton label="Cancel" onClick={e => props.cancelAction(e)}/>
          </Fragment>
        )}
      </div>
    </div>
  )
})
