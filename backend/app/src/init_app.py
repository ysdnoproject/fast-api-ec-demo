from fastapi import FastAPI

from src.initializers import exec_initializers


def init_app(app: FastAPI):
    exec_initializers(app)
