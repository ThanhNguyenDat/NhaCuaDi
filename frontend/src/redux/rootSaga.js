import { all, fork } from "redux-saga/effects";

import authSaga from "./auth/authSaga";
import userRoleSaga from "./user-role/user-role.saga";
import usersSaga from "./users/users.saga";

// lessons
import lessonsSaga from "./lessons/lessons.saga";

export default function* rootSaga() {
    yield all([fork(authSaga), fork(userRoleSaga), fork(usersSaga), fork(lessonsSaga)]);
}
