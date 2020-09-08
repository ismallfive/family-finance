const mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  beizhu: String,
  spending: String
});

var billSchema = new mongoose.Schema({
  date: String,
  item: [itemSchema]
});

var userAssetsSchema = new mongoose.Schema({
  uname: String,
  amount: Number,
  bill: [billSchema]
});

module.exports = mongoose.model("userAssets", userAssetsSchema);