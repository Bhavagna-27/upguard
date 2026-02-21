import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
     if (isFormValid) {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("otp", generatedOTP);
    localStorage.setItem("otpTime", Date.now());

    console.log("Generated OTP:", generatedOTP); // For now visible in console

    navigate("/otp");
   
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
          

          {/* BUTTON */}
          <button type="submit" disabled={!isFormValid}>
            Request OTP
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