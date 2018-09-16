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
  loginTimes: { type: Number, default: 1 },
  usedTools: [{toolid: String, myPv: Number}]
})

UserSchema.static('addPv', function (toolid, userid, cb) {
  this.findById(userid)
    .exec((err, data) => {
      if (err || !data) return
      let isUsedThisTool = false
      let usedTools = data.usedTools
      let len = usedTools.length
      for (let i = 0; i < len; i++) {
        let tool = usedTools[i]
        if (tool.toolid === toolid) {
          tool.myPv++
          isUsedThisTool = true
          break
        }
      }
      if (!isUsedThisTool) {
        usedTools.push({toolid, myPv: 0})
      }
      data.save(cb)
    })
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = {
  ToolModel,
  UserModel
}