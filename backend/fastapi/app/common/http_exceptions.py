from fastapi import HTTPException, status

IncorrectUsernamePasswordException = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect username or password",
    headers={"WWW-Authenticate": "Bearer"},
)

UserExistException = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="User already exist",
    headers={"WWW-Authenticate": "Bearer"},
)

PermissionDeniedException = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Permission denied",
    headers={"WWW-Authenticate": "Bearer"},
)

CredentialsException = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

RoleExistException = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="Role already exist",
    headers={"WWW-Authenticate": "Bearer"},
)

RoleNotExistException = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="Role not found",
    headers={"WWW-Authenticate": "Bearer"},
)

AssignRoleWhenAddAccountException = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail="Created Account but this isn't assigned role because role not exist",
    headers={"WWW-Authenticate": "Bearer"},
)