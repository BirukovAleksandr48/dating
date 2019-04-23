import { put } from 'redux-saga/effects'
import ACTION from '../../actions/actionTypes'
import { getComments, addComment, deleteComment, editComment} from "../../api/rest/commentService";

export function* getCommentsSaga({ photoId }) {

    yield put({ type: ACTION.COMMENT_REQUEST });
    try {
        const { data } = yield getComments(photoId);
        yield put({ type: ACTION.COMMENTS_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.COMMENT_ERROR, error: e.response.data })
    }
}

export function* addCommentSaga({ photoId, commentText }) {

    yield put({ type: ACTION.COMMENT_REQUEST });
    try {
        const { data } = yield addComment(photoId, commentText);
        yield put({ type: ACTION.COMMENT_ADD_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.COMMENT_ERROR, error: e.response.data })
    }
}

export function* editCommentSaga({ commentId, commentText }) {

    yield put({ type: ACTION.COMMENT_REQUEST });
    try {
        const { data } = yield editComment(commentId, commentText);
        yield put({ type: ACTION.COMMENT_EDIT_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.COMMENT_ERROR, error: e.response.data })
    }
}

export function* deleteCommentSaga({ commentId }) {

    yield put({ type: ACTION.COMMENT_REQUEST });
    try {
        const { data } = yield deleteComment(commentId);
        yield put({ type: ACTION.COMMENT_DELETE_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.COMMENT_ERROR, error: e.response.data })
    }
}
