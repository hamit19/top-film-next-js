const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  });
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

const createToken = ({
  username,
  email,
  created,
  sub,
  sub_time,
  profilePhoto,
  role,
}) => {
  if (!username || !email || !created || !profilePhoto || !role)
    throw new Error("Values are not completed!");

  return jwt.sign(
    { username, email, created, sub, sub_time, role, profilePhoto },
    process.env.JWT_SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};

module.exports = {
  hashPassword,
  verifyPassword,
  createToken,
};
