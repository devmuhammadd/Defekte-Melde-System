from sqlalchemy.orm import Session
from app.core.hashing import Hasher
from app.db.repository.user import get_user_by_username


def authenticate_user(username: str, password: str, db: Session):
    user = get_user_by_username(username=username, db=db)
    if not user:
        return False
    if not Hasher.verify_password(password, user.password):
        return False
    return user
