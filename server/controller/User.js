const {
  hashPassword,
  verifyPassword,
  createToken,
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

    const { email, created, role, profilePhoto, sub, sub_time } =
      await checkTheUserExisting;

    const data = { username, email, created };

    const token = await createToken({
      username,
      email,
      created,
      profilePhoto,
      sub,
      sub_time,
      role,
    });

    return {
      data,
      token,
    };
  } catch (err) {
    throw err;
  }
};

const getUserData = async ({ username }) => {
  const isExistedUser = User.findOne({ username });

  if (isExistedUser) {
    const { email, created, sub, sub_time, role, profilePhoto } =
      await isExistedUser;

    return {
      email,
      created,
      sub,
      sub_time,
      role,
      profilePhoto,
      username,
    };
  }

  if (!isExistedUser) {
    return { type: "userError", messageError: "The user is not existed!" };
  }
};

const updateUser = async ({ username, newPassword, email, oldPassword }) => {
  const foundedUser = await User.findOne({ username });

  if (foundedUser && newPassword) {
    const { password } = await foundedUser;

    const verifiedPassword = await verifyPassword(oldPassword, password);

    if (verifiedPassword) {
      const hashedPassword = await hashPassword(newPassword);

      const updatedUser = await User.findByIdAndUpdate(
        foundedUser._id,
        { password: hashedPassword },
        { new: true }
      );

      const { sub, sub_time, profilePhoto, role, created } = await updatedUser;

      const token = await createToken({
        sub,
        sub_time,
        profilePhoto,
        role,
        created,
        username,
        email,
        email: email,
        username: username,
      });

      return {
        token,
        user: {
          email: email,
          username: username,
          sub,
          sub_time,
          profilePhoto,
          role,
          created,
        },
      };
    }

    if (!verifiedPassword) {
      return {
        type: "userError",
        messageError: "The old password you have entered is incorrect!",
      };
    }
  }

  if (foundedUser && !newPassword) {
    const updatedUser = await User.findByIdAndUpdate(foundedUser._id, {
      email: email,
    });

    const { sub, sub_time, profilePhoto, role, created } = await updatedUser;

    const token = await createToken({
      sub,
      sub_time,
      profilePhoto,
      role,
      created,
      username,
      email,
      email: email,
      username: username,
    });

    return {
      token,
      user: {
        email: email,
        username: username,
        sub,
        sub_time,
        profilePhoto,
        role,
        created,
      },
    };
  }

  if (!foundedUser) {
    return {
      type: "userError",
      messageError: "Something went wrong please try again!",
    };
  }
};

const getUsersCount = async () => {
  const usersCount = await User.countDocuments();

  return { users: usersCount };
};

const getUsers = async (params) => {
  const page = parseInt(params.page);
  const pageSize = parseInt(params.pageSize);

  const count = await getUsersCount();

  const users = await User.find({})
    .limit(pageSize)
    .skip(page === 1 ? 0 : (page - 1) * pageSize);

  return { users, count: count.users };
};

const patchUser = async (value) => {
  const { user_id, values } = value;

  const updatedUser = await User.findByIdAndUpdate(user_id, { ...values });

  return { user: updatedUser };
};

module.exports = {
  createUser,
  authUser,
  getUserData,
  updateUser,
  getUsersCount,
  getUsers,
  patchUser,
};
