import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useDashboard } from "../context/DashboardContext";
import "./UserGreenScore.css";

const UserGreenScore = () => {
  const { greenScore, energyChange, waterChange, wasteChange } = useDashboard();

  // Sample historical data for trend visualization
  const monthlyData = [
    { month: "January", energy: 88, water: 75, waste: 80, overall: 81 },
    { month: "February", energy: 85, water: 78, waste: 82, overall: 82 },
    { month: "March", energy: 92, water: 85, waste: 88, overall: 88 },
    { month: "April", energy: 94, water: 88, waste: 90, overall: 91 },
    { month: "May", energy: 89, water: 80, waste: 85, overall: 85 },
    { month: "June", energy: 96, water: 92, waste: 95, overall: 94 },
  ];

  // Generate alerts based on current changes
  const getAlerts = () => {
    const alerts = [];
    
    if (energyChange > 0) {
      alerts.push({
        type: "warning",
        message: `⚠️ Energy consumption increased by ${energyChange}%!`,
        category: "energy"
      });
    } else {
      alerts.push({
        type: "success",
        message: `✅ Energy consumption decreased by ${Math.abs(energyChange)}%! Good work!`,
        category: "energy"
      });
    }

    if (waterChange > 0) {
      alerts.push({
        type: "warning",
        message: `⚠️ Water consumption increased by ${waterChange}%!`,
        category: "water"
      });
    } else {
      alerts.push({
        type: "success",
        message: `✅ Water consumption decreased by ${Math.abs(waterChange)}%! Excellent!`,
        category: "water"
      });
    }

    if (wasteChange > 0) {
      alerts.push({
        type: "warning",
        message: `⚠️ Waste generation increased by ${wasteChange}%!`,
        category: "waste"
      });
    } else {
      alerts.push({
        type: "success",
        message: `✅ Waste generation decreased by ${Math.abs(wasteChange)}%! Great effort!`,
        category: "waste"
      });
    }

    return alerts;
  };

  const alerts = getAlerts();
  
  const scoreData = [
    { metric: "Energy", current: energyChange },
    { metric: "Water", current: waterChange },
    { metric: "Waste", current: wasteChange },
  ];

  return (
    <div className="user-greenscore-dashboard">
      <div className="greenscore-header">
        <h1>🌿 Green Score Analytics</h1>
        <p>Comprehensive sustainability performance analysis</p>
      </div>

      {/* Overall Score Card */}
      <div className="overall-score-container">
        <div className="score-card main-score">
          <h2>Overall Green Score</h2>
          <div className="score-circle">
            <span className="score-value">{greenScore}</span>
            <span className="score-max">/100</span>
          </div>
          <p className={`score-change ${greenScore < 50 ? "increase" : "decrease"}`}>
            Dynamic score based on current consumption
            <br />
            <span className="comparison">Higher values indicate better sustainability</span>
          </p>
        </div>

        {/* Individual Scores */}
        <div className="score-card energy-score">
          <h3>Energy Change</h3>
          <p className="metric-value">{energyChange}%</p>
          <p className={`metric-change ${energyChange > 0 ? "increase" : "decrease"}`}>
            {energyChange > 0 ? "↑" : "↓"} {Math.abs(energyChange)}%
          </p>
        </div>

        <div className="score-card water-score">
          <h3>Water Change</h3>
          <p className="metric-value">{waterChange}%</p>
          <p className={`metric-change ${waterChange > 0 ? "increase" : "decrease"}`}>
            {waterChange > 0 ? "↑" : "↓"} {Math.abs(waterChange)}%
          </p>
        </div>

        <div className="score-card waste-score">
          <h3>Waste Change</h3>
          <p className="metric-value">{wasteChange}%</p>
          <p className={`metric-change ${wasteChange > 0 ? "increase" : "decrease"}`}>
            {wasteChange > 0 ? "↑" : "↓"} {Math.abs(wasteChange)}%
          </p>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="chart-container">
        <h2>Consumption Change Comparison</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={scoreData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" fill="#27ae60" name="% Change" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Chart */}
      <div className="chart-container">
        <h2>Score Trend Over Months</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="energy" stroke="#FFA500" strokeWidth={2} name="Energy" />
            <Line type="monotone" dataKey="water" stroke="#2196F3" strokeWidth={2} name="Water" />
            <Line type="monotone" dataKey="waste" stroke="#FF5722" strokeWidth={2} name="Waste" />
            <Line type="monotone" dataKey="overall" stroke="#27ae60" strokeWidth={3} name="Overall" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Alerts */}
      <div className="alerts-container">
        <h2>Performance Alerts</h2>
        <div className="alerts-grid">
          {alerts.map((alert, index) => (
            <div key={index} className={`alert alert-${alert.type}`}>
              {alert.message}
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="summary-container">
        <h2>Score Summary</h2>
        <div className="summary-content">
          <p>
            <strong>Current Overall Score:</strong> {greenScore}/100
          </p>
          <p>
            <strong>Score Status:</strong> {greenScore >= 70 ? "Excellent" : greenScore >= 50 ? "Good" : "Needs Improvement"}
          </p>
          <p>
            Energy Change: {energyChange > 0 ? "+" : ""}{energyChange}% | Water Change: {waterChange > 0 ? "+" : ""}{waterChange}% | Waste Change: {wasteChange > 0 ? "+" : ""}{wasteChange}%
          </p>
          <p className={greenScore >= 50 ? "increase" : "decrease"}>
            {greenScore >= 50 
              ? "✅ Score is maintainable. Keep working towards sustainability goals!"
              : "⚠️ Focus on reducing consumption to improve your green score."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserGreenScore;
