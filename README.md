# fast-api-ec-demo

```
cd backend/app
PYTHONPATH=. poetry run alembic revision --autogenerate -m "Added users table"
PYTHONPATH=. poetry run alembic upgrade head
PYTHONPATH=. poetry run python src/db/seeds.py
PYTHONPATH=. poetry run uvicorn src.main:app
```
