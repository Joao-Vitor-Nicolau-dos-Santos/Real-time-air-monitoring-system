const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

// Configuração do emulador
const SENSOR_ID = uuidv4(); // ID único para o sensor
const API_URL = 'http://localhost:8000/api/sensor-data';

// Função para gerar valores aleatórios de PM2.5 e PM10
function generateRandomData() {
    return {
        sensorId: SENSOR_ID,
        pm25: (Math.random() * 100).toFixed(2), // Valor entre 0 e 100
        pm10: (Math.random() * 150).toFixed(2), // Valor entre 0 e 150
        location: `Lat ${(-23.5 + Math.random()).toFixed(5)}, Lon ${(-46.6 + Math.random()).toFixed(5)}` // Localização aleatória
    };
}

// Função para enviar dados para a API
async function sendSensorData() {
    const data = generateRandomData();
    try {
        const response = await axios.post(API_URL, data);
        console.log('Dados enviados:', response.data);
    } catch (error) {
        console.error('Erro ao enviar os dados:', error.message);
    }
}

// Simular medições a cada 10 segundos
setInterval(sendSensorData, 10000);

console.log('Emulador de sensor iniciado... Enviando dados a cada 10 segundos.');
