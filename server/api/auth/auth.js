const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let token = req.body.token || req.query.token || req.header['x-access-token'] || req.get('Authorization').substring(7)
  if (!token) {
    return res.status(403).json({success: false, message: 'No token provided.'})
  }
  jwt.verify(token, 'cat', (err, decoded) => {
    if (err) {
      return res.json({success: false, message: 'Invalid token.'})
    }
    req.decoded = decoded
    next()
  })
}