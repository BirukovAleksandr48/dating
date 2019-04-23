import { put } from 'redux-saga/effects'
import ACTION from '../../actions/actionTypes'
import { getAdvertByUserId, getAdvertById, getAdvert,
    editAdvert, deleteAdvert, addAdvert} from "../../api/rest/advertServise";

export function* getAdvertSaga({ query = '' }) {
    yield put({ type: ACTION.ADVERTS_REQUEST });
    try {
        const { data } = yield getAdvert(query);
        yield put({ type: ACTION.ADVERTS_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.ADVERTS_ERROR, error: e.response.data })
    }
}

export function* getAdvertByUserIdSaga({ userId }) {
    yield put({ type: ACTION.ADVERTS_REQUEST });
    try {
        const { data } = yield getAdvertByUserId(userId);
        yield put({ type: ACTION.ADVERT_BY_USER_ID_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.ADVERTS_ERROR, error: e.response.data })
    }
}

export function* getAdvertByIdSaga({ advertId }) {
    yield put({ type: ACTION.ADVERTS_REQUEST });
    try {
        const { data } = yield getAdvertById(advertId);
        yield put({ type: ACTION.ADVERT_BY_ID_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.ADVERTS_ERROR, error: e.response.data })
    }
}

export function* addAdvertSaga({ advert }) {
    yield put({ type: ACTION.ADVERTS_REQUEST });
    try {
        const { data } = yield addAdvert(advert);
        yield put({ type: ACTION.ADVERTS_ADD_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.ADVERTS_ERROR, error: e.response.data })
    }
}

export function* updateAdvertSaga({ advertId, advert }) {
    yield put({ type: ACTION.ADVERTS_REQUEST });
    try {
        const { data } = yield editAdvert(advertId, advert);
        yield put({ type: ACTION.ADVERT_UPDATE_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.ADVERTS_ERROR, error: e.response.data })
    }
}

export function* deleteAdvertSaga({ advertId }) {
    yield put({ type: ACTION.ADVERTS_REQUEST });
    try {
        const { data } = yield deleteAdvert(advertId);
        yield put({ type: ACTION.ADVERT_DELETE_RESPONSE, advertId })
    } catch (e) {
        yield put({ type: ACTION.ADVERTS_ERROR, error: e.response.data })
    }
}
