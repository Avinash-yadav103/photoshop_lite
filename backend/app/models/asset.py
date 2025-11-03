from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from backend.app import db

class Asset(db.Model):
    __tablename__ = 'assets'

    id = Column(Integer, primary_key=True)
    filename = Column(String(255), nullable=False)
    filetype = Column(String(50), nullable=False)
    filesize = Column(Integer, nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, nullable=False)  # Assuming a foreign key to a User model

    def __init__(self, filename, filetype, filesize, user_id):
        self.filename = filename
        self.filetype = filetype
        self.filesize = filesize
        self.user_id = user_id

    def __repr__(self):
        return f"<Asset {self.filename}>"