import { GET_LIST_USERS_ASYNC } from "./users.action";

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

        default:
            return { ...state };
    }
}
