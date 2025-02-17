require('dotenv').config();
const connection = require('../config/db.js');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 86400 });

class CountryController {

    static async getCountries(req, res) {
        try {
            const query = `SELECT * FROM countries`;
            const [result] = await connection.query(query);

            res.status(200).json(result);

        } catch (error) {
            console.error('Error fetching countries:', error);
            throw new Error('Failed to fetch countries');
        }
    }

    static async addCountry(country_code, country) {
        try {
            const query = "INSERT INTO countries (country_code, country) VALUES(?, ?)";
            const values = [country_code, country];
            const [result] = await connection.execute(query, values);

            return result.insertId;
        } catch (err) {
            console.error('Error inserting Country:', err);
            throw new Error('Failed to add country');
        }
    }

}

module.exports = CountryController;
