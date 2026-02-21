import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const OTP = () => {
  const [enteredOTP, setEnteredOTP] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const storedOTP = localStorage.getItem("otp");
  const storedTime = Number(localStorage.getItem("otpTime"));

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - storedTime) / 1000);
      const remaining = 60 - elapsed;

      if (remaining <= 0) {
        clearInterval(interval);
        generateNewOTP();
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [storedTime]);

  const generateNewOTP = () => {
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("otp", newOTP);
    localStorage.setItem("otpTime", Date.now());
    console.log("New OTP:", newOTP);
    setTimeLeft(60);
    setError("OTP expired. New OTP generated.");
  };

  const verifyOTP = () => {
    const currentTime = Date.now();
    const elapsed = Math.floor((currentTime - storedTime) / 1000);

    if (elapsed > 60) {
      generateNewOTP();
      return;
    }

    if (enteredOTP === storedOTP) {
      alert("OTP Verified Successfully 🚀");
      navigate("/dashboard"); // ✅ CORRECT REDIRECT
    } else {
      setError("Incorrect OTP ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 style={{ textAlign: "center" }}>Enter OTP</h2>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={enteredOTP}
          onChange={(e) => setEnteredOTP(e.target.value)}
          maxLength="6"
        />

        <button onClick={verifyOTP}>
          Verify OTP
        </button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Time Left: {timeLeft}s
        </p>

        {error && (
          <p style={{ color: "#ff4d4d", textAlign: "center" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default OTP;