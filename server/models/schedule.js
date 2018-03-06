const mongoose = require('mongoose')

let schema = mongoose.Schema({
  'day': Date,
  'startTime': Date,
  'endTime': Date,
  'title': String,
  'place': String,
  'contents': String,
  'member': [String]
})

module.exports = mongoose.model('Schedule', schema, 'schedule')
