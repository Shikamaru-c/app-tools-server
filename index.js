const express = require('express')
const app = express()
const Router = require('./router')
const bodyParser = require('body-parser')

app.use(bodyParser())

const timeout = function (interval, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, interval)
  })
}

Router(app)

app.listen(3000, () => {
  console.log('opening')
})