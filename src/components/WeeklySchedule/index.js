import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Day from '../Day'
import Scale from '../Scale'
import prev from './previous.svg'
import next from './next.svg'
import Actions from '../../actions/weeklyschedule'
import './style.css'

export default connect(state => (
  state.weeklyschedule
), dispatch => (
  {
    setDisplayDays: payload => { dispatch(Actions.setDisplayDays(payload)) },
    setDisplayStartOffset: payload => { dispatch(Actions.setDisplayStartOffset(payload)) }
  }
))(props => {
  const onDisplayChange = (event, index, value) => {
    props.setDisplayDays(value)
  }

  const onNext = () => {
    props.setDisplayStartOffset(props.displayStartOffset + 1)
  }

  const onPrevious = () => {
    props.setDisplayStartOffset(props.displayStartOffset - 1)
  }

  const onToday = () => {
    props.setDisplayStartOffset(0)
  }

  let days = []
  const today = new Date()
  for (let i = 0; i < props.displayDays; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i + props.displayStartOffset)    
    days.push(<Day date={date} key={i}/>)
  }
  const date = new Date()
  date.setDate(date.getDate() + props.displayStartOffset)
  const month = date.getMonth() + 1
  return (
    <Fragment>
      <div className="Buttons">
        <IconButton onClick={e => onPrevious(e)}><img src={prev} alt={'prev'}/></IconButton>
        <SelectField value={props.displayDays}
          floatingLabelText="display days number"
          onChange={(event, index, value) => onDisplayChange(event, index, value)}>
          <MenuItem value={1} primaryText="1 day" />
          <MenuItem value={3} primaryText="3 days" />
          <MenuItem value={7} primaryText="7 days" />
        </SelectField>
        <IconButton onClick={e => onNext(e)}><img src={next} alt={'next'}/></IconButton>
        <FlatButton label="Today" onClick={e => onToday(e)} />
      </div>
      <div className="Month">{month}月</div>
      <div className="Days">
        <Scale />
        {days}
      </div>
    </Fragment>
  )
})
