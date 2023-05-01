from datetime import timedelta
import json

from fastapi import Depends, APIRouter, Request
from fastapi.responses import JSONResponse

from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

from typing_extensions import Annotated
from ..common.http_exceptions import IncorrectUsernamePasswordException

from ..common.authenticate import *

from ..common.http_exceptions import *
from ..common.helpers import get_info_role

from ..schemas.accountSchema import User as UserSchema

ACCESS_TOKEN_EXPIRE_MINUTES = 30 # API ACCESS TIME

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/signin")
async def signin(request: Request):
    req_json = await request.json()

    username = req_json.get("username", "")
    password = req_json.get("password", "")
    if not username or not password:
        raise IncorrectUsernamePasswordException

    authen_user = authenticate_user(username, password)
    if not authen_user:
        raise IncorrectUsernamePasswordException
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    access_token = create_access_token(
        data={"sub": username},
        expires_delta=access_token_expires
    )

    content = {
        "data": {
            "access_token": access_token
        },
        "error_code": 0,
        "message": "Login successful"
    }

    responses = JSONResponse(content)
    return responses


@router.get("/login-info")
async def get_login_info(
    current_user: Annotated[UserSchema, Depends(get_current_user)]
):
    print("user role: ", current_user.username, current_user.role_ids)
    content = {
        "error_code": 0,
        "data": {
            "role_ids": current_user.role_ids,
            "email": current_user.email,
            "id": current_user.id,
        }
    }
    response = JSONResponse(content=content)
    return response

@router.get("/get-all-roles")
async def get_all_roles(
    current_user: Annotated[UserSchema, Depends(get_current_user)]
):
    roles = get_roles()
    
    role_infos = [get_info_role(role) for role in roles] 

    content = {
        "data": role_infos,
        "error_code": 0,
        "message": "successful."
    }
    response = JSONResponse(content=content)

    return response


@router.post("/add-account")
async def add_account(
    current_user: Annotated[UserSchema, Depends(admin_permission)],
    request: Request
):
    req_json = await request.json()

    username = req_json.get("username", "")
    password = req_json.get("password", "")
    email = req_json.get("email", "")
    role_names = req_json.get("roles", ["guest"]) # role is role_ids
    if isinstance(role_names, str):
        role_names = [role_names]
        
    # check user exist
    user = get_user(username)
    if user:
        raise UserExistException
    
    # add new user
    new_user = add_new_user(username, password, email)
    
    # check role exist
    role_ids = []
    for role_name in role_names:
        role = get_role(role_name)

        if not role:
            raise AssignRoleWhenAddAccountException
        role_id = role.id
        role_ids.append(role_id)

    # add user role
    for role_id in role_ids:
        add_user_role(new_user.id, role_id)

    content = {
        "data": {},
        "error_code": 0,
        "message": "Add user successful"
    }
    
    response = JSONResponse(content=content)
    return response


@router.put("/update-user-role")
async def update_user_role(
    current_user: Annotated[UserSchema, Depends(admin_permission)],
    request: Request
):
    req_json = await request.json()

    
