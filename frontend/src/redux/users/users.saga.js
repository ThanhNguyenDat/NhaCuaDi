import { takeLatest, call, put } from "redux-saga/effects";

// api
import { getListUsers } from "services/api";

import { callbackSuccess, callbackError } from "redux/helpers";
import { GET_LIST_USERS_ASYNC } from "./users.action";

function* handleGetListUsers({ ctx }) {
    try {
        yield put({ type: GET_LIST_USERS_ASYNC.START });
        console.log("123");
        const result = yield call(getListUsers);
        console.log("listUser: ", result);
        yield put({ type: GET_LIST_USERS_ASYNC.SUCCESS, data: result });
        callbackSuccess(ctx, result);
    } catch (err) {
        console.log(err);
        yield put({ type: GET_LIST_USERS_ASYNC.FAIL, error: err });
        callbackError(ctx, err);
    }
}

export default function* usersSaga() {
    yield takeLatest(GET_LIST_USERS_ASYNC.HANDLER, handleGetListUsers);
}
