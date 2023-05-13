from datetime import timedelta
import json

from fastapi import Depends, APIRouter, Request
from fastapi.responses import JSONResponse

from fastapi.security import OAuth2PasswordBearer
from fastapi.encoders import jsonable_encoder

from passlib.context import CryptContext

from typing_extensions import Annotated
from ..common.http_exceptions import IncorrectUsernamePasswordException

from ..services.authenticate import *

from ..common.http_exceptions import *
from ..common.helpers import get_info_role

from ..schemas.accountSchema import User as UserSchema


router = APIRouter()

router.post("/add")
async def lessons_add(request: Request):

    req = await request.json()
    

    content = {
        "error_code": 0,
        "message": "add success",
        "data": {
            
        }
    }
    response = JSONResponse(content=content)
    return response