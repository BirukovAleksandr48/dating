import ACTION from '../../actions/actionTypes'
import * as Toaster from "../../utils/Toaster";
import {showSuccess} from "../../utils/Toaster";

const initialState = {
    comments: [],
    isFetching: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.COMMENT_REQUEST: {
            return {
                ...state,
                isFetching: true
            }
        }
        case ACTION.COMMENT_ERROR: {
            Toaster.showError(action.error);
            return {
                ...state,
                isFetching: false
            }
        }
        case ACTION.COMMENTS_RESPONSE: {
            return {
                ...state,
                comments: action.data,
                isFetching: false
            }
        }
        case ACTION.COMMENT_ADD_RESPONSE: {

            const comments = [...state.comments];
            const newComment = action.data;
            comments.push(newComment);

            return {
                ...state,
                comments,
                isFetching: false
            }
        }
        case ACTION.COMMENT_EDIT_RESPONSE: {
            Toaster.showSuccess('Comment was updated successfully');

            const comments = [...state.comments];
            const editedComment = action.data;
            const index = comments.findIndex(i => i.id === editedComment.id);
            if(index !== -1)
                comments[index]= editedComment;

            return {
                ...state,
                comments,
                isFetching: false
            }
        }
        case ACTION.COMMENT_DELETE_RESPONSE: {
            Toaster.showSuccess('Comment was deleted successfully');

            const comments = [...state.comments];
            const deletedCommentId = action.data.deletedCommentId;
            const index = comments.findIndex(i => i.id === Number(deletedCommentId));
            comments.splice(index, 1);

            return {
                ...state,
                comments,
                isFetching: false
            }
        }
        default: {
            return state;
        }
    }
}
