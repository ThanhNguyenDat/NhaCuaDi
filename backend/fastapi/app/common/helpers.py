from datetime import datetime
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