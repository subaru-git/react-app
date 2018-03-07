import Types from '../utils/types'

export default {
  setDisplayDays: payload => ({
    type: Types.SET_DISPLAY_DAYS,
    payload
  }),
  setDisplayStartOffset: payload => ({
    type: Types.SET_DISPLAY_START_OFFSET,
    payload
  })
}