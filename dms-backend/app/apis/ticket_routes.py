from typing import List
from app.utils.user import authenticate_user_token
from app.schemas.user import ShowUser
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.db.models.ticket import Ticket, get_unique_status_counts
from app.db.models.user import User
from app.db.models.vehicle import Vehicle
from app.db.models.station import Station
from app.db.models.room import Room
from app.schemas.ticket import TicketCreate, TicketUpdate, ShowTicket
from app.db.session import get_db

router = APIRouter(prefix="/tickets")


@router.get("/", response_model=List[ShowTicket], status_code=status.HTTP_200_OK)
def get_all_tickets(current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    query = (
        db.query(Ticket)
        .join(Station)
        .filter(
            Station.organization_id == current_user['organization_id'],
            Ticket.station_id == Station.id,
            Ticket.is_deleted == False
        )
    )

    if current_user['role'] in ['Chief', 'Reporter', 'Mechanic']:
        query = query.filter(Ticket.station_id == current_user['station_id'])

    tickets = query.order_by(Ticket.id).all()

    return [ticket.to_dict() for ticket in tickets]


@router.get("/stats", status_code=status.HTTP_200_OK)
def get_ticket_stats(current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    stats = get_unique_status_counts(current_user, db)
    return stats


@router.post("/", response_model=ShowTicket, status_code=status.HTTP_201_CREATED)
def create_ticket(ticket_data: TicketCreate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    new_ticket = Ticket(**ticket_data.model_dump())
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket.to_dict()


@router.put("/{ticket_id}", response_model=ShowTicket, status_code=status.HTTP_200_OK)
def update_ticket(ticket_id: int, ticket_data: TicketUpdate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    for key, value in ticket_data.model_dump().items():
        setattr(ticket, key, value)
    db.commit()
    db.refresh(ticket)
    return ticket.to_dict()
