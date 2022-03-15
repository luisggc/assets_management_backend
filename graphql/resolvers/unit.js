var Unit = require("../../models/unit.js");

module.exports  = {
  units: async () => {
    try {
      const units = Unit.find().populate("company");
      return units
    } catch {
      throw err;
    }
  },
  createUnit: async ({ name, company }) => {
    // Could implement validation. Ex: do not allow companies with same name
    const unit = new Unit({ name, company });
    try {
      return await unit.save();
    } catch {
      throw err;
    }
  },
  deleteUnit: async (_id) => {
    try {
      const unit = await Unit.findById(_id);
      unit.delete();
      return _id._id;
    } catch {
      throw err;
    }
  },
  editUnit: async ({ UnitInput }) => {
    const { _id, ...rest } = UnitInput;
    //const companyUpdated = await Company.findByIdAndUpdate(_id, { name })
    const unit = await Unit.findById(_id);
    Object.assign(unit, rest);
    const updateUnit = unit.save();
    return updateUnit;
  },
};
