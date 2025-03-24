"use client";

import React, { useEffect, useState } from "react";
import "./AirQualityDashboard.css";

function AirQualityDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/air-quality")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        return response.json();
      })
      .then((data) => setData(data)) // Aqui estava setDados(data), mas a variável correta é setData
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, []);

    return (
        <div className="dashboard-container">
        <h2 className="dashboard-title">Dashboard</h2>
        {data.length > 0 ? (
            <ul className="dashboard-list">
            {data
                .slice(-3) 
                .reverse() 
                .map((item, index) => (
                <li key={index} className="dashboard-list-item">
                    <strong>Localização:</strong> {item.location} |{" "}
                    <strong> PM2.5:</strong> {item.pm25} |{" "}
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
