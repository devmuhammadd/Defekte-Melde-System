from fastapi import APIRouter
from app.database import Base, engine
from .user_routes import router as user_router

router = APIRouter()
Base.metadata.create_all(bind=engine)

router.include_router(user_router)
