var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Company = require("./company");

var unitSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Company",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Unit", unitSchema);
