var Asset = require("../../models/asset.js");
var Unit = require("../../models/unit.js");
var { singleUnit, singleAsset, singleUser } = require("./merge");
var AssetLog = require("../../models/asset_log.js");

module.exports = {
  assets: async () => {
    let assets = await Asset.find(); //.populate("unit");
    return assets.map((asset) => ({
      ...asset._doc,
      unit: () => singleUnit(asset.unit),
    }));
  },
  createAsset: async ({ AssetInput }) => {
    const newAsset = new Asset(AssetInput);
    const asset = await newAsset.save();
    return {
      ...asset._doc,
      unit: () => singleUnit(asset.unit),
    };
  },
  deleteAsset: async (_id) => {
    const asset = await Asset.findById(_id);
    asset.delete();
    return {
      ...asset._doc,
      unit: () => singleUnit(asset.unit),
    };
  },
  editAsset: async ({ _id, AssetInput }) => {
    //const companyUpdated = await Company.findByIdAndUpdate(_id, { name })
    const asset = await Asset.findById(_id);
    Object.assign(asset, AssetInput);
    const updateAsset = await asset.save();
    return {
      ...updateAsset._doc,
      unit: () => singleUnit(updateAsset.unit),
    };
  },
  createAssetLog: async ({ AssetLogInput }) => {
    const new_asset_log = new AssetLog(AssetLogInput);
    const asset_log = await new_asset_log.save();
    return {
      ...asset_log._doc,
      asset: () => singleAsset(asset_log?.asset),
      responsible: () => singleUser(asset_log?.responsible),
    };
  },
  deleteAssetLog: async (_id) => {
    const asset_log = await AssetLog.findById(_id);
    asset_log.delete();
    return asset_log;
  },
  assetsLogs: async () => {
    let asset_logs = await AssetLog.find();
    return asset_logs.map((asset_log) => ({
      ...asset_log._doc,
      asset: () => singleAsset(asset_log.asset),
      responsible: () => singleUser(asset_log.responsible),
    }));
  },
  assetsLog: async (asset_id) => {
    let asset_logs = await AssetLog.find({ asset: { $eq: asset_id } });
    return asset_logs.map((asset_log) => ({
      ...asset_log._doc,
      asset: () => singleAsset(asset_log.asset),
      responsible: () => singleUser(asset_log.responsible),
    }));
  },
};
