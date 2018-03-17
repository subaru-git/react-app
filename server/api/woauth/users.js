const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../../models/user.js')

const router = express.Router()

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err)
      return next(err)
    }
    if (!user) { return res.json({success: false, message: info.message}) }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      const tokenSource = {id: user.id, email: user.email, role: user.role}
      let token = jwt.sign(tokenSource, 'cat')
      return res.json({success: true, token: token, message: 'login success'})
    })
  })(req, res, next)
})

router.post('/registration', (req, res, next) => {
  const query = { $or: [
    { name: req.body.username },
    { email: req.body.email }
  ]}
  User.findOne(query, (error, user) => {
    if (error) {
      console.log(error)
      return res.json({success: false, error})
    }
    if (user) {
      console.log(user)
      return res.json({success: false, message: 'ユーザーIDまたはメールアドレスが登録済みです'})
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

module.exports = router
