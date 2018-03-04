const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.js')

const app = express()

mongoose.connect('mongodb://localhost/User')

// start DB
// let user = new User()
// user.id = 'tanaka'
// user.email = 'tanaka@sample.com'
// user.name = 'tanaka'
// user.password = 'password'
// user.role = 'group1'
// user.save((err) => {
//   if (err) { console.log(err) }
// })

app.set('superSecret', 'cat')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({ secret: 'some salt', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))

app.use(express.static(path.resolve(__dirname, '..', 'build')))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

passport.serializeUser((id, done) => {
  done(null, id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    if (error) {
      return done(error)
    }
    done(null, user)
  })
})

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, (username, password, done) => {
  process.nextTick(() => {
    User.findOne({ name: username }, (error, user) => {
      if (error) {
        return done(error)
      }
      if (!user) {
        return done(null, false, { message: 'ユーザーIDを確認してください' })
      }
      // if (!user.validPassword(password)) {
      if (!(user.password === password)) {
        return done(null, false, { message: 'パスワードが違います' })
      }
      return done(null, user)
    })
  })
}))

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

module.exports = app
