// 定义用户的模型

var mongoose = require("mongoose");

// 定义一个结构
var userSchema = new mongoose.Schema({
  // loginId: {
  //   type: String,
  //   required: true, // 必填
  //   unique: true, // 属性值唯一
  //   trim: true, // 写入数据时，会自动的去掉首尾空格
  //   minlength: 3, // 约束：字符串最小长度为3
  //   maxlength: 18, // 约束：字符串的最大长度为18
  // },
  uname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
    maxlength: 12
  },
  nickname: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 10
  },
  avatar: {
    type: String,
    trim: true
  },
  passwd: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 15,
    select: false
  },
  familyID: {
    type: String,
    trim: true,
    default: ""
  }
});

module.exports = mongoose.model("user", userSchema);
