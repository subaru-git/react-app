import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Forms from '../../actions/form'
import Auths from '../../actions/auth'

export default withRouter(connect(state => (
  {
    form: state.form,
    auth: state.auth
  }
), dispatch => (
  {
    openMenu: payload => { dispatch(Forms.openMenu(payload)) },
    removeAuth: () => { dispatch(Auths.removeAuth()) }
  }
))(props => {
  const onOpenMenu = e => {
    props.openMenu(!props.form.menu)
  }
  const onLogout = e => {
    props.removeAuth()
  }
  const menu = [
    {display: 'Schedule', uri: ''},
    {display: 'Profile', uri: `${props.auth.userId}/profile`},
    {display: 'Users', uri: '/users'}
  ].map(item => {
    const disabled = props.type === item.display
    const onMenuClick = e => {
      props.history.push(item.uri)
      props.openMenu(false)
    }
    return(
      <MenuItem key={item.display} primaryText={item.display} disabled={disabled} onClick={e => onMenuClick(e)}/>
    )
  })

  return (
    <Fragment>
      <section>
        <AppBar title={props.title} onLeftIconButtonClick={e => onOpenMenu(e)}
          iconElementRight={<FlatButton label="Logout" onClick={e => onLogout(e)}/>}/>
      </section>
      <section>
        <div className="MainView">
          <Drawer className="Menu" open={props.form.menu} containerStyle={ { top: 64 } } docked={false} onRequestChange={open => props.openMenu(open)}>
            {menu}
          </Drawer>
          <div className="Contents">
            {props.children}
          </div>
        </div>
      </section>
    </Fragment>
  )
}))

