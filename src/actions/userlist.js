import Types from '../utils/types'

export default {
  serUserList: payload => ({
    type: Types.SET_USER_LIST,
    payload
  }),
  getUserList: payload => ({
    type: Types.GET_USER_LIST,
    payload
  })
}
