var Asset = require("../../models/asset.js");

module.exports  = {
  assets: async () => {
    try {
      const assets = await Asset.find().populate("unit");
      return assets;
    } catch {
      console.log(err);
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
};
