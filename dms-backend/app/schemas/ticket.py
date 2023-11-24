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
    location: str
    user: str
    reporter: str

    class Config:
        from_attributes = True


class TicketStats(BaseModel):
    status: str
    count: int

    class Config:
        from_attributes = True
