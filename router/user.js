const express = require('express')
const router = express.Router()
const { UserModel } = require('../model')
const { successResponse, errorResponse } = require('../utils/response')

/**
 * @body {String} username
 * @body {String} password MD5
 * @TODO 判断 username 的唯一性
 */
router.put('/signin', (req, res) => {
  const { username, password } = req.body
  const user = new UserModel({ username, password })
  user.save((err, data) => {
    if (err) return next(err)
    res.json(successResponse('注册成功', data))
  })
})

/**
 * @body {String} username
 * @body {String} password MD5
 * @TODO 存入 cookie
 * @TODO loginTimes++
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body
  UserModel.findOne({ username })
    .exec((err, data) => {
      if (err) return next(err)
      if (data.password === password) {
        res.json(successResponse('登录成功', data))
      } else {
        res.json(errorResponse('密码错误'))
      }
    })
})

/**
 * @body {String} title
 * @body {String} content
 * @body {String} userid
 */
router.post('/suggest', (req, res) => {
  const { title, content, userid } = req.body
  res.send('/suggest')
})

module.exports = router