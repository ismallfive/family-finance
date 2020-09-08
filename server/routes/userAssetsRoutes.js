var express = require("express");
var userAssetsService = require("../services").userAssetsService;
var router = express.Router();

router.get("/getamount", async function (req, res) {
  console.log(req.query);

  try {
    var result = await userAssetsService.getAmount(req.query.uname);
    res.send({ amount: result.amount });
  } catch (error) {
    res.send({ error });
  }
});

router.post("/addbill", async function (req, res) {
  console.log(req.body);

  // uname,type,spending,beizhu,date
  try {

    var result = await userAssetsService.pushUserAssets(req.body);
    console.log(result);
    if (!result) {
      res.send("userAssets not found");
      return;
    }
    res.send("ok");

  } catch (error) {
    console.log(error);

    res.send(error);
  }
});

var compare = function (obj1, obj2) {
  var val1 = obj1.date;
  var val2 = obj2.date;
  if (val1 < val2) {
    return 1;
  } else if (val1 > val2) {
    return -1;
  } else {
    return 0;
  }
};

router.get("/getbill", async function (req, res) {
  try {
    var result = await userAssetsService.getBill(req.query.uname);
    if (!result) {
      res.send("no results");
      return;
    }
    result.bill.sort(compare);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router; // 导出路由中间件
