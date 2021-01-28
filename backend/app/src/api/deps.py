from typing import Generator

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from pydantic import ValidationError
from sqlalchemy.orm import Session

from src import crud, schemas
from src.db.db_context_manager import DbContextManager
from src.models.user import User
from src.util.security import decode_access_token

# TODO
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/v1/login/")


def get_db() -> Generator:
    with DbContextManager() as db:
        yield db


def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> User:
    try:
        payload = decode_access_token(token)
        token_data = schemas.TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )

    return crud.user.find_by(db, field="email", value=token_data.sub)
