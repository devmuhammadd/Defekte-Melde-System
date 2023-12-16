from pydantic import BaseModel


class StationBase(BaseModel):
    name: str
    organization_id: int
    chief_id: str


class StationCreate(StationBase):
    pass


class StationUpdate(StationBase):
    pass


class ShowStation(StationBase):
    id: int
    organization: str
    chief: str

    class Config:
        from_attributes = True
