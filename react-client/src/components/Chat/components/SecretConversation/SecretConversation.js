import React, { Component } from 'react';
import Loader from '../../../../utils/Loader'
import connect from 'react-redux/es/connect/connect'
import {
    getAllConversationsAction,
    changeChatStateAction,
    createMessageAction,
    changeMessageTextAction
} from "../../../../actions/actionCreator";
import _ from 'lodash'
import './SecretConversation.sass'
import { socketController } from "../../../../api/ws/wsService";

class SecretConversation extends Component {

    onBackClicked() {
        this.props.changeChatStateAction({ screen: 'conversations', cid: null });
    }

    onMessageTextChanged(e) {
        this.props.changeMessageTextAction(e.target.value);
    }

    onSendClicked() {
        const { curUser, cid, messageText } = this.props;
        socketController.sendSecretMessage(curUser.id, cid, messageText);
        this.props.changeMessageTextAction('');
    }

    render() {
        const { secretConversation, secretMessages, curUser, messageText } = this.props;
        const { id, name } = secretConversation;
        if(id) {
            const messages = _.map(secretMessages, (message, key) => {
                const { isAuthor, text } = message;
                const classname = isAuthor ? 'MessageItem mine' : 'MessageItem';
                return (
                    <div className={classname} key={key}>
                        <span className={'message-text'}>{ text }</span>
                    </div>
                )
            });
            return (
                <div className={'SecretConversation'}>
                    <div className={'header'}>
                        <div className={'btn-back'}
                             onClick={() => this.onBackClicked()}/>
                        <span className={'name'}>{name}</span>
                    </div>
                    <div className={'content'}>
                        {messages}
                    </div>
                    <div className={'write-message-panel'}>
                        <input className={'message-input'}
                               value={messageText}
                               type={'text'}
                               placeholder={'Message..'}
                               onChange={(e) => this.onMessageTextChanged(e)}/>
                        <button className={'message-btn'}
                                onClick={() => this.onSendClicked()}/>
                    </div>
                </div>
            )
        } else {
            return(<Loader/>)
        }
    }

    componentDidMount() {
        socketController.getSecretConversationById(this.props.curUser.id, this.props.cid)
    }
}

const mapStateProps = (state) => {
    const { secretConversations, cid, secretMessages, messagesText } = state.chatReducer;
    const secretConversation = secretConversations.find(i => i.id === cid);
    const messageText = messagesText.get(cid) || '';

    return {
        cid,
        secretMessages,
        messageText,
        secretConversation,
        curUser: state.authReducer.curUser
    }
};

const mapDispatchToProps = (dispatch) => ({
    getAllConversationsAction: () => dispatch(getAllConversationsAction()),
    createMessageAction: (message) => dispatch(createMessageAction(message)),
    changeChatStateAction: (updatedFields) => dispatch(changeChatStateAction(updatedFields)),
    changeMessageTextAction: (text) => dispatch(changeMessageTextAction(text))
});

export default connect(mapStateProps, mapDispatchToProps)(SecretConversation);
