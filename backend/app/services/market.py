from __future__ import annotations

from typing import Any

import httpx

MARKET_BASE = "https://apphq.longhuvip.com/w1/api/index.php"


def fetch_quote(code: str, timeout: float = 8.0) -> dict[str, Any]:
    response = httpx.get(
        MARKET_BASE,
        params={
            "a": "GetStockPanKou_Narrow",
            "c": "StockL2Data",
            "StockID": code,
        },
        timeout=timeout,
    )
    response.raise_for_status()
    payload = response.json()
    real = payload.get("real") or {}
    return {
        "code": payload.get("code", code),
        "name": payload.get("name", ""),
        "price": real.get("last_px"),
        "change": real.get("px_change"),
        "change_rate": real.get("px_change_rate"),
        "high": real.get("high_px"),
        "low": real.get("low_px"),
        "open": real.get("open_px"),
        "preclose": payload.get("preclose_px"),
        "turnover_ratio": real.get("turnover_ratio"),
        "amount": real.get("total_amount"),
        "volume": real.get("total_turnover"),
        "time": real.get("time"),
        "status": payload.get("status"),
    }


def fetch_quotes(codes: list[str], timeout: float = 8.0) -> list[dict[str, Any]]:
    results: list[dict[str, Any]] = []
    for code in codes:
        try:
            results.append(fetch_quote(code, timeout=timeout))
        except httpx.HTTPError:
            results.append({"code": code, "error": "fetch_failed"})
    return results
