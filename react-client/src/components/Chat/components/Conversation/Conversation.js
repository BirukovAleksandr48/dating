import React, { Component } from 'react';
import Loader from '../../../../utils/Loader'
import connect from 'react-redux/es/connect/connect'
import {
    changeMessageTextAction,
    changeChatStateAction,
    getConversationByIdAction,
    createMessageAction,
    getUserByIdAction
} from "../../../../actions/actionCreator";
import { socketController } from "../../../../api/ws/wsService";
import _ from "lodash";
import './Conversation.sass'
import {getPictureUrl} from "../../../../utils/functions";

class Conversation extends Component {

    constructor(props) {
        super(props);
    }

    onBackClicked() {
        this.props.changeChatStateAction({ screen: 'conversations', cid: null });
    }

    onMessageTextChanged(e) {
        this.props.changeMessageTextAction(e.target.value);
    }

    onSendClicked() {
        this.props.createMessageAction({ cid: this.props.cid, text: this.props.messageText });
        this.props.changeMessageTextAction('');
    }

    render() {

        if(this.props.messages) {
            const { messageText, conversation, curUser } = this.props;
            const { id, firstName, lastName, profilePicture } = conversation.secondUser;
            const messages = _.map(this.props.messages, (message, key) => {
                const classname = message.author.id === curUser.id ? 'MessageItem mine' : 'MessageItem';
                return (
                    <div className={classname} key={key}>
                        <span className={'message-text'}>{ message.text }</span>
                    </div>
                )
            });
            const name = `${firstName} ${lastName}`;
            return (
                <div className={'Conversation'}>
                    <div className={'header'}>
                        <div className={'btn-back'}
                             onClick={() => this.onBackClicked()}/>
                        <div className={'avatar'}
                             style={ { backgroundImage: `url('${getPictureUrl(profilePicture)}')`} }
                             onClick={() => this.onUserClicked(id)}/>
                        <span className={'name'}
                              onClick={() => this.onUserClicked(id)}>{ name }</span>
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

    onUserClicked(id) {
        this.props.getUserByIdAction(id);
        this.props.history.push('/users/' + id);
    }

    componentDidMount() {
        this.props.getConversationByIdAction(this.props.cid)
    }

}

const mapStateProps = (state) => {
    const { messagesText, cid, messages, conversations } = state.chatReducer;
    const conversation = conversations.find(i => i._id === cid);
    const messageText = messagesText.get(cid) || '';
    return {
        cid,
        messages,
        messageText,
        conversation,
        curUser: state.authReducer.curUser
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUserByIdAction: (userId) => dispatch(getUserByIdAction(userId)),
    getConversationByIdAction: (id) => dispatch(getConversationByIdAction(id)),
    createMessageAction: (message) => dispatch(createMessageAction(message)),
    changeChatStateAction: (updatedFields) => dispatch(changeChatStateAction(updatedFields)),
    changeMessageTextAction: (text) => dispatch(changeMessageTextAction(text)),
});

export default connect(mapStateProps, mapDispatchToProps)(Conversation);
