from app.db.base import Base
from sqlalchemy import Column, Integer, String


class Organization(Base):
    __tablename__ = 'organizations'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    postal_code = Column(String)
    city_name = Column(String)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'postal_code': self.postal_code,
            'city_name': self.city_name
        }
