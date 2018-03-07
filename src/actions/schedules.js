import Types from '../utils/types'

export default {
  setSchedules: payload => ({
    type: Types.SET_SCHEDULES,
    payload
  })
}