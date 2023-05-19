from sqlalchemy import Column, Integer, String, ForeignKey, Table, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(128), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    fullname = Column(String, nullable=True, default='')
    avatar = Column(String, nullable=True, default='')
    dob = Column(TIMESTAMP, nullable=True, default='1945-01-01')
    created_time = Column(TIMESTAMP, default=datetime.datetime.utcnow)
    
    roles = relationship('UserRole', backref='users', lazy='dynamic')
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def __repr__(self) -> str:
        return f"User >>> {self.username} \t {self.roles}"


class Roles(Base):
    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(String(255), nullable=True)

    users = relationship("UserRole", backref="roles", lazy='dynamic')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
    def __repr__(self) -> str:
        return f"Role >>> {self.name}"

class UserRole(Base):
    __tablename__ = 'user_role'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    role_id = Column(Integer, ForeignKey('roles.id'))

    def __repr__(self) -> str:
        return super().__repr__()

class SessionLogin(Base):
    __tablename__ = 'session_login'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    access_token = Column(String)
    login_at = Column(TIMESTAMP)
    logout_at = Column(TIMESTAMP)