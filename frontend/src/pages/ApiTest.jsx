import React, { useState, useEffect } from "react";
import API_URL from "../config";

const ApiTest = () => {
  const [status, setStatus] = useState("Testing...");
  const [details, setDetails] = useState("");

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      console.log("Testing connection to:", API_URL);
      setDetails(`Connecting to: ${API_URL}`);

      const response = await fetch(`${API_URL}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatus("✅ Backend Connected!");
        setDetails(JSON.stringify(data, null, 2));
      } else {
        setStatus("❌ Backend returned error: " + response.status);
        setDetails(await response.text());
      }
    } catch (error) {
      setStatus("❌ Failed to connect");
      setDetails(error.message + "\n\nMake sure the backend is running on " + API_URL);
      console.error("Connection test error:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
      <h2>API Connection Test</h2>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>{status}</p>
      <p>{details}</p>
      <button onClick={testConnection} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Retry Connection
      </button>
    </div>
  );
};

export default ApiTest;
