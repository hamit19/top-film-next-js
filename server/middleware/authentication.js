const bcrypt = require("bcryptjs");

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

module.exports = {
  hashPassword,
  verifyPassword,
};
