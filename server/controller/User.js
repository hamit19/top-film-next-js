const {
  hashPassword,
  verifyPassword,
} = require("../middleware/authentication");
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
    const hashedPassword = await hashPassword(password);
    const values = { username, password: hashedPassword, email };

    try {
      const createdUser = await User.create(values);

      const data = { username, email, created: createdUser.created };

      return {
        data,
        status: "created",
      };
    } catch (err) {
      throw err;
    }
  }
};

const authUser = async ({ username, password }) => {
  const checkTheUserExisting = await User.findOne({ username });

  if (!checkTheUserExisting)
    return {
      errorMessage: "The username or password is incorrect!",
      status: "incorrectData",
    };

  try {
    const hashedPassword = checkTheUserExisting.password;
    const checkedPassword = await verifyPassword(password, hashedPassword);

    if (!checkedPassword)
      return {
        errorMessage: "The username or password is incorrect!",
        status: "incorrectData",
      };

    const { email, created } = checkTheUserExisting;

    return {
      data: { username, email, created },
    };
  } catch (err) {
    throw err;
  }

  return {
    data: "data",
    status: "success",
  };
};

module.exports = {
  createUser,
  authUser,
};
