const express = require("express");
const {
  getArticles,
  createArticles,
  getArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articles");
const router = express.Router();

// router.get("/", (req, res) =>
//   res.status(200).json({ sucess: true })
// );
router.route("/").get(getArticles).post(createArticles);

router.route("/:id").get(getArticle).put(updateArticle).delete(deleteArticle);

module.exports = router;
