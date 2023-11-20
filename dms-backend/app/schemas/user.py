from pydantic import BaseModel, constr
from pydantic import EmailStr
from pydantic import Field


# properties required during user creation
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    username: constr(min_length=3, max_length=50)
    full_name: str = None


class UserUpdate(BaseModel):
    email: EmailStr
    username: constr(min_length=3, max_length=50)
    full_name: str = None


class ShowUser(BaseModel):
    id: int
    email: EmailStr
    username: constr()
    is_active: bool
    full_name: str

    class Config:  # tells pydantic to convert even non dict obj to json
        orm_mode = True


class UserLogin(BaseModel):
    username: constr(min_length=3, max_length=50)
    password: str = Field(min_length=4)


class PasswordUpdate(BaseModel):
    current_password: str = Field(min_length=6)
    new_password: str = Field(min_length=6)
