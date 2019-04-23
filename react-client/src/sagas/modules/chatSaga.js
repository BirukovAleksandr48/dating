import { put } from 'redux-saga/effects'
import ACTION from '../../actions/actionTypes'
import { getConversationById, getConversations, createConversation, createMessage } from "../../api/rest/chatService";
import { socketController } from "../../api/ws/wsService";

export function* getConversationsSaga() {

    yield put({ type: ACTION.CONVERSATIONS_REQUEST });
    try {
        const { data } = yield getConversations();
        yield put({ type: ACTION.CONVERSATIONS_RESPONSE, data });
    } catch (e) {
        yield put({ type: ACTION.CONVERSATIONS_ERROR, error: e.response.data });
    }
}

export function* getConversationByIdSaga({ id }) {

    yield put({ type: ACTION.CONVERSATIONS_REQUEST });
    try {
        const { data } = yield getConversationById(id);

        yield put({ type: ACTION.CONVERSATION_BY_ID_RESPONSE, data });
    } catch (e) {
        yield put({ type: ACTION.CONVERSATIONS_ERROR, error: e.response.data })
    }
}

export function* createConversationSaga({ recipient, messageText }) {

    yield put({ type: ACTION.CONVERSATIONS_REQUEST });
    try {
        const { data } = yield createConversation(recipient.id, messageText);
        const { conversation } = data;

        socketController.informAboutNewConversation(recipient.id,  conversation);
        conversation.secondUser = recipient;

        yield put({ type: ACTION.CONVERSATION_CREATE_RESPONSE, conversation });
    } catch(e) {
        yield put({ type: ACTION.CONVERSATIONS_ERROR, error: e.response.data });
    }
}

export function* createMessageSaga({ message }) {

    yield put({ type: ACTION.CONVERSATIONS_REQUEST });
    try {
        const { data } = yield createMessage(message);

        socketController.informAboutNewMessage(data);
        yield put({ type: ACTION.MESSAGE_CREATE_RESPONSE, message: data.message });
    } catch(e) {
        yield put({ type: ACTION.CONVERSATIONS_ERROR, error: e.response.data });
    }
}
