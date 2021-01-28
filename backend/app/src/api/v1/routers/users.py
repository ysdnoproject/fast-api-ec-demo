from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src import crud, schemas
from src.api.deps import get_db, get_current_user
from src.exceptions import AppValidationError, AppValidationErrorItem
from src.models.user import User

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=List[schemas.User])
def root(db: Session = Depends(get_db)):
    users = crud.user.get_multi(db)
    return users


@router.post('/', response_model=schemas.User)
def create_user(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    user = crud.user.find_by(db, field='email', value=user_in.email)
    if user is not None:
        raise AppValidationError(
            [AppValidationErrorItem(msg="The user with this email already exists in the system.", field="email")]
        )
    user = crud.user.create(db, obj_in=user_in)
    return user


@router.get("/me", response_model=schemas.User)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.put('/me', response_model=schemas.User)
def update_me(
    user_in: schemas.UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user = crud.user.find_by(db, field='email', value=user_in.email)
    if user is not None and user.id != current_user.id:
        raise AppValidationError(
            [AppValidationErrorItem(msg="The user with this email already exists in the system.", field="email")]
        )
    user = crud.user.update(db, db_obj=current_user, obj_in=user_in)
    return user
