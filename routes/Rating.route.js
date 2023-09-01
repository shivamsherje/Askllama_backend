const express = require("express");
const { RatingModel } = require("../model/Rating.model");
const RatingRoute = express.Router();

RatingRoute.get("/", async (req, res) => {
  const data = await RatingModel.find();
  res.send(data);

});

RatingRoute.post("/post", async (req, res) => {
  const { rating, comments } = req.body;

  try {
    const data = new RatingModel({ rating, comments, timestamp: Math.floor(Date.now() / 1000), });
    await data.save();
    res.status(200).json({ success: true, message: "Rating successfully posted" });
  }

  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "An error occurred while processing the feedback", });
  }
});

RatingRoute.delete("/delete/:_id", async (req, res) => {
  const feedbackId = req.params._id;
  try {
    const deletedRating = await RatingModel.findByIdAndDelete(feedbackId);

    if (deletedRating) {
      res.status(200).json({ success: true, message: "Rating deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Rating not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false, message: "An error occurred while deleting the feedback",
    });
  }
});

module.exports = {
  RatingRoute,
};
