from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from fastapi import status, HTTPException

from app.db.session import get_db
from app.core.hashing import Hasher
from app.schemas.token import Token
from app.db.repository.login import get_user
from app.core.security import create_access_token

router = APIRouter()

def authenticate_user(username: str, password: str,db: Session):
    user = get_user(username=username,db=db)
    if not user:
        return False
    if not Hasher.verify_password(password, user.password):
        return False
    return user


@router.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    access_token = create_access_token(
        data={"sub": user.email}
    )
    return {"access_token": access_token, "token_type": "bearer"}
