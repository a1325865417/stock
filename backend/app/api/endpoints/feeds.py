from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class FeedItem(BaseModel):
    title: str
    source: str
    time: str
    tag: str | None = None


@router.get("/market", response_model=list[FeedItem])
def get_market_feeds():
    return [
        FeedItem(
            title="芯片概念异动拉升，欧莱新材、圣晖集成逼近涨停再创历史新高",
            source="AI生成",
            time="13:26",
            tag="热点",
        )
    ]
