import { takeLatest, call, put } from "redux-saga/effects";

// api
import { getListUsers, addNewUser } from "services/api";

import { callbackSuccess, callbackError } from "redux/helpers";
import { ADD_NEW_USER_ASYNC, GET_LIST_USERS_ASYNC } from "./users.action";

function* handleGetListUsers({ ctx }) {
    try {
        yield put({ type: GET_LIST_USERS_ASYNC.START });
        const result = yield call(getListUsers);
        yield put({ type: GET_LIST_USERS_ASYNC.SUCCESS, data: result });
        callbackSuccess(ctx, result);
    } catch (err) {
        console.log(err);
        yield put({ type: GET_LIST_USERS_ASYNC.FAIL, error: err });
        callbackError(ctx, err);
    }
}

function* handleAddNewUser({ ctx }) {
    try {
        
        yield put({ type: ADD_NEW_USER_ASYNC.START });
        const result = yield call(addNewUser, {...ctx});
        yield put({ type: ADD_NEW_USER_ASYNC.SUCCESS });
        callbackSuccess(ctx, result);
    } catch (err) {
        console.log(err);
        yield put({ type: ADD_NEW_USER_ASYNC.FAIL, error: err });
        callbackError(ctx, err);
    }
}

export default function* usersSaga() {
    yield takeLatest(GET_LIST_USERS_ASYNC.HANDLER, handleGetListUsers);
    yield takeLatest(ADD_NEW_USER_ASYNC.HANDLER, handleAddNewUser);
}
