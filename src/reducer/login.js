import Types from '../utils/types'

const initialState = {
  idErrorMessage: null,
  passwordErrorMessage: null,
  authErrorMessage: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.ID_ERROR:
      console.log('reducer ID_ERROR: ', action.payload)
      return {
        ...state,
        idErrorMessage: action.payload
      }
    case Types.PASSWORD_ERROR:
      console.log('reducer PASS_ERROR', action.payload)
      return {
        ...state,
        passwordErrorMessage: action.payload
      }
    case Types.AUTH_ERROR:
      console.log('reducer AUTH_ERROR', action.payload)
      return {
        ...state,
        authErrorMessage: action.payload
      }
    default:
      return state
  }
}
