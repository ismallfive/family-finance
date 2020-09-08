var express = require("express");
const { familyAssetsService, userService } = require("../services");
var familyService = require("../services").familyService;
var router = express.Router();

router.post("/bind", async function (req, res) {
  console.log(req.body);

  var result = await familyService.bindFamily(req.body.uname, req.body.familyid);
  res.send((!!result.userResult.n) && result.familyResult);
});

router.post("/unbind", async function (req, res) {
  console.log(req.body);

  var result = await familyService.unbindFamily(req.body.uname, req.body.familyid);
  res.send(!!result.n);
});

router.post("/create", async function (req, res) {
  console.log(req.body);

  try {
    var result = await familyService.createFamily(req.body.creator, req.body.familyname);
    await familyAssetsService.initFamilyAssets(result.familyID);

    if (result.error) {
      console.log(result.error);
    }

    res.send(result);
  } catch (err) {
    res.send({
      err: err.message,
    });
  }
});

router.get("/getinfo", async function (req, res) {
  console.log(req.query);

  try {
    var result = await familyService.getFamilyInfo(req.query.familyid);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/getmembers", async function (req, res) {
  console.log(req.query);

  try {
    var result = await familyService.getFamilyInfo(req.query.familyid);
    var newArray = [];
    for (let index = 0, array = result.members; index < array.length; index++) {
      let user = await userService.getUser(array[index].uname);
      newArray.push({
        uname: user.uname,
        nickname: user.nickname,
        avatar: user.avatar
      });
    }
    // console.log(newArray);

    res.send(newArray);
  } catch (error) {
    console.log(error);

    res.send(error);
  }
});

router.post("/update_name", async function (req, res) {
  var result = await familyService.updateFamilyName(req.body.familyid, req.body.familyname);
  res.send(result.n != 0);
});

module.exports = router;