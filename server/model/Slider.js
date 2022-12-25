const mongoose = require("mongoose");

const { Schema } = mongoose;

const sliderSchema = new Schema({
  film: { type: Schema.Types.ObjectId, ref: "Film" },
  banner: { type: Schema.Types.ObjectId, ref: " Banner" },
  show: { type: Boolean, default: false, required: true },
  created: { type: Date, default: Date.now, required: true },
});

sliderSchema.pre(/^find/, function () {
  this.populate("film");
});

MediaSchema.set("toJSON", { getters: true });

MediaSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };

  delete obj.__v;

  return obj;
};

module.exports =
  mongoose.models.slider || mongoose.model("slider", sliderSchema);
