from app.db.base import Base
from sqlalchemy import Column, Integer, String


class Vehicle(Base):
    __tablename__ = 'vehicles'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
