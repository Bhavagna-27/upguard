from flask import Flask, request, jsonify
from models import db, User
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)

jwt = JWTManager(app)

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@app.route("/login", methods=["POST"])
def login():
    return jsonify({"message": "Login route working"}), 200