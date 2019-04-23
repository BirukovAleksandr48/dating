import ACTION from '../../actions/actionTypes'
import * as Toaster from "../../utils/Toaster";

const initialState = {
    users: [],
    isFetching: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.USER_REQUEST: {
            return {
                ...state,
                isFetching: true
            }
        }
        case ACTION.USER_ERROR: {
            Toaster.showError(action.error)
            return {
                ...state,
                isFetching: false
            }
        }
        case ACTION.USERS_RESPONSE: {
            return {
                ...state,
                users: action.data,
                isFetching: false
            }
        }
        case ACTION.USER_BY_ID_RESPONSE: {

            const users = [...state.users];
            const index = users.findIndex(u => u.id === action.data.id);

            if (index !== -1) {
                users[index] = action.data
            } else {
                users.push(action.data)
            }

            return {
                ...state,
                users,
                isFetching: false
            }
        }
        case ACTION.USER_CREATE_RESPONSE: {
            Toaster.showSuccess('User was created successfully');

            const users = [...state.users];
            const newUser = action.data;
            users.push(newUser);

            return {
                ...state,
                users,
                isFetching: false
            }
        }
        case ACTION.USER_UPDATE_RESPONSE: {
            Toaster.showSuccess('User was updated successfully');

            const users = [...state.users];
            const updUser = action.data;
            const index = users.findIndex(u => u.id === updUser.id);

            if (index !== -1) {
                users[index] = updUser
            } else {
                users.push(updUser)
            }

            return {
                ...state,
                users,
                isFetching: false
            }
        }
        case ACTION.USER_DELETE_RESPONSE: {
            Toaster.showSuccess('User was deleted successfully');

            const users = [...state.users];
            const index = users.findIndex(u => u.id === action.data.id);

            if (index !== -1) {
                users.splice(index, 1)
            }

            return {
                ...state,
                users,
                isFetching: false
            }
        }
        case ACTION.USER_UPLOAD_AVATAR_RESPONSE: {
            Toaster.showSuccess('Avatar was uploaded successfully');
            console.log('222222')
            const users = [...state.users];
            const index = users.findIndex(u => u.id === action.data.id);
            if (index !== -1) {
                users[index] = action.data
            } else {
                users.push(action.data)
            }

            return {
                ...state,
                users,
                isFetching: false
            }
        }
        case ACTION.USER_STATE_CHANGE: {
            const users = [...state.users];
            const index = users.findIndex(u => u.id === action.userId);
            if (index !== -1) {
                users[index][action.field] = action.value;
                users[index]['isChanged'] = true
            }

            return {
                ...state,
                users
            }
        }
        default: {
            return state;
        }
    }
}
