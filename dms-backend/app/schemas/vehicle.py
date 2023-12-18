from pydantic import BaseModel


class VehicleBase(BaseModel):
    name: str
    station_id: int


class VehicleCreate(VehicleBase):
    pass


class VehicleUpdate(VehicleBase):
    pass


class ShowVehicle(VehicleBase):
    id: int
    station: str

    class Config:
        from_attributes = True
