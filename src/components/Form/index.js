import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import './style.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Forms from '../../actions/form'
import Auths from '../../actions/auth'

class Form extends Component {
  onOpenMenu () {
    this.props.openMenu(!this.props.menu)
  }
  onLogout () {
    this.props.removeAuth()
  }

  render () {
    return (
      <div className="Form">
        <section>
          <AppBar title={this.props.title} onLeftIconButtonClick={this.onOpenMenu.bind(this)}
            iconElementRight={<FlatButton label="Logout" onClick={this.onLogout.bind(this)}/>}/>
        </section>
        <section>
          <div className="MainView">
            <Drawer className="Menu" open={this.props.menu} containerStyle={ { top: 64 } } docked={false} onRequestChange={(open) => this.props.openMenu(open)}>
              <MenuItem>Dummy1</MenuItem>
              <MenuItem>Dummy2</MenuItem>
              <MenuItem>Dummy3</MenuItem>
            </Drawer>
            <div className="Contents">
              {this.props.children}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state.form
}

const mapDispatchToProps = (dispatch) => {
  return {
    openMenu: payload => { dispatch(Forms.openMenu(payload)) },
    removeAuth: () => { dispatch(Auths.removeAuth()) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form))
