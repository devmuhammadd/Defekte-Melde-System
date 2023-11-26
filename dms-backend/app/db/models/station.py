from app.db.base import Base
from sqlalchemy import Column, Integer, String


class Station(Base):
    __tablename__ = 'stations'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
