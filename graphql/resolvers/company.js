var Company = require("../../models/company.js");

module.exports = {
  createCompany: async ({ name }) => {
    // Could implement validation. Ex: do not allow companies with same name
    const company = new Company({ name });
    try {
      return await company.save();
    } catch {
      throw err;
    }
  },
  companies: async () => {
    try {
      return await Company.find();
    } catch {
      throw err;
    }
  },
  deleteCompany: async (_id) => {
    try {
      const company = await Company.findById(_id);
      company.delete();
      return _id._id;
    } catch {
      throw err;
    }
  },
  editCompany: async ({ CompanyInput }) => {
    const { _id, ...rest } = CompanyInput;
    //const companyUpdated = await Company.findByIdAndUpdate(_id, { name })
    const company = await Company.findById(_id);
    Object.assign(company, rest);
    const updateCompany = company.save();
    return updateCompany;
  },
};
