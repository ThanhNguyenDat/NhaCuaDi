import { GET_LIST_USERS_ASYNC, ADD_NEW_USER_ASYNC, DELETE_USER_ASYNC, EDIT_USER_ASYNC } from "./users.action";

const initialUsersState = {
    list: [],
    fetching: false,
};

export default function usersReducer(state = initialUsersState, action) {
    switch (action.type) {
        case GET_LIST_USERS_ASYNC.START: {
            return { ...state, fetching: true };
        }

        case GET_LIST_USERS_ASYNC.SUCCESS: {
            return { ...state, list: action.data, fetching: false };
        }

        case GET_LIST_USERS_ASYNC.FAIL: {
            return { ...state, fetch: false };
        }

        case ADD_NEW_USER_ASYNC.START: {
            return { ...state, fetching: true };
        }

        case ADD_NEW_USER_ASYNC.SUCCESS: {
            return { ...state, fetching: false };
        }

        case ADD_NEW_USER_ASYNC.FAIL: {
            return { ...state, fetching: false };
        }

        case DELETE_USER_ASYNC.START: {
            return { ...state, fetching: true };
        }

        case DELETE_USER_ASYNC.SUCCESS: {
            return { ...state, fetching: false };
        }

        case DELETE_USER_ASYNC.FAIL: {
            return { ...state, fetching: false };
        }


        case EDIT_USER_ASYNC.START: {
            return { ...state, fetching: true };
        }

        case EDIT_USER_ASYNC.SUCCESS: {
            return { ...state, fetching: false };
        }

        case EDIT_USER_ASYNC.FAIL: {
            return { ...state, fetching: false };
        }

        default:
            return { ...state };
    }
}
