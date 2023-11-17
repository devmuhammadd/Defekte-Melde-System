from fastapi import APIRouter
from fastapi import Depends
from fastapi import status
from sqlalchemy.orm import Session

from typing import Union
from app.core.security import create_access_token
from app.db.repository.user import create_new_user
from app.db.session import get_db

from app.schemas.user import UserCreate, ShowUser
from app.schemas.user_token import UserToken
from app.apis.v1.route_login import get_current_user

router = APIRouter()


@router.post("/users", response_model=UserToken, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    user = create_new_user(user=user, db=db)
    access_token = create_access_token(
        data={"sub": user.email}
    )
    return {"token": {"access_token": access_token, "token_type": "bearer"}, "user": user}


@router.post("/me", response_model=ShowUser)
def current_user(token: UserToken, 
                 db: Session = Depends(get_db),
                 current_user: ShowUser = Depends(get_current_user)):
    return current_user
