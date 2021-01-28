from sqlalchemy import Column, String

from src.models.base import Base


class User(Base):
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    name = Column(String(255), nullable=False)
