var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var companySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Company", companySchema);
