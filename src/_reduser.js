import { combineReducers } from 'redux'

const initialState = {
  login: {
    token: localStorage.getItem('token'),
    idErrorMessage: null,
    passwordErrorMessage: null,
    authErrorMessage: null
  },
  registration: {
    idErrorMessage: null,
    passwordErrorMessage: null,
    mailErrorMessage: null,
    registrationErrorMessage: null
  },
  user: {
    userid: localStorage.getItem('userid')
  },
  form: {
    menu: false
  },
  create: {
    title: null,
    text: null,
    date: null,
    time: null
  }
}

const loginReducer = (state = initialState.login, action) => {
  switch (action.type) {
    case 'ID_ERROR':
      console.log('reducer ID_ERROR: ', action.message)
      return {
        ...state,
        idErrorMessage: action.message
      }
    case 'PASS_ERROR':
      console.log('reducer PASS_ERROR', action.message)
      return {
        ...state,
        passwordErrorMessage: action.message
      }
    case 'AUTH_ERROR':
      console.log('reducer AUTH_ERROR', action.message)
      return {
        ...state,
        authErrorMessage: action.message
      }
    default:
      return state
  }
}

const registrationReducer = (state = initialState.registration, action) => {
  switch (action.type) {
    case 'ID_ERROR':
      console.log('reducer ID_ERROR: ', action.message)
      return {
        ...state,
        idErrorMessage: action.message
      }
    case 'PASS_ERROR':
      console.log('reducer PASS_ERROR', action.message)
      return {
        ...state,
        passwordErrorMessage: action.message
      }
    case 'MAIL_ERROR':
      console.log('reducer MAIL_ERROR', action.message)
      return {
        ...state,
        mailErrorMessage: action.message
      }
    case 'REG_ERROR':
      console.log('reducer REG_ERROR', action.message)
      return {
        ...state,
        registrationErrorMessage: action.message
      }
    default:
      return state
  }
}

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case 'USERID':
      console.log('reducer USERID', action.id)
      return {
        ...state,
        userid: action.id
      }
    default:
      return state
  }
}

const formReducer = (state = initialState.form, action) => {
  switch (action.type) {
    case 'OPEN':
      console.log('reducer OPEN', action.menu)
      return {
        ...state,
        menu: action.menu
      }
    default:
      return state
  }
}

const createReducer = (state = initialState.form, action) => {
  switch (action.type) {
    case 'TITLE':
      console.log('reducer TITLE', action.title)
      return {
        ...state,
        title: action.title
      }
    case 'TEXT':
      console.log('reducer TEXT', action.text)
      return {
        ...state,
        text: action.text
      }
    case 'DATE':
      console.log('reducer DATE', action.date)
      return {
        ...state,
        date: action.date
      }
    case 'TIME':
      console.log('reducer TIME', action.time)
      return {
        ...state,
        time: action.time
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  user: userReducer,
  form: formReducer,
  create: createReducer
})

export default rootReducer
