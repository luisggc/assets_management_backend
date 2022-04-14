var Asset = require("../../models/asset.js");
var Unit = require("../../models/unit.js");
var { singleUnit, singleAsset, singleUser } = require("./merge");
var AssetLog = require("../../models/asset_log.js");

module.exports = {
  assets: async () => {
    try {
      let assets = await Asset.find(); //.populate("unit");
      return assets.map((asset) => ({
        ...asset._doc,
        unit: () => singleUnit(asset.unit),
      }));
    } catch {
      throw err;
    }
  },
  createAsset: async ({ AssetInput }) => {
    const asset = new Asset(AssetInput);
    try {
      return await asset.save();
    } catch {
      throw err;
    }
  },
  deleteAsset: async (_id) => {
    try {
      const asset = await Asset.findById(_id);
      asset.delete();
      return _id._id;
    } catch {
      throw err;
    }
  },
  editAsset: async ({ _id, AssetInput }) => {
    //const companyUpdated = await Company.findByIdAndUpdate(_id, { name })
    const asset = await Asset.findById(_id);
    Object.assign(asset, AssetInput);
    const updateAsset = asset.save();
    return updateAsset;
  },
  createAssetLog: async ({ AssetLogInput }) => {
    const asset_log = new AssetLog(AssetLogInput);
    try {
      return await asset_log.save();
    } catch {
      throw err;
    }
  },
  deleteAssetLog: async (_id) => {
    try {
      const asset_log = await AssetLog.findById(_id);
      asset_log.delete();
      return asset_log
    } catch {
      throw err;
    }
  },
  assetsLogs: async () => {
    try {
      let asset_logs = await AssetLog.find();
      return asset_logs.map((asset_log) => ({
        ...asset_log._doc,
        asset: () => singleAsset(asset_log.asset),
        responsible: () => singleUser(asset_log.responsible),
      }));
    } catch {
      throw err;
    }
  },
  assetsLog: async (asset_id) => {
    try {
      let asset_logs = await AssetLog.find({ asset: { $eq: asset_id } });
      return asset_logs.map((asset_log) => ({
        ...asset_log._doc,
        asset: () => singleAsset(asset_log.asset),
        responsible: () => singleUser(asset_log.responsible),
      }));
    } catch {
      throw err;
    }
  },
};
