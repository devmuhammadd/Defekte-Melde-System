from app.db.base import Base
from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from app.core.hashing import Hasher
from app.schemas.user import UserCreate
from sqlalchemy.orm import Session


class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, unique=True, index=True)
    username = Column(String, nullable=False, unique=True, index=True)
    password = Column(String, nullable=False)
    is_superuser = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    full_name = Column(String, nullable=False)


def create_new_user(user: UserCreate, db: Session):
    user = User(
        email=user.email,
        password=Hasher.get_password_hash(user.password),
        username=user.username,
        is_active=True,
        is_superuser=False,
        full_name=user.full_name,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_user_by_username(username: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    return user
