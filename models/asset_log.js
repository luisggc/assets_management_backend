var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var assetLogSchema = new Schema(
  {
    type: {
      type: String,
      require: true,
    },
    datetime: {
      type: Date,
      require: true,
      default: Date.now,
    },
    asset: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Asset",
    },
    responsible: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    value: {
      type: Number,
      require: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssetLog", assetLogSchema);
