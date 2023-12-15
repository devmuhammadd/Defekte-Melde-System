
from app.utils.user import authenticate_user_token
from app.schemas.user import ShowUser
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from typing import List
from app.db.models.organization import Organization
from app.db.models.user import User
from app.schemas.organization import OrganizationCreate, ShowOrganization

router = APIRouter(prefix="/organizations")


@router.get("/{name}", status_code=status.HTTP_200_OK)
def get_organization_by_name(name: str, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    organization = db.query(Organization).filter(
        Organization.name == name).first()
    if not organization:
        return {'name': name}

    current_user_db = db.query(User).filter(
        User.id == current_user['id']).first()
    if current_user_db:
        current_user_db.organization_id = organization.id
        db.commit()
    return organization.to_dict()


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_ticket(organization_data: OrganizationCreate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    new_organization = Organization(**organization_data.model_dump())
    db.add(new_organization)
    db.commit()
    db.refresh(new_organization)
    current_user_db = db.query(User).filter(
        User.id == current_user['id']).first()
    if current_user_db:
        current_user_db.role = 'admin'
        current_user_db.organization_id = new_organization.id
        db.commit()
        db.refresh(current_user_db)

    return {'organization': new_organization.name, 'role': 'admin'}
