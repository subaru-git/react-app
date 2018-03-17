import Types from '../utils/types'

const initialState = {
  day: null,
  timeStart: null,
  timeEnd: null,
  title: '',
  place: '',
  contents: '',
  isInitial: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_REGISTER_SCHEDULE:
      console.log('reducer SET_REGISTER_SCHEDULE: ', action.payload)
      return {
        ...state,
        day: action.payload.day,
        timeStart: action.payload.timeStart,
        timeEnd: action.payload.timeEnd,
        title: action.payload.title,
        place: action.payload.place,
        contents: action.payload.contents,
        isInitial: action.payload.isInitial
      }
    case Types.SET_SCHEDULE:
      console.log('reducer SET_SCHEDULE', action.payload)
      return {
        ...state
      }
    case Types.GET_SCHEDULE:
      console.log('reducer GET_SCHEDULE', action.payload)
      return {
        ...state
      }
    default:
      return state
  }
}
