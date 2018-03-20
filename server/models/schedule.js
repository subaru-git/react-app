const mongoose = require('mongoose')

let schema = mongoose.Schema({
  'day': Date,
  'start': Date,
  'end': Date,
  'title': String,
  'place': String,
  'contents': String,
  'member': [String],
  'id': String
})

module.exports = mongoose.model('Schedule', schema, 'schedule')
