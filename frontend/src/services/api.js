// const { default: APIUtils } = require('../utils/APIUtils');
import * as APIUtils from "../utils/APIUtils";

const baseURL = "http://0.0.0.0:6001";

export const signInRequest = (data) => {
    return APIUtils.post(`${baseURL}/api/account/signin`, data);
};

export const getLoginInfo = () => {
    return APIUtils.get(`${baseURL}/api/account/login-info`);
};

export const logoutRequest = () => {
    return APIUtils.get(`${baseURL}/api/account/logout`);
};

export const getListUserRole = () => {
    return APIUtils.get(`${baseURL}/api/account/get-all-roles`);
};

export const changePassword = (data) => {
    return APIUtils.post(`${baseURL}/api/account/change-password`, data);
};

export const getListUsers = () => {
    return APIUtils.get(`${baseURL}/api/users/get-list-users`);
};

export const addNewUser = (data) => {
    return APIUtils.post(`${baseURL}/api/account/add-account`, data);
};
