const express = require("express");
const { ThumbVoteModel } = require("../model/ThumbVote.model");
const ThumbVotRoute = express.Router();

ThumbVotRoute.get("/", async (req, res) => {
  const data = await ThumbVoteModel.find();
  res.send(data);
});


ThumbVotRoute.post("/post", async (req, res) => {
  const { answer, master, vote } = req.body;

  try {
    const data = new ThumbVoteModel({answer, master, vote,timestamp: Math.floor(Date.now() / 1000),
    });

    await data.save();
    res.status(200).json({ success: true, message: "voting successfully posted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "An error occurred while processing the vote" });
  }
});


ThumbVotRoute.delete("/delete/:_id", async (req, res) => {
  const ThumbVotId = req.params._id;
  try {
    const deletedThumbVot = await ThumbVoteModel.findByIdAndDelete(ThumbVotId);

    if (deletedThumbVot) {
      res.status(200).json({ success: true, message: "vote deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "vote not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false, message: "An error occurred while deleting the vote",
    });
  }

});

module.exports = {
  ThumbVotRoute,
};
