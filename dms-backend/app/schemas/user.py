from pydantic import BaseModel, constr
from pydantic import EmailStr
from pydantic import Field


# properties required during user creation
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=4)
    username: constr(min_length=3, max_length=50)

class ShowUser(BaseModel):
    id: int
    email: EmailStr
    username: constr()
    is_active: bool

    class Config:  # tells pydantic to convert even non dict obj to json
        orm_mode = True
