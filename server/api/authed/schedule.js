const express = require('express')
const Schedule = require('../../models/schedule.js')

const router = express.Router()

router.post('/schedule', (req, res, next) => {
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
      schedule: {
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

router.get('/schedule/:member', (req, res, next) => {
  let queryDay = new Date(req.query.day)
  queryDay.setTime(queryDay.getTime() + (queryDay.getTimezoneOffset() * 60000))
  console.log(`member: ${req.params.member} day: ${queryDay}`)
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

module.exports = router
