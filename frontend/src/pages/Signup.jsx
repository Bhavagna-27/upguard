import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    role: "",
    phone: "",
    terms: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* ================= PASSWORD STRENGTH ================= */

  const getStrength = () => {
    let strength = 0;
    const password = form.password;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return strength;
  };

  const strength = getStrength();

  const getStrengthLabel = () => {
    if (strength <= 2) return "Weak";
    if (strength === 3) return "Moderate";
    if (strength >= 4) return "Strong";
  };

  /* ================= VALIDATION ================= */

  const validatePassword = (password) => {
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return strongPassword.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.endsWith("@gmail.com")) {
      setError("Email must be a @gmail.com address");
      return;
    }

    if (!validatePassword(form.password)) {
      setError(
        "Password must contain uppercase, lowercase, number & special character (min 8 characters)"
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!form.terms) {
      setError("You must accept Zero Trust Policy");
      return;
    }

    setError("");
    alert("Account Created Successfully 🚀");
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="brand-section">
          <div className="logo-glow">🛡️</div>
          <div className="brand-name">UpGuard</div>
          <div className="tagline">
            Zero Trust. Total Control.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="organization"
            placeholder="Organization Name"
            value={form.organization}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Gmail Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="dropdown"
          >
            <option value="">Select Role</option>
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
            <option value="Security Analyst">Security Analyst</option>
          </select>

          {/* PASSWORD FIELD */}
          <input
            type="password"
            name="password"
            placeholder="Create Strong Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* 🔥 STRENGTH METER */}
          {form.password && (
            <div className="strength-container">
              <div className={`strength-bar strength-${strength}`}></div>
              <p className="strength-text">{getStrengthLabel()}</p>
            </div>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <div className="terms">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
            />
            <span>I agree to Zero Trust Policy</span>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Create Account</button>
        </form>

        <div className="signup-section">
          Already have an account?
          <span
            style={{ cursor: "pointer", color: "#00aaff", marginLeft: "6px" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </div>

      </div>
    </div>
  );
};

export default Signup;