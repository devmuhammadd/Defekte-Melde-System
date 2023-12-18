from pydantic import BaseModel


class OrganizationBase(BaseModel):
    name: str
    city_name: str
    postal_code: str


class OrganizationCreate(OrganizationBase):
    pass


class ShowOrganization(OrganizationBase):
    id: int

    class Config:
        from_attributes = True
