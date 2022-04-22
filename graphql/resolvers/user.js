var User = require("../../models/user.js");

module.exports  = {
  users: async () => {
      const users = User.find().populate("company").sort({createdAt: -1});
      return users
  },
  createUser: async ({ name, company }) => {
    // Could implement validation. Ex: do not allow companies with same name
    const user = new User({ name, company });
      return await user.save();
  },
  deleteUser: async (_id) => {
      const user = await User.findById(_id);
      user.delete();
      return user;
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
