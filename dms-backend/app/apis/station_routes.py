
from app.schemas.station import ShowStation, StationCreate, StationUpdate
from app.utils.user import authenticate_user_token
from app.schemas.user import ShowUser
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from typing import List
from app.db.models.station import Station
from app.db.models.vehicle import Vehicle
from app.db.models.station import Station
from app.db.models.room import Room

router = APIRouter(prefix="/stations")


@router.get("/", response_model=List[ShowStation], status_code=status.HTTP_200_OK)
def get_all_stations(
    organization_id: int = Query(...,
                                 description="Organization ID to filter stations"),
    current_user: ShowUser = Depends(authenticate_user_token),
    db: Session = Depends(get_db)
):
    stations = db.query(Station).filter(
        Station.organization_id == organization_id).order_by(Station.id).all()

    return [station.to_dict() for station in stations]


@router.post("/", response_model=ShowStation, status_code=status.HTTP_201_CREATED)
def create_station(station_data: StationCreate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    new_station = Station(**station_data.model_dump())
    db.add(new_station)
    db.commit()
    db.refresh(new_station)
    return new_station.to_dict()


@router.put("/{station_id}", response_model=ShowStation, status_code=status.HTTP_200_OK)
def update_station(station_id: int, station_data: StationUpdate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    station = db.query(Station).filter(Station.id == station_id).first()
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    for key, value in station_data.model_dump().items():
        setattr(station, key, value)
    db.commit()
    db.refresh(station)
    return station.to_dict()


@router.delete("/{station_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_station(station_id: int, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    station = db.query(Station).filter(Station.id == station_id).first()
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    db.delete(station)
    db.commit()


@router.get("/{id}/data", status_code=status.HTTP_200_OK)
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