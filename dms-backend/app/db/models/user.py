from app.db.base import Base
from app.core.hashing import Hasher
from app.schemas.user import PasswordUpdate, UserCreate, UserUpdate, ShowUser
from sqlalchemy.orm import Session, relationship
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, unique=True, index=True)
    username = Column(String, nullable=False, unique=True, index=True)
    password = Column(String, nullable=False)
    is_superuser = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    full_name = Column(String, nullable=False)
    role = Column(String)
    organization_id = Column(Integer, ForeignKey('organizations.id'))
    station_id = Column(Integer, ForeignKey('stations.id'))

    organization = relationship("Organization", foreign_keys=[
        organization_id], backref="organization")
    station = relationship("Station", foreign_keys=[
        station_id], backref="station")

    def to_dict(self):
        organization_name = self.organization.name if self.organization else ''
        organization_id = self.organization.id if self.organization else ''

        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'full_name': self.email,
            'role': self.role or '',
            'organization': organization_name,
            'organization_id': organization_id,
        }


def create_new_user(user: UserCreate, db: Session):
    user = User(
        email=user.email,
        password=Hasher.get_password_hash(user.password),
        username=user.username,
        is_active=True,
        is_superuser=False,
        full_name=user.full_name,
        role="member"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update_user(user: ShowUser, user_payload: UserUpdate, db: Session):
    for key, value in user_payload.dict(exclude_unset=True).items():
        setattr(user, key, value)

    db.commit()
    db.refresh(user)
    return user


def get_user_by_username(username: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    return user if user else None


def update_password(username: str, password_payload: PasswordUpdate, db: Session):
    user = db.query(User).filter(User.username == username).first()

    if not user or not Hasher.verify_password(password_payload.current_password, user.password):
        return False

    user.password = Hasher.get_password_hash(password_payload.new_password)
    db.commit()
    db.refresh(user)
    return True


def get_station_chief_user(station_id: int, db: Session):
    user = db.query(User).filter(
        User.station_id == station_id and User.role == 'chief').first()
    return user if user else None
