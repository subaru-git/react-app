import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Day from '../Day'
import Scale from '../Scale'
import prev from './previous.svg'
import next from './next.svg'
import Actions from '../../actions/days'
import './style.css'

class Days extends Component {

  onDisplayChange (event, index, value) {
    this.props.setDisplayDays(value)
  }

  onNext () {
    this.props.setDisplayStartOffset(this.props.displayStartOffset + 1)
  }

  onPrevious () {
    this.props.setDisplayStartOffset(this.props.displayStartOffset - 1)
  }

  onToday () {
    this.props.setDisplayStartOffset(0)
  }

  render () {
    let days = []
    for (let i = 0; i < this.props.displayDays; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i + this.props.displayStartOffset)
      days.push(<Day date={date} key={i}/>)
    }
    const date = new Date()
    date.setDate(date.getDate() + this.props.displayStartOffset)
    const month = date.getMonth() + 1
    return (
      <Fragment>
        <div className="Buttons">
          <IconButton onClick={this.onPrevious.bind(this)}><img src={prev} alt={'prev'}/></IconButton>
          <SelectField value={this.props.displayDays}
            floatingLabelText="display days num"
            onChange={this.onDisplayChange.bind(this)}>
            <MenuItem value={1} primaryText="1 days" />
            <MenuItem value={3} primaryText="3 days" />
            <MenuItem value={7} primaryText="7 days" />
          </SelectField>
          <IconButton onClick={this.onNext.bind(this)}><img src={next} alt={'next'}/></IconButton>
          <FlatButton label="Today" onClick={this.onToday.bind(this)} />
        </div>
        <div className="Month">{month}月</div>
        <div className="Days">
          <Scale />
          {days}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return state.days
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDisplayDays: payload => { dispatch(Actions.setDisplayDays(payload)) },
    setDisplayStartOffset: payload => { dispatch(Actions.setDisplayStartOffset(payload)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Days)
