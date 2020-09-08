const mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  uname: String,
  beizhu: String,
  spending: String
});

var billSchema = new mongoose.Schema({
  date: String,
  item: [itemSchema]
});

var familyAssetsSchema = new mongoose.Schema({
  familyID: String,
  amount: Number,
  bill: [billSchema]
});

module.exports = mongoose.model("familyAssets", familyAssetsSchema);