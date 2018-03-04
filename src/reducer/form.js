import Types from '../utils/types'

const initialState = {
  menu: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.OPEN_MENU:
      console.log('reducer OPEN_MENU: ', action.payload)
      return {
        ...state,
        menu: action.payload
      }
    default :
      return state
  }
}
