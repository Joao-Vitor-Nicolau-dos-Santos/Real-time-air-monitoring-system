"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from "chart.js";
import './AirQualityChart.css';  

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function AirQualityChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "PM2.5",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "PM10",
        data: [],
        borderColor: "#A31621",
        backgroundColor: "#2D8C8C",
      },
    ],
  });

  // Buscar dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/air-quality");
        if (!response.ok) throw new Error("Erro ao buscar os dados");
        
        const result = await response.json();

        // Pegar apenas os últimos 5 registros para exibição no gráfico
        const lastRecords = result.slice(-5);

        setChartData({
          labels: lastRecords.map((item) => item.timestamp), // Eixo X (tempo)
          datasets: [
            {
              label: "PM2.5",
              data: lastRecords.map((item) => item.pm25),
              borderColor: "#50C878",
              backgroundColor: "#30C858",
            },
            {
              label: "PM10",
              data: lastRecords.map((item) => item.pm10),
              borderColor: "#228B22",
              backgroundColor: "#128D12",
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao obter os dados da API:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Atualiza a cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Gráfico</h3>
      <Line data={chartData} />
    </div>
  );
}

export default AirQualityChart;
