var Company = require("../../models/company.js");
var Unit = require("../../models/unit.js");
var Asset = require("../../models/asset.js");
var User = require("../../models/user.js");
var AssetLog = require("../../models/asset_log.js");

exports.company = async (companyId) => {
  return await Company.findById(companyId);
};

exports.singleAsset = async (assetId) => {
  return await Asset.findById(assetId);
};

exports.singleUser = async (userId) => {
  return await User.findById(userId);
};

exports.singleAssetLog = async (assetLogId) => {
  var asset_log = await AssetLog.findById(assetLogId);
  return {
    ...asset_log._doc,
    asset: () => singleAsset(asset_log.asset),
    responsible: () => singleUser(asset_log.responsible),
  };
};

exports.singleUnit = async (_id) => {
  let unit = await Unit.findById(_id);
  return {
    ...unit._doc,
    company: () => {
      console.log("I'll query company!");
      return Company.findById(unit.company);
    },
    assetLogs: () => {
      return AssetLog.find({ asset: { $eq: _id } });
    },
  };
};
