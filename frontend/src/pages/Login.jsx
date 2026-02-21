import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isGmail = email.endsWith("@gmail.com");

  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", color: "#ff4d4d" };
    if (score === 3 || score === 4)
      return { label: "Medium", color: "#ffaa00" };
    return { label: "Strong", color: "#00ff88" };
  };

  const strength = getPasswordStrength();

  const isPasswordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[@$!%*?&]/.test(password);

  const isFormValid = isGmail && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError("");

    try {
      console.log("Connecting to:", `${API_URL}/login`);
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Support both `access_token` and `token` response fields
      const token = data.access_token || data.token || data.accessToken || null;

      // Store token and user data
      const userObj = data.user || data.user_data || {};
      const fullUserData = {
        id: userObj.id || email,
        email: userObj.email || email,
        full_name: userObj.full_name || userObj.fullName || "",
        organization: userObj.organization || "",
        phone: userObj.phone || "",
        role: userObj.role || "user",
        employee_id: userObj.employee_id || userObj.employeeId || "",
        clearance_level: userObj.clearance_level || userObj.clearanceLevel || "Level 2 - Standard Access",
        last_login: userObj.last_login || null,
      };

      console.log("Login data to store:", fullUserData);
      if (token) localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(fullUserData));
      localStorage.setItem("email", email);

      // Generate OTP for 2FA
      const generatedOTP = Math.floor(100000 + Math.random() * 900000);
      localStorage.setItem("otp", generatedOTP);
      localStorage.setItem("otpTime", Date.now());

      console.log("Generated OTP:", generatedOTP);

      setLoading(false);
      navigate("/otp");
    } catch (err) {
      console.error("Connection error:", err);
      setError("Failed to connect to server: " + (err.message || err));
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="brand-section">
          <div className="logo-glow">🛡️</div>
          <h1 className="brand-name">UpGuard</h1>
          <p className="tagline">Zero Trust. Total Control.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email (@gmail.com only)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={email
              ? isGmail
                ? "valid-input"
                : "invalid-input"
              : ""}
          />

          {/* PASSWORD */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={password
                ? isPasswordValid
                  ? "valid-input"
                  : "invalid-input"
                : ""}
            />

            <span
              className="toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* STRENGTH BAR */}
          {password && (
            <div
              style={{
                height: "4px",
                backgroundColor: "#333",
                borderRadius: "2px",
                overflow: "hidden",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  backgroundColor: strength.color,
                  width: `${(strength.label === "Weak" ? 33 : strength.label === "Medium" ? 66 : 100)}%`,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          )}

          {error && <p style={{ color: "#ff4d4d", fontSize: "12px" }}>{error}</p>}

          {/* BUTTON */}
          <button type="submit" disabled={!isFormValid || loading}>
            {loading ? "Logging in..." : "Request OTP"}
          </button>
        </form>

        <div className="signup-section">
          <span>Don't have an account?</span>
          <span
            className="signup-link"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;