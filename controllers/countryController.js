const connection = require('../config/db.js');

class CountryController {

    static async getCountries(req, res) {
        try {
            const query = `SELECT * FROM countries`;
            const [result] = await connection.query(query);

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }

    }

    static async addCountry(country_code, country) {
        try {
            const query = "INSERT INTO countries (country_code, country) VALUES(?, ?)";
            const values = [country_code, country];
            const [result] = await connection.execute(query, values);

            return result.insertId;
        } catch (err) {
            console.error('Error inserting Country: ', err)
        }
    }

}

module.exports = CountryController;