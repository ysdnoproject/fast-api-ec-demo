from sqlalchemy import Column, Integer, DateTime, func
from sqlalchemy.ext.declarative import as_declarative, declared_attr

from src.util import word_util


@as_declarative()
class Base:
    id = Column(Integer, primary_key=True, index=True, nullable=False)

    # Generate __tablename__ automatically
    @declared_attr
    def __tablename__(cls) -> str:
        return word_util.plural(cls.__name__.lower())

    @declared_attr
    def created_at(cls) -> Column:
        return Column(DateTime, default=func.now(), nullable=True)

    @declared_attr
    def updated_at(cls) -> Column:
        return Column(DateTime, onupdate=func.now(), nullable=True)
