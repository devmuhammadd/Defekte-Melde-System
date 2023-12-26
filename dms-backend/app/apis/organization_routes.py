
from app.utils.user import authenticate_user_token
from app.schemas.user import ShowUser
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from sqlalchemy import and_
from typing import List
from app.db.models.organization import Organization
from app.db.models.user import User
from app.db.models.station import Station
from app.schemas.organization import OrganizationCreate

router = APIRouter(prefix="/organizations")


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_ticket(organization_data: OrganizationCreate, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    organization_data_obj = organization_data.model_dump()
    organization = db.query(Organization).filter(
        and_(
            Organization.name.ilike(organization_data_obj['name']),
            Organization.city_name.ilike(organization_data_obj['city_name']),
            Organization.postal_code.ilike(
                organization_data_obj['postal_code'])
        )
    ).first()

    if (organization):
        current_user_db = db.query(User).filter(
            User.id == current_user['id']).first()
        current_user_db.organization_id = organization.id
        db.commit()

        return {'org_exist': True, 'organization': organization.to_dict()}

    new_organization = Organization(**organization_data_obj)
    db.add(new_organization)
    db.commit()
    db.refresh(new_organization)
    current_user_db = db.query(User).filter(
        User.id == current_user['id']).first()
    if current_user_db:
        current_user_db.role = 'Admin'
        current_user_db.organization_id = new_organization.id
        db.commit()
        db.refresh(current_user_db)

    return {'organization': new_organization.name, 'role': 'Admin'}


@router.get("/{organization_id}/available_roles", status_code=status.HTTP_200_OK)
def get_available_roles(organization_id: int, current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    existing_roles = [result[0] for result in set(db.query(User.role).filter(
        User.organization_id == organization_id).all())]

    predefined_roles = ['Chief', 'Mechanic', 'Reporter']
    additional_roles = ['Public Administrator', 'Chief Mechanic']

    roles = [
        role for role in additional_roles if role not in existing_roles] + predefined_roles

    return roles


@router.get("/{organization_id}/available_stations", status_code=status.HTTP_200_OK)
def get_available_stations(organization_id: int, role: str = Query(...,
                                                                   description="Role to filter stations"), current_user: ShowUser = Depends(authenticate_user_token), db: Session = Depends(get_db)):
    existing_station_ids = {result[0] for result in db.query(
        User.station_id).filter(User.organization_id == organization_id, User.role == role).all()}
    available_stations = db.query(Station).filter(~Station.id.in_(existing_station_ids)
                                                  ).all()
    stations = [{'id': station.id, 'name': station.name}
                for station in available_stations]

    return stations
