import React from "react";
import "../styles/Profile.css";

const Profile = () => {
  return (
    <div className="profile-wrapper">

      {/* LEFT PROFILE CARD */}
      <div className="profile-card glass">

        <div className="profile-header">
          <div className="profile-avatar">JD</div>
          <div>
            <h2>John Doe</h2>
            <p>Security Administrator</p>
          </div>
        </div>

        <div className="profile-details">
          <div><strong>Organization:</strong> UpGuard Corp</div>
          <div><strong>Email:</strong> johndoe@gmail.com</div>
          <div><strong>Phone:</strong> +91 9876543210</div>
          <div><strong>Employee ID:</strong> UG-SEC-1024</div>
          <div><strong>Clearance Level:</strong> Level 4 - Critical Access</div>
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
          <p>20 Feb 2026 — 10:42 AM</p>
          <p>Location: Hyderabad, IN</p>
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