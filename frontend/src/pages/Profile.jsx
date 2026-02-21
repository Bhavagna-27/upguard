<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import API_URL from "../config";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // Always try to get from localStorage first (most reliable)
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        console.log("✓ Profile loaded from localStorage:", userData);
        console.log("Name:", userData.full_name);
        console.log("Role:", userData.role);
        setUser(userData);
        setLoading(false);
        return;
      }
      
      // If no localStorage data, try backend
      const token = localStorage.getItem("access_token");
      console.log("Fetching profile from:", `${API_URL}/profile`);
      
      if (!token) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.warn("Backend profile failed, falling back to localStorage");
        // Fall back to localStorage data
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setError(data.error || "Failed to load profile");
        }
      } else {
        console.log("✓ Profile loaded from backend:", data);
        console.log("Name:", data.full_name);
        console.log("Role:", data.role);
        setUser(data);
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      // Fall back to localStorage data
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        console.log("✓ Falling back to localStorage after error");
        setUser(JSON.parse(storedUser));
      } else {
        setError("Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getClearanceColor = (level) => {
    if (!level) return "#ffaa00";
    if (level.includes("Critical")) return "#ff4d4d";
    if (level.includes("High")) return "#ffaa00";
    if (level.includes("Medium")) return "#00aaff";
    return "#00ff88";
  };

  if (loading) {
    return <div className="profile-wrapper">Loading profile...</div>;
  }

  if (error && !user) {
    return <div className="profile-wrapper">Error: {error}</div>;
  }

=======
import React from "react";
import "../styles/Profile.css";

const Profile = () => {
>>>>>>> e078af6b1b0fa6fbdfb4f7fbcad5fe841b84b186
  return (
    <div className="profile-wrapper">

      {/* LEFT PROFILE CARD */}
      <div className="profile-card glass">

        <div className="profile-header">
<<<<<<< HEAD
          <div className="profile-avatar">{getInitials(user?.full_name)}</div>
          <div>
            <h2>{user?.full_name || "User"}</h2>
            <p>{user?.role || "Employee"}</p>
=======
          <div className="profile-avatar">JD</div>
          <div>
            <h2>John Doe</h2>
            <p>Security Administrator</p>
>>>>>>> e078af6b1b0fa6fbdfb4f7fbcad5fe841b84b186
          </div>
        </div>

        <div className="profile-details">
<<<<<<< HEAD
          <div><strong>Organization:</strong> {user?.organization || "N/A"}</div>
          <div><strong>Email:</strong> {user?.email || "N/A"}</div>
          <div><strong>Phone:</strong> {user?.phone || "N/A"}</div>
          <div><strong>Employee ID:</strong> {user?.employee_id || "N/A"}</div>
          <div>
            <strong>Clearance Level:</strong> 
            <span style={{ color: getClearanceColor(user?.clearance_level) }}>
              {user?.clearance_level || "Level 2 - Standard Access"}
            </span>
          </div>
        </div>

        {/* BOTTOM LEFT SECTION - User Info */}
        <div style={{
          marginTop: "20px",
          paddingTop: "15px",
          borderTop: "1px solid rgba(0, 255, 136, 0.2)",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00aaff, #00ff88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#0a0e27"
          }}>
            {getInitials(user?.full_name)}
          </div>
          <div>
            <p style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#00ff88" }}>
              {user?.full_name || "User"}
            </p>
            <p style={{ margin: "5px 0 0 0", fontSize: "13px", color: "#00aaff" }}>
              {user?.role || "Employee"}
            </p>
          </div>
=======
          <div><strong>Organization:</strong> UpGuard Corp</div>
          <div><strong>Email:</strong> johndoe@gmail.com</div>
          <div><strong>Phone:</strong> +91 9876543210</div>
          <div><strong>Employee ID:</strong> UG-SEC-1024</div>
          <div><strong>Clearance Level:</strong> Level 4 - Critical Access</div>
>>>>>>> e078af6b1b0fa6fbdfb4f7fbcad5fe841b84b186
        </div>

      </div>

      {/* RIGHT SECURITY PANEL */}
      <div className="security-panel">

        <div className="security-card glass">
          <h3>Account Risk Level</h3>
          <div className="risk-badge low">LOW</div>
        </div>

        <div className="security-card glass">
          <h3>Multi-Factor Authentication</h3>
          <div className="status active">Enabled ✅</div>
        </div>

        <div className="security-card glass">
          <h3>Last Login</h3>
<<<<<<< HEAD
          <p>{user?.last_login ? new Date(user.last_login).toLocaleString() : "First login"}</p>
          <p>Location: {user?.organization ? "Office" : "Remote"}</p>
=======
          <p>20 Feb 2026 — 10:42 AM</p>
          <p>Location: Hyderabad, IN</p>
>>>>>>> e078af6b1b0fa6fbdfb4f7fbcad5fe841b84b186
        </div>

        <div className="security-card glass">
          <h3>Device Trust Score</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: "85%" }}></div>
          </div>
          <span>85% Secure</span>
        </div>

        <div className="security-card glass">
          <h3>Behavioral Risk Score</h3>
          <div className="progress-bar red">
            <div className="progress red" style={{ width: "25%" }}></div>
          </div>
          <span>25% Risk</span>
        </div>

      </div>

    </div>
  );
};

export default Profile;