// simulação de banco de dados em memoria
let airQualityData = [];

/**
 * salva os dados do sensor no array.
 * @param {string} sensorId // identificador único do sensor.
 * @param {number} pm25 // medida de partículas PM2.5.
 * @param {number} pm10 // medida de partículas PM10.
 * @param {string} location // localização do sensor.
 * @returns {Object} // retorna o objeto salvo.
 */

// retorna todos os dados
function saveSensorData(sensorId, pm25, pm10, location) {
    const timestamp = new Date().toISOString(); //horario medição
    const newData = { sensorId, pm25, pm10, location, timestamp };
    airQualityData.push(newData); // adiciona no array
    return newData; // retorna dados salvos
}

// salva os dados dos sensores.
function getAllSensorData() {
    return airQualityData;
}

module.exports = { saveSensorData, getAllSensorData };
