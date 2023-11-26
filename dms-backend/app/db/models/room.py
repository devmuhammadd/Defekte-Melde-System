from app.db.base import Base
from sqlalchemy import Column, Integer, String


class Room(Base):
    __tablename__ = 'rooms'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
