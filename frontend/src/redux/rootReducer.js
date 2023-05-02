import { combineReducers } from "redux";

import authReducer from "./auth/authReducer";
import userRoleReducer from "./user-role/user-role.reducer";
import usersReducer from "./users/users.reducer";
const rootReducer = combineReducers({
    authReducer,
    userRoleReducer,
    usersReducer,
});

export default rootReducer;
