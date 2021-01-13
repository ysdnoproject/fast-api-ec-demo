from fastapi import APIRouter

from src.api.v1.routers import login, users

api_router = APIRouter(prefix="/v1")
api_router.include_router(users.router)
api_router.include_router(login.router)
