
def getRoleNameById(all_roles, role_id):
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
        "dob": user.dob,
        "created_time": user.created_time,
        "role_ids": [role.role_id for role in user.roles],
    }