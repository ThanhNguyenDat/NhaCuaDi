import { asyncTypes } from "redux/helpers";

export const GET_LIST_LESSON_ASYNC = asyncTypes("GET_LIST_LESSON_ASYNC");

export const GET_LESSON_BY_ID_ASYNC = asyncTypes("GET_LESSON_BY_ID_ASYNC");

export const DELETE_USER_FROM_LESSON_ASYNC = asyncTypes("DELETE_USER_FROM_LESSON_ASYNC");

export const getListLessonAsync = (ctx) => ({ type: GET_LIST_LESSON_ASYNC.HANDLER, ctx });

export const getLessonByIdAsync = (ctx) => ({ type: GET_LESSON_BY_ID_ASYNC.HANDLER, ctx });

export const deleteUserFromLessonAsync = (ctx) => ({
    type: DELETE_USER_FROM_LESSON_ASYNC.HANDLER,
    ctx,
});
