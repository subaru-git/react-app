import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Routes from './routes'
import store, { history } from './utils/store'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider>
        <Routes />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
