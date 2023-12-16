from pydantic import BaseModel


class RoomBase(BaseModel):
    name: str
    station_id: int


class RoomCreate(RoomBase):
    pass


class RoomUpdate(RoomBase):
    pass


class ShowRoom(RoomBase):
    id: int
    station: str

    class Config:
        from_attributes = True
