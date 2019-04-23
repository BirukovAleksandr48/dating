import { put } from 'redux-saga/effects'
import ACTION from '../../actions/actionTypes'
import { getPhotos, getPhotoById, deletePhotoById, uploadPhoto } from "../../api/rest/photoService";

export function* getPhotosSaga({ userId }) {

    yield put({ type: ACTION.PHOTO_REQUEST });
    try {
        const { data } = yield getPhotos(userId);
        yield put({ type: ACTION.PHOTOS_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.PHOTO_ERROR, error: e.response.data })
    }
}

export function* getPhotoByIdSaga({ photoId }) {

    yield put({ type: ACTION.PHOTO_REQUEST });
    try {
        const { data } = yield getPhotoById(photoId);
        yield put({ type: ACTION.PHOTO_BY_ID_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.PHOTO_ERROR, error: e.response.data })
    }
}

export function* uploadPhotoSaga({ selectedFile, userId }) {

    yield put({ type: ACTION.PHOTO_REQUEST });
    try {
        const { data } = yield uploadPhoto(selectedFile, userId);
        yield put({ type: ACTION.PHOTO_UPLOAD_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.PHOTO_ERROR, error: e.response.data })
    }
}

export function* deletePhotoSaga({ photoId }) {

    yield put({ type: ACTION.PHOTO_REQUEST });
    try {
        const { data } = yield deletePhotoById(photoId);
        yield put({ type: ACTION.PHOTO_DELETE_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.PHOTO_ERROR, error: e.response.data })
    }
}
