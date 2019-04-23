import {takeLatest} from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as userSaga from './modules/userSaga';
import * as authSaga from './modules/authSaga';
import * as photoSaga from './modules/photoSaga';
import * as chatSaga from './modules/chatSaga';
import * as commentSaga from './modules/commentSaga';
import * as advertSaga from './modules/advertSaga';


function* rootSaga() {
    //---Users---
    yield takeLatest(ACTION.USERS, userSaga.getUsersSaga);
    yield takeLatest(ACTION.USER_BY_ID, userSaga.getUserByIdSaga);
    yield takeLatest(ACTION.USER_CREATE, userSaga.createUserSaga);
    yield takeLatest(ACTION.USER_UPDATE, userSaga.updateUserSaga);
    yield takeLatest(ACTION.USER_DELETE, userSaga.deleteUserSaga);
    yield takeLatest(ACTION.USER_UPLOAD_AVATAR, userSaga.uploadUserAvatarSaga);

    //---Auth---
    yield takeLatest(ACTION.LOGIN, authSaga.loginSaga);
    yield takeLatest(ACTION.SIGNUP, authSaga.signUpSaga);
    yield takeLatest(ACTION.LOGOUT, authSaga.logoutSaga);
    yield takeLatest(ACTION.CUR_USER, authSaga.getCurrentUserSaga);

    //---Photo---
    yield takeLatest(ACTION.PHOTOS, photoSaga.getPhotosSaga);
    yield takeLatest(ACTION.PHOTO_BY_ID, photoSaga.getPhotoByIdSaga);
    yield takeLatest(ACTION.PHOTO_UPLOAD, photoSaga.uploadPhotoSaga);
    yield takeLatest(ACTION.PHOTO_DELETE, photoSaga.deletePhotoSaga);

    //---Comment---
    yield takeLatest(ACTION.COMMENTS, commentSaga.getCommentsSaga);
    yield takeLatest(ACTION.COMMENT_ADD, commentSaga.addCommentSaga);
    yield takeLatest(ACTION.COMMENT_EDIT, commentSaga.editCommentSaga);
    yield takeLatest(ACTION.COMMENT_DELETE, commentSaga.deleteCommentSaga);

    //---Advert---
    yield takeLatest(ACTION.ADVERTS, advertSaga.getAdvertSaga);
    yield takeLatest(ACTION.ADVERT_BY_USER_ID, advertSaga.getAdvertByUserIdSaga);
    yield takeLatest(ACTION.ADVERT_BY_ID, advertSaga.getAdvertByIdSaga);
    yield takeLatest(ACTION.ADVERTS_ADD, advertSaga.addAdvertSaga);
    yield takeLatest(ACTION.ADVERT_UPDATE, advertSaga.updateAdvertSaga);
    yield takeLatest(ACTION.ADVERT_DELETE, advertSaga.deleteAdvertSaga);

    //---Chat---
    yield takeLatest(ACTION.CONVERSATIONS, chatSaga.getConversationsSaga);
    yield takeLatest(ACTION.CONVERSATION_BY_ID, chatSaga.getConversationByIdSaga);
    yield takeLatest(ACTION.CONVERSATION_CREATE, chatSaga.createConversationSaga);
    yield takeLatest(ACTION.MESSAGE_CREATE, chatSaga.createMessageSaga);
}

export default rootSaga;
