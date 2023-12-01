from app.utils.user import authenticate_user_token, create_access_token, authenticate_user_credentials
from app.db.models.user import create_new_user, update_password, update_user
from app.db.session import get_db
from fastapi import APIRouter, HTTPException
from fastapi import Depends
from fastapi import status
from app.schemas.user import PasswordUpdate, ShowUser, UserCreate, UserLogin, UserUpdate
from app.schemas.user_token import UserToken
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/register", response_model=UserToken, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    user = create_new_user(user=user, db=db)
    access_token = create_access_token(
        data={"sub": user.username}
    )
    return {"token": {"access_token": access_token, "token_type": "bearer"}, "user": user}


@router.post("/login", response_model=UserToken)
def login_for_access_token(user_data: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user_credentials(
        user_data.username, user_data.password, db)
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
def get_current_user(current_user: ShowUser = Depends(authenticate_user_token)):

    return current_user


@router.put("/profile", response_model=ShowUser, status_code=status.HTTP_200_OK)
def update_user_profile(user_payload: UserUpdate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    user = update_user(current_user, user_payload, db)

    return user


@router.put("/password", status_code=status.HTTP_200_OK)
def update_user_password(password_payload: PasswordUpdate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    is_updated = update_password(current_user.username, password_payload, db)

    if not is_updated:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to updated password!",
        )

    return {"detail": "Password updated successfully!"}
