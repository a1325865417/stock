from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class UserSummary(BaseModel):
    id: int
    nickname: str
    vip_level: str
    balance: float
    signed_in: bool
    vip_days_left: int
    tdx_status: str
    strategy_cards: int


@router.get("/me", response_model=UserSummary)
def get_me():
    return UserSummary(
        id=138518,
        nickname="打电话哈",
        vip_level="VIP 1",
        balance=0.0,
        signed_in=False,
        vip_days_left=13,
        tdx_status="未参与",
        strategy_cards=0,
    )
