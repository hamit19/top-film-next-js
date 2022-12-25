const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },

  content: { type: String, required: true },

  created: { type: Date, default: Date.now, required: true },
});

module.exports = CommentSchema;
