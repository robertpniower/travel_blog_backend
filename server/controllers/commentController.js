const connection = require('../config/db.js');


class CommentController {
    
    
    getCommentsByPostId = async (postId) => {
        try {
          const connection = await mysql.createConnection(dbConfig);
      
          const [comments] = await connection.execute(
            `SELECT comments.*, users.name AS commenter 
             FROM comments 
             LEFT JOIN users ON comments.user_id = users.id 
             WHERE comments.post_id = ?`, [postId]
          );
      
          await connection.end();
          return comments;
      
        } catch (error) {
          console.error('Error fetching comments:', error);
          throw error;
        }
      };
}

module.exports = CommentController;