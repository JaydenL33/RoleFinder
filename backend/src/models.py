from . import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    pw = db.Column(db.String(50), default="password", nullable=False)
    name = db.Column(db.String(50), nullable=False)
    clifton = db.Column(db.String(500), nullable=False)
    interests = db.Column(db.String(1000), default="", nullable=False)
    favourites = db.Column(db.String(100), default="", nullable=False)
    careerlevel = db.Column(db.Integer(), default=12, nullable=False)

    def __repr__(self):
        return f"<User {self.name}, {self.clifton}, {self.interests}, {self.favourites}>" 


