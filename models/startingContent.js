const mongoose = require("mongoose");

const staringContentSchema = {
  title: String,
  content: String,
};

const StartingContent = mongoose.model("StartingContent", staringContentSchema);

module.exports = StartingContent;
