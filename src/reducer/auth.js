import Types from '../utils/types'

const initialState = {
  isAuth: localStorage.getItem('isAuth'),
  access_token: localStorage.getItem('access_token'),
  userId: localStorage.getItem('userid'),
  timestamp: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_AUTH:
      console.log('reducer SET_AUTH: ', action.payload)
      localStorage.setItem('isAuth', true)
      localStorage.setItem('access_token', action.payload.token)
      localStorage.setItem('userid', action.payload.id)
      return {
        ...state,
        isAuth: true,
        access_token: action.payload.token,
        userId: action.payload.id,
        timestamp: Date.now()
      }
    case Types.REMOVE_AUTH:
      console.log('reducer REMOVE_AUTH: ', action.payload)
      localStorage.removeItem('isAuth')
      localStorage.removeItem('access_token')
      localStorage.removeItem('userid')
      return {
        ...state,
        isAuth: false,
        access_token: null,
        timestamp: Date.now()
      }
    default :
      return state
  }
}
