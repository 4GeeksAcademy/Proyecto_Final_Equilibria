from flask_sqlalchemy import SQLAlchemy  # Para base de datos
from sqlalchemy.dialects.postgresql import ARRAY

import datetime
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    gender = db.Column(db.String(20), unique=False, nullable=True, default="male")
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    is_admin = db.Column(db.Boolean, default=False)
    force_password_change = db.Column(db.Boolean, default=False)
    preferences = db.Column(ARRAY(db.String), nullable=True)

    diary_entries = db.relationship('Entrada', back_populates='user')
    favorite_quotes = db.relationship('FavoriteQuote', back_populates='user')

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "is_active": self.is_active,
            "is_admin": self.is_admin,
            "preferences": self.preferences or [],
            "gender": self.gender,
            "force_password_change": self.force_password_change,
            # do not serialize the password, its a security breach
        }
    
class Entrada(db.Model):
    __tablename__ = 'entrada'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mood_tag = db.Column(db.String(50), nullable=False)
    entry_text = db.Column(db.String(1000), nullable=True)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship('User', back_populates='diary_entries')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "mood_tag": self.mood_tag,
            "entry_text": self.entry_text,
            "date": self.date.isoformat()
        }

class FavoriteQuote(db.Model):
    __tablename__ = 'favorite_quote'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    quote_text = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(255), nullable=True)

    user = db.relationship('User', back_populates='favorite_quotes')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "quote_text": self.quote_text,
            "author": self.author,
        }
