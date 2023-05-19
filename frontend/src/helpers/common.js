export const getRoleNameById = (roleId, roles) => {
    const role = roles?.find((item) => item.role_id === roleId);
    return role?.role_name ?? "";
};

export const getRoutePath = (location, params) => {
    const { pathname } = location;

    if (!Object.keys(params).length) {
        return pathname; // we don't need to replace anything
    }

    let path = pathname;
    Object.entries(params).forEach(([paramName, paramValue]) => {
        if (paramValue) {
            path = path.replace(paramValue, `:${paramName}`);
        }
    });
    return path;
};
