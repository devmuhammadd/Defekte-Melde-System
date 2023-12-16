from app.db.models.user import get_station_chief_user
from app.db.base import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import get_db


class Station(Base):
    __tablename__ = 'stations'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    organization_id = Column(Integer, ForeignKey(
        'organizations.id'), nullable=False)

    organization = relationship("Organization", foreign_keys=[
        organization_id], backref="organization_stations")

    def to_dict(self):
        db = next(get_db())
        chief = get_station_chief_user(self.id, db)
        return {
            'id': self.id,
            'name': self.name,
            'organization': self.organization.name,
            'organization_id': self.organization.id,
            'chief': chief.full_name if chief else None,
            'chief_id': chief.id if chief else None,
        }
