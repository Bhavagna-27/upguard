#!/usr/bin/env python3
from app_simple import app, activity_logs
from datetime import datetime

# Add a test log entry
activity_logs.append({
    "timestamp": datetime.utcnow().isoformat(),
    "email": "test@example.com",
    "event": "Test Event",
    "status": "Success",
    "risk": "Low",
    "ip": "127.0.0.1",
    "device": "Web Browser"
})

# Test the endpoint directly
with app.test_client() as client:
    response = client.get('/api/activity-logs')
    print(f"Status: {response.status_code}")
    print(f"Data: {response.get_json()}")
