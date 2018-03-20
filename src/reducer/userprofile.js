import Types from '../utils/types'

const initialState = {
  id: '',
  email: '',
  password: '',
  idErrorMessage: null,
  passwordErrorMessage: null,
  mailErrorMessage: null,
  registrationErrorMessage: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_ID_ERROR:
      console.log('reducer ID_ERROR: ', action.payload)
      return {
        ...state,
        idErrorMessage: action.payload
      }
    case Types.UPDATE_PASSWORD_ERROR:
      console.log('reducer PASS_ERROR', action.payload)
      return {
        ...state,
        passwordErrorMessage: action.payload
      }
    case Types.UPDATE_MAIL_ERROR:
      console.log('reducer MAIL_ERROR', action.payload)
      return {
        ...state,
        mailErrorMessage: action.payload
      }
    case Types.UPDATE_ERROR:
      console.log('reducer REG_ERROR', action.payload)
      return {
        ...state,
        registrationErrorMessage: action.payload
      }
    case Types.UPDATE:
      console.log('reducer UPDATE', action.payload)
      return {
        ...state
      }
    case Types.SET_USER_PROFILE:
      console.log('reducer SET_USER_PROFILE', action.payload)
      const {id, email, password} = action.payload
      return {
        ...state,
        id,
        email,
        password
      }
    case Types.GET_USER_PROFILE:
      console.log('reducer GET_USER_PROFILE', action.payload)
      return {
        ...state,
      }
   default:
      return state
  }
}
