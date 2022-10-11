const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  created: { type: Date, default: Date.now },
});

userSchema.set("toJSON", { getters: true });

userSchema.options.toJSON.transform = (doc, rest) => {
  const obj = { ...rest };
  delete obj.id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
