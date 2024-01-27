from datetime import datetime
from app.schemas.comment import ShowComment, CommentCreate
from app.utils.user import authenticate_user_token
from app.schemas.user import ShowUser
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from typing import List
from app.db.models.comment import Comment

router = APIRouter(prefix="/tickets/{ticket_id}/comments")


@router.get("/", response_model=List[ShowComment], status_code=status.HTTP_200_OK)
def get_all_comments(ticket_id: int, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(
        Comment.ticket_id == ticket_id
    ).order_by(Comment.id.desc()).all()

    return [comment.to_dict() for comment in comments]


@router.post("/", response_model=ShowComment, status_code=status.HTTP_201_CREATED)
def create_comment(ticket_id: int, comment_data: CommentCreate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    new_comment = Comment(
        message=comment_data.message,
        created_at=datetime.utcnow(),
        user_id=current_user['id'],
        ticket_id=ticket_id
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment.to_dict()
