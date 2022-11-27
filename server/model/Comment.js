const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },

  content: { type: String, required: true },

  created: { type: Date, default: new Date(), required: true },
});

module.exports = CommentSchema;
