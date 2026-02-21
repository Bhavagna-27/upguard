#!/usr/bin/env python3
"""
UpGuard Flask Backend
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
import json
from pathlib import Path

app = Flask(__name__)
app.config['DEBUG'] = True

# In-memory user storage (for development)
users_db = {}
activity_logs = []
db_file = Path(__file__).parent / "users.json"
logs_file = Path(__file__).parent / "activity_logs.json"

# Load users from file if it exists
if db_file.exists():
    try:
        with open(db_file, 'r') as f:
            users_db = json.load(f)
        print(f"[+] Loaded {len(users_db)} users from database")
    except:
        users_db = {}

# Load activity logs from file if it exists
if logs_file.exists():
    try:
        with open(logs_file, 'r') as f:
            activity_logs = json.load(f)
        print(f"[+] Loaded {len(activity_logs)} activity logs")
    except:
        activity_logs = []

def save_users():
    """Save users to JSON file"""
    with open(db_file, 'w') as f:
        json.dump(users_db, f, indent=2)
    print(f"[+] Saved {len(users_db)} users to database")

def save_activity_logs():
    """Save activity logs to JSON file"""
    with open(logs_file, 'w') as f:
        json.dump(activity_logs, f, indent=2)
    print(f"[+] Saved {len(activity_logs)} activity logs")

def add_activity_log(email, event, status="Success", risk="Low"):
    """Add an activity log entry"""
    log_entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "time": datetime.utcnow().strftime("%d %b %Y %I:%M %p"),
        "email": email,
        "event": event,
        "status": status,
        "risk": risk,
        "ip": "127.0.0.1",
        "device": "Web Browser"
    }
    activity_logs.insert(0, log_entry)
    save_activity_logs()
    print(f"  [+] Activity logged: {email} - {event}")
    return log_entry

# Enable CORS for development frontends (include dynamic dev ports)
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5177",
            "http://127.0.0.1:5173",
            "http://127.0.0.1:5174",
            "http://127.0.0.1:5177"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

@app.route("/", methods=["GET"])
def health():
    """Health check endpoint"""
    print("[+] Health check called")
    return jsonify({"status": "OK", "message": "UpGuard API is running"}), 200

@app.route("/api/test", methods=["POST", "OPTIONS"])
def test():
    """Test endpoint"""
    if request.method == "OPTIONS":
        return "", 204
    print("[+] Test endpoint called")
    return jsonify({"message": "Test successful"}), 200

@app.route("/api/debug", methods=["GET", "OPTIONS"])
def debug():
    """Debug endpoint to see all stored users"""
    if request.method == "OPTIONS":
        return "", 204
    print("[+] Debug endpoint called")
    safe_users = {}
    for email, user in users_db.items():
        safe_user = user.copy()
        safe_user.pop("password", None)
        safe_users[email] = safe_user
    return jsonify({
        "users_count": len(users_db),
        "users": safe_users
    }), 200

@app.before_request
def log_request():
    print(f"Request: {request.method} {request.path}")

@app.route("/api/activity-logs", methods=["GET", "OPTIONS"])
def get_activity_logs():
    """Get activity logs"""
    print("[TRACE] Inside get_activity_logs")
    if request.method == "OPTIONS":
        print("[TRACE] Handling OPTIONS")
        return "", 204
    print("[+] Activity logs endpoint called")
    try:
        limit = request.args.get('limit', 50, type=int)
        logs = activity_logs[:limit]
        print(f"  [+] Returning {len(logs)} activity logs")
        return jsonify({
            "total": len(activity_logs),
            "logs": logs
        }), 200
    except Exception as e:
        print(f"[-] Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/login", methods=["POST", "OPTIONS"])
def login():
    """Login endpoint"""
    if request.method == "OPTIONS":
        return "", 204
    
    print("[+] Login called")
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if email not in users_db:
            print(f"  [-] User not found: {email}")
            add_activity_log(email, "Login Attempt", "Failed", "Medium")
            return jsonify({"error": "Invalid credentials"}), 401

        user = users_db[email]
        if user["password"] != password:
            print(f"  [-] Invalid password for: {email}")
            add_activity_log(email, "Login Attempt", "Failed", "Medium")
            return jsonify({"error": "Invalid credentials"}), 401

        user["last_login"] = datetime.utcnow().isoformat()
        save_users()
        
        print(f"  [+] Login successful for: {email}")
        add_activity_log(email, "User Login", "Success", "Low")
        
        return jsonify({
            "success": True,
            "message": "Login successful",
            "user": {
                "id": email,
                "email": email,
                "full_name": user.get("full_name", ""),
                "organization": user.get("organization", ""),
                "phone": user.get("phone", ""),
                "role": user.get("role", "user"),
                "employee_id": user.get("employee_id", ""),
                "clearance_level": user.get("clearance_level", "Level 2 - Standard Access"),
                "last_login": user.get("last_login")
            },
            "token": f"token-{email}"
        }), 200
    except Exception as e:
        print(f"[-] Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/register", methods=["POST", "OPTIONS"])
def register():
    """Register endpoint"""
    if request.method == "OPTIONS":
        return "", 204
    
    print("[+] Register called")
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        full_name = data.get("full_name")
        organization = data.get("organization")
        phone = data.get("phone")
        role = data.get("role", "user")

        if not email or not password or not full_name:
            print(f"  [-] Missing required fields")
            return jsonify({"error": "Missing required fields"}), 400

        if email in users_db:
            print(f"  [-] User already exists: {email}")
            return jsonify({"error": "User already exists"}), 409

        employee_id = "".join(word[0].upper() for word in full_name.split())
        employee_id += str(1000 + len(users_db) + 1)

        user = {
            "email": email,
            "password": password,
            "full_name": full_name,
            "organization": organization,
            "phone": phone,
            "role": role,
            "employee_id": employee_id,
            "clearance_level": "Level 2 - Standard Access",
            "created_at": datetime.utcnow().isoformat(),
            "last_login": None
        }

        users_db[email] = user
        save_users()
        
        print(f"  [+] User registered: {email}")
        
        return jsonify({
            "success": True,
            "message": "User registered successfully",
            "user": user,
            "token": f"token-{email}"
        }), 201
    except Exception as e:
        print(f"[-] Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/profile", methods=["GET", "OPTIONS"])
def profile():
    """Get user profile"""
    if request.method == "OPTIONS":
        return "", 204
    
    try:
        token = request.headers.get("Authorization", "")
        if not token:
            return jsonify({"error": "Unauthorized"}), 401

        email = token.replace("token-", "")
        
        if email not in users_db:
            return jsonify({"error": "User not found"}), 404

        user = users_db[email]
        return jsonify({
            "id": email,
            "email": email,
            "full_name": user.get("full_name", ""),
            "organization": user.get("organization", ""),
            "phone": user.get("phone", ""),
            "role": user.get("role", "user"),
            "employee_id": user.get("employee_id", ""),
            "clearance_level": user.get("clearance_level", "Level 2 - Standard Access"),
            "last_login": user.get("last_login")
        }), 200
    except Exception as e:
        print(f"[-] Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Server error", "details": str(error)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"\n=== UpGuard Backend Starting...")
    print(f"Port: http://0.0.0.0:{port}")
    print(f"CORS enabled for development")
    print(f"Press CTRL+C to quit\n")
    
    app.run(host="0.0.0.0", port=port, debug=True, use_reloader=False)
