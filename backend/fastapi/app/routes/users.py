from datetime import timedelta
import json

from fastapi import Depends, APIRouter, Request
from fastapi.responses import JSONResponse

from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

from typing_extensions import Annotated
from ..common.http_exceptions import IncorrectUsernamePasswordException

from ..services.authenticate import *
from ..services.user_services import *

from ..common.http_exceptions import *
from ..common.helpers import get_info_role

from ..schemas.accountSchema import User as UserSchema
from fastapi.encoders import jsonable_encoder

router = APIRouter()

@router.get("/get-list-users")
async def get_list_users(
    current_user: Annotated[UserSchema, Depends(admin_permission)]
):
    all_users = get_all_users()

    content = jsonable_encoder({
        "data": all_users,
        "error_code": 0,
        "message": "Get all users successfully"
    })
    response = JSONResponse(content=content)
    return response
