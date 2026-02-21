#!/usr/bin/env python3
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Test data
activity_logs = []

@app.route("/api/activity-logs", methods=["GET"])
def get_activity_logs():
    return jsonify({
        "total": len(activity_logs),
        "logs": activity_logs
    }), 200

if __name__ == "__main__":
    print("Starting minimal Flask app on http://0.0.0.0:5000")
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=False)
