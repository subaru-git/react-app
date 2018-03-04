import Types from '../utils/types'

export default {
  idError: payload => ({
    type: Types.REGISTER_ID_ERROR,
    payload
  }),
  passwordError: payload => ({
    type: Types.REGISTER_PASSWORD_ERROR,
    payload
  }),
  mailError: payload => ({
    type: Types.REGISTER_MAIL_ERROR,
    payload
  }),
  registrationError: payload => ({
    type: Types.REGISTER_ERROR,
    payload
  }),
  register: payload => ({
    type: Types.REGISTER,
    payload
  })
}
