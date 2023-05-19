
from typing import Union
import json

from sqlalchemy.sql import text, delete, update

from ..models.lessonModel import Lessons, LessonSessions
from ..models.accountModel import Users

from ..database.postgres import DBSession
from ..common.http_exceptions import *
from ..common.helpers import *

def get_all_lessons():
    session = DBSession()
    lessons = session.query(Lessons).all()
    lessons = [parseLessonFromDB(lesson) for lesson in lessons]
    session.close()

    return lessons

def get_lesson_information(id):
    session = DBSession()
    
    lessonColumns = ["id", "lesson_name", "audio_url", "image_url", "lesson_type", "question_type", "content", "solution", "transcript", "explanation", "done_count", "collection_id", "created_at"]
    colString = ""
    for col in lessonColumns:
        colString += "l." + col + ", "
    colString = colString[:-2]

    query = text(f'''
        SELECT {colString}, ls.answer, ls.score, ls.created_time, ls.end_time, u.id, u.fullname, u.email, u.avatar
        FROM "lessons" l
        INNER JOIN "lesson_sessions" ls ON l.id = ls.lesson_id
        INNER JOIN "users" u ON ls.user_id = u.id
        where l.id = {id}
        ;
    ''')
    lessons = session.execute(query).all()
    
    _result = {}
    _lesson = lessons[0]
    _result['lesson_id'] = _lesson[0]
    _result['lesson_name'] = _lesson[1]
    _result["audio_url"] = _lesson[2]
    _result["image_url"] = _lesson[3]
    _result["lesson_type"] = _lesson[4]
    _result["question_type"] = _lesson[5]
    _result["content"] = json.loads(_lesson[6])
    _result["solution"] = json.loads(_lesson[7])
    _result["transcript"] = json.loads(_lesson[8])
    _result["explanation"] = _lesson[9]
    _result["done_count"] = _lesson[10]
    _result["collection_id"] = _lesson[11]
    _result["created_at"] = _lesson[12]
    
    session_results = []
    for lesson in lessons:
        
        result = {
            "answer": lesson[13],
            "score": lesson[14],
            "created_time": lesson[15],
            "end_time": lesson[16],

            "user_id": lesson[17],
            "fullname": lesson[18],
            "email": lesson[19],
            "avatar": lesson[20]
        }

        session_results.append(result)
    _result['session'] = session_results
    
    session.close()

    return _result

def add_user_to_lesson(lesson_id, user_id):
    session = DBSession()
    ls = LessonSessions(user_id=user_id, lesson_id=lesson_id)
    
    session.add(ls)
    session.commit()
    return ls

def delete_user_from_lesson(lesson_id, user_id):
    session = DBSession()
    ls = session.query(LessonSessions).filter_by(lesson_id=lesson_id).filter_by(user_id=user_id).delete()
    session.commit()
    session.close()
    
    return True