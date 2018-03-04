import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './components/App'
import About from './components/About'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Top from './components/Top'
import Auth from './components/Auth'
import Userpage from './components/Userpage'
import Registration from './components/Registration'
import Create from './components/Create'

class Routes extends Component {
  render () {
    return (
      <BrowserRouter className="Routes" >
        <Switch>
          <Route path="/login" component={Login} exact/>
          <Route path="/registration" component={Registration} exact/>
          <Route path="/" component={Top} exact/>
          <Auth>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/app" component={App} />
              <Route path="/new" component={Create} />
              <Route path="/:userid" component={Userpage} />
              <Route component={NotFound} />
            </Switch>
          </Auth>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Routes
