import React, {Component} from 'react';
import connect from 'react-redux/es/connect/connect'
import './Photo.sass';

import {
    addCommentAction,
    deleteCommentAction,
    deletePhotoByIdAction,
    getCommentsAction,
    getPhotoByIdAction,
    editCommentAction
} from "../../actions/actionCreator";
import {getPictureUrl} from "../../utils/functions";

import CommentItem from "./components/CommentItem/CommentItem";
import Loader from '../../utils/Loader'

class Photo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentText: '',
            editedCommentId: null
        };
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
        this.onEditClicked = this.onEditClicked.bind(this);
    }

    componentDidMount() {
        this.props.getPhotoByIdAction(this.props.match.params.id);
        this.props.getCommentsAction(this.props.match.params.id);
    }

    render() {
        return (
            <div className={'Photo'}>
                <div className="photo-container">
                    {this.props.photo ? this.renderPhoto() : <Loader/>}
                </div>
                <div className="comments-container">
                    {this.props.comments ? this.renderComments() : <Loader/>}
                </div>
            </div>
        )
    }

    renderPhoto() {
        return (
            <img className={'photo'} src={getPictureUrl(this.props.photo.photoName)}/>
        )
    }

    renderComments() {
        const { editedCommentId, commentText } = this.state;
        const commentItems = this.getCommentItems(editedCommentId);
        const buttons = this.getCommentButtons(editedCommentId);

        return (
            <>
                <div className="comment-items">
                    {commentItems}
                </div>
                <div className="add-comment">
                    <div className="comment-text">
                        <textarea onChange={(e) => this.onCommentTextChanged(e)} value={commentText}/>
                    </div>
                    <div className={'comment-buttons'}>
                        {buttons}
                    </div>
                </div>
            </>
        )
    }

    getCommentItems(editedCommentId) {
        const {comments, curUser} = this.props;
        console.log(comments)
        return comments.map((comment, key) => {
            const isSelected = editedCommentId === comment.id;
            const couldEdit = curUser.id === comment.User.id || curUser.role === 'admin';

            return <CommentItem key={key}
                                comment={comment}
                                onDeleteClicked={this.onDeleteClicked}
                                onEditClicked={this.onEditClicked}
                                isSelected={isSelected}
                                couldEdit={couldEdit}/>
        });
    }

    getCommentButtons(editedCommentId) {
        if (editedCommentId) {
            return (
                <>
                    <a className="btnEditComment" onClick={() => this.onEditCommentSendClicked()}>Edit</a>
                    <a className="btnCancelEditComment" onClick={() => this.onEditModeCancel()}>Cancel</a>
                </>
            )
        } else {
            return <a className="btnSendComment" onClick={() => this.onCommentSendClicked()}>Send</a>;
        }
    }

    onCommentTextChanged(e) {
        this.setState({commentText: e.target.value})
    }

    onCommentSendClicked() {
        this.props.addCommentAction(this.props.match.params.id, this.state.commentText)
        this.setState({commentText: ''})
    }

    onDeleteClicked(commentId) {
        this.props.deleteCommentAction(commentId);
    }

    onEditClicked(comment) {
        if (comment.id !== this.state.editedCommentId)
            this.setState({editedCommentId: comment.id, commentText: comment.text});
    }

    onEditModeCancel() {
        this.setState({editedCommentId: null, commentText: ''});
    }

    onEditCommentSendClicked() {
        this.props.editCommentAction(this.state.editedCommentId, this.state.commentText)
        this.setState({editedCommentId: null, commentText: ''});
    }
}

const mapStateProps = (state, router) => {
    const photo = state.photoReducer.photos.find(i => i.id === Number(router.match.params.id));
    return {
        photo,
        comments: state.commentReducer.comments,
        curUser: state.authReducer.curUser
    }
};

const mapDispatchToProps = (dispatch) => ({
    getPhotoByIdAction: (photoId) => dispatch(getPhotoByIdAction(photoId)),
    deletePhotoByIdAction: (photoId) => dispatch(deletePhotoByIdAction(photoId)),
    getCommentsAction: (photoId) => dispatch(getCommentsAction(photoId)),
    addCommentAction: (photoId, commentText) => dispatch(addCommentAction(photoId, commentText)),
    editCommentAction: (commentId, commentText) => dispatch(editCommentAction(commentId, commentText)),
    deleteCommentAction: (commentId) => dispatch(deleteCommentAction(commentId))
});

export default connect(mapStateProps, mapDispatchToProps)(Photo);
