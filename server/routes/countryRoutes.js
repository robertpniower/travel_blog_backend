const express = require('express');

const CountryController = require('../controllers/countryController');

const router = express.Router();

router.get('/countries',CountryController.getCountries);

router.post('/create', async (req, res) => {
    const { country_code, country } = req.body;
    try {
      const userId = await CountryController.addCountry(country_code, country);
      res.status(201).json({ message: 'Country created successfully', userId });
    } catch (err) {
      res.status(500).json({ error: 'Error creating Country' });
    }
  });

module.exports = router;