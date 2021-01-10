const express = require("express");
const {
  getArticles,
  createArticles,
  getArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articles");

// include other resource routers related to articles
const commentRouter = require("./comments");

const router = express.Router();

// reroute to other resource router
router.use("/:articleId/comments", commentRouter);

// router.get("/", (req, res) =>
//   res.status(200).json({ sucess: true })
// );
router.route("/").get(getArticles).post(createArticles);

router.route("/:id").get(getArticle).put(updateArticle).delete(deleteArticle);

module.exports = router;
