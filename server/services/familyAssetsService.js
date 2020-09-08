const FamilyAssets = require('../models/index').FamilyAssets;

// 账单初始化
exports.initFamilyAssets = async function (familyID) {
  return await FamilyAssets.create({
    familyID: familyID,
    amount: "0",
    bill: []
  });
};

// 获取总资产
exports.getAmount = async function (familyID) {
  return await FamilyAssets.findOne({ familyID: familyID }, "amount");
};

// 增加资产
async function plusAmount(familyID, spending) {
  try {
    await FamilyAssets.findOne({ familyID: familyID }, function (err, familyAssets) {
      if (familyAssets) {
        familyAssets.amount += spending;
        familyAssets.markModified("amount");
        familyAssets.save();
      }
    });
  } catch (error) {
    return error;
  }
}

// 减少资产
async function decreaseAmount(familyID, spending) {
  try {
    await FamilyAssets.findOne({ familyID: familyID }, function (err, familyAssets) {
      if (familyAssets) {
        familyAssets.amount -= spending;
        familyAssets.markModified("amount");
        familyAssets.save();
      }
    });
  } catch (error) {
    return error;
  }
}

// 记一笔账
// uname,type,spending,beizhu,date
exports.pushFamilyAssets = async function (options) {
  try {
    options.spending = Number(options.spending).toFixed(2) - 0;

    if (isNaN(options.spending)) {
      throw new Error("param 'spending' error");
    }
    let newSpending = 0;
    if (options.type === "plus") {
      await plusAmount(options.familyid, options.spending);
      newSpending = options.spending;
    } else if (options.type === "decrease") {
      await decreaseAmount(options.familyid, options.spending);
      newSpending = -options.spending;
    } else {
      return "param 'type' error";
    }
    return await FamilyAssets.findOne({ familyID: options.familyid }, function (err, familyAssets) {
      if (!familyAssets) {
        return new Error("error");
      }
      let found = false;
      familyAssets.bill.forEach(element => {
        if (element.date === options.date) {
          element.item.push({
            uname: options.uname,
            beizhu: options.beizhu,
            spending: newSpending
          });
          familyAssets.markModified("bill");
          familyAssets.save();
          found = true;
        }
      });
      if (!found) {
        familyAssets.bill.push({
          date: options.date,
          item: [{
            uname: options.uname,
            beizhu: options.beizhu,
            spending: newSpending
          }]
        });
        familyAssets.markModified("bill");
        familyAssets.save();
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
exports.getBill = async function (familyID) {
  try {
    var result = await FamilyAssets.findOne({ familyID: familyID }, "bill");
    // console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};;
