const passport = require('passport')
const User = require('./models/user.js')

module.exports = () => {
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

  passport.use(require('./passport/local'))

  return passport
}
