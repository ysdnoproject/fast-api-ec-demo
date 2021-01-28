from functools import lru_cache

from pydantic import BaseSettings


# @lru_cache() modifies the function it decorates to
# return the same value that was returned the first time,
# instead of computing it again, executing the code of the function every time.
# As a result,the .env file will only read once at first access.
# You need to restart app after modify .env
@lru_cache()
def attributes():
    return Settings()


class Settings(BaseSettings):
    database_url: str
    secret_key: str

    class Config:
        env_file = "resources/config/.env"
