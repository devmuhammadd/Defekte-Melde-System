
from app.schemas.vehicle import ShowVehicle, VehicleCreate, VehicleUpdate
from app.utils.user import authenticate_user_token
from app.schemas.user import ShowUser
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from typing import List
from app.db.models.vehicle import Vehicle
from app.db.models.station import Station

router = APIRouter(prefix="/vehicles")


@router.get("/", response_model=List[ShowVehicle], status_code=status.HTTP_200_OK)
def get_all_vehicles(
    organization_id: int = Query(...,
                                 description="Organization ID to filter vehicles"),
    current_user: ShowUser = Depends(authenticate_user_token),
    db: Session = Depends(get_db)
):
    query = (
        db.query(Vehicle)
        .join(Station)
        .filter(
            Station.organization_id == organization_id,
            Vehicle.station_id == Station.id
        )
        .order_by(Vehicle.id)
    )

    vehicles = query.all()

    return [vehicle.to_dict() for vehicle in vehicles]


@router.post("/", response_model=ShowVehicle, status_code=status.HTTP_201_CREATED)
def create_vehicle(vehicle_data: VehicleCreate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    new_vehicle = Vehicle(**vehicle_data.model_dump())
    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)
    return new_vehicle.to_dict()


@router.put("/{vehicle_id}", response_model=ShowVehicle, status_code=status.HTTP_200_OK)
def update_vehicle(vehicle_id: int, vehicle_data: VehicleUpdate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    for key, value in vehicle_data.model_dump().items():
        setattr(vehicle, key, value)
    db.commit()
    db.refresh(vehicle)
    return vehicle.to_dict()


@router.delete("/{vehicle_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vehicle(vehicle_id: int, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    db.delete(vehicle)
    db.commit()
