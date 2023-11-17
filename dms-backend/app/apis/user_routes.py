from app.utils.user import create_access_token, decode_access_token
from app.db.models.user import create_new_user, get_user_by_username
from app.db.session import get_db
from fastapi import APIRouter, HTTPException, Request
from fastapi import Depends
from fastapi import status
from app.schemas.user import ShowUser, UserCreate, UserLogin
from app.schemas.user_token import UserToken
from app.schemas.token import Token
from sqlalchemy.orm import Session
from jose import jwt
from app.core.config import settings
from app.utils.user import authenticate_user

router = APIRouter()


@router.post("/users", response_model=UserToken, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    user = create_new_user(user=user, db=db)
    access_token = create_access_token(
        data={"sub": user.email}
    )
    return {"token": {"access_token": access_token, "token_type": "bearer"}, "user": user}


@router.post("/token", response_model=UserToken)
def login_for_access_token(user_data: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(user_data.username, user_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    access_token = create_access_token(
        data={"sub": user.username}
    )
    return {"token": {"access_token": access_token, "token_type": "bearer"}, "user": user}


@router.get("/me", response_model=ShowUser, status_code=status.HTTP_200_OK)
def get_current_user(request: Request, db: Session = Depends(get_db)):
    access_token = request.headers['Authorization']
    username = decode_access_token(access_token)
    user = get_user_by_username(username=username, db=db)

    return user
