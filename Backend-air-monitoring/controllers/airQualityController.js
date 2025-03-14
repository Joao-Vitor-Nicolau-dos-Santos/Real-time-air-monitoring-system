const AirQualityModel = require('../models/airQualityModel');

/**
 * Processa os dados do sensor e os armazena no sistema.
 * @param {Object} req - Objeto da requisição HTTP.
 * @param {Object} res - Objeto da resposta HTTP.
 */

//recebe os dados via POST e os salva
function receiveSensorData(req, res) {
    const { sensorId, pm25, pm10, location } = req.body;

    
    // verifica se todos os campos obrigatórios foram enviados
    if (!sensorId || pm25 === undefined || pm10 === undefined || !location) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    // Salva os dados no model
    const savedData = AirQualityModel.saveSensorData(sensorId, pm25, pm10, location);

    // retorna uma resposta json confirmando o armazenamento
    res.status(201).json({ message: "Dados do sensor armazenados com sucesso!", data: savedData });
}

/**
 * Retorna todos os dados de qualidade do ar armazenados.
 * @param {Object} req - Objeto da requisição HTTP.
 * @param {Object} res - Objeto da resposta HTTP.
 */

//retorna os dados armazenados via get
function getAirQualityData(req, res) {
    const data = AirQualityModel.getAllSensorData();
    res.status(200).json(data);
}

module.exports = { receiveSensorData, getAirQualityData };
