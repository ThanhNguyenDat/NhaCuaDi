import { combineReducers } from "redux";

import authReducer from "./auth/authReducer";
import userRoleReducer from "./user-role/user-role.reducer";

const rootReducer = combineReducers({
    authReducer,
    userRoleReducer,
});

export default rootReducer;
