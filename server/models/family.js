// 定义用户的模型

var mongoose = require("mongoose");

var membersSchema = new mongoose.Schema({
  uname: {
    type: String,
    trim: true
  }
});

// 定义一个结构
var familySchema = new mongoose.Schema({
  familyID: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  familyName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 8
  },
  creator: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  members: {
    type: [membersSchema]
  }
});

module.exports = mongoose.model('family', familySchema);