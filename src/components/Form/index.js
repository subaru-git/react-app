import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Forms from '../../actions/form'
import Auths from '../../actions/auth'

export default connect(state => (
  state.form
), dispatch => (
  {
    openMenu: payload => { dispatch(Forms.openMenu(payload)) },
    removeAuth: () => { dispatch(Auths.removeAuth()) }
  }
))(props => {
  const onOpenMenu = e => {
    props.openMenu(!props.menu)
  }
  const onLogout = e => {
    props.removeAuth()
  }

  return (
    <Fragment>
      <section>
        <AppBar title={props.title} onLeftIconButtonClick={e => onOpenMenu(e)}
          iconElementRight={<FlatButton label="Logout" onClick={e => onLogout(e)}/>}/>
      </section>
      <section>
        <div className="MainView">
          <Drawer className="Menu" open={props.menu} containerStyle={ { top: 64 } } docked={false} onRequestChange={open => props.openMenu(open)}>
            <MenuItem>Dummy1</MenuItem>
            <MenuItem>Dummy2</MenuItem>
            <MenuItem>Dummy3</MenuItem>
          </Drawer>
          <div className="Contents">
            {props.children}
          </div>
        </div>
      </section>
    </Fragment>
  )
})

