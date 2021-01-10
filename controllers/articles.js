const Article = require("../models/Article");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getArticles = async (req, res, next) => {
  try {
    let reqQueryCopy = { ...req.query };

    // field to ignore in request query
    const ignoreQuery = ["select", "sort", "page", "limit"];

    ignoreQuery.map((query) => delete reqQueryCopy[query]);

    // add $ for mongoose operators
    let queryString = JSON.stringify(reqQueryCopy).replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    let query = Article.find(JSON.parse(queryString));

    // select field
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // sortBy field
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log("sortBy :>> ", sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 4;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Article.countDocuments();

    query.skip(startIndex).limit(limit);

    const article = await query;

    // pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      sucess: true,
      pageCount: article.length,
      totalCount: total,
      pagination,
      data: article,
    });
  } catch (error) {
    console.log(error);
    // res.status(400).json({ sucess: false, error });
    next(error);
  }
};

// // using async await without custom middleware
// exports.getArticle = async (req, res, next) => {
//   try {
//     const article = await Article.findById(req.params.id);
//     if (!article) {
//       // return res.status(400).json({ sucess: false, error: `${req.params.id} does not exist` });
//       return next(
//         new ErrorResponse(`Article with id ${req.params.id} was not found`, 404)
//       );
//     }
//     res.status(200).json({ sucess: true, data: article });
//   } catch (error) {
//     console.log(error);
//     // res.status(400).json({ sucess: false, error });

//     // next(
//     //   new ErrorResponse(`Article with id ${req.params.id} was not found`, 404)
//     // );
//     next(error);
//   }
// };

// used here asyncHandler, uncomment above code to use async await for get article
exports.getArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    // return res.status(400).json({ sucess: false, error: `${req.params.id} does not exist` });
    return next(
      new ErrorResponse(`Article with id ${req.params.id} was not found`, 404)
    );
  }
  res.status(200).json({ sucess: true, data: article });
});

exports.updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!article) {
      // return res.status(400).json({ sucess: false, error: `${req.params.id} does not exist` });
      return next(
        new ErrorResponse(`Article with id ${req.params.id} was not found`, 404)
      );
    }
    res.status(200).json({ sucess: true, data: article });
  } catch (error) {
    console.log(error);
    // res.status(400).json({ sucess: false, error });
    next(error);
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      // return res.status(400).json({ sucess: false, error: `${req.params.id} does not exist` });
      return next(
        new ErrorResponse(`Article with id ${req.params.id} was not found`, 404)
      );
    }
    res.status(200).json({ sucess: true, data: {} });
  } catch (error) {
    console.log(error);
    // res.status(400).json({ sucess: false, error });
    next(error);
  }
};

exports.createArticles = async (req, res, next) => {
  console.log(req.body);
  try {
    const article = await Article.create(req.body);
    res.status(201).json({ sucess: true, data: article });
  } catch (error) {
    console.log(error);
    // res.status(400).json({ sucess: false, error });
    next(error);
  }
  // const article = await Article.create(req.body);
  // res.status(201).json({ sucess: true, data: article });
};
