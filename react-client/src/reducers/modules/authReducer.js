import ACTION from '../../actions/actionTypes'
import * as Toaster from "../../utils/Toaster";

const initialState = {
    curUser: null,
    isFetching: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.AUTH_REQUEST: {
            return {
                ...state,
                isFetching: true
            }
        }
        case ACTION.AUTH_ERROR: {
            Toaster.showError(action.error);
            return {
                ...state,
                isFetching: false
            }
        }
        case ACTION.LOGIN_RESPONSE:
        case ACTION.SIGNUP_RESPONSE:
        case ACTION.CUR_USER_RESPONSE: {
            return {
                ...state,
                curUser: action.data.user,
                isFetching: false
            }
        }
        case ACTION.LOGOUT_RESPONSE: {
            return {
                ...state,
                curUser: null,
                isFetching: false
            }
        }
        case ACTION.USER_UPLOAD_AVATAR_RESPONSE: {

            let curUser = state.curUser;
            if(curUser.id === action.data.id) {
                curUser = action.data
            }

            return {
                ...state,
                curUser,
                isFetching: false
            }
        }
        default: {
            return state;
        }
    }
}
