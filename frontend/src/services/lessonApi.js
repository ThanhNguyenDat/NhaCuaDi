import * as APIUtils from "../utils/APIUtils";

const baseURL = "http://0.0.0.0:6002";

export const getListLessons = () => {
    return APIUtils.get(`${baseURL}/api/lessons/get-list-lessons`);
};

export const getLesson = (data) => {
    return APIUtils.post(`${baseURL}/api/lessons/get-lesson`, data);
};

export const deleteUserFromLesson = (data) => {
    return APIUtils._delete(`${baseURL}/api/lessons/delete-user`, data);
};
