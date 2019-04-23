import { BASE_URL } from '../../constants'
import io from 'socket.io-client'
import {
    addMessageAction,
    addConversationAction,
    addSecretConversation,
    addSecretMessage,
    secretConversationsResponse,
    secretConversationByIdResponse,
    informChatError
} from "../../actions/actionCreator";

const socket = io(BASE_URL, { origins: 'localhost:*' });

let dispatchAction = null;

socket.on('connect', () => {
    socket.on('message_added', (message) => {
        dispatchAction(addMessageAction(message))
    });
    socket.on('conversation_created', (conversation) => {
        dispatchAction(addConversationAction(conversation))
    });

    socket.on('inform_error', (error) => {
        dispatchAction(informChatError(error));
    });
    socket.on('add_secret_conversation', (conversation) => {
        dispatchAction(addSecretConversation(conversation));
    });
    socket.on('add_secret_message', (message) => {
        dispatchAction(addSecretMessage(message));
    });
    socket.on('secret_conversations_response', (secretConversations) => {
        dispatchAction(secretConversationsResponse(secretConversations));
    });
    socket.on('secret_conversation_by_id_response', (secretConversation) => {
        dispatchAction(secretConversationByIdResponse(secretConversation));
    });
});

export const socketController = {
    unsubscribe(cid) {
        socket.emit('unsubscribe', cid)
    },
    informAboutNewMessage(message) {
        socket.emit('inform_new_message', message)
    },
    subscribe(userId) {
        socket.emit('subscribe', userId)
    },
    informAboutNewConversation(recipient, conversation) {
        socket.emit('inform_new_conversation', { recipient, conversation })
    },
    replyOnAdvert(curUserId, advertId, messageText) {
        socket.emit('reply_on_advert', { curUserId, advertId, messageText })
    },
    getSecretConversationsByUserId(curUserId) {
        socket.emit('get_secret_conversations_by_user_id', { curUserId })
    },
    getSecretConversationById(curUserId, conversationId) {
        socket.emit('get_secret_conversations_by_id', { curUserId, conversationId })
    },
    sendSecretMessage(curUserId, cid, messageText) {
        socket.emit('send_secret_message', { curUserId, cid, messageText })
    }
};

export const initSocket = (store) => {
    dispatchAction = store.dispatch;
    return store;
};

