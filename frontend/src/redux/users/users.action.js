import { asyncTypes } from "redux/helpers";

export const GET_LIST_USERS_ASYNC = asyncTypes("GET_LIST_USERS_ASYNC");

export const ADD_NEW_USER_ASYNC = asyncTypes("ADD_NEW_USER_ASYNC");

export const getListUsersAsync = (ctx) => ({ type: GET_LIST_USERS_ASYNC.HANDLER, ctx });

export const addNewUserAsync = (ctx) => ({ type: ADD_NEW_USER_ASYNC.HANDLER, ctx });
