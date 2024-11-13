const express = require('express');
const router = express.Router();
const ArticleControlller = require('../controllers/articelController')

router.get('/articles', ArticleControlller.getAllArticles)
router.get('/articles/icon/:articleId', ArticleControlller.getArticleIcon);
router.get('/articles/:country_id', ArticleControlller.getArticleByCountry)
router.get('/articles/byDate', ArticleControlller.getLatestArticles)

router.post('/create', ArticleControlller.createArticle)

module.exports = router;