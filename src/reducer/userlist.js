import Types from '../utils/types'

const initialState = {
  list: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_USER_LIST:
      console.log('reducer SET_USER_LIST: ', action.payload)
      return {
        ...state,
        list: action.payload
      }
    case Types.GET_USER_LIST:
      console.log('reducer GET_USER_LIST', action.payload)
      return {
        ...state,
      }
    default:
      return state
  }
}
