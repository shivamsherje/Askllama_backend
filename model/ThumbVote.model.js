const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThumbVoteSchema = new Schema({
    answer: String,
    master: String,
    vote: Boolean,
    timestamp: Number,
},
    {
        versionKey: false
    });

const ThumbVoteModel = mongoose.model("ThumbVote", ThumbVoteSchema);

module.exports = { ThumbVoteModel };