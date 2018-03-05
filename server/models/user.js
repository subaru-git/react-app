const mongoose = require('mongoose')

let schema = mongoose.Schema({
  'id': String,
  'email': String,
  'name': String,
  'password': String,
  'role': String
})
schema.methods.validPassword = function (password) {
  console.log(this)
  console.log(this.password, ' : ', password)
  return (this.password === password)
}
module.exports = mongoose.model('User', schema, 'user')
