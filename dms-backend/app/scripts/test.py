from app.db.session import get_db
from app.db.models.ticket import Ticket
from sqlalchemy.orm import Session


def populate_data(db: Session):
    db.query(Ticket).filter(Ticket.location == 'Station').update(
        {'location': 'Vehicles', 'location_id': 1},
        synchronize_session=False
    )
    db.commit()


if __name__ == "__main__":
    db = next(get_db())
    populate_data(db)
    db.close()
