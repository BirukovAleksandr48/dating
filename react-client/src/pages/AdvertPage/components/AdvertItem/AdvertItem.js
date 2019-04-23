import React, {Component} from 'react';
import './AdvertItem.sass';

class AdvertItem extends Component {

    render() {
        const { onReplyClicked, onDeleteClicked, onEditClicked, isAuthor, isAdmin, advert } = this.props;
        const { id, title, text, color } = advert;
        let buttons;

        if(isAuthor) {
            buttons = (
                <>
                    <a className={'btn-delete'} onClick={() => onDeleteClicked(id)}>delete</a>
                    <a className={'btn-edit'} onClick={() => onEditClicked(id)}>edit</a>
                </>
            )
        } else if(isAdmin) {
            buttons = (
                <>
                    <a className={'btn-delete'} onClick={() => onDeleteClicked(id)}>delete</a>
                    <a className={'btn-edit'} onClick={() => onEditClicked(id)}>edit</a>
                    <a className={'btn-reply'} onClick={() => onReplyClicked(id)}>reply</a>
                </>
            )
        } else {
            buttons = <a className={'btn-reply'} onClick={() => onReplyClicked(id)}>reply</a>
        }

        return (
            <div className="AdvertItem" style={{ backgroundColor: color}}>
                <div className={'body'}>
                    <span className={'title'}>{title}</span>
                    <span className={'text'}>{text}</span>
                </div>
                <div className={'footer'}>
                    { buttons }
                </div>
            </div>
        )
    }

}

export default AdvertItem;
