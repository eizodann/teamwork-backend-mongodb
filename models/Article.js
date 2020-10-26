const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [60, "Title can not be more than 60 characters"],
  },
  slug: String,
  article: {
    type: String,
    required: [true, "Please add an article"],
    trim: true,
    // maxlength: [60, "Article can not be more than 60 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Article", ArticleSchema);
