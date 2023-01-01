const mongoose = require("mongoose");

const { Schema } = mongoose;

const bannerSchema = new Schema({
  film: {
    type: Schema.Types.ObjectId,
    ref: "Film",
  },
  banner: {
    type: Schema.Types.ObjectId,
    ref: "Film",
  },
  show: { type: Boolean, default: false, required: true },
  created: { type: Date, default: Date.now, required: true },
});

bannerSchema.pre(/^find/, function () {
  this.populate("film");
});

bannerSchema.set("toJSON", { getters: true });

bannerSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };

  delete obj.__v;

  return obj;
};

module.exports =
  mongoose.models.Banner || mongoose.model("Banner", bannerSchema, "banners");
