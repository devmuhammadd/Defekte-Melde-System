
from app.utils.user import authenticate_user_token
from app.schemas.user import ShowUser
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from typing import List
from app.db.models.station import Station
from app.db.models.vehicle import Vehicle
from app.db.models.station import Station
from app.db.models.room import Room

router = APIRouter(prefix="/stations")


@router.get("/{id}", status_code=status.HTTP_200_OK)
def get_station_data(id: int, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    station = db.query(Station).filter(Station.id == id).first()
    if not station:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Station with ID {id} not found")

    vehicles = [vehicle.to_dict() for vehicle in db.query(
        Vehicle).filter(Vehicle.station_id == station.id).all()]
    rooms = [room.to_dict() for room in db.query(
        Room).filter(Room.station_id == station.id).all()]

    return {'vehicles': vehicles, 'rooms': rooms}
