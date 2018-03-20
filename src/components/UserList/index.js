import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Actions from '../../actions/userlist'

export default connect(state => (
  state.userlist
), dispatch => (
  {
    setUserList: payload => { dispatch(Actions.setUserList(payload))},
    getUserList: payload => { dispatch(Actions.getUserList(payload))}
  }
))(class extends Component {
  componentDidMount () {
    this.props.getUserList({})
  }
  render () {
    const body = this.props.list.map(user => {
      return (
        <TableRow key={user.id}>
          <TableRowColumn>{user.id}</TableRowColumn>
          <TableRowColumn>{user.email}</TableRowColumn>
        </TableRow>
      )
    })
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>userid</TableHeaderColumn>
            <TableHeaderColumn>email</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {body}
        </TableBody>
      </Table>
    )
  }
})
