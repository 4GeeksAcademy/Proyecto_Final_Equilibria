from flask_sqlalchemy import SQLAlchemy  # Para base de datos
import datetime
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    diary_entries = db.relationship('DiaryEntry', back_populates='user', lazy=True)
    favorite_quotes = db.relationship('FavoriteQuote', back_populates='user', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            # do not serialize the password, its a security breach
        }
    
class DiaryEntry(db.Model):
    __tablename__ = 'diary_entry'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mood_tag = db.Column(db.String(50), nullable=False)
    entry_text = db.Column(db.Text, nullable=True)
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
