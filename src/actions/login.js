import Types from '../utils/types'

export default {
  idError: payload => ({
    type: Types.ID_ERROR,
    payload
  }),
  passwordError: payload => ({
    type: Types.PASSWORD_ERROR,
    payload
  }),
  authError: payload => ({
    type: Types.AUTH_ERROR,
    payload
  })
}
