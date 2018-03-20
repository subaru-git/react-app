import Types from '../utils/types'

export default {
  idError: payload => ({
    type: Types.UPDATE_ID_ERROR,
    payload
  }),
  passwordError: payload => ({
    type: Types.UPDATE_PASSWORD_ERROR,
    payload
  }),
  mailError: payload => ({
    type: Types.UPDATE_MAIL_ERROR,
    payload
  }),
  updateError: payload => ({
    type: Types.UPDATE_ERROR,
    payload
  }),
  update: payload => ({
    type: Types.UPDATE,
    payload
  }),
  setUserProfile: payload => ({
    type: Types.SET_USER_PROFILE,
    payload
  }),
  getUserProfile: payload => ({
    type: Types.GET_USER_PROFILE,
    payload
  })
}
