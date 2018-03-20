import Types from '../utils/types'

const initialState = {
  day: null,
  start: null,
  end: null,
  title: '',
  place: '',
  contents: '',
  id: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_REGISTER_SCHEDULE:
      const {day, start, end, title, place, contents, id} = action.payload
      return {
        ...state,
        day,
        start,
        end,
        title,
        place,
        contents,
        id
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
