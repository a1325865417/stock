from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class RankItem(BaseModel):
    rank: int
    name: str
    change: float
    tags: list[str]


@router.get("/popularity", response_model=list[RankItem])
def get_popularity_rank():
    return [
        RankItem(rank=1, name="航天发展", change=2.04, tags=["亏", "R", "榜"]),
        RankItem(rank=2, name="华胜天成", change=10.00, tags=["R", "榜"]),
    ]
