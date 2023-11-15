from typing import List
from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from app import models, schema
from fastapi import APIRouter
from app.database import get_db

router = APIRouter(
    prefix='/users',
    tags=['Users']
)


@router.get('/', response_model=List[schema.CreateUser])
def test_users(db: Session = Depends(get_db)):

    users = db.query(models.User).all()

    return users
