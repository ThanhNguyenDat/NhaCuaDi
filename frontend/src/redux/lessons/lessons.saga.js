import { takeLatest, call, put } from "redux-saga/effects";

// api
import { getListLessons, getLesson, deleteUserFromLesson } from "services/lessonApi";

import { callbackSuccess, callbackError } from "redux/helpers";

import {
    DELETE_USER_FROM_LESSON_ASYNC,
    GET_LESSON_BY_ID_ASYNC,
    GET_LIST_LESSON_ASYNC,
} from "./lessons.action";

function* handleGetListLessons({ ctx }) {
    try {
        yield put({ type: GET_LIST_LESSON_ASYNC.START });
        const result = yield call(getListLessons);
        yield put({ type: GET_LIST_LESSON_ASYNC.SUCCESS, data: result });
        callbackSuccess(ctx, result);
    } catch (err) {
        console.log("error redux: ", err);
        yield put({ type: GET_LIST_LESSON_ASYNC.FAIL, error: err });
        callbackError(ctx, err);
    }
}

function* handleGetLessonById({ ctx }) {
    try {
        yield put({ type: GET_LESSON_BY_ID_ASYNC.START });
        const id = ctx?.id ?? "";

        const result = yield call(getLesson, { id });
        yield put({ type: GET_LESSON_BY_ID_ASYNC.SUCCESS, data: result });
        callbackSuccess(ctx, result);
    } catch (err) {
        console.log("error redux: ", err);
        yield put({ type: GET_LESSON_BY_ID_ASYNC.FAIL, error: err });
        callbackError(ctx, err);
    }
}

function* handleDeleteUserFromLesson({ ctx }) {
    try {
        yield put({ type: DELETE_USER_FROM_LESSON_ASYNC.START });
        const lesson_id = ctx?.lesson_id ?? "";
        const user_id = ctx?.user_id ?? "";
        console.log(lesson_id, user_id);
        const result = yield call(deleteUserFromLesson, { lesson_id, user_id });
        yield put({ type: DELETE_USER_FROM_LESSON_ASYNC.SUCCESS, data: result });
        callbackSuccess(ctx, result);
    } catch (err) {
        console.log("error redux: ", err);
        yield put({ type: DELETE_USER_FROM_LESSON_ASYNC.FAIL, error: err });
        callbackError(ctx, err);
    }
}

export default function* lessonsSaga() {
    yield takeLatest(GET_LIST_LESSON_ASYNC.HANDLER, handleGetListLessons);
    yield takeLatest(GET_LESSON_BY_ID_ASYNC.HANDLER, handleGetLessonById);
    yield takeLatest(DELETE_USER_FROM_LESSON_ASYNC.HANDLER, handleDeleteUserFromLesson);
}
