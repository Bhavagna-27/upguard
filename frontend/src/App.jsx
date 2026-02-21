import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTP from "./pages/OTP";

import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import RiskAlerts from "./pages/RiskAlerts";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<OTP />} />

      {/* Protected Layout Routes */}
      <Route element={<Layout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alerts" element={<RiskAlerts />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

    </Routes>
  );
}

export default App;