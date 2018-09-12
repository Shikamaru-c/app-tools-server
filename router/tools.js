const express = require('express')
const router = express.Router()
const tools = require('./mock')

router.get('/all', (req, res, next) => {
  console.log(111)
  next('route')
}, (req, res, next) => {
  console.log(222)
  next()
})

router.get('/all', (req, res, next) => {
  console.log(333)
  next()
})

router.get('/hot', (req, res, next) => {
  res.json(tools.sort((t1, t2) => t2.vn - t1.vn).slice(0, 5))
})

router.get('/my', (req, res, next) => {
  // cookie
  res.json(tools.slice(0, 5))
})

router.get('/:toolname/pv', (req, res, next) => {
  const toolname = req.params.toolname
  tools.forEach(t => t.name === toolname && t.vn++)
  next()
})

module.exports = router
