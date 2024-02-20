from pydantic import BaseModel, constr
from pydantic import EmailStr
from pydantic import Field
from typing import Optional


# properties required during user creation
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    username: constr(min_length=3, max_length=50)
    full_name: str = None


class UserProfileUpdate(BaseModel):
    email: EmailStr
    username: constr(min_length=3, max_length=50)
    full_name: str = None


class UserRoleUpdate(BaseModel):
    role: Optional[str]
    station_id: Optional[str]


class ShowUser(BaseModel):
    id: int
    email: EmailStr
    username: constr()
    full_name: str
    role: str
    organization: Optional[str]
    organization_id: Optional[int]
    station: Optional[str]
    station_id: Optional[int]

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    username: constr(min_length=3, max_length=50)
    password: str = Field(min_length=4)


class PasswordUpdate(BaseModel):
    current_password: str = Field(min_length=6)
    new_password: str = Field(min_length=6)


class AdminResetPassword(BaseModel):
    username: str
    password: str = Field(min_length=6)
