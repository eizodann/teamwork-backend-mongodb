const Comment = require("../models/Comment");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getComments = async (req, res, next) => {
  try {
    let query;

    if (req.params.articleId) {
      query = Comment.find({ article: req.params.articleId });
    } else {
      query = Comment.find({});
    }

    const comment = await query;

    res.status(200).json({
      sucess: true,
      pageCount: comment.length,
      // totalCount: total,
      // pagination,
      data: comment,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
