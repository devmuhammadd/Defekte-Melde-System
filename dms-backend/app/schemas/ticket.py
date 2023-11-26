from pydantic import BaseModel


class TicketBase(BaseModel):
    title: str
    description: str
    status: str
    urgency: str
    location: str
    contact: str
    location_id: int
    user_id: int
    reporter_id: int


class TicketCreate(TicketBase):
    pass


class TicketUpdate(TicketBase):
    pass


class ShowTicket(BaseModel):
    id: int
    title: str
    description: str
    status: str
    urgency: str
    contact: str
    location: str
    location_area: str
    location_area_id: int
    user: str
    reporter: str
    reporter_id: int

    class Config:
        from_attributes = True
