import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useDashboard } from "../context/DashboardContext";
import "./OverallDashboard.css";

const OverallDashboard = () => {
  const { energyTotal, waterTotal, wasteTotal, energyChange, waterChange, wasteChange, greenScore } = useDashboard();

  const data = [
    { name: "Energy", value: energyTotal },
    { name: "Water", value: waterTotal },
    { name: "Waste", value: wasteTotal },
  ];

  const COLORS = ["#FFA500", "#2196F3", "#FF5722"];

  return (
    <div className="overall-dashboard">

      {/* TOP CONTENT */}
      <div className="top-content">
        <h1>Welcome to Green Campus Admin Dashboard</h1>
        <p>Monitor your campus sustainability performance at a glance!</p>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">

        {/* Left Panel: Value Cards */}
        <div className="values-panel">

          <div className="value-card energy">
            <h2>⚡ Energy</h2>
            <p>Consumption: {energyTotal} kWh</p>
            <p>Month Change: {energyChange}%</p>
          </div>

          <div className="value-card water">
            <h2>💧 Water</h2>
            <p>Usage: {waterTotal} L</p>
            <p>Month Change: {waterChange}%</p>
          </div>

          <div className="value-card waste">
            <h2>🗑 Waste</h2>
            <p>Generated: {wasteTotal} kg</p>
            <p>Month Change: {wasteChange}%</p>
          </div>

          <div className="value-card green-score">
            <h2>🌿 Green Score</h2>
            <p>Score: {greenScore}</p>
            <p>Status: {greenScore >= 75 ? "Excellent" : greenScore >= 50 ? "Good" : "Needs Improvement"}</p>
          </div>
        </div>

        {/* Right Panel: Pie Chart */}
        <div className="chart-panel">
          <ResponsiveContainer width="100%" height={450}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={140}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Alerts Section */}
      <div className="alert-section">
        <div className={`alert ${energyChange > 0 ? "energy-alert" : "success-alert"}`}>
          {energyChange > 0 ? "⚠️" : "✅"} Energy: {energyChange > 0 ? "increased" : "decreased"} by {Math.abs(energyChange)}%
        </div>
        <div className={`alert ${waterChange > 0 ? "water-alert" : "success-alert"}`}>
          {waterChange > 0 ? "⚠️" : "✅"} Water: {waterChange > 0 ? "increased" : "decreased"} by {Math.abs(waterChange)}%
        </div>
        <div className={`alert ${wasteChange > 0 ? "waste-alert" : "success-alert"}`}>
          {wasteChange > 0 ? "⚠️" : "✅"} Waste: {wasteChange > 0 ? "increased" : "decreased"} by {Math.abs(wasteChange)}%
        </div>
      </div>
    </div>
  );
};

export default OverallDashboard;
