const express = require("express");
const hashtag = require("./hashtag");

const router = express.Router();

router.get("/fetchArticles", hashtag.fetch);

module.exports = router;