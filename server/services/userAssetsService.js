const UserAssets = require('../models/index').UserAssets;

// 账单初始化
exports.initUserAssets = async function (uname) {
  return await UserAssets.create({
    uname: uname,
    amount: "0",
    bill: []
  });
};

// 获取总资产
exports.getAmount = async function (uname) {
  return await UserAssets.findOne({ uname: uname }, "amount");
};

// 增加资产
async function plusAmount(uname, spending) {
  try {
    await UserAssets.findOne({ uname: uname }, function (err, userAssets) {
      if (userAssets) {
        userAssets.amount += spending;
        userAssets.markModified("amount");
        userAssets.save();
      }
    });
  } catch (error) {
    return error;
  }
}

// 减少资产
async function decreaseAmount(uname, spending) {
  try {
    await UserAssets.findOne({ uname: uname }, function (err, userAssets) {
      if (userAssets) {
        userAssets.amount -= spending;
        userAssets.markModified("amount");
        userAssets.save();
      }
    });
  } catch (error) {
    return error;
  }
}

// 记一笔账
// uname,type,spending,beizhu,date
exports.pushUserAssets = async function (options) {
  try {
    options.spending = Number(options.spending).toFixed(2) - 0;

    if (isNaN(options.spending)) {
      throw new Error("param 'spending' error");
    }
    let newSpending = 0;
    if (options.type === "plus") {
      await plusAmount(options.uname, options.spending);
      newSpending = options.spending;
    } else if (options.type === "decrease") {
      await decreaseAmount(options.uname, options.spending);
      newSpending = -options.spending;
    } else {
      return "param 'type' error";
    }
    return await UserAssets.findOne({ uname: options.uname }, function (err, userAssets) {
      if (!userAssets) {
        return new Error("error");
      }
      let found = false;
      userAssets.bill.forEach(element => {
        if (element.date === options.date) {
          element.item.push({
            beizhu: options.beizhu,
            spending: newSpending
          });
          userAssets.markModified("bill");
          userAssets.save();
          found = true;
        }
      });
      if (!found) {
        userAssets.bill.push({
          date: options.date,
          item: [{
            beizhu: options.beizhu,
            spending: newSpending
          }]
        });
        userAssets.markModified("bill");
        userAssets.save();
      }
      if (err) {
        return handleError(err);
      }
      return true;
    });
  } catch (error) {
    return error.toString();
  }
};

// 查询账单
exports.getBill = async function (uname) {
  try {
    var result = await UserAssets.findOne({ uname: uname }, "bill");
    // console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};;

// (async () => {
//   let result = await this.initUserAssets("smallfive");
//   console.log(result);
// })();
