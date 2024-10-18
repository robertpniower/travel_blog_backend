const connection = require('../config/db.js');

class LikeController {
    
    
    getLikesByPostId = async (postId) => {
        try {
          const connection = await mysql.createConnection(dbConfig);
      
          const [likes] = await connection.execute(
            `SELECT * FROM likes WHERE post_id = ?`, [postId]
          );
      
          await connection.end();
          return likes;
      
        } catch (error) {
          console.error('Error fetching likes:', error);
          throw error;
        }
      };
}

module.exports = LikeController;