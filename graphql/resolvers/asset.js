var Asset = require("../../models/asset.js");

module.exports  = {
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
};
