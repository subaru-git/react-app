import $http from '../utils/http'

export default class {
  constructor (resource) {
    this.resource = resource
    const token = localStorage.getItem('access_token')
    $http.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  async ajax ({type = 'get', path = '', body = null}) {
    const {data} = await $http[type](this.resource + path, body)
    return data
  }

  async get (path = '') {
    const promise = await this.ajax({path})
    return promise
  }

  async post (body, path = '') {
    const promise = await this.ajax({type: 'post', body, path})
    return promise
  }

  async put (body, path = '') {
    const promise = await this.ajax({type: 'put', body, path})
    return promise
  }

  async delete (path) {
    const promise = await this.ajax({type: 'delete', path})
    return promise
  }
}
