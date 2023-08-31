const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
    Timestamp: { type: Number, default: Math.floor(Date.now() / 1000) },
    Question: String,
    Master: String,
    Answer: String,
    Prompt: String
});

const LoggingSchema = new mongoose.Schema({

    loggs: [DataSchema]
}, {
    versionKey: false
});

const LoggingModel = mongoose.model("loggings", LoggingSchema);

module.exports = { LoggingModel };