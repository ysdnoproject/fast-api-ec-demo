from fastapi import status, Request, FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from src.api.v1.api import api_router
from src.app_responses_schema import app_responses
from src.exceptions import AppValidationError
from src.init_app import init_app

app = FastAPI(
    title="ec demo",
    description="ec api",
    responses=app_responses
)
init_app(app)
app.include_router(api_router)


@app.exception_handler(AppValidationError)
async def app_validation_exception_handler(request: Request, exc: AppValidationError):
    detail = []
    for e in exc.errors:
        detail.append({"field": e.field, "msg": e.msg})

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": jsonable_encoder(detail)},
    )


@app.exception_handler(RequestValidationError)
async def request_validation_exception_handler(request: Request, exc: RequestValidationError):
    detail = []
    for e in exc.errors():
        detail.append({"field": e.get('loc')[1], "msg": e.get('msg')})

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": jsonable_encoder(detail)},
    )
