import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../styles/Layout.css";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Profile", path: "/profile", icon: "👤" },
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Risk Alerts", path: "/alerts", icon: "🚨" },
    { name: "Logs", path: "/logs", icon: "📁" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <div className="app-layout">

      {/* SIDEBAR */}
      <div className="sidebar">

        <div className="brand">
          <div className="logo">🛡️</div>
          <div className="brand-name">UpGuard</div>
        </div>

        <div className="menu">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`menu-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => navigate(item.path)}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Bottom user section */}
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">JD</div>
            <div>
              <div className="username">John Doe</div>
              <div className="role">Security Admin</div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT CONTENT */}
      <div className="content">
        <Outlet />
      </div>

    </div>
  );
};

export default Layout;