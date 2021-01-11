const Comment = require("../models/Comment");
const Article = require("../models/Article");
const ErrorResponse = require("../utils/errorResponse");

exports.getComments = async (req, res, next) => {
  try {
    let query;

    if (req.params.articleId) {
      query = Comment.find({ article: req.params.articleId }).populate({
        path: "article",
        select: "title",
      });
    } else {
      query = Comment.find({}).populate({ path: "article", select: "title" });
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

exports.getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).populate({
      path: "article",
      select: "title",
    });

    if (!comment) {
      return next(
        new ErrorResponse(`Comment with id ${req.params.id} was not found`, 404)
      );
    }
    res.status(200).json({ sucess: true, data: comment });
  } catch (error) {
    next(error);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    req.body.article = req.params.articleId;
    const article = await Article.findById(req.params.articleId);

    if (!article) {
      return next(
        new ErrorResponse(
          `Comment with id ${req.body.articleId} was not found`,
          404
        )
      );
    }
    const comment = await Comment.create(req.body);

    res.status(200).json({ sucess: true, data: comment });
  } catch (error) {
    next(error);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!comment) {
      // return res.status(400).json({ sucess: false, error: `${req.params.id} does not exist` });
      return next(
        new ErrorResponse(`Comment with id ${req.params.id} was not found`, 404)
      );
    }
    res.status(200).json({ sucess: true, data: comment });
  } catch (error) {
    console.log(error);
    // res.status(400).json({ sucess: false, error });
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(
        new ErrorResponse(`Comment with id ${req.params.id} was not found`, 404)
      );
    }

    comment.remove();

    res.status(200).json({ sucess: true, data: {} });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
