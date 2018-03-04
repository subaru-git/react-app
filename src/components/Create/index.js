import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Form from '../Form'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import RaisedButton from 'material-ui/RaisedButton'
import {setTitle, setText, setDate, setTime} from '../../actions/create'

class Create extends Component {
  onSubmit (e) {
    e.preventDefault()
    let title = this.refs.title.getValue()
    let text = this.refs.text.getValue()
    let date = this.props.date
    date.setHours(date.getHours() + this.props.time.getHours())
    date.setMinutes(date.getMinutes() + this.props.time.getMinutes())
    console.log(title, text, date)
  }

  disableWeekends (date) {
    return date.getDay() === 0 || date.getDay() === 6
  }

  render () {
    return (
      <div className="Create">
        <Form title="create new">
          <TextField hintText="title" ref="title"/>
          <TextField hintText="text" ref="text" multiLine={true} rows={6} rowsMax={6} fullWidth={true} floatingLabelText="input your issue"/>
          <DatePicker hintText="due date" ref="date" mode="landscape" autoOk={true} shouldDisableDate={this.disableWeekends.bind(this)} onChange={(event, date) => { this.props.setDate(date) }}/>
          <TimePicker hintText="time" ref="time"autoOk={true} minutesStep={10} onChange={(event, date) => { this.props.setTime(date) }}/>
          <RaisedButton onClick={this.onSubmit.bind(this)} label="Submit"/>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state.create
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTitle: (title) => { dispatch(setTitle(title)) },
    setText: (text) => { dispatch(setText(text)) },
    setDate: (date) => { dispatch(setDate(date)) },
    setTime: (time) => { dispatch(setTime(time)) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create))
