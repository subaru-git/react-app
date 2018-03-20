const express = require('express')
const Schedule = require('../../models/schedule.js')
const uuid = require('uuid/v4')

const router = express.Router()

router.post('/', (req, res, next) => {
  const {day, start, end, title, place, contents, member} = req.body.schedule
  const id = uuid()
  const newSchedule = new Schedule({
    day, start, end, title, place, contents, member, id
  })
  newSchedule.save(err => {
    if (err) {
      console.log(err)
      return res.status(403).json({success: false})
    }
    return res.json({success: true,
      schedule: {
        day, start, end, title, place, contents, member
      }
    })
  })
})

router.get('/:member', (req, res, next) => {
  let queryDay = new Date(req.query.day)
  queryDay.setTime(queryDay.getTime() + (queryDay.getTimezoneOffset() * 60000))
  console.log(`member: ${req.params.member} day: ${queryDay} time: ${queryDay.getTime()}`)
  const query = { $and: [
    {member: req.params.member},
    {day: queryDay}
  ]}
  Schedule.find(query, (err, result) => {
    if (err) console.log(err)

    return res.status(200).json({success: true,
      schedules: result})
  })
})

router.put('/', (req, res, next) => {
  Schedule.update({id: req.body.schedule.id}, req.body.schedule, {upsert: true}, (err) => {
    if (err) console.log(err)
    return res.json({success: true,
      schedule: req.body.schedule
    })
  })
})

router.delete('/:id', (req, res, next) => {
  Schedule.remove({id: req.params.id}, (err) => {
    if (err) console.log(err);
    return res.json({success: true})
  })
})
module.exports = router
