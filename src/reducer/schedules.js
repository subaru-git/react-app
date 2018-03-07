import Types from '../utils/types'

const initialState = {
  schedules: [
    {
      day: null,
      startTime: null,
      endTime: null,
      title: '',
      place: '',
      contents: ''
    }
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_SCHEDULES:
      console.log('reducer SET_SCHEDULES', action.payload)
      return {
        ...state,
        schedules: action.payload
      }
    default:
      return state
  }
}

