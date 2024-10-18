const express = require('express');

const CityController = require('../controllers/cityController')

const router = express.Router();

router.get('/cities/:country_id', CityController.getCities);

router.post('/create', async (req, res) => {
    const { city_name, country_Id } = req.body;
    try {
      const userId = await CityController.createCity(city_name, country_Id);
      res.status(201).json({ message: 'Country created successfully', userId });
    } catch (err) {
      res.status(500).json({ error: 'Error creating Country' });
    }
  });

module.exports = router;