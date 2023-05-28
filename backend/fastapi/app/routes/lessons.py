from datetime import timedelta
import json

from fastapi import Depends, APIRouter, Request
from fastapi.responses import JSONResponse

from fastapi.security import OAuth2PasswordBearer
from fastapi.encoders import jsonable_encoder

from passlib.context import CryptContext

from typing_extensions import Annotated
from ..common.http_exceptions import IncorrectUsernamePasswordException


from ..common.http_exceptions import *
from ..common.helpers import get_info_role

from ..schemas.accountSchema import User as UserSchema
from ..services.authenticate import *
from ..services.lesson_services import *

router = APIRouter()

@router.get("/get-list-lessons")
async def get_list_lessons():
    lessons = get_all_lessons()
    
    content = {
        "error_code": 0,
        "message": "add success",
        "data": lessons
    }
    response = JSONResponse(content=content)
    return response

@router.post("/get-lesson")
async def get_lesson(request: Request):
    req = await request.json()
    id = req.get("id")
    lesson = get_lesson_information(id)

    content = {
        "error_code": 0,
        "message": "add success",
        "data": lesson
    }
    response = JSONResponse(content=content)
    return response

@router.post("/add-student")
async def add_student_to_lesson_route(request: Request):
    req = await request.json()
    lesson_id = req.get("lesson_id")
    user_id = req.get("user_id")
    print(lesson_id, user_id)
    return 1
    status = add_student_to_lesson(lesson_id, user_id)
    content = {
        "error_code": 0,
        "message": "add success",
        "data": status
    }
    response = JSONResponse(content=content)
    return response




@router.delete("/delete-user")
async def delete_user(request: Request):
    req = await request.json()
    lesson_id = req.get("lesson_id")
    user_id = req.get("user_id")

    status = delete_user_from_lesson(lesson_id, user_id)
    content = {
        "error_code": 0,
        "message": "add success",
        "data": status
    }
    response = JSONResponse(content=content)
    return response


# version 2.0
@router.get("/get-list-brief-lessons")
async def get_list_brief_lessons_route():
    data = get_list_brief_lessons()
    content = {
        "error_code": 0,
        "message": "add success",
        "data": data
    }
    response = JSONResponse(content=content)
    return response
