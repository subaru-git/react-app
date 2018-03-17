import Types from '../utils/types'

const initialState = {
  data: [
    {
      day: null,
      schedule: [
        {
          startTime: null,
          endTime: null,
          title: '',
          place: '',
          contents: ''
        }
      ]
    }
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_SCHEDULES:
      let returnState = {...state}
      returnState.data[action.payload.day] = action.payload.schedules
      return {
        ...state,
        returnState
      }
    default:
      return state
  }
}
