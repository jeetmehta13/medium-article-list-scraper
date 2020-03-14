const express = require("express");
const articles = require("./articles");

const router = express.Router();

router.get("/fetchArticles", articles.fetch);

module.exports = router;