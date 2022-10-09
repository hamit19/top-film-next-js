const User = require("../model/User");

const createUser = async ({ username, password, email }) => {
  try {
    const values = { username, password, email };
    const createdUser = await User.create(values, { new: true });
    return createdUser;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
};
