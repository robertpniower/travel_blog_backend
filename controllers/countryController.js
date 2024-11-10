require('dotenv').config();
const connection = require('../config/db.js');
const axios = require('axios');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 86400 });

class CountryController {

    static async getCountries() {
        try {
            const query = `SELECT * FROM countries`;
            const [result] = await connection.query(query);

            return result;
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

    static async getCountryFlags() {
        const cachedFlags = cache.get('countryFlags');

        if (cachedFlags) {
            return cachedFlags;
        }

        try {
            const countries = await this.getCountries();

            console.log(countries); // Check the structure of countries

            const countryFlags = {};

            for (const country of countries) {
                const response = await axios.get(`${process.env.COUNTRY_API_BASE_URL}/name/${country.country}`, {
                    headers: { 'Authorization': `Bearer ${process.env.COUNTRY_API_KEY}` }
                });

                countryFlags[country.country] = response.data; // Use correct key and data access
                console.log(countryFlags)
            }

            cache.set('countryFlags', countryFlags);

            return countryFlags;
        } catch (error) {
            console.error('Error fetching country flags:', error.message);
            throw new Error('Failed to fetch country flags');
        }
    }
}

module.exports = CountryController;
