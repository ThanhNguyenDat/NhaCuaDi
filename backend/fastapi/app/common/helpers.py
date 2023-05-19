from datetime import datetime
from collections import defaultdict

def getRoleIdByName(all_roles, role_name):
    pass


def get_info_role(role):
    return {
        "role_id": role.id,
        "role_name": role.name,
        "role_description": role.description
    }

def parseRoleFromDB(role):
    return {
        "id": role.id,
        "role_name": role.name,
        "role_description": role.description
    }

def parseUserFromDB(user):
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "fullname": user.fullname,
        "avatar": user.avatar,
        "dob": datetime.strftime(user.dob, "%d-%m-%Y") if user.dob else "",
        "created_time": user.created_time,
        "role_ids": [role.role_id for role in user.roles],
    }
def parseLessonSessionFromDB(lesson_session):
    return {
        "id": lesson_session.id,
        "user_id": lesson_session.user_id,
        "lesson_id": lesson_session.lesson_id,
        "answer": lesson_session.answer,
        "score": lesson_session.score,
        "created_time": lesson_session.created_time,
        "end_time": lesson_session.end_time
    }


def parseLessonFromDB(lesson):
    return {
        "id": lesson.id,
        "lesson_name": lesson.lesson_name,
        "audio_url": lesson.audio_url,
        "image_url": lesson.image_url,
        "lesson_type": lesson.lesson_type,
        "question_type": lesson.question_type,
        "content": lesson.content,
        "solution": lesson.solution,
        "transcript": lesson.transcript,
        "explanation": lesson.explanation,
        "done_count": lesson.done_count,
        "collection_id": lesson.collection_id,
        "created_at": lesson.created_at,
        "sessions": [parseLessonSessionFromDB(lesson_session) for lesson_session in lesson.lesson_sessions]
    }

def parseLessonFromDBWithUserInformation(lesson):
    return {

    }

def parseColumnToKey(query, listColumn):
    result = defaultdict()
    for column, id in enumerate(listColumn):
        result[column] = query[id]
    return result    