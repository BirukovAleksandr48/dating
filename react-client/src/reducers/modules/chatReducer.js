import ACTION from '../../actions/actionTypes'
import moment from 'moment'
import * as Toaster from "../../utils/Toaster";

const initialState = {
    conversations: [],
    messages: [],
    secretConversations: [],
    secretMessages: [],
    mode: 'people', //advert
    screen: 'conversations', //messages
    cid: null,
    messagesText: new Map(),
    isHidden: true,
    isFetching: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.CONVERSATIONS_REQUEST: {
            return {
                ...state,
                isFetching: true
            }
        }
        case ACTION.CONVERSATIONS_ERROR: {
            Toaster.showError(action.error);
            return {
                ...state,
                isFetching: false
            }
        }
        case ACTION.CONVERSATIONS_RESPONSE: {
            const conversations = action.data;

            conversations.sort((a, b) => {
                return moment(b.createdAt) - moment(a.createdAt)
            });
            return {
                ...state,
                conversations,
                isFetching: false
            }
        }
        case ACTION.CONVERSATION_BY_ID_RESPONSE: {
            return {
                ...state,
                messages: action.data,
                isFetching: false
            }
        }
        case ACTION.ADD_CONVERSATION:
        case ACTION.CONVERSATION_CREATE_RESPONSE: {
            const { conversation } = action;
            const conversations = JSON.parse(JSON.stringify(state.conversations));
            conversations.unshift(conversation);
            return {
                ...state,
                conversations,
                isFetching: false
            }
        }
        case ACTION.ADD_MESSAGE:
        case ACTION.MESSAGE_CREATE_RESPONSE: {
            const conversations = JSON.parse(JSON.stringify(state.conversations));
            const messages = JSON.parse(JSON.stringify(state.messages));
            const newMessage = action.message;

            if(messages.length && messages[0].cid === newMessage.cid)
                messages.push(newMessage);

            const index = conversations.findIndex(i => i._id === newMessage.cid)
            if(index !== -1) {
                conversations[index].text = newMessage.text;
                conversations[index].createdAt = newMessage.createdAt;
            }

            conversations.sort((a, b) => {
                return moment(b.createdAt) - moment(a.createdAt)
            });

            return {
                ...state,
                messages,
                conversations,
                isFetching: false
            };
        }
        case ACTION.CHANGE_CHAT_STATE: {
            const { updatedFields } = action;
            return {
                ...state,
                ...updatedFields
            };
        }
        case ACTION.MESSAGE_TEXT_CHANGE: {
            const { cid, messagesText } = state;
            messagesText.set(cid, action.text);
            return {
                ...state,
                messagesText
            };
        }
        case ACTION.SECRET_CONVERSATIONS_RESPONSE: {
            const { secretConversations } = action;
            secretConversations.sort((a, b) => {
                return moment(b.lastMessage.createdAt) - moment(a.lastMessage.createdAt)
            });
            return {
                ...state,
                secretConversations
            };
        }
        case ACTION.ADD_SECRET_CONVERSATION: {
            const { secretConversation } = action;
            const secretConversations = JSON.parse(JSON.stringify(state.secretConversations));

            const index = secretConversations.findIndex(i => i.id === secretConversation.id);
            if(index !== -1) {
                secretConversations[index] = secretConversation;
            } else {
                secretConversations.push(secretConversation)
            }

            return {
                ...state,
                secretConversations
            };
        }
        case ACTION.ADD_SECRET_MESSAGE: {
            const { secretMessage } = action;
            const { cid } = state;
            const secretConversations = JSON.parse(JSON.stringify(state.secretConversations));
            const secretMessages = JSON.parse(JSON.stringify(state.secretMessages));

            const index = secretConversations.findIndex(i => i.id === secretMessage.cid);
            if(index !== -1) {
                const { createdAt, isAuthor, text } = secretMessage;
                secretConversations[index].lastMessage = {
                    createdAt,
                    isAuthor,
                    text
                };
            }

            if(cid === secretMessage.cid) {
                secretMessages.push(secretMessage)
            }
            secretConversations.sort((a, b) => {
                return moment(b.lastMessage.createdAt) - moment(a.lastMessage.createdAt)
            });

            return {
                ...state,
                secretMessages,
                secretConversations
            };
        }
        case ACTION.SECRET_CONVERSATION_BY_ID_RESPONSE: {
            const { id, name, messages: secretMessages, advert } = action.secretConversation;
            const secretConversations = JSON.parse(JSON.stringify(state.secretConversations));

            const secretConversation = {
                id,
                name,
                advert,
                lastMessage: secretMessages[secretMessages.length - 1]
            };

            const index = secretConversations.findIndex(i => i.id === id);
            if(index === -1) {
                secretConversations.push(secretConversation)
            }

            secretConversations.sort((a, b) => {
                return moment(b.lastMessage.createdAt) - moment(a.lastMessage.createdAt)
            });

            return {
                ...state,
                secretMessages,
                secretConversations
            };
        }
        default: {
            return state;
        }
    }
}
