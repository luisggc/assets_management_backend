var User = require("../../models/user.js");

module.exports  = {
  users: async () => {
    try {
      const users = User.find().populate("company");
      return users
    } catch {
      throw err;
    }
  },
  createUser: async ({ name, company }) => {
    // Could implement validation. Ex: do not allow companies with same name
    const user = new User({ name, company });
    try {
      return await user.save();
    } catch {
      throw err;
    }
  },
  deleteUser: async (_id) => {
    try {
      const user = await User.findById(_id);
      user.delete();
      return _id._id;
    } catch {
      throw err;
    }
  },
  editUser: async ({ UserInput }) => {
    const { _id, ...rest } = UserInput;
    //const companyUpdated = await Company.findByIdAndUpdate(_id, { name })
    const user = await User.findById(_id);
    Object.assign(user, rest);
    const updateUser = user.save();
    return updateUser;
  },
};
