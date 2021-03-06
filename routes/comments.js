const express = require("express");
const {
  getComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");
const router = express.Router({ mergeParams: true });

router.route("/").get(getComments).post(createComment);

router.route("/:id").get(getComment).put(updateComment).delete(deleteComment);

module.exports = router;
