import os


class Config:

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLite connection
    SQLALCHEMY_DATABASE_URI = "sqlite:///database.db"