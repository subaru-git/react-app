const express = require('express')
const User = require('../../models/user.js')
const uuid = require('uuid/v4')

const router = express.Router()

router.get('/', (req, res, next) => {
  User.findOne({id: req.decoded.id}, (err, result) => {
    if (err) console.log(err)

    return res.status(200).json({success: true,
      profile: result})
  })
})

router.put('/', (req, res, next) => {
  const {id, email, password} = req.body
  const newUser = {
    id,
    email,
    name: id,
    password,
    role: 'group1'
  }
  User.update({id}, newUser, {upsert: true}, (err) => {
    if (err) console.log(err)
    return res.json({success: true,
      profile: newUser
    })
  })
})

router.get('/list', (req, res, next) => {
  User.find({}, (err, result) => {
    if(err) console.log(err)
    return res.json({success:true, list: result})
  })
})

module.exports = router