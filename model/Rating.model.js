const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    rating: Number,
    comments: String,
    timestamp: Number,
  },
  {
    versionKey: false,
  }
);


const RatingModel = mongoose.model("ratings", RatingSchema);

module.exports = { RatingModel };
