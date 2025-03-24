"use client";

import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./CircleAirQualityChart.css";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ClircleAirQualityChart() {
  const [chartData, setChartData] = useState({
    labels: ["PM2.5", "PM10", "CO2", "O3", "NO2"],
    datasets: [
      {
        label: "Qualidade do Ar",
        data: [],
        borderColor: "#50C878",
        backgroundColor: "rgba(80, 200, 120, 0.2)",
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "#50C878",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/air-quality");
        if (!response.ok) throw new Error("Erro ao buscar os dados");
        
        const result = await response.json();
        const lastRecord = result[result.length - 1]; // Pegamos o último registro

        setChartData({
          labels: ["PM2.5", "PM10", "CO2", "O3", "NO2"],
          datasets: [
            {
              label: "Qualidade do Ar",
              data: [lastRecord.pm25, lastRecord.pm10, lastRecord.co2, lastRecord.o3, lastRecord.no2],
              borderColor: "#50C878",
              backgroundColor: "rgba(80, 200, 120, 0.2)",
              borderWidth: 2,
              pointRadius: 5,
              pointBackgroundColor: "#50C878",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao obter os dados da API:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="circle-chart-container">
      <h3 className="chart-title">Gráfico de Qualidade do Ar</h3>
      <Radar data={chartData} />
    </div>
  );
}

export default ClircleAirQualityChart;
