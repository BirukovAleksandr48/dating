import { put } from 'redux-saga/effects'
import ACTION from '../../actions/actionTypes'
import { getAllUsers,
    getUserById,
    updateUser,
    uploadUserAvatar,
    createUser } from "../../api/rest/userService";

export function* getUsersSaga({ query }) {

    yield put({ type: ACTION.USER_REQUEST });
    try {
        const { data } = yield getAllUsers(query);
        yield put({ type: ACTION.USERS_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.USER_ERROR, error: e.response.data })
    }
}

export function* getUserByIdSaga({ userId }) {

    yield put({ type: ACTION.USER_REQUEST });
    try {
        const { data } = yield getUserById(userId);
        yield put({ type: ACTION.USER_BY_ID_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.USER_ERROR, error: e.response.data })
    }
}

export function* createUserSaga({ userData }) {

    yield put({ type: ACTION.USER_REQUEST });
    try {
        const { data } = yield createUser(userData);
        yield put({ type: ACTION.USER_CREATE_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.USER_ERROR, error: e.response.data })
    }
}

export function* updateUserSaga({ userId, updatedFields }) {

    yield put({ type: ACTION.USER_REQUEST });
    try {
        const { data } = yield updateUser(userId, updatedFields);
        yield put({ type: ACTION.USER_UPDATE_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.USER_ERROR, error: e.response.data })
    }
}

export function* deleteUserSaga({ userId }) {

    yield put({ type: ACTION.USER_REQUEST });
    try {
        const updatedFields = { isActive: false };
        const { data } = yield updateUser(userId, updatedFields);
        yield put({ type: ACTION.USER_DELETE_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.USER_ERROR, error: e.response.data })
    }
}

export function* uploadUserAvatarSaga({ userId, file }) {

    yield put({ type: ACTION.USER_REQUEST });
    try {
        const { data } = yield uploadUserAvatar(userId, file);
        console.log('111111')
        yield put({ type: ACTION.USER_UPLOAD_AVATAR_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.USER_ERROR, error: e.response.data })
    }
}
