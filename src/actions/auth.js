import Types from '../utils/types'

export default {
  setAuth: payload => ({
    type: Types.SET_AUTH,
    payload
  }),
  removeAuth: () => ({
    type: Types.REMOVE_AUTH
  }),
  getAuth: payload => ({
    type: Types.GET_AUTH,
    payload
  })
}
