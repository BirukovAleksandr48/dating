import React, {Component} from 'react';
import './CommentItem.sass';
import {getPictureUrl} from "../../../../utils/functions";
import moment from 'moment'

class CommentItem extends Component {

    getCommentTime(date) {
        return moment(date).startOf('minute').fromNow()
    }

    render() {
        const { comment, onDeleteClicked, onEditClicked, isSelected, couldEdit } = this.props;
        const commentItemClass = isSelected ? 'CommentItem selected' : 'CommentItem';
        let createdAt = this.getCommentTime(comment.createdAt);

        if(comment.isEdited) {
            createdAt += ' (edited)'
        }
        return (
            <div className={commentItemClass}>
                <div className="comment-avatar"
                     style={{backgroundImage: `url(${getPictureUrl(comment.User.profilePicture)})`}}/>
                <div className="comment-body">
                    <div className="comment-header">
                        <span className="username">
                            { comment.User.firstName } { comment.User.lastName }
                        </span>
                        {couldEdit &&
                        <div>
                                <span className="comment-edit"
                                      onClick={() => onEditClicked(comment)}>
                                edit
                                </span>
                            <span className="comment-delete"
                                  onClick={() => onDeleteClicked(comment.id)}>
                                delete
                                </span>
                        </div>
                        }
                    </div>
                    <div className={'comment-text-wrapper'}><span className="comment-text">{ comment.text }</span></div>
                    <a className={'comment-date'}>{ createdAt }</a>
                </div>
            </div>
        )
    }

}

export default CommentItem;
