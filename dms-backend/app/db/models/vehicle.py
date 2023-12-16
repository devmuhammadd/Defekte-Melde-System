from app.db.base import Base
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class Vehicle(Base):
    __tablename__ = 'vehicles'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    station_id = Column(Integer, ForeignKey('stations.id'), nullable=False)

    station = relationship("Station", foreign_keys=[station_id])

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'station': self.station.name if self.station else '',
            'station_id': self.station.id if self.station else '',
        }
