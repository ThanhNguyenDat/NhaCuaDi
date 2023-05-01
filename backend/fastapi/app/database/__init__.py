import os
from dotenv import load_dotenv
load_dotenv()

import psycopg2
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


class Database:
    def __init__(self, database_system='postgres', **params):
        self.database_system=database_system

    def connect(self, connect_string="", config={}):
        if (connect_string):
            from ..models.accountModel import Base
            engine = create_engine(connect_string)
            Base.metadata.bind = engine
            self.session = sessionmaker(bind=engine)
        
        if (config):
            host = config.get('host', '')
            database = config.get('database', '')
            user = config.get('user', '')
            if not host:
                raise "Host not found"
            if not database:
                raise "Database not found"
            if not user:
                raise "User not found in config"
            self.conn.connect(**config)

    def close(self):
        if (self.session):
            self.session.close()
        
        if (self.conn):
            self.conn.close()