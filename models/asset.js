var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var assetSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  model: {
    type: String,
    require: true,
  },
  owner: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  health_level: {
    type: Number,
    require: true,
  },
  unit: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Unit",
  },
});

module.exports = mongoose.model("Asset", assetSchema);
