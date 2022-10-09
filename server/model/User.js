const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
