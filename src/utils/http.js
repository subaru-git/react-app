import axios from 'axios'

export default new axios.create({
  baseURL: 'http://localhost:9000'
})
