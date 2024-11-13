const connection = require('../config/db.js');
const Utility = require('../utility/utility.js')

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

    static async getLatestArticles(req, res) {
        try {
            const query = `SELECT * FROM articles ORDER BY created_at DESC LIMIT 10`;
            const [result] = await connection.query(query);

            res.status(200).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error recieving Articles' });
        }
    }

    static async getArticleByCountry(req, res) {
        try {
            const country_id = req.params.country_id
            const query = `SELECT * FROM articles 
                            WHERE country_id = ?`;
            const [result] = await connection.query(query, country_id);

            res.json(result)
            console.log(result)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving the article for country_id: {country_id}' });
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

    static async createArticle(req, res) {
        const userId = 1;
        const article_slug = await Utility.slugify(req.body.article_title);
        const popst_slug = Utility.slugify(req.body.post_title);
        const article_data = { article_title: req.body.title, article_content: req.body.content, article_slug, userId, countryId: req.body.countryId };
        const article_query = `INSERT INTO articles 
                                (title, content, slug, published, published_at, created_at, updated_at, user_id, country_id)
                                VALUES (?, ?, ?, 1, NOW(), NOW(), NOW(), 1, ?)`;
        let write_article_data = connection.query(article_query, article_data, (err, result) => {
            if (err) throw err;

            return result.insertId;

        })
        const post_data = { article_id: write_article_data, post_titele: req.body.post_title, post_content: req.body.post_content, post_slug };
        const post_query = `INSERT INTO posts (article_id, title, content, slug, created_at, updated_at)
                            VALUES (?, ?, ?, ?, NOW(), NOW())`;
        let write_post_data = connection.query(post_query, post_data, (err, result) => {
            if (err) throw err;

            return result.insertId;
        });

    }
}

module.exports = ArticleControlller;