const cors = require("cors");
const express = require('express');
const bodyParser = require('body-parser');
const airQualityRoutes = require('./routes/airQualityRoutes');

const app = express();
const PORT = 8000;

// Middleware para processar JSON
app.use(express.json()); 
app.use(bodyParser.json()); 
app.use(cors());

// Usando as rotas da API
app.use('/api', airQualityRoutes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
