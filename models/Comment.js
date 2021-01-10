const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Please add a comment"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  article: {
    type: mongoose.Schema.ObjectId,
    ref: "Article",
    required: true,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
