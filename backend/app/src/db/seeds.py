import yaml

from src import crud
from src.db.db_context_manager import DbContextManager
from src.schemas.user import UserCreate

with open('resources/db/seeds/user.yaml') as f:
    datalist = yaml.load(f, yaml.SafeLoader)
    with DbContextManager() as db:
        for key in datalist:
            data = datalist[key]
            user = UserCreate(**data)
            crud.user.create(db, obj_in=user)
