import Types from '../utils/types'

export default {
  setRegisterSchedule: payload => ({
    type: Types.SET_REGISTER_SCHEDULE,
    payload
  }),
  setSchedule: payload => ({
    type: Types.SET_SCHEDULE,
    payload
  }),
  getSchedule: payload => ({
    type: Types.GET_SCHEDULE,
    payload
  })
}