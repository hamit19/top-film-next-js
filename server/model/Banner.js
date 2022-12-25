const mongoose = require("mongoose");

const { Schema } = mongoose;

const bannerSchema = new Schema({
  film: { type: Schema.Types.ObjectId, ref: "Film" },
  banner: { type: Schema.Types.ObjectId, ref: "Media" },
  created: { type: Date, default: Date.now, required: true },
  show: { type: Boolean, default: false, required: true },
});

bannerSchema.pre(/^find/, function () {
  this.populate("film");
});

MediaSchema.set("toJSON", { getters: true });

MediaSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };

  delete obj.__v;

  return obj;
};

module.exports =
  mongoose.models.banner || mongoose.model("banner", bannerSchema);
