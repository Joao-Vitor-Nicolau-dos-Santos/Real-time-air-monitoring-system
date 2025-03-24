import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Banco de dados em memória
const airQualityData = [];

// Rota para receber dados do sensor
app.post('/api/air-quality', (req, res) => {
    const { location, pm25, pm10 } = req.body;
    const newData = { location, pm25, pm10, timestamp: new Date() };

    airQualityData.push(newData);

    // Mantém apenas os últimos 10 registros para evitar crescimento descontrolado
    if (airQualityData.length > 10) {
        airQualityData.shift();
    }

    res.status(201).json({ message: 'Dados salvos com sucesso!' });
});

// Rota para buscar os 3 últimos registros
app.get('/api/air-quality', (req, res) => {
    res.json(airQualityData.slice(-3)); // Retorna apenas os últimos 3 registros
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
