from app.db.base import Base
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class Room(Base):
    __tablename__ = 'rooms'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    station_id = Column(Integer, ForeignKey('stations.id'), nullable=False)

    station = relationship("Station", foreign_keys=[station_id])

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
