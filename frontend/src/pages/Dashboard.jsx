import React from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const riskScore = 72;
  const securityIndex = 91;

  return (
    <div className="dashboard-wrapper">

      {/* Risk Score */}
      <div className="card">
        <h3>Threat Risk Score</h3>
        <div
          className="circle glass-blue"
          style={{
            background: `conic-gradient(
              rgba(0,153,255,0.9) 0% ${riskScore}%,
              rgba(255,255,255,0.08) ${riskScore}% 100%
            )`
          }}
        >
          <span>{riskScore}%</span>
        </div>
      </div>

      {/* Security Index */}
      <div className="card">
        <h3>Security Index</h3>
        <div
          className="circle glass-green"
          style={{
            background: `conic-gradient(
              rgba(0,255,170,0.9) 0% ${securityIndex}%,
              rgba(255,255,255,0.08) ${securityIndex}% 100%
            )`
          }}
        >
          <span>{securityIndex}%</span>
        </div>
      </div>

      {/* Login Activity */}
      <div className="card wide">
        <h3>Login Activity</h3>
        <div className="line-chart">
          <svg viewBox="0 0 400 150">
            <polyline
              fill="none"
              stroke="rgba(0,153,255,0.9)"
              strokeWidth="3"
              points="0,120 50,80 100,100 150,40 200,60 250,30 300,90 350,20"
            />
          </svg>
        </div>
      </div>

      {/* Insider Heatmap */}
      <div className="card wide">
        <h3>Insider Risk Heatmap</h3>
        <div className="heatmap-grid">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="heat-cell"
              style={{
                background: `rgba(255, 0, 80, ${Math.random()})`
              }}
            />
          ))}
        </div>
      </div>

      {/* Compliance */}
      <div className="card wide">
        <h3>Trust Compliance Status</h3>
        <div className="bar-chart">
          {[85, 70, 92, 60, 78].map((value, index) => (
            <div key={index} className="bar-wrapper">
              <div
                className="bar"
                style={{ height: `${value}%` }}
              ></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;