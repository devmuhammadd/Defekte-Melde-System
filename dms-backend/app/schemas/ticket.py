from typing import Optional
from pydantic import BaseModel
from fastapi import UploadFile, File


class TicketBase(BaseModel):
    title: str
    description: str
    status: str
    urgency: str
    location: str
    contact: str
    location_id: int
    user_id: int
    station_id: int
    is_deleted: bool
    mechanic_id: Optional[int] = None
    # media_file: Optional[UploadFile] = None


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
    station: str
    station_id: int
    location: str
    location_area: str
    location_id: int
    user: str
    user_id: int
    is_deleted: bool
    mechanic: Optional[str] = None
    mechanic_id: Optional[int] = None
    media_url: Optional[str] = None

    class Config:
        from_attributes = True
