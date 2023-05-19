from sqlalchemy import Column, Integer, String, ForeignKey, Table, TIMESTAMP, Float
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import datetime
from .accountModel import Users

Base = declarative_base()

class Lessons(Base):
    __tablename__ = 'lessons'

    id = Column(Integer, primary_key=True)
    lesson_name = Column(String)
    audio_url = Column(String)
    image_url = Column(String)
    lesson_type = Column(String)
    question_type = Column(String)
    content = Column(String)
    solution = Column(String)
    transcript = Column(String)
    explanation = Column(String)
    done_count = Column(Integer)
    collection_id = Column(Integer)
    created_at = Column(TIMESTAMP, default=datetime.datetime.utcnow)

    lesson_sessions = relationship("LessonSessions", backref="lessons", lazy='dynamic')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def __repr__(self) -> str:
        return f"Lessons >>> {self.lesson_name} \t {self.collection_id}"

class LessonSessions(Base):
    __tablename__ = 'lesson_sessions'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    lesson_id = Column(Integer, ForeignKey('lessons.id'))
    answer = Column(String, nullable=True)
    score = Column(Float, nullable=True)
    created_time = Column(TIMESTAMP, default=datetime.datetime.utcnow)
    end_time = Column(TIMESTAMP)

    
