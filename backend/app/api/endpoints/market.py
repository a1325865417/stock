from fastapi import APIRouter, Query

from ...services.market import fetch_quote, fetch_quotes

router = APIRouter()


@router.get("/quote")
def get_quote(code: str = Query(..., min_length=1)):
    return fetch_quote(code)


@router.get("/quotes")
def get_quotes(codes: str = Query(..., min_length=1)):
    code_list = [item.strip() for item in codes.split(",") if item.strip()]
    return fetch_quotes(code_list)
