const mongoose = require("mongoose");
const slugify = require("slugify");

const ArticleSchema = new mongoose.Schema(
  {
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
    // testNo: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// create resource slug from name
ArticleSchema.pre("save", function (next) {
  console.log("slugify ran", this.title);
  this.slug = slugify(this.title, { lower: true });
  next();
});

// delete associated comments of an article on article delete
ArticleSchema.pre("remove", async function (next) {
  await this.model("Comment").deleteMany({ article: this._id });
  next();
});

// reverse populate with virtuals
ArticleSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "article",
});

module.exports = mongoose.model("Article", ArticleSchema);
