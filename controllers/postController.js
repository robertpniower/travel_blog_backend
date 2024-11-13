const connection = require('../config/db.js');
const LikeController = require("./likeController.js");
const CommentController = require("./commentController.js")

class PostController {

    // Get a post by its ID
    static async getPostById(req, res) {
        try {
            const postId = req.params.postId;
            const query = 'SELECT * FROM posts WHERE id = ?';
            const [rows] = await connection.query(query, [postId]);

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.json(rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving the post' });
        }
    }

    static async getArticleById(req, res) {
        try {
            const articleId = req.params.articleId;
            // SQL query to get posts related to the articl
            const query = `
              SELECT id, title, content 
              FROM articles 
              WHERE id = ?`; // Assuming posts table has article_id
            // Execute the query with the articleId parameter
            const [results] = await connection.query(query, [articleId]);

            if (results.length === 0) {
                return res.status(404).json({ message: 'No posts found for this article' });
            }

            // Return the results as a response
            res.status(200).json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async getPostsByArticleId(req, res) {
        try {
            const articleId = req.params.articleId;
            const query = `SELECT posts.id, posts.title, posts.content 
                            FROM articles 
                            LEFT JOIN posts ON articles.id = posts.article_id 
                            WHERE articles.id = ?`
            const [results] = await connection.query(query, [articleId]);

            if (results.length === 0) {
                return res.status(404).json({ message: 'No posts found for this article' });
            }

            res.status(200).json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async getArticlesAndPostsByArticleId(req, res) {
        try {
            const articleId = req.params.articleId;
            const query = `SELECT articles.title, articles.content, posts.title, posts.content, published 
                            FROM articles 
                            LEFT JOIN posts ON articles.id = posts.article_id 
                            WHERE articles.id = ?
                            `
            // Execute the query with the articleId parameter
            const [results] = await connection.query(query, [articleId]);

            if (results.length === 0) {
                return res.status(404).json({ message: 'No posts found for this article' });
            }

            // Return the results as a response
            res.status(200).json(results);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = PostController