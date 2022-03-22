var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var companySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
