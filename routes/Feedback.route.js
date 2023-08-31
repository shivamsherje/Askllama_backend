const express = require("express");
const { FeedbackModel } = require("../model/Feedback.model");
const FeedbackRoute = express.Router();


// get
FeedbackRoute.get("/", async (req, res) => {
  const data = await FeedbackModel.find();
  res.send(data);
});


// post
FeedbackRoute.post("/post", async (req, res) => {
  const { name, email, feedback } = req.body;

  try {
    const data = new FeedbackModel({ name, email, feedback, timestamp: Math.floor(Date.now() / 1000), });
    await data.save();
    res.status(200).json({ success: true, message: "Feedback successfully posted" });
  }

  catch (err) {
    console.error(err);
    res.status(500).json({
      success: false, message: "An error occurred while processing the feedback",
    });
  }
});

// delete
FeedbackRoute.delete("/delete/:_id", async (req, res) => {
  const feedbackId = req.params._id;

  try {
    const deletedFeedback = await FeedbackModel.findByIdAndDelete(feedbackId);
    if (deletedFeedback) {
      res.status(200).json({ success: true, message: "Feedback deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Feedback not found" });
    }
  }

  catch (err) {
    console.error(err);
    res.status(500).json({
      success: false, message: "An error occurred while deleting the feedback",
    });
  }
});


module.exports = {
  FeedbackRoute,
};
