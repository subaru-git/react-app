import BaseApi from './baseApi'

const login = new BaseApi('/api/login')
const registration = new BaseApi('/api/registration')
const schedule = new BaseApi('/api/schedule')

export default {
  login,
  registration,
  schedule
}
