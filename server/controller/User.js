const { hashPassword } = require("../middleware/authentication");
const User = require("../model/User");

const createUser = async ({ username, password, email }) => {
  const isUsernameExist = await User.find({ username });

  const isEmailExist = await User.find({ email });

  if (isUsernameExist.length > 0) {
    return {
      errorMessage: "The username is already in use!",
      status: "usernameError",
    };
  }

  if (isEmailExist.length > 0) {
    return {
      errorMessage:
        "There is already an account with the email that you have entered!",
      status: "emailError",
    };
  }

  if (isEmailExist.length <= 0 && isUsernameExist.length <= 0) {
    try {
      const hashedPassword = await hashPassword(password);

      const values = { username, password: hashedPassword, email };

      const createdUser = await User.create(values);

      return createdUser;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = {
  createUser,
};
