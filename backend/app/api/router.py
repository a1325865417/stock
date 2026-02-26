from fastapi import APIRouter
from .endpoints import users, strategies, feeds, ranks

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(strategies.router, prefix="/strategies", tags=["strategies"])
api_router.include_router(feeds.router, prefix="/feeds", tags=["feeds"])
api_router.include_router(ranks.router, prefix="/ranks", tags=["ranks"])
