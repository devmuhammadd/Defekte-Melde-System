from app.db.base import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship


class Station(Base):
    __tablename__ = 'stations'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    organization_id = Column(Integer, ForeignKey(
        'organizations.id'), nullable=False)

    organization = relationship("Organization", foreign_keys=[
        organization_id], backref="organization_stations")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
