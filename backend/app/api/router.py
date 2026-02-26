from fastapi import APIRouter
from .endpoints import users, strategies, feeds, ranks, config, market

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(strategies.router, prefix="/strategies", tags=["strategies"])
api_router.include_router(feeds.router, prefix="/feeds", tags=["feeds"])
api_router.include_router(ranks.router, prefix="/ranks", tags=["ranks"])
api_router.include_router(config.router, prefix="/config", tags=["config"])
api_router.include_router(market.router, prefix="/market", tags=["market"])
