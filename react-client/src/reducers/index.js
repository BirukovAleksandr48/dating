import { combineReducers } from 'redux';

import userReducer from './modules/userReducer'
import authReducer from './modules/authReducer'
import chatReducer from './modules/chatReducer'
import photoReducer from './modules/photoReducer'
import commentReducer from './modules/commentReducer'
import advertReducer from './modules/advertReducer'

const appReducer = combineReducers({
    userReducer, authReducer, chatReducer, photoReducer, commentReducer, advertReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
