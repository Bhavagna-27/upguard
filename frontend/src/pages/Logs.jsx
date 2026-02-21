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
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Logs;