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

var graphQLResolvers = {
  assets: async () => {
    try {
      const assets = await Asset.find().populate("unit");
      console.log(assets);
      return assets;
    } catch {
      console.log(err);
      throw err;
    }
  },
  createAsset: async ({ assetInput }) => {
    const asset = new Asset(assetInput);
    try {
      return await asset.save();
    } catch {
      throw err;
    }
  },
  createCompany: async ({ name }) => {
    // Could implement validation. Ex: do not allow companies with same name
    const company = new Company({ name });
    try {
      return await company.save();
    } catch {
      throw err;
    }
  },
  companies: async () => {
    try {
      return await Company.find();
    } catch {
      throw err;
    }
  },
  units: async () => {
    try {
      return Unit.find().populate("company");
    } catch {
      throw err;
    }
  },
};

module.exports = { graphQLResolvers };
