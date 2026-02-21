import React, { useState } from "react";
import "../styles/Settings.css";

const Settings = () => {
  const [mfa, setMfa] = useState(true);
  const [monitoring, setMonitoring] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [timeout, setTimeoutValue] = useState(15);
  const [riskThreshold, setRiskThreshold] = useState(70);

  return (
    <div className="settings-wrapper">

      <h2>⚙️ System Configuration</h2>

      {/* Security Settings */}
      <div className="settings-grid">

        <div className="settings-card glass">
          <h3>Multi-Factor Authentication</h3>
          <label className="switch">
            <input
              type="checkbox"
              checked={mfa}
              onChange={() => setMfa(!mfa)}
            />
            <span className="slider"></span>
          </label>
          <p>{mfa ? "Enabled ✅" : "Disabled ❌"}</p>
        </div>

        <div className="settings-card glass">
          <h3>Real-Time Threat Monitoring</h3>
          <label className="switch">
            <input
              type="checkbox"
              checked={monitoring}
              onChange={() => setMonitoring(!monitoring)}
            />
            <span className="slider"></span>
          </label>
          <p>{monitoring ? "Active 🟢" : "Inactive 🔴"}</p>
        </div>

        <div className="settings-card glass">
          <h3>Session Timeout (minutes)</h3>
          <input
            type="range"
            min="5"
            max="60"
            value={timeout}
            onChange={(e) => setTimeoutValue(e.target.value)}
          />
          <p>{timeout} minutes</p>
        </div>

        <div className="settings-card glass">
          <h3>Risk Threshold</h3>
          <input
            type="range"
            min="40"
            max="100"
            value={riskThreshold}
            onChange={(e) => setRiskThreshold(e.target.value)}
          />
          <p>{riskThreshold}% Risk Trigger</p>
        </div>

        <div className="settings-card glass">
          <h3>Theme Mode</h3>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
          </label>
          <p>{darkMode ? "Dark Mode 🌙" : "Light Mode ☀️"}</p>
        </div>

        <div className="settings-card glass">
          <h3>Role Management</h3>
          <select className="role-select">
            <option>Security Admin</option>
            <option>Analyst</option>
            <option>Employee</option>
          </select>
          <p>Manage access privileges</p>
        </div>

      </div>

      <button className="save-btn">Save Configuration</button>

    </div>
  );
};

export default Settings;