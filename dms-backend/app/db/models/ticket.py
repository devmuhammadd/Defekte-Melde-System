from app.db.models.station import Station
from app.db.models.room import Room
from app.db.models.vehicle import Vehicle
from app.db.session import get_db
from app.db.base import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, Session
from sqlalchemy import func


class Ticket(Base):
    __tablename__ = 'tickets'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    status = Column(String)
    urgency = Column(String)
    location = Column(String)
    contact = Column(String)
    location_id = Column(Integer, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    reporter_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    user = relationship("User", foreign_keys=[
                        user_id], backref="created_tickets")
    reporter = relationship("User", foreign_keys=[
                            reporter_id], backref="reported_tickets")

    def to_dict(self):
        location = self.get_location()
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'urgency': self.urgency,
            'contact': self.contact,
            'location': location,
            'user': self.user.full_name if self.user else None,
            'reporter': self.reporter.full_name if self.reporter else None
        }

    def get_location(self):
        db = next(get_db())

        if self.location == 'Vehicle':
            vehicle = db.query(Vehicle).filter_by(id=self.location_id).first()
            return f"Vehicle ({vehicle.name})" if vehicle else None
        elif self.location == 'Room':
            room = db.query(Room).filter_by(id=self.location_id).first()
            return f"Room ({room.name})" if room else None
        elif self.location == 'Station':
            station = db.query(Station).filter_by(id=self.location_id).first()
            return f"Station ({station.name})" if station else None
        return None


def get_unique_status_counts(db: Session):
    try:
        status_counts = (
            db.query(Ticket.status, func.count(Ticket.status))
            .group_by(Ticket.status)
            .all()
        )

        results = {}

        for status, count in status_counts:
            results[status] = count

        return results
    finally:
        db.close()
