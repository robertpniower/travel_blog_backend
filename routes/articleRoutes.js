const express = require('express');
const router = express.Router();

const ArticleControlller = require('../controllers/articelController')


router.get('/articles', ArticleControlller.getAllArticles)
router.get('/articles/icon/:articleId', ArticleControlller.getArticleIcon);

module.exports = router;