from typing import List
from app.utils.user import authenticate_user_token, create_access_token, authenticate_user_credentials
from app.db.models.user import User, create_new_user, update_password, update_user
from app.db.models.station import Station
from app.db.session import get_db
from fastapi import APIRouter, HTTPException, Query
from fastapi import Depends
from fastapi import status
from app.schemas.user import PasswordUpdate, ShowUser, UserCreate, UserLogin, UserProfileUpdate, UserRoleUpdate
from app.schemas.user_token import UserToken
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/register", response_model=UserToken, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    is_exist = db.query(User).filter(
        (User.username == user.username) | (User.email == user.email)).first()
    if is_exist:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exist with this username or email!",
        )

    user = create_new_user(user=user, db=db)
    access_token = create_access_token(
        data={"sub": user.username}
    )
    return {"token": {"access_token": access_token, "token_type": "bearer"}, "user": user.to_dict()}


@router.post("/login", response_model=UserToken)
def login_for_access_token(user_data: UserLogin, db: Session = Depends(get_db)):
    is_exist = db.query(User).filter(
        User.username == user_data.username).first()
    if not is_exist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No user exist with this username!",
        )

    user = authenticate_user_credentials(
        user_data.username, user_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password!",
        )
    access_token = create_access_token(
        data={"sub": user.username}
    )

    return {"token": {"access_token": access_token, "token_type": "bearer"}, "user": user.to_dict()}


@router.get("/me", response_model=ShowUser, status_code=status.HTTP_200_OK)
def get_current_user(current_user: ShowUser = Depends(authenticate_user_token)):

    return current_user


@router.put("/profile", response_model=ShowUser, status_code=status.HTTP_200_OK)
def update_user_profile(user_payload: UserProfileUpdate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    user = update_user(current_user, user_payload, db)

    return user


@router.put("/password", status_code=status.HTTP_200_OK)
def update_user_password(password_payload: PasswordUpdate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    is_updated = update_password(
        current_user['username'], password_payload, db)

    if not is_updated:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to updated password!",
        )

    return {"detail": "Password updated successfully!"}


@router.get("/users", response_model=List[ShowUser], status_code=status.HTTP_200_OK)
def get_all_users(
    organization_id: int = Query(...,
                                 description="Organization ID to filter users"),
    current_user: ShowUser = Depends(authenticate_user_token),
    db: Session = Depends(get_db)
):
    users = db.query(User).filter(
        User.organization_id == organization_id).order_by(User.id).all()

    return [user.to_dict() for user in users]


@router.put("/users/{user_id}/role", response_model=ShowUser, status_code=status.HTTP_200_OK)
def update_user_role(user_id: int, user_data: UserRoleUpdate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found!")

    if user_data.station_id:
        station = db.query(Station).filter(
            Station.id == user_data.station_id).first()
        if not station:
            raise HTTPException(status_code=404, detail="Station not found!")

    user.role = user_data.role
    user.station_id = user_data.station_id or None

    db.commit()
    db.refresh(user)

    return user.to_dict()


@router.get("/mechanics", response_model=List[ShowUser], status_code=status.HTTP_200_OK)
def get_all_mechanics(
    station_id: int = Query(...,
                            description="Station ID to filter mechanics"),
    current_user: ShowUser = Depends(authenticate_user_token),
    db: Session = Depends(get_db)
):
    mechanics = db.query(User).filter(
        User.station_id == station_id,
        User.role == 'Mechanic'
    ).order_by(User.id).all()

    return [mechanic.to_dict() for mechanic in mechanics]
