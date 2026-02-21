from flask_sqlalchemy import SQLAlchemy
import bcrypt

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    full_name = db.Column(db.String(120), nullable=True)
    organization = db.Column(db.String(200), nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    role = db.Column(db.String(50), default="user")
    employee_id = db.Column(db.String(50), nullable=True)
    clearance_level = db.Column(db.String(100), nullable=True)
    last_login = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.now())

    def set_password(self, plain_password):
        self.password = bcrypt.hashpw(
            plain_password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

    def check_password(self, plain_password):
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            self.password.encode("utf-8")
        )

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
            "organization": self.organization,
            "phone": self.phone,
            "role": self.role,
            "employee_id": self.employee_id,
            "clearance_level": self.clearance_level,
            "last_login": self.last_login.isoformat() if self.last_login else None
        }