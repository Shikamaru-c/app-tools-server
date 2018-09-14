const express = require('express')
const app = express()
const Router = require('./router')
const bodyParser = require('body-parser')

app.use(bodyParser())

Router(app)

app.listen(3000, () => {
  console.log('The server is on port 3000')
})