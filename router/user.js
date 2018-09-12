const express = require('express')
const router = express.Router() 

router.put('/signin', (req, res) => {
  // name password
  // user = new User({name, password})
  // 返回值成功，带 cookie，前端自动登录
  res.send('/signin')
})

router.post('/login', (req, res) => {
  // name password
  // findById(name)
  // check password
  // 返回值成功，带 token - cookie，前端自动登录
  res.send('/login')
})

router.post('/suggest', (req, res) => {
  // title
  // content
  // 存入数据库
  res.send('/suggest')
})

module.exports = router