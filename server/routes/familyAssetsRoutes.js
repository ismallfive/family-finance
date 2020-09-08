var express = require("express");
const { userService } = require("../services");
var familyAssetsService = require("../services").familyAssetsService;
var router = express.Router();

router.get("/getamount", async function (req, res) {
  console.log(req.query);

  try {
    var result = await familyAssetsService.getAmount(req.query.familyid);
    res.send({ amount: result.amount });
  } catch (error) {
    res.send({ error });
  }
});

router.post("/addbill", async function (req, res) {
  console.log(req.body);

  // uname,type,spending,beizhu,date
  try {

    var result = await familyAssetsService.pushFamilyAssets(req.body);
    // console.log(result);
    if (!result) {
      res.send("familyAssets not found");
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
    var result = await familyAssetsService.getBill(req.query.familyid);
    var newArray = [];

    if (!result) {
      res.send("no results");
      return;
    }
    result.bill.sort(compare);

    for (let index = 0, array = result.bill; index < array.length; index++) {
      let el = array[index];
      // console.log(el);

      let newItem = [];
      for (let i = 0, array = el.item; i < array.length; i++) {
        let element = array[i];
        let user = await userService.getUser(element.uname);
        newItem.push({
          nickname: user.nickname,
          avatar: user.avatar,
          beizhu: element.beizhu,
          spending: element.spending
        });
      }
      // console.log(newItem, "item");

      let newEl = {
        date: el.date,
        item: newItem
      };

      newArray.push(newEl);
    }
    // console.log(newArray);

    res.send(newArray);
  } catch (error) {
    console.log(error);

    res.send(error);
  }
});

module.exports = router; // 导出路由中间件
