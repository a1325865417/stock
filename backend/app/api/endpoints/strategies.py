from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class StrategyItem(BaseModel):
    date: str
    time: str
    strategy_type: str
    stock: str
    daily_return: float
    next_day_high: float
    position: str
    amount: float
    result: str
    status: str
    note: str | None = None


@router.get("/ai", response_model=list[StrategyItem])
def get_ai_strategies():
    return [
        StrategyItem(
            date="2026-02-26",
            time="09:29",
            strategy_type="竞价",
            stock="示例股票",
            daily_return=13.94,
            next_day_high=0.0,
            position="★★",
            amount=0.0,
            result="待结算",
            status="进行中",
            note=None,
        )
    ]


@router.get("/expert", response_model=list[StrategyItem])
def get_expert_strategies():
    return []
