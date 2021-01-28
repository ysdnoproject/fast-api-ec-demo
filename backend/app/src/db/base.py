# Import all the models, so that Base has them before being
# imported by Alembic
from src.models.base import Base  # noqa
from src.models.user import User  # noqa
