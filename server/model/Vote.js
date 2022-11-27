const mongoose = require("mongoose");

const { Schema } = mongoose;

const VoteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },

  vote: Number,

  created: { type: Date, default: new Date(), required: true },
});

module.exports = VoteSchema;
