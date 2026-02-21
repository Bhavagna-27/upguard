<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import "../styles/Logs.css";
import API_URL from "../config";

const Logs = () => {
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchActivityLogs();
  }, []);

  const fetchActivityLogs = async () => {
    try {
      console.log("Fetching activity logs from:", `${API_URL}/api/activity-logs`);
      
      const response = await fetch(`${API_URL}/api/activity-logs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✓ Activity logs loaded:", data.logs);
        setLogs(data.logs || []);
      } else {
        console.warn("Failed to fetch activity logs");
        setError("Failed to load activity logs");
      }
    } catch (err) {
      console.error("Error fetching logs:", err);
      setError("Failed to connect to activity logs");
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) =>
    log.email.toLowerCase().includes(search.toLowerCase()) ||
    log.event.toLowerCase().includes(search.toLowerCase())
  );

  const getRiskColor = (risk) => {
    switch(risk.toLowerCase()) {
      case 'low': return '#00ffae';
      case 'medium': return '#ffaa00';
      case 'high': return '#ff4d4d';
      default: return '#00aaff';
    }
  };

  const getStatusColor = (status) => {
    return status === "Success" ? '#00ffae' : '#ff4d4d';
  };

=======
import React, { useState } from "react";
import "../styles/Logs.css";

const Logs = () => {
  const [search, setSearch] = useState("");

  const logs = [
    {
      id: 1,
      time: "20 Feb 2026 10:32 AM",
      user: "johndoe@gmail.com",
      event: "Admin Login Attempt",
      ip: "103.89.45.12",
      device: "Windows 11",
      status: "Success",
      risk: "Low"
    },
    {
      id: 2,
      time: "20 Feb 2026 09:10 AM",
      user: "analyst@corp.com",
      event: "File Download",
      ip: "192.168.0.12",
      device: "MacOS",
      status: "Success",
      risk: "Medium"
    },
    {
      id: 3,
      time: "20 Feb 2026 08:48 AM",
      user: "employee@corp.com",
      event: "VPN Login",
      ip: "45.33.12.77",
      device: "Linux",
      status: "Blocked",
      risk: "High"
    }
  ];

  const filteredLogs = logs.filter((log) =>
    log.user.toLowerCase().includes(search.toLowerCase()) ||
    log.event.toLowerCase().includes(search.toLowerCase())
  );

>>>>>>> e078af6b1b0fa6fbdfb4f7fbcad5fe841b84b186
  return (
    <div className="logs-wrapper">

      <div className="logs-header">
        <h2>📁 Activity Logs</h2>
        <button className="export-btn">Export Logs</button>
      </div>

      <div className="logs-filters">
        <input
          type="text"
          placeholder="Search by user or event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

<<<<<<< HEAD
      {error && <div style={{ color: '#ff4d4d', padding: '10px', marginBottom: '10px' }}>Error: {error}</div>}

=======
>>>>>>> e078af6b1b0fa6fbdfb4f7fbcad5fe841b84b186
      <div className="logs-table glass">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>User</th>
              <th>Event</th>
              <th>IP</th>
              <th>Device</th>
              <th>Status</th>
              <th>Risk</th>
            </tr>
          </thead>

          <tbody>
<<<<<<< HEAD
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                  Loading activity logs...
                </td>
              </tr>
            ) : filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <tr key={index}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.email}</td>
                  <td>{log.event}</td>
                  <td>{log.ip || "127.0.0.1"}</td>
                  <td>{log.device || "Web Browser"}</td>
                  <td className={log.status === "Success" ? "success" : "blocked"}
                      style={{ color: getStatusColor(log.status) }}>
                    {log.status}
                  </td>
                  <td className={`risk-${log.risk.toLowerCase()}`}
                      style={{ color: getRiskColor(log.risk) }}>
                    {log.risk}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                  No activity logs found
                </td>
              </tr>
            )}
=======
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.time}</td>
                <td>{log.user}</td>
                <td>{log.event}</td>
                <td>{log.ip}</td>
                <td>{log.device}</td>
                <td className={log.status === "Blocked" ? "blocked" : "success"}>
                  {log.status}
                </td>
                <td className={`risk-${log.risk.toLowerCase()}`}>
                  {log.risk}
                </td>
              </tr>
            ))}
>>>>>>> e078af6b1b0fa6fbdfb4f7fbcad5fe841b84b186
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Logs;