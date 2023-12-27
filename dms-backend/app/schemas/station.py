from pydantic import BaseModel


class StationBase(BaseModel):
    name: str
    organization_id: int


class StationCreate(StationBase):
    pass


class StationUpdate(StationBase):
    pass


class ShowStation(StationBase):
    id: int
    organization: str

    class Config:
        from_attributes = True
