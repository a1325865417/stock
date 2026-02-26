from fastapi import APIRouter, HTTPException

from ...services.fupanwang import FupanwangClient

router = APIRouter()
client = FupanwangClient()


@router.get("/task")
def get_task():
    try:
        return client.get_task_summary()
    except Exception as exc:  # noqa: BLE001 - surface upstream failures
        raise HTTPException(status_code=502, detail="task fetch failed") from exc
