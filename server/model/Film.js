const mongoose = require("mongoose");
const VoteSchema = require("./Vote");
const CommentSchema = require("./Comment");

const { Schema } = mongoose;

const FilmSchema = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  actors: { type: String, required: true },
  best_quality: { type: String, required: true },
  imdb_link: { type: String, required: true },
  imdb_score: { type: String, required: true },
  genre: { type: String, required: true },
  age: { type: String, required: true },
  director: { type: String, required: true },
  writer: { type: String, required: true },
  product_of: { type: String, required: true },
  release_date: { type: String, required: true },
  time: { type: String, required: true },
  condition: { type: String, required: true },
  score: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  votes: [VoteSchema],
  comments: [CommentSchema],
  poster: {
    type: Schema.Types.ObjectId,
    ref: "Media",
    required: true,
  },
  video: {
    type: Schema.Types.ObjectId,
    ref: "Media",
    required: true,
  },
  created: { type: Date, default: Date.now, required: true },
});

// FilmSchema.plugin(require("mongoose-autopopulate"));

FilmSchema.pre(/^find/, function () {
  this.populate("poster");
});

FilmSchema.set("toJSON", { getters: true });

FilmSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };

  delete obj.__v;

  return obj;
};

module.exports = mongoose.models.Film || mongoose.model("Film", FilmSchema);
