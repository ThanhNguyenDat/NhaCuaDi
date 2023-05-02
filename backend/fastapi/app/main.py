import os
from dotenv import load_dotenv

load_dotenv('.env')

from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from fastapi_sqlalchemy import DBSessionMiddleware, db

import json

import psycopg2

from .routes import account, users

# postgresql://postgres:postgres@db:5432/asr_label
postgres_config = {
    "host": "db",
    "database": "asr_label",
    "user": "postgres",
    "password": "postgres"
}

app = FastAPI()

# cors
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:6002",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    account.router,
    prefix="/api/account",
    tags=["account"],
    responses={404: {"description": "Not found"}},
)

app.include_router(
    users.router,
    prefix="/api/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)


@app.get("/")
async def hello():
    
    data = []
    
    content = {
        "error_code": 0,
        "data": data
    }
    return JSONResponse(content=content)


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, port=5000)

