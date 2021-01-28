import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def init(app: FastAPI):
    with open('resources/config/allow_origins.json', 'r') as f:
        allow_origins = json.load(f)
        if allow_origins:
            app.add_middleware(
                CORSMiddleware,
                allow_origins=[str(origin) for origin in allow_origins],
                allow_credentials=True,
                allow_methods=["*"],
                allow_headers=["*"],
            )
