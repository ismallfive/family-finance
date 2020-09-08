var Family = require('../models').Family;
var User = require("../models").User;
const randomString = require('../tools/randomString');

// 绑定家庭
exports.bindFamily = async function (uname, familyID) {
  var userResult = await User.updateOne(
    { uname: uname },
    { familyID: familyID },
    (err, raw) => {
      if (err) return handleError(err);
      return raw;
    });

  var familyResult = false;
  await Family.findOne({ familyID: familyID }, function (err, family) {
    family.members.push({
      uname: uname
    });
    family.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
  familyResult = true;

  return {
    userResult,
    familyResult
  };
};

// 解绑家庭
exports.unbindFamily = async function (uname, familyID) {
  var result = await User.updateOne(
    { uname: uname },
    { familyID: "" },
    (err, raw) => {
      if (err) return handleError(err);
      return raw;
    }
  );

  var result2 = false;
  await Family.findOne(
    { familyID: familyID },
    function (err, family) {
      let i = -1;
      for (let index = 0, members = family.members; index < members.length; index++) {
        if (members[index].uname === uname) {
          i = index;
          break;
        }
      }
      if (i != -1) {
        family.members.splice(i, 1);
      }
      family.save(function (err) {
        if (!err) {
          result2 = true;
        }
      });
    }
  );

  return {
    userResult: result,
    familyResult: result2
  };
};

// 创建家庭
exports.createFamily = async function (creator, familyName) {
  try {
    // 生成3位的随机字符串与Date.now()的返回值进行拼接
    let familyID = randomString(3) + Date.now();
    let familyObj = {
      familyID: familyID,
      familyName: familyName,
      creator: creator,
      members: []
    };
    var result = await Family.create(familyObj);
    await this.bindFamily(creator, familyID);
    return result;
  } catch (error) {
    return { error };
  }
};

// 根据用户名获取家庭信息
exports.getFamilyInfo = async function (familyID) {
  return await Family.findOne({ familyID: familyID });
};


// 更改家庭名称
exports.updateFamilyName = async function (familyID, familyName) {
  return await Family.updateOne({ familyID: familyID }, { familyName: familyName }, (err, raw) => {
    if (err) return handleError(err);
    return raw;
  });
};