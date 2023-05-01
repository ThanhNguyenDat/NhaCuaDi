import { all, fork } from "redux-saga/effects";

import authSaga from "./auth/authSaga";
import userRoleSaga from "./user-role/user-role.saga";

export default function* rootSaga() {
    yield all([fork(authSaga), fork(userRoleSaga)]);
}
