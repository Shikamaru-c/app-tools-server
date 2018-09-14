const mongoose = require('mongoose')
const db = mongoose.connect('mongodb://localhost:27017/tools')
const Schema = mongoose.Schema

const ToolSchema = new Schema({
  name: { type: String },
  pv: { type: Number, default: 0 }
})

const ToolModel = mongoose.model('Tool', ToolSchema)

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  loginTimes: { type: Number, default: 1 }
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = {
  ToolModel,
  UserModel
}