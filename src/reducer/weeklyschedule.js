import Types from '../utils/types'

const initialState = {
  displayDays: 3,
  displayStartOffset: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_DISPLAY_DAYS:
      console.log('reducer SET_DISPLAY_DAYS: ', action.payload)
      return {
        ...state,
        displayDays: action.payload
      }
    case Types.SET_DISPLAY_START_OFFSET:
      console.log('reducer SET_DISPLAY_START_OFFSET: ', action.payload)
      return {
        ...state,
        displayStartOffset: action.payload
      }
    default :
      return state
  }
}
