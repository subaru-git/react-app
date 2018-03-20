import Types from '../utils/types'

const initialState = {
  data: new Map()
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_SCHEDULES:
      let returnData = new Map(state.data)
      if (returnData.has(action.payload.day.getTime())) {
        returnData.delete(action.payload.day.getTime())
      }
      returnData.set(action.payload.day.getTime(), action.payload.schedules)
      return {
        ...state,
        data : returnData
      }
    default:
      return state
  }
}
