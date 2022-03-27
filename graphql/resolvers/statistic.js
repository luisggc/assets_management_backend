var Company = require("../../models/company.js");
var Asset = require("../../models/asset.js");
var Unit = require("../../models/unit.js");
var AssetLog = require("../../models/asset_log.js");
var { singleUnit } = require("./merge.js");

module.exports = {
  assetsStatistics: () => ({
    companies: async () => {
      try {
        const company_count = await Company.count();
        return company_count;
      } catch {
        throw err;
      }
    },
    assets: async () => {
      try {
        const assets_count = await Asset.count();
        return assets_count;
      } catch {
        throw err;
      }
    },
    units: async () => {
      try {
        const assets_count = await Unit.count();
        return assets_count;
      } catch {
        throw err;
      }
    },
    lowerHealthLevelAsset: async () => {
      /*  console.time("ID");
      console.timeEnd("ID"); */
      const asset = await Asset.findOne().sort("health_level").limit(1);
      return asset;
    },
    healthLevelHistory: async () => {
      let history = await AssetLog.aggregate([
        {
          $group: {
            _id: { datetime: "$datetime" },
            health_level: { $avg: "$value" },
          },
        },
      ]);
      history = history.map((h) => ({
        health_level: Math.round(10000 * h?.health_level) / 100,
        datetime: h?._id?.datetime,
      }));
      return history;
    },
    assetsByField: async ({ field }) => {
      let history = await Asset.aggregate([
        {
          $group: {
            _id: { [field]: "$" + field },
            assets: { $count: {} },
          },
        },
      ]);

      history = history.map(async (h) => {
        let field_data = h?._id[field];
        if (field == "unit") {
          const unit = await singleUnit(field_data);
          field_data = unit.name;
        }
        return {
          field: field_data,
          assets: h?.assets,
        };
      });

      return history;
    },
    assetsHealthLevelByField: async ({ field }) => {
      let history = await Asset.aggregate([
        {
          $group: {
            _id: { [field]: "$" + field },
            health_level: { $avg: "$health_level" },
          },
        },
      ]);

      history = history.map(async (h) => {
        let field_data = h?._id[field];
        if (field == "unit") {
          const unit = await singleUnit(field_data);
          field_data = unit.name;
        }
        return {
          field: field_data,
          health_level: Math.round(10000 * h?.health_level) / 100,
        };
      });

      return history;
    },

    averageHealthLevelAsset: async () => {
      let health_level = await Asset.aggregate([
        {
          $group: {
            _id: {},
            health_level: { $avg: "$health_level" },
          },
        },
      ]);
      return 100 * health_level[0]?.health_level;
    },

    assetsByHealthLevel: async () => {
      let health_assets = await Asset.aggregate([
        {
          $group: {
            _id: { health_level: "$health_level" },
            assets: { $count: {} },
          },
        },
      ]);

      health_assets = health_assets.map((h) => ({
        health_level: h?._id?.health_level,
        assets: h?.assets,
      }));
      return health_assets;
    },
  }),
};
