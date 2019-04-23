import ACTION from './actionTypes'

//------USER------
export const getUsersAction = (query) => {
    return {
        type: ACTION.USERS,
        query
    };
};

export const getUserByIdAction = (userId) => {
    return {
        type: ACTION.USER_BY_ID,
        userId
    };
};

export const createUserAction = (userData) => {
    return {
        type: ACTION.USER_CREATE,
        userData
    };
};

export const updateUserAction = (userId, updatedFields) => {
    return {
        type: ACTION.USER_UPDATE,
        userId,
        updatedFields
    };
};

export const deleteUserAction = (userId) => {
    return {
        type: ACTION.USER_DELETE,
        userId
    };
};

export const uploadUserAvatarAction = (userId, file) => {
    return {
        type: ACTION.USER_UPLOAD_AVATAR,
        userId,
        file
    };
};

export const changeUserStateAction = (userId, field, value) => {
    return {
        type: ACTION.USER_STATE_CHANGE,
        userId,
        field,
        value
    };
};

//------AUTHENTICATION------
export const loginAction = (loginData, history) => {
    return {
        type: ACTION.LOGIN,
        loginData,
        history
    };
};

export const signUpAction = (signUpData, history) => {
    return {
        type: ACTION.SIGNUP,
        signUpData,
        history
    };
};

export const logoutAction = (history) => {
    return {
        type: ACTION.LOGOUT,
        history
    };
};

export const getCurrentUserAction = () => {
    return {
        type: ACTION.CUR_USER
    };
};

//------PHOTO------
export const getPhotosAction = (userId) => {
    return {
        type: ACTION.PHOTOS,
        userId
    };
};

export const getPhotoByIdAction = (photoId) => {
    return {
        type: ACTION.PHOTO_BY_ID,
        photoId
    };
};

export const deletePhotoByIdAction = (photoId) => {
    return {
        type: ACTION.PHOTO_DELETE,
        photoId
    };
};

export const uploadPhotoAction = (selectedFile, userId) => {
    return {
        type: ACTION.PHOTO_UPLOAD,
        selectedFile,
        userId
    };
};

//-----COMMENT-----
export const getCommentsAction = (photoId) => {
    return {
        type: ACTION.COMMENTS,
        photoId
    };
};

export const addCommentAction = (photoId, commentText) => {
    return {
        type: ACTION.COMMENT_ADD,
        photoId,
        commentText
    };
};

export const editCommentAction = (commentId, commentText) => {
    return {
        type: ACTION.COMMENT_EDIT,
        commentId,
        commentText
    };
};

export const deleteCommentAction = (commentId) => {
    return {
        type: ACTION.COMMENT_DELETE,
        commentId
    };
};

//-----ADVERT-----

export const getAdvertAction = (query) => {
    return {
        type: ACTION.ADVERTS,
        query
    };
};

export const getAdvertByUserIdAction = (userId) => {
    return {
        type: ACTION.ADVERT_BY_USER_ID,
        userId
    };
};

export const getAdvertByIdAction = (advertId) => {
    return {
        type: ACTION.ADVERT_BY_ID,
        advertId
    };
};

export const addAdvertAction = (advert) => {
    return {
        type: ACTION.ADVERTS_ADD,
        advert
    };
};

export const deleteAdvertAction = (advertId) => {
    return {
        type: ACTION.ADVERT_DELETE,
        advertId
    };
};

export const updateAdvertAction = (advertId, advert) => {
    return {
        type: ACTION.ADVERT_UPDATE,
        advertId,
        advert
    };
};

//------CHAT------
export const getAllConversationsAction = () => {
    return {
        type: ACTION.CONVERSATIONS
    };
};

export const getConversationByIdAction = (id) => {
    return {
        type: ACTION.CONVERSATION_BY_ID,
        id
    };
};

export const createConversationAction = (recipient, messageText) => {
    return {
        type: ACTION.CONVERSATION_CREATE,
        recipient,
        messageText
    };
};

export const createMessageAction = (message) => {
    return {
        type: ACTION.MESSAGE_CREATE,
        message
    };
};

export const addMessageAction = (message) => {
    return {
        type: ACTION.ADD_MESSAGE,
        message
    };
};


export const addConversationAction = (conversation) => {
    return {
        type: ACTION.ADD_CONVERSATION,
        conversation
    };
};

export const openConversationAction = (user) => {
    return {
        type: ACTION.CONVERSATION_OPEN,
        user
    };
};

export const changeChatStateAction = (updatedFields) => {
    return {
        type: ACTION.CHANGE_CHAT_STATE,
        updatedFields
    };
};

export const changeMessageTextAction = (text) => {
    return {
        type: ACTION.MESSAGE_TEXT_CHANGE,
        text
    };
};

export const toggleIsHiddenChatAction = () => {
    return {
        type: ACTION.TOGGLE_IS_HIDDEN_CHAT
    };
};

export const informChatError = (error) => {
    return {
        type: ACTION.CONVERSATIONS_ERROR,
        error
    };
};

//-----SECRET_CHAT-----
export const secretConversationsResponse = (secretConversations) => {
    return {
        type: ACTION.SECRET_CONVERSATIONS_RESPONSE,
        secretConversations
    };
};
export const secretConversationByIdResponse = (secretConversation) => {
    return {
        type: ACTION.SECRET_CONVERSATION_BY_ID_RESPONSE,
        secretConversation
    };
};
export const addSecretConversation = (secretConversation) => {
    return {
        type: ACTION.ADD_SECRET_CONVERSATION,
        secretConversation
    };
};
export const addSecretMessage = (secretMessage) => {
    return {
        type: ACTION.ADD_SECRET_MESSAGE,
        secretMessage
    };
};


