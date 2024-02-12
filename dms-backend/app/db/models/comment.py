from app.db.base import Base
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship


class Comment(Base):
    __tablename__ = 'comments'

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String)
    created_at = Column(DateTime)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    ticket_id = Column(Integer, ForeignKey('tickets.id'), nullable=False)

    user = relationship("User", foreign_keys=[user_id])
    ticket = relationship("Ticket", foreign_keys=[ticket_id])

    def to_dict(self):
        formatted_created_at = self.created_at.strftime(
            '%I:%M %p') if self.created_at else None

        return {
            'id': self.id,
            'message': self.message,
            'created_at': formatted_created_at,
            'user': self.user.full_name if self.user else '',
            'user_id': self.user.id if self.user else '',
        }
