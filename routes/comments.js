const express = require("express");
const {
  getComments,
  //   createArticles,
  //   getArticle,
  //   updateArticle,
  //   deleteArticle,
} = require("../controllers/comments");
const router = express.Router({ mergeParams: true });

router.route("/").get(getComments);
// .post(createArticles);

// router.route("/:id").get(getArticle).put(updateArticle).delete(deleteArticle);

module.exports = router;
