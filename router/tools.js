const express = require('express')
const router = express.Router()
const tools = require('./mock')
const { ToolModel, UserModel } = require('../model')
const { successResponse, errorResponse } = require('../utils/response')

/**
 * @body {String} name
 */
router.put('/tool', (req, res, next) => {
  const { name } = req.body
  const tool = new ToolModel({ name })
  tool.save((err, data) => {
    if (err) return next(err)
    res.json(successResponse(`${name}-注册成功`))
  })
})

/**
 * @query {String} limit
 * @query {String} page
 */
router.get('/all', (req, res, next) => {
  let { limit, page } = req.query
  limit = parseInt(limit)
  page = parseInt(page)
  ToolModel.find({})
    .limit(limit)
    .skip((page - 1) * limit)
    .exec((err, data) => {
      if (err) return next(err)
      res.json(successResponse({limit, page}, data))
    })
})

/**
 * @query {String} count
 */
router.get('/hot', (req, res, next) => {
  let { count } = req.query
  count = parseInt(count)
  ToolModel.find({})
    .sort({ pv: -1 })
    .limit(count)
    .exec((err, data) => {
      if (err) return next(err)
      res.json(successResponse({count}, data))
    })
})

/**
 * @TODO 根据 cookie 返回用户的 tool history
 */
router.get('/my', (req, res, next) => {
  // cookie
  res.json(tools.slice(0, 5))
})

/**
 * @query {String} toolid
 * @query {String} userid  TEST 生产环境用cookie
 * @TODO userid 添加到 user 的 usedtools 数组中。
 */
router.get('/pv', (req, res, next) => {
  const { toolid, userid } = req.query
  ToolModel.update({ _id: toolid }, { '$inc': { pv: 1 } })
    .exec((err, data) => {
      if (err) return next(err)
      UserModel.addPv(toolid, userid, (err, data) => {
        res.end()
      })
    })
})

module.exports = router
