from pydantic import BaseModel


class CommentBase(BaseModel):
    message: str


class CommentCreate(CommentBase):
    pass


class CommentUpdate(CommentBase):
    pass


class ShowComment(CommentBase):
    id: int
    message: str
    created_at: str
    user: str
    user_id: int

    class Config:
        from_attributes = True
