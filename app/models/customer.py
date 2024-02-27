from datetime import datetime
from sqlalchemy.orm import validates
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from .db import db, environment, SCHEMA


class Customer(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), nullable=False, unique=True)
    hashed_password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    profile_image_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    @validates('first_name')
    def validate_first_name(self, _, val):
        if not len(val):
            raise ValueError({ "first_name": "First name is required" })
        return val


    @validates('last_name')
    def validate_last_name(self, _, val):
        if not len(val):
            raise ValueError({"last_name": "Last name is required"})
        return val


    @validates('username')
    def validate_username(self, _, val):
        if len(val) < 4:
            raise ValueError({"username": "Username must be at least 4 characters long"})
        if len([user for user in Customer.query.all() if user.username == val]):
            raise ValueError({ "username": "User with that username already exists" })
        return val


    @validates("email")
    def validate_email(self, _, val):
        if "@" not in val:
            raise ValueError({"email": "Invalid email"})
        if len([user for user in Customer.query.all() if user.email == val]):
            raise ValueError({ "email": "User with that email already exists" })
        return val


    @classmethod
    def username_to_ids(cls):
        return { user.username: user.id for user in cls.query.all() }


    @property
    def password(self):
        return self.hashed_password


    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username,
            "email": self.email,
            "profile_image_url": self.profile_image_url,
        }