// "use client" é necessário para usar hooks como useEffect
"use client";

import React, { useEffect, useState } from 'react';
import './AirQualityDashboard.css'; // Importa o arquivo CSS externo

// Componente que exibe os dados de qualidade do ar.
function AirQualityDashboard() {
    // Estado para armazenar os dados da API
    const [data, setData] = useState([]);

    // Buscar os dados da API
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/air-quality');
            if (!response.ok) throw new Error('Erro ao buscar os dados');
            
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Erro ao obter os dados da API:', error);
        }
    };

    // useEffect para buscar os dados ao montar o componente e atualizar a cada minuto
    useEffect(() => {
        fetchData(); // Busca inicial dos dados
        const interval = setInterval(fetchData, 6000); // Atualiza a cada 6 segundos

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, []);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Qualidade do Ar</h2>
            {data.length > 0 ? (
                <ul className="dashboard-list">
                    {data.map((item, index) => (
                        <li key={index} className="dashboard-list-item">
                            <strong>Localização:</strong> {item.location} | 
                            <strong> PM2.5:</strong> {item.pm25} | 
                            <strong> PM10:</strong> {item.pm10}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="dashboard-no-data">Nenhum dado disponível.</p>
            )}
        </div>
    );
}

export default AirQualityDashboard;
