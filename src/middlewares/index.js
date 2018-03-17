import { go } from 'react-router-redux'
import Types from '../utils/types'
import api from '../api'
import Actions from '../actions'

export default store => next => action => {
  const { dispatch } = store
  if (action.type === Types.GET_AUTH) {
    const { id, pass } = action.payload
    let params = new URLSearchParams()
    params.append('username', id)
    params.append('password', pass)

    ;(async () => {
      try {
        const result = await api.login.post(params)
        if (result.success) {
          dispatch(Actions.auth.setAuth({
            token: result.token,
            id
          }))
          dispatch(go(id))
        } else {
          dispatch(Actions.login.authError(result.message))
        }
      } catch (e) {
        dispatch(Actions.login.authError('ネットワークを確認してください'))
      }
    })()
  }

  if (action.type === Types.REGISTER) {
    const { id, mail, pass } = action.payload
    let params = new URLSearchParams()
    params.append('username', id)
    params.append('email', mail)
    params.append('password', pass)
    ;(async () => {
      try {
        const result = await api.registration.post(params)
        if (result.success) {
          dispatch(Actions.auth.setAuth({
            token: result.token,
            id
          }))
          dispatch(go(id))
        } else {
          dispatch(Actions.login.authError(result.message))
        }
      } catch (e) {
        dispatch(Actions.login.authError('ネットワークを確認してください'))
      }
    })()
  }
  if (action.type === Types.SET_SCHEDULE) {
    ;(async () => {
      try {
        const result = await api.schedule.post({
          schedule: {
            ...action.payload,
            member: [
              localStorage.getItem('userid')
            ]
          }
        })
        if (result.success) {
          dispatch(Actions.schedule.getSchedule({day: action.payload.day}))
        } else {

        }
      } catch (e) {
        console.log('SET_SCHEDULE error : ', e)
      }
    })()
  }

  if (action.type === Types.GET_SCHEDULE) {
    // 前回の残りで描画されないように消す。ちらつくけど。
    dispatch(Actions.schedules.setSchedules({day: action.payload.day, schedules: []}))
    ;(async () => {
      try {
        const result = await api.schedule.get(`/${localStorage.getItem('userid')}?day=${action.payload.day}`)
        if (result.success) {
          dispatch(Actions.schedules.setSchedules({day: action.payload.day, schedules: result.schedules}))
        } else {

        }
      } catch (e) {
        console.log('GET_SCHEDULE error : ', e)
      }
    })()
  }
  next(action)
}
