// 专门处理针对用户的操作
var express = require("express");
const { userAssetsService } = require("../services");
var userService = require("../services").userService;
var router = express.Router();

router.post("/login", async function (req, res) {
  console.log(req.body);

  var result = await userService.login(
    req.body.uname,
    req.body.passwd
  );
  if (result) {
    // 登录成功
    res.send(result);
  } else {
    res.send({
      status: 0,
      msg: "账号或密码错误",
    });
  }
});

router.post("/reg", async function (req, res) {
  console.log(req.body);

  if (req.body.avatar === "") {
    req.body.avatar = `http://${req.headers.host}/public/img/default.jpg`;
  }

  try {
    var result = await userService.reg(req.body);
    await userAssetsService.initUserAssets(req.body.uname);
    res.send(result);
  } catch (err) {
    res.send({
      err: err.message,
    });
  }
});

router.get("/userinfo", async function (req, res) {
  // 得到客户端当前登录的用户信息
  var result = await userService.getUser(
    req.query.uname,
  );
  if (result) {
    // 登录成功
    res.send(result);
  } else {
    res.send({
      status: 0,
      msg: "用户不存在",
    });
  }
});

router.get("/check_uname_exist", async function (req, res) {
  console.log(req.query);

  var result = await userService.getUser(
    req.query.uname,
  );
  if (result) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.get("/check_old_passwd", async function (req, res) {
  console.log(req.query);

  var result = await userService.login(
    req.query.uname,
    req.query.oldpasswd
  );
  if (result) {
    // 检验成功
    res.send(true);
  } else {
    res.send(false);
  }
});

router.post("/update_passwd", async function (req, res) {
  var result = await userService.updatePasswd(req.body.uname, req.body.passwd);
  res.send(result.n != 0);
});

async function updateBoth(req, res) {
  if (req.body.nickname && req.body.avatar) {
    // 更新用户信息
    var nicknameResult = await userService.updateNickname(req.body.uname, req.body.nickname);
    var avatarResult = await userService.updateAvatar(req.body.uname, req.body.avatar);
    res.send(nicknameResult.n != 0 && avatarResult.n != 0);
  } else {
    updateAvatarOnly(req, res);
  }
}

async function updateAvatarOnly(req, res) {
  if (req.body.avatar) {
    var avatarResult = await userService.updateAvatar(req.body.uname, req.body.avatar);
    res.send(avatarResult.n != 0);
  } else {
    updateNicknameOnly(req, res);
  }
}

async function updateNicknameOnly(req, res) {
  if (req.body.nickname) {
    var nicknameResult = await userService.updateNickname(req.body.uname, req.body.nickname);
    res.send(nicknameResult.n != 0);
  } else {
    res.send({
      status: 500,
      msg: "没有参数"
    });
  }
}

router.post("/update_info", async function (req, res) {
  console.log(req.body);

  updateBoth(req, res);
});

module.exports = router; // 导出路由中间件
