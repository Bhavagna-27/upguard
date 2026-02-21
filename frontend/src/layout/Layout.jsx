import React, { useEffect, useState } from "react";
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

  const logout = () => {
    // Clear stored auth data and redirect to login
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("email");
    } catch (e) {
      console.warn("Error clearing localStorage during logout", e);
    }
    // update local state to remove displayed user info
    setUser(null);
    navigate("/login");
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed);
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    }
  }, []);

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
          {user ? (
            <div className="user-info">
              <div className="avatar">
                {(() => {
                  const name = user.full_name || user.fullName || user.email || "";
                  const parts = name.split(" ").filter(Boolean);
                  if (parts.length === 0) return "";
                  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
                  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
                })()}
              </div>
              <div>
                <div className="username">{user.full_name || user.fullName || user.email}</div>
                <div className="role">{user.role || ""}</div>
              </div>
            </div>
          ) : (
            <div className="user-info">
              <div className="avatar"> </div>
              <div>
                <div className="username"></div>
                <div className="role"></div>
              </div>
            </div>
          )}
          <button className="logout-btn" onClick={logout}>Log out</button>
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