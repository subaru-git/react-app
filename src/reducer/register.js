import Types from '../utils/types'

const initialState = {
  idErrorMessage: null,
  passwordErrorMessage: null,
  mailErrorMessage: null,
  registrationErrorMessage: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.REGISTER_ID_ERROR:
      console.log('reducer ID_ERROR: ', action.payload)
      return {
        ...state,
        idErrorMessage: action.payload
      }
    case Types.REGISTER_PASSWORD_ERROR:
      console.log('reducer PASS_ERROR', action.payload)
      return {
        ...state,
        passwordErrorMessage: action.payload
      }
    case Types.REGISTER_MAIL_ERROR:
      console.log('reducer MAIL_ERROR', action.payload)
      return {
        ...state,
        mailErrorMessage: action.payload
      }
    case Types.REGISTER_ERROR:
      console.log('reducer REG_ERROR', action.payload)
      return {
        ...state,
        registrationErrorMessage: action.payload
      }
    case Types.REGISTER:
      console.log('reducer REG_ERROR', action.payload)
      return {
        ...state
      }
    default:
      return state
  }
}
