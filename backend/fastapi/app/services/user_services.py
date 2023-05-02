from datetime import datetime, timedelta
from typing import Union
import json

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from jose import JWTError, jwt
from passlib.context import CryptContext

from typing_extensions import Annotated
from sqlalchemy.sql import text

from ..models.accountModel import Users, Roles, UserRole
from ..schemas.accountSchema import TokenData

from ..database.postgres import DBSession
from ..common.http_exceptions import *
from ..common.helpers import *

def get_all_users():
    session = DBSession()
    users = session.query(Users).all()
    users = [parseUserFromDB(user) for user in users]
    session.close()
    
    return users