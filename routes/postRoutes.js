const express = require('express');

const PostController = require("../controllers/postController");

const router = express.Router();

// Define the route to retrieve a post by ID
router.get('/:postId', PostController.getPostById);

//router.get('/articles', PostController.getAllArticles)

router.get('/articles/:articleId', PostController.getArticleById);

router.get('/article/:articleId/posts', PostController.getPostsByArticleId);

router.get('/article/:articleId', PostController.getArticlesAndPostsByArticleId);



module.exports = router;