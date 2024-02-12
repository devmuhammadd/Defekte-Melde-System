from app.apis import user_routes, ticket_routes, station_routes, organization_routes, vehicle_routes, room_routes, comment_routes
from fastapi import APIRouter

api_router = APIRouter()
api_router.include_router(user_routes.router, tags=["user"])
api_router.include_router(ticket_routes.router, tags=["ticket"])
api_router.include_router(station_routes.router, tags=["station"])
api_router.include_router(organization_routes.router, tags=["organization"])
api_router.include_router(vehicle_routes.router, tags=["vehicle"])
api_router.include_router(room_routes.router, tags=["room"])
api_router.include_router(comment_routes.router, tags=["comment"])
