const connection = require('../config/db.js');



class ArticleControlller {


    static async getAllArticles(req, res) {
        try {

            const query = 'SELECT * FROM articles';
            const [rows] = await connection.query(query);

            if (rows.length === 0) {
                return res.status(404).json({ message: 'Articles not found' });
            }

            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving the article' });
        }
    }

    static async getArticleIcon(req, res) {
        try {
            const articleId = req.params.articleId;
            const query = `SELECT * FROM articles 
                            LEFT JOIN article_category ON articles.id = article_category.article_id
                            LEFT JOIN categories ON article_category.category_id = categories.id
                            LEFT JOIN category_icons ON categories.id = category_icons.category_id
                            LEFT JOIN icons ON category_icons.icon_id = icons.id
                            WHERE articles.id = ?`;
            const [result] = await connection.query(query, [articleId]);

            if (result.length === 0) {
                return res.status(404).json({ message: `No icons found for article with id: {articleId}` });
            }

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = ArticleControlller;