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
      const response = await fetch(`${API_URL}/api/activity-logs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLogs(data.logs || []);
      } else {
        setError("Failed to load activity logs");
      }
    } catch (err) {
      setError("Failed to connect to activity logs");
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) =>
    log.email?.toLowerCase().includes(search.toLowerCase()) ||
    log.event?.toLowerCase().includes(search.toLowerCase())
  );

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low":
        return "#00ffae";
      case "medium":
        return "#ffaa00";
      case "high":
        return "#ff4d4d";
      default:
        return "#00aaff";
    }
  };

  const getStatusColor = (status) => {
    return status === "Success" ? "#00ffae" : "#ff4d4d";
  };

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

      {error && (
        <div style={{ color: "#ff4d4d", padding: "10px", marginBottom: "10px" }}>
          Error: {error}
        </div>
      )}

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
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
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
                  <td
                    style={{ color: getStatusColor(log.status) }}
                  >
                    {log.status}
                  </td>
                  <td
                    style={{ color: getRiskColor(log.risk) }}
                  >
                    {log.risk}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No activity logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;