var Unit = require("../../models/unit.js");
var { singleUnit } = require("./merge.js");

module.exports = {
  units: async () => {
      const units = Unit.find().populate("company").sort({createdAt: -1});
      return units;
  },
  createUnit: async ({ name, company }) => {
    // Could implement validation. Ex: do not allow companies with same name
    const unit = new Unit({ name, company });
    const newUnit = await unit.save();
    return await singleUnit(newUnit._id);
  },
  deleteUnit: async (_id) => {
      const unit = await Unit.findById(_id);
      unit.delete();
      return unit
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
