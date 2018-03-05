const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.js')

module.exports = new LocalStrategy({
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
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'パスワードが違います' })
      }
      return done(null, user)
    })
  })
})
