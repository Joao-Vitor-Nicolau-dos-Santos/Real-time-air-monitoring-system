const express = require('express');
const router = express.Router();
const airQualityController = require('../controllers/airQualityController');

// Rota para receber dados do sensor (POST)
router.post('/sensor-data', airQualityController.receiveSensorData);

// Rota para obter todos os dados de qualidade do ar (GET)
router.get('/air-quality', airQualityController.getAirQualityData);

module.exports = router;
