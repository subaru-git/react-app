import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createBrowserHistory} from 'history'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducer from '../reducer'
import middleware from '../middlewares'

export const history = createBrowserHistory({basename: '/'})
const RouterMiddleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducer,
    router: routerReducer
  }),
  composeWithDevTools(applyMiddleware(middleware, RouterMiddleware))
)

export default store
