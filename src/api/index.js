import BaseApi from './baseApi'

const login = new BaseApi('/api/login')
const registration = new BaseApi('/api/registration')
const schedule = new BaseApi('/api/schedule')
const user = new BaseApi('/api/user')

export default {
  login,
  registration,
  schedule,
  user
}
