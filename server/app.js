const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const users = require('./api/woauth/users')
const auth = require('./api/auth/auth')
const schedule = require('./api/authed/schedule')

const app = express()

const mongo = process.env.MONGO_URI || 'mongodb://localhost/closche'
mongoose.connect(mongo)

app.set('superSecret', 'cat')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({ secret: 'some salt', resave: true, saveUninitialized: true }))
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))
app.use(cors())
require('./passport')(app)
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', users)
app.use(auth)
app.use('/api', schedule)

module.exports = app
