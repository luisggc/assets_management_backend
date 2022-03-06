var Company = require("../../models/company.js");
var Unit = require("../../models/unit.js");
var Asset = require("../../models/asset.js");
var User = require("../../models/user.js");

var company = async (companyId) => {
  return await Company.findById(companyId);
};

var unit = async (unitId) => {
  return await Unit.findById(unitId);
};

var asset = async (assetId) => {
  return await Asset.findById(assetId);
};

var user = async (userId) => {
  return await User.findById(userId);
};
