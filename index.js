const express = require("express");
var cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const app = express();
app.use(express.json());
const { FeedbackRoute } = require("./routes/Feedback.route");
const { RatingRoute } = require("./routes/Rating.route");
const { ThumbVotRoute } = require("./routes/ThumbVote.route")
const { LoggingRoute } = require("./routes/Logging.route")
app.use(cors());


app.use("/feedbacks", FeedbackRoute);
app.use("/rating", RatingRoute);
app.use("/thumbvote", ThumbVotRoute);
app.use("/loggings", LoggingRoute);

app.get("/", (req, res) => {
  res.send("Api is working fine");
});


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (e) {
    console.log("Not Connected to DB");
  }
  console.log(`Server is running on port ${process.env.PORT}`);
});
