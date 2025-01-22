const bcrypt = require('bcrypt');
const connection = require('../config/db.js');

class UserController {

    // Create a new user
    static async createUser(name, email, password, role, avatar_url) {
        if (!name || !email || !password || !role) {
            throw new Error('Missing required user information');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (name, email, password, role, avatar_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`;
        const values = [name, email, hashedPassword, role, avatar_url || null];

        try {
            const [result] = await connection.execute(query, values);

            console.log('Inserted user with ID:', result.insertId);

            return result.insertId;
        } catch (err) {
            console.error('Error inserting user: ', err);
            throw err;
        }
    }

    // Get user by ID
    static async getUserById(id) {
        const query = `SELECT id, name, email, role, avatar_url FROM users WHERE id = ?`;

        try {
            const [rows] = await connection.execute(query, [id]);

            return rows[0];
        } catch (err) {
            console.error('Error fetching user: ', err);
            throw err;
        }
    }

    // Get all users with pagination support
    static async getAllUsers() {
        const query = `SELECT id, name, email, role, avatar_url FROM users`;

        try {
            const [rows] = await connection.execute(query);

            return rows;
        } catch (err) {
            console.error('Error fetching users: ', err);
            throw err;
        }
    }

    // Update user details
    static async updateUser(id, name, email, password, role, avatar_url) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `UPDATE users SET name = ?, email = ?, password = ?, role = ?, avatar_url = ?, updated_at = NOW() WHERE id = ?`;
        const values = [name, email, hashedPassword, role, avatar_url, id];

        try {
            const [result] = await connection.execute(query, values)

            console.log('Updated user with ID:', id);

            return result.affectedRows;
        } catch (err) {
            console.error('Error updating user: ', err);
            throw err;
        }
    }

    // Delete a user by ID
    static async deleteUser(id) {
        const query = `DELETE FROM users WHERE id = ?`;

        try {
            const [result] = await connection.execute(query, [id]);

            console.log('Deleted user with ID:', id);

            return result.affectedRows;
        } catch (err) {
            console.error('Error deleting user: ', err);
            throw err;
        }
    }
}

module.exports = UserController;
