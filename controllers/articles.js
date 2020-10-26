const Article = require("../models/Article");

exports.getArticles = async (req, res, next) => {
  try {
    const article = await Article.find();
    res
      .status(200)
      .json({ sucess: true, count: article.length, data: article });
  } catch (error) {
    console.log(error);
    res.status(400).json({ sucess: false, error });
  }
};

exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res
        .status(400)
        .json({ sucess: false, error: `${req.params.id} does not exist` });
    }
    res.status(200).json({ sucess: true, data: article });
  } catch (error) {
    console.log(error);
    res.status(400).json({ sucess: false, error });
  }
};

exports.updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!article) {
      return res
        .status(400)
        .json({ sucess: false, error: `${req.params.id} does not exist` });
    }
    res.status(200).json({ sucess: true, data: article });
  } catch (error) {
    console.log(error);
    res.status(400).json({ sucess: false, error });
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res
        .status(400)
        .json({ sucess: false, error: `${req.params.id} does not exist` });
    }
    res.status(200).json({ sucess: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(400).json({ sucess: false, error });
  }
};

exports.createArticles = async (req, res, next) => {
  console.log(req.body);
  try {
    const article = await Article.create(req.body);
    res.status(201).json({ sucess: true, data: article });
  } catch (error) {
    console.log(error);
    res.status(400).json({ sucess: false, error });
  }
  // const article = await Article.create(req.body);
  // res.status(201).json({ sucess: true, data: article });
};
