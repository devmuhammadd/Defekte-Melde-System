from app.db.models.room import Room
from app.db.models.station import Station
from app.db.models.vehicle import Vehicle
from app.db.session import get_db
from app.db.base import Base
from sqlalchemy import Column, Integer, String, ForeignKey, func, Boolean
from sqlalchemy.orm import relationship, Session


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
    is_deleted = Column(Boolean, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    station_id = Column(Integer, ForeignKey('stations.id'), nullable=False)
    mechanic_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    user = relationship("User", foreign_keys=[
                        user_id], backref="created_tickets")
    station = relationship("Station", foreign_keys=[station_id])
    mechanic = relationship("User", foreign_keys=[
        mechanic_id], backref="ticket_mechanic")

    def to_dict(self):
        location_area = self.get_location()
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'urgency': self.urgency,
            'contact': self.contact,
            'station': self.station.name if self.station else None,
            'station_id': self.station.id if self.station else None,
            'location': self.location,
            'location_area': location_area.name,
            'location_id': location_area.id,
            'user': self.user.full_name if self.user else None,
            'user_id': self.user.id if self.user else None,
            'is_deleted': self.is_deleted,
            'mechanic': self.mechanic.full_name if self.mechanic else None,
            'mechanic_id': self.mechanic.id if self.mechanic else None,
        }

    def get_location(self):
        db = next(get_db())

        if self.location == 'Vehicle':
            vehicle = db.query(Vehicle).filter_by(id=self.location_id).first()
            return vehicle if vehicle else None
        elif self.location == 'Room':
            room = db.query(Room).filter_by(id=self.location_id).first()
            return room if room else None
        return None


def get_unique_status_counts(current_user, db: Session):
    try:
        query = (
            db.query(Ticket.status, func.count(Ticket.status))
            .join(Station)
            .filter(
                Station.organization_id == current_user['organization_id'],
                Ticket.station_id == Station.id,
                Ticket.is_deleted == False
            )
        )

        if current_user['role'] in 'Chief':
            query = query.filter(Ticket.station_id ==
                                 current_user['station_id'])
        elif current_user['role'] in ['Reporter', 'Mechanic']:
            query = query.filter(Ticket.user_id == current_user['id'])

        status_counts = (
            query
            .group_by(Ticket.status)
            .all()
        )

        results = {}

        for status, count in status_counts:
            results[status] = count

        return results
    finally:
        db.close()
