
from app.schemas.room import ShowRoom, RoomCreate, RoomUpdate
from app.utils.user import authenticate_user_token
from app.schemas.user import ShowUser
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from typing import List
from app.db.models.room import Room
from app.db.models.station import Station

router = APIRouter(prefix="/rooms")


@router.get("/", response_model=List[ShowRoom], status_code=status.HTTP_200_OK)
def get_all_rooms(current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    query = (
        db.query(Room)
        .join(Station)
        .filter(
            Station.organization_id == current_user['organization_id'],
            Room.station_id == Station.id
        )
    )

    if current_user['station_id'] is not -1:
        query = query.filter(Room.station_id == current_user['station_id'])

    query = query.order_by(Room.id)

    rooms = query.all()

    return [room.to_dict() for room in rooms]


@router.post("/", response_model=ShowRoom, status_code=status.HTTP_201_CREATED)
def create_room(room_data: RoomCreate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    new_room = Room(**room_data.model_dump())
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room.to_dict()


@router.put("/{room_id}", response_model=ShowRoom, status_code=status.HTTP_200_OK)
def update_room(room_id: int, room_data: RoomUpdate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    for key, value in room_data.model_dump().items():
        setattr(room, key, value)
    db.commit()
    db.refresh(room)
    return room.to_dict()


@router.delete("/{room_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_room(room_id: int, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    db.delete(room)
    db.commit()
