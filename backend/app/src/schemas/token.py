from typing import Optional

from pydantic.main import BaseModel

from src.schemas import User


class Token(BaseModel):
    access_token: str
    user: User


class TokenPayload(BaseModel):
    sub: Optional[str] = None
