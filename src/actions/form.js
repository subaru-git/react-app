import Types from '../utils/types'

export default {
  openMenu: payload => ({
    type: Types.OPEN_MENU,
    payload
  })
}
