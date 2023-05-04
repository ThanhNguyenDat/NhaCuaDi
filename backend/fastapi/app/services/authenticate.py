from datetime import datetime, timedelta
from typing import Union
import json

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from jose import JWTError, jwt
from passlib.context import CryptContext

from typing_extensions import Annotated
from sqlalchemy.sql import text, delete, update

from ..models.accountModel import Users, Roles, UserRole
from ..schemas.accountSchema import TokenData

from ..database.postgres import DBSession
from ..common.http_exceptions import *
from ..common.helpers import *

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# get user by username or check user exist
def get_user(username):
    session = DBSession()
    user = session.query(Users).filter_by(username=username).first()
    
    if not user:
        return False
    
    # get role in session
    roles = [role.role_id for role in user.roles]
    
    session.close()
    
    user.role_ids = roles
    
    return user


def get_all_users():
    session = DBSession()
    users = session.query(Users).all()
    users = [parseUserFromDB(user) for user in users]
    session.close()
    
    return users

def add_new_user(username, password, email, fullname, avatar, dob):
    session = DBSession()

    password_hashed = pwd_context.hash(password)
    if dob:
        dob = datetime.strptime(dob, "%d-%m-%Y").date()
    else:
        dob = "01-01-1945"
    
    user = Users(username=username, password=password_hashed, email=email, fullname=fullname, avatar=avatar, dob=dob)
    session.add(user)
    session.commit()
    session.close()

    user = get_user(username=username)
    
    return user

def delete_user(uid):
    session = DBSession()
    sql1 = session.query(UserRole).filter_by(user_id=uid).delete()
    sql2 = session.query(Users).filter_by(id=uid).delete()
    session.commit()
    session.close()
    return True

def edit_user(id, username, email, fullname, avatar, dob, roles ):
    session = DBSession()
    user = session.query(Users).filter_by(id=id).first()

    user.username = username
    user.email = email
    user.fullname = fullname
    user.avatar = avatar
    user.dob = dob
    session.commit()


    # edit roles
    old_roles = session.query(UserRole).filter(UserRole.user_id==id)
    old_roles.delete()
    
    for role_name in roles:
        role = get_role(role_name)

        if not role:
            raise RoleNotExistException

        add_user_role(user_id=id, role_id=role.id)
    
    # user_role = session.query(UserRole).filter(UserRole.user_id==id, UserRole.role_id.in_(old_role_ids))

    # user_role.update({UserRole.role_id: new_role_ids}, synchronize_session=False)
    
    session.commit()
    
    # add_user_role(new_user.id, role_id)
    session.close()
    return user
    

def get_roles():
    session = DBSession()
    roles = session.query(Roles).all()
    session.close()

    return roles

def check_user_permission(current_user, role_name):
    session = DBSession()
    user = session.query(Users).select_from(UserRole).join(Users).join(Roles).filter(Users.username == current_user.username).filter(Roles.name==role_name).first()
    session.close()
    
    if not user:
        return False
    
    return user

def check_role_exist(role_name):
    session = DBSession()
    role = session.query(Roles).filter_by(name=role_name).first()
    session.close()
    
    # if role not exist
    if not role:
        return False
    
    return role

def add_new_role(name, description):
    session = DBSession()
    new_role = Roles(name=name, description=description)
    session.add(new_role)
    session.commit()
    session.close()
    return new_role

def add_user_role(user_id, role_id):
    session = DBSession()
    new_user_role = UserRole(user_id=user_id, role_id=role_id)
    session.add(new_user_role)
    session.commit()
    session.close()
    
    return new_user_role

def get_role(role_name):
    session = DBSession()
    print('role_name: ', role_name)
    role = session.query(Roles).filter_by(name=role_name).first()
    print('role: ', role)

    if not role:
        return False
    
    session.close()
    return role


def check_role_exist(role_name):
    session= DBSession()
    role_id = getRoleIdByRoleName(role_name)
    role = session.query(Roles).filter_by()

    session.close()

def getRoleIdByRoleName(role_name):
    session = DBSession()
    role = session.query(Roles).filter_by(name=role_name).first()
    role_id = role.id
    session.close()
    return role_id

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(username:str, password:str):    
    user = get_user(username)

    if not user:
        return False
    
    # code to test
    if user.username == 'admin':
        if user.password == password:
            return user
        else:
            raise IncorrectUsernamePasswordException
    
    # optimize here
    if not verify_password(password, user.password):
        raise IncorrectUsernamePasswordException
    
    return user

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) # error
        
        username: str = payload.get("sub")
        if username is None:
            raise CredentialsException
        token_data = TokenData(username=username)
    except JWTError:
        raise CredentialsException

    user = get_user(token_data.username)
    
    if user is None:
        raise CredentialsException
    return user

async def admin_permission(token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM]) # error
        
        username: str = payload.get("sub")
        if username is None:
            raise CredentialsException
        token_data = TokenData(username=username)
    except JWTError:
        raise CredentialsException

    user = get_user(token_data.username)
    
    if user is None:
        raise CredentialsException

    isAdmin = False    
    role_ids = user.role_ids
    
    session = DBSession()
    for role_id in role_ids:
        role = session.query(Roles).filter(Roles.id==role_id).first()
        if (role.name == 'admin'):
            isAdmin = True 
    session.close()
    
    if not isAdmin:
        raise CredentialsException
    
    return user

