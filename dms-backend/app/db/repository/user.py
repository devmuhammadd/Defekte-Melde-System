from app.core.hashing import Hasher
from app.db.models.user import User
from app.schemas.user import UserCreate
from sqlalchemy.orm import Session


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
