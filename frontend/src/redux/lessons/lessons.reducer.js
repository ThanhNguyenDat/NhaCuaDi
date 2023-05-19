import { GET_LESSON_BY_ID_ASYNC, GET_LIST_LESSON_ASYNC } from "./lessons.action";

const initialLessonsState = {
    list: [],
    fetch: false,
};

export default function lessonsReducer(state = initialLessonsState, action) {
    switch (action.type) {
        case GET_LIST_LESSON_ASYNC.SUCCESS: {
            return { ...state, list: action.data, fetching: false };
        }
        case GET_LESSON_BY_ID_ASYNC.SUCCESS: {
            return { ...state, current_lesson: action.data, fetching: false };
        }

        default:
            return { ...state };
    }
}
