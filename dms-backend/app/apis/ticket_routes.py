from typing import List
from app.db.session import get_db
from sqlalchemy.orm import Session
from app.schemas.user import ShowUser
from app.db.models.station import Station
from app.utils.user import authenticate_user_token
from fastapi import APIRouter, Depends, HTTPException, Request, status
from app.db.models.ticket import Ticket, get_unique_status_counts
from app.schemas.ticket import ShowTicket
from app.utils.cloudinary import configure_cloudinary, upload_file_to_cloudinary

router = APIRouter(prefix="/tickets")
configure_cloudinary("doqhz8feo", "637739426323883",
                     "-BoORRG3zr69zl_fhzDrx43zWyI")


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
async def create_ticket(request: Request, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    data = await request.form()
    ticket_data = dict(data)

    ticket = db.query(Ticket).filter(
        Ticket.title == ticket_data['title'],
        Ticket.status.in_(['Opened', 'In-progress'])
    ).first()
    if ticket:
        raise HTTPException(
            status_code=404, detail="Ticket exist already with same title!")

    if 'media_file' in ticket_data:
        media_file = ticket_data['media_file']
        if media_file.content_type.startswith('image'):
            media_url = upload_file_to_cloudinary(media_file)
        else:
            media_url = upload_file_to_cloudinary(
                media_file, 'video')

        ticket_data['media_url'] = media_url

    ticket_data.pop('media_file')
    ticket_data['is_deleted'] = ticket_data.get(
        'is_deleted', '').lower() == 'true'

    new_ticket = Ticket(**ticket_data)
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket.to_dict()


@router.put("/{ticket_id}", response_model=ShowTicket, status_code=status.HTTP_200_OK)
async def update_ticket(ticket_id: int, request: Request, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    data = await request.form()
    ticket_data = dict(data)

    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    if ticket_data['media_file']:
        media_url = upload_file_to_cloudinary(ticket_data['media_file'])
        ticket_data['media_url'] = media_url

    ticket_data.pop('media_file')
    ticket_data['is_deleted'] = False if ticket_data['is_deleted'] == 'false' else True

    for key, value in ticket_data.items():
        setattr(ticket, key, value)

    db.commit()
    db.refresh(ticket)
    return ticket.to_dict()
