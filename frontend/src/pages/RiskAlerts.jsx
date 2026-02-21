import React from "react";
import "../styles/RiskAlerts.css";

const RiskAlerts = () => {
  const alerts = [
    {
      id: 1,
      severity: "Critical",
      message: "Unauthorized Admin Login Attempt",
      user: "johndoe@gmail.com",
      ip: "103.89.45.12",
      time: "10:32 AM",
      status: "Active"
    },
    {
      id: 2,
      severity: "High",
      message: "Large File Transfer Detected",
      user: "employee@corp.com",
      ip: "192.168.0.12",
      time: "09:15 AM",
      status: "Contained"
    },
    {
      id: 3,
      severity: "Medium",
      message: "Suspicious VPN Access",
      user: "analyst@corp.com",
      ip: "45.33.12.77",
      time: "08:48 AM",
      status: "Active"
    }
  ];

  return (
    <div className="alerts-wrapper">

      {/* Header */}
      <div className="alerts-header">
        <h2>🚨 Risk Alerts Center</h2>
        <div className="filters">
          <select>
            <option>All Severities</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
          </select>

          <select>
            <option>All Status</option>
            <option>Active</option>
            <option>Contained</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="alerts-list">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert-card ${alert.severity.toLowerCase()}`}>
            
            <div className="alert-top">
              <span className="severity">{alert.severity}</span>
              <span className="status">{alert.status}</span>
            </div>

            <h4>{alert.message}</h4>

            <div className="alert-info">
              <span>User: {alert.user}</span>
              <span>IP: {alert.ip}</span>
              <span>Time: {alert.time}</span>
            </div>

            <div className="alert-actions">
              <button className="isolate">Isolate</button>
              <button className="lock">Lock</button>
              <button className="resolve">Resolve</button>
            </div>

          </div>
        ))}
      </div>

      {/* Trend Graph */}
      <div className="alerts-graph glass">
        <h3>Threat Trend</h3>
        <svg viewBox="0 0 400 150">
          <polyline
            fill="none"
            stroke="red"
            strokeWidth="3"
            points="0,120 50,80 100,100 150,40 200,60 250,30 300,90 350,20"
          />
        </svg>
      </div>

    </div>
  );
};

export default RiskAlerts;