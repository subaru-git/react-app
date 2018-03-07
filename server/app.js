const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const User = require('./models/user.js')
const Schedule = require('./models/schedule.js')

const app = express()

const mongo = process.env.MONGO_URI || 'mongodb://localhost/closche'
mongoose.connect(mongo)

app.set('superSecret', 'cat')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({ secret: 'some salt', resave: true, saveUninitialized: true }))
require('./passport')(app)
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))
app.use(cors())

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err)
      return next(err)
    }
    if (!user) { return res.json({status: 'NG', message: info.message}) }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      let token = jwt.sign(user.toJSON(), app.get('superSecret'))
      return res.json({status: 'OK', token: token, message: 'login success'})
    })
  })(req, res, next)
})

app.post('/api/registration', (req, res, next) => {
  const query = { $or: [
    { name: req.body.username },
    { email: req.body.email }
  ]}
  User.findOne(query, (error, user) => {
    if (error) {
      console.log(error)
      return res.json({status: 'NG', error})
    }
    if (user) {
      console.log(user)
      return res.json({status: 'NG', message: 'ユーザーIDまたはメールアドレスが登録済みです'})
    }
    const newUser = new User({
      id: req.body.username,
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: 'group1'
    })
    console.log(newUser)
    newUser.save((err) => {
      if (err) console.log(err)
      return res.redirect(307, '/api/login')
    })
  })
})

app.use((req, res, next) => {
  let token = req.body.token || req.query.token || req.header['x-access-token']
  console.log(token)
  if (!token) {
    return res.status(403).json({success: false, message: 'No token provided.'})
  }
  jwt.verify(token, app.get('superSecret'), (err, decoded) => {
    if (err) {
      return res.json({success: false, message: 'Invalid token.'})
    }
    req.decoded = decoded
    next()
  })
})

app.get('/api/list', (req, res, next) => {
  return res.json({success: true, list: ['aaa', 'bbb']})
})

app.post('/api/schedule', (req, res, next) => {
  console.log(req.body.schedule)
  const newSchedule = new Schedule({
    day: req.body.schedule.day,
    startTime: req.body.schedule.startTime,
    endTime: req.body.schedule.endTime,
    title: req.body.schedule.title,
    place: req.body.schedule.place,
    contents: req.body.schedule.contents,
    member: req.body.schedule.member
  })
  newSchedule.save(err => {
    if (err) {
      console.log(err)
      return res.status(403).json({success: false})
    }
    return res.json({success: true,
      scedule: {
        day: req.body.schedule.day,
        startTime: req.body.schedule.startTime,
        endTime: req.body.schedule.endTime,
        title: req.body.schedule.title,
        place: req.body.schedule.place,
        contents: req.body.schedule.contents,
        member: req.body.schedule.member
      }
    })
  })
})

app.get('/api/schedule/:member', (req, res, next) => {
  console.log(req.params.member)
  Schedule.find({member: req.params.member}, (err, result) => {
    if (err) console.log(err)
    console.log(result)

    return res.status(200).json({success: true,
      schedules: result})
  })
})

module.exports = app
