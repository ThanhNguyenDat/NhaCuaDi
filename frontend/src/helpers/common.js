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

export const convertSecondsToHoursAndMinutes = (seconds) => {
    const hours = Math.floor(seconds / 3600); // Số giờ là phần nguyên của phép chia
    const minutes = Math.floor((seconds % 3600) / 60); // Số phút là phần nguyên của phép chia lấy phần dư
  
    return {
      hours,
      minutes,
    };
  }
