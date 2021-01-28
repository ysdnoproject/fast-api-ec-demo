from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.config import settings

engine = create_engine(settings.attributes().database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
