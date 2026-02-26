import base64
import json
import re
import time
from dataclasses import dataclass
from typing import Any

import httpx
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes


@dataclass
class TaskCache:
    data: dict[str, Any]
    fetched_at: float


class FupanwangClient:
    def __init__(
        self,
        base_url: str = "https://api2.fupanwang.com",
        app_key: str = "fupanwang",
        timeout: float = 12.0,
        cache_ttl: int = 300,
    ) -> None:
        self.base_url = base_url.rstrip("/")
        self.app_key = app_key
        self.timeout = timeout
        self.cache_ttl = cache_ttl
        self._cache: TaskCache | None = None

    def _make_token(self) -> str:
        response = httpx.post(
            f"{self.base_url}/grace/makeToken",
            data={"appKey": self.app_key},
            headers={"content-type": "application/x-www-form-urlencoded"},
            timeout=self.timeout,
        )
        response.raise_for_status()
        payload = response.json()
        if payload.get("code") != 1 or not payload.get("data"):
            raise RuntimeError("token request failed")
        return str(payload["data"])

    @staticmethod
    def _decrypt_payload(encrypted: str, aes_key: str) -> dict[str, Any]:
        if not encrypted or not aes_key or len(aes_key) < 32:
            raise RuntimeError("invalid aes payload")
        key = aes_key[:16].encode("utf-8")
        iv = aes_key[16:32].encode("utf-8")
        cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
        decryptor = cipher.decryptor()
        padded = decryptor.update(base64.b64decode(encrypted)) + decryptor.finalize()
        unpadder = padding.PKCS7(128).unpadder()
        plain = unpadder.update(padded) + unpadder.finalize()
        return json.loads(plain.decode("utf-8"))

    def fetch_task(self) -> dict[str, Any]:
        if self._cache and (time.time() - self._cache.fetched_at) < self.cache_ttl:
            return self._cache.data

        token = self._make_token()
        response = httpx.get(
            f"{self.base_url}/index/task",
            params={"plat": "vip"},
            headers={"token": token},
            timeout=self.timeout,
        )
        response.raise_for_status()
        payload = response.json()
        if payload.get("code") != 1:
            raise RuntimeError("task request failed")

        data = self._decrypt_payload(str(payload.get("data", "")), str(payload.get("aes", "")))
        self._cache = TaskCache(data=data, fetched_at=time.time())
        return data

    @staticmethod
    def _strip_scripts(html: str | None) -> str | None:
        if not html:
            return html
        return re.sub(r"<script[\s\S]*?>[\s\S]*?</script>", "", html, flags=re.I)

    def get_task_summary(self) -> dict[str, Any]:
        task = self.fetch_task()
        stock = task.get("stock") or {}
        base = task.get("base") or {}
        return {
            "kefu_pic": task.get("kefu_pic"),
            "base": {
                **base,
                "about": self._strip_scripts(base.get("about")),
            },
            "plan": task.get("plan"),
            "message": task.get("message"),
            "soft": task.get("soft"),
            "youhui": {
                **(task.get("youhui") or {}),
                "youhui1": self._strip_scripts((task.get("youhui") or {}).get("youhui1")),
                "youhui2": self._strip_scripts((task.get("youhui") or {}).get("youhui2")),
            },
            "notice": {
                **(task.get("notice") or {}),
                "index": {
                    **((task.get("notice") or {}).get("index") or {}),
                    "content": self._strip_scripts(((task.get("notice") or {}).get("index") or {}).get("content")),
                    "banner": self._strip_scripts(((task.get("notice") or {}).get("index") or {}).get("banner")),
                },
            },
            "proxy": task.get("proxy"),
            "online": task.get("online"),
            "app": task.get("app"),
            "stock": {
                "lhbs": (stock.get("lhbs") or [])[:30],
                "dsks": (stock.get("dsks") or [])[:30],
            },
        }
