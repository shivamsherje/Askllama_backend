const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    name: String,
    email: String,
    feedback: String,
    timestamp: Number,
  },
  {
    versionKey: false,
  }
);

const FeedbackModel = mongoose.model("Feedbacks", FeedbackSchema);

module.exports = { FeedbackModel };
