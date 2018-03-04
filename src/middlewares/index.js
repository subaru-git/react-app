import { push, go } from 'react-router-redux'

import Types from '../utils/types'
import ajax from '../utils/ajax'
import Actions from '../actions'

export default store => next => action => {
  const { dispatch } = store
  if (action.type === Types.GET_AUTH) {
    const { id, pass } = action.payload
    let params = new URLSearchParams()
    params.append('username', id)
    params.append('password', pass)
    ajax
      .post('api/login', params)
      .then((result) => {
        console.log('OK : ', result)
        if (result.data.status === 'OK') {
          dispatch(Actions.auth.setAuth({
            token: result.data.token,
            id
          }))
          dispatch(push(id))
        } else {
          dispatch(Actions.login.authError(result.data.message))
        }
      })
      .catch((e) => {
        console.log('NG : ', e)
        dispatch(Actions.login.authError('ネットワークを確認してください'))
      })
  }
  if (action.type === Types.REGISTER) {
    const { id, mail, pass } = action.payload
    let params = new URLSearchParams()
    params.append('username', id)
    params.append('email', mail)
    params.append('password', pass)
    ajax
      .post('api/registration', params)
      .then((result) => {
        console.log('OK : ', result)
        if (result.data.status === 'OK') {
          dispatch(Actions.auth.setAuth({
            token: result.data.token,
            id
          }))
          dispatch(push(id))
          dispatch(go(id))
        } else {
          dispatch(Actions.register.registrationError(result.data.message))
        }
      })
      .catch((e) => {
        console.log('NG : ', e)
        dispatch(Actions.register.registrationError('ネットワークを確認してください'))
      })
  }
  next(action)
}
