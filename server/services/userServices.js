var User = require('../models').User;

/**
 * 用户注册的数据库处理函数
 * @param userObj 用户对象
 * @return 新注册成功的用户对象
 */
exports.reg = async function (userObj) {
  var result = await User.create(userObj);
  return result;
};

/**
 * 登录的数据处理函数
 * @param uname 用户名
 * @param passwd 密码
 * @return 登录成功返回用户对象，登录失败返回null
 */
exports.login = async function (uname, passwd) {
  var result = await User.find({
    uname: uname,
    passwd: passwd,
  });
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

/**
 * 查询用户信息的数据库处理函数
 * @param uname 用户名
 * @return 查找成功返回用户对象，失败返回null
 */
exports.getUser = async function (uname) {
  var result = await User.find({
    uname: uname
  });
  if (result.length === 0) {
    return null;
  }
  return result[0];
};

/**
 * 修改昵称的函数
 * @param uname 用户名
 * @param nickname 新昵称
 */
exports.updateNickname = async function (uname, nickname) {
  return await User.updateOne(
    { uname: uname },
    { nickname: nickname },
    (err, raw) => {
      if (err) return handleError(err);
      return raw;
    }
  );
};

/**
 * 修改头像的函数
 * @param uname 用户名
 * @param avatar 新头像
 */
exports.updateAvatar = async function (uname, avatar) {
  return await User.updateOne(
    { uname: uname },
    { avatar: avatar },
    (err, raw) => {
      if (err) return handleError(err);
      return raw;
    }
  );
};

//改密码的
exports.updatePasswd = async function (uname, passwd) {
  return await User.updateOne(
    { uname: uname },
    { passwd: passwd },
    (err, raw) => {
      if (err) return handleError(err);
      return raw;
    }
  );
};