import { asyncTypes } from "redux/helpers";

export const GET_LIST_USERS_ASYNC = asyncTypes("GET_LIST_USERS_ASYNC");

export const getListUsersAsync = (ctx) => ({ type: GET_LIST_USERS_ASYNC.HANDLER, ctx });
