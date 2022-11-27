const mongoose = require("mongoose");

const { Schema } = mongoose;

const MediaSchema = Schema({
  alt: { type: String, required: true },
  name: { type: String, required: true },
  size: { type: Number, required: true },
  media: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
  },
  created: { type: Date, default: Date.now(), required: true },
});

MediaSchema.set("toJSON", { getters: true });

MediaSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };

  delete obj.__v;

  return obj;
};

module.exports = mongoose.models.Media || mongoose.model("Media", MediaSchema);
