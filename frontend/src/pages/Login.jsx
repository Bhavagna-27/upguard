import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import API_URL from "../config";
=======
>>>>>>> e078af6b1b0fa6fbdfb4f7fbcad5fe841b84b186

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
=======
>>>>>>> e078af6b1b0fa6fbdfb4f7fbcad5fe841b84b186

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

<<<<<<< HEAD
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

      // Store token and user data
      const fullUserData = {
        id: data.user.id,
        email: data.user.email,
        full_name: data.user.full_name,
        organization: data.user.organization,
        phone: data.user.phone,
        role: data.user.role,
        employee_id: data.user.employee_id,
        clearance_level: data.user.clearance_level,
        last_login: data.user.last_login
      };
      
      console.log("Login data to store:", fullUserData);
      localStorage.setItem("access_token", data.access_token);
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
      setError("Failed to connect to server: " + err.message);
      setLoading(false);
=======
  const handleSubmit = (e) => {
    e.preventDefault();
     if (isFormValid) {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("otp", generatedOTP);
    localStorage.setItem("otpTime", Date.now());

    console.log("Generated OTP:", generatedOTP); // For now visible in console

    navigate("/otp");
   
>>>>>>> e078af6b1b0fa6fbdfb4f7fbcad5fe841b84b186
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
<<<<<<< HEAD
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
=======
          

          {/* BUTTON */}
          <button type="submit" disabled={!isFormValid}>
            Request OTP
>>>>>>> e078af6b1b0fa6fbdfb4f7fbcad5fe841b84b186
          </button>
        </form>

        <div className="signup-section">
          <span>Don't have an account?</span>
          <span
<<<<<<< HEAD
            className="signup-link"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
=======
  className="signup-link"
  onClick={() => navigate("/signup")}
>
  Sign Up
</span>
>>>>>>> e078af6b1b0fa6fbdfb4f7fbcad5fe841b84b186
        </div>
      </div>
    </div>
  );
};

export default Login;