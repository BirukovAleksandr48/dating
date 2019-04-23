import { put } from 'redux-saga/effects'
import ACTION from '../../actions/actionTypes'
import { login, logout, signUp, getCurrentUser } from "../../api/rest/authService";
import axios from "axios";
import { socketController } from "../../api/ws/wsService";

export function* loginSaga({ loginData, history }) {
    yield put({ type: ACTION.AUTH_REQUEST });
    try {
        const { data } = yield login(loginData);
        yield put({ type: ACTION.LOGIN_RESPONSE, data })

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${ data.accessToken }`;

        history.push('/users');
    } catch (e) {
        yield put({ type: ACTION.AUTH_ERROR, error: e.response.data })
    }
}

export function* signUpSaga({ signUpData, history }) {
    yield put({ type: ACTION.AUTH_REQUEST });
    try {
        const { data } = yield signUp(signUpData);
        yield put({ type: ACTION.SIGNUP_RESPONSE, data })

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${ data.accessToken }`;

        history.push('/users');
    } catch (e) {
        yield put({ type: ACTION.AUTH_ERROR, error: e.response.data })
    }
}

export function* logoutSaga({ history }) {
    yield put({ type: ACTION.AUTH_REQUEST });
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = yield logout(refreshToken);
        yield put({ type: ACTION.LOGOUT_RESPONSE, data })

        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        history.push('/');
    } catch (e) {
        yield put({ type: ACTION.AUTH_ERROR, error: e.response.data })
    }
}

export function* getCurrentUserSaga() {
    yield put({ type: ACTION.AUTH_REQUEST });
    try {
        const { data } = yield getCurrentUser();
        socketController.subscribe(data.user.id);
        yield put({ type: ACTION.CUR_USER_RESPONSE, data })
    } catch (e) {
        yield put({ type: ACTION.AUTH_ERROR, error: e.response.data })
    }
}

