const express = require("express");
const { getArticles } = require("../controllers/articles");
const router = express.Router();

// router.get("/", (req, res) =>
//   res.status(200).json({ sucess: true })
// );
router.route("/").get(getArticles);

module.exports = router;
