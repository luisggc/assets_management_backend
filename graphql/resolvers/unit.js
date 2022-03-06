var Unit = require("../../models/unit.js");

module.exports  = {
  units: async () => {
    try {
      return Unit.find().populate("company");
    } catch {
      throw err;
    }
  },
};
