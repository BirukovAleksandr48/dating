import React, { Component } from 'react';
import Loader from '../../../../utils/Loader'
import connect from 'react-redux/es/connect/connect'
import {getAllConversationsAction, changeChatStateAction} from "../../../../actions/actionCreator";
import _ from 'lodash'
import './SecretConversationsList.sass'
import { socketController } from "../../../../api/ws/wsService";

class SecretConversationsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: ''
        }
    }

    componentWillMount() {
        socketController.getSecretConversationsByUserId(this.props.curUser.id)
    }

    onConversationClicked(cid) {
        this.props.changeChatStateAction({screen: 'messages', cid});
    }

    onBackClicked() {
        this.props.changeChatStateAction({isHidden: true});
    }
    //
    generateChatItems(conversations) {
        return _.map(conversations, (conversation, key) => {
            const { name, lastMessage, advert } = conversation;
            const avatarInitials = name.split(' ').map(item => item[0]).join('').toUpperCase();
            return (
                <div className={'ConversationItem'}
                     key={key}
                     onClick={() => this.onConversationClicked(conversation.id)}>
                    <div className={'avatar'}
                         style={advert?{backgroundColor: advert.color}:{}}>
                        <span className={'avatarInitials'}>{avatarInitials}</span>
                    </div>
                    <div className={'body'}>
                        <span className={'name'}>{name}</span>
                        <span className={'message'}>{lastMessage.text}</span>
                    </div>
                </div>
            )
        })
    }

    render() {
        let { secretConversations } = this.props;
        let { filter } = this.state;
        filter= filter.toLowerCase();

        let items = [];
        for(let i in secretConversations) {
            if(secretConversations[i].name.toLowerCase().indexOf(filter) !== -1){
                items.push(secretConversations[i])
            }
        }
        items = this.generateChatItems(items);

        return(
            <div className={'SecretConversationsList'}>
                <div className={'header'}>
                    <div className={'btn-back'}
                         onClick={() => this.onBackClicked()}/>
                    <input  className={'input-find'}
                            type={'text'}
                            placeholder={'find'}
                            value={filter}
                            onChange={(e) => this.onFilterChanged(e)}/>
                </div>
                <div className={'content'}>
                    { items }
                </div>
            </div>
        )
    }

    onFilterChanged(e) {
        this.setState({ filter: e.target.value });
    }
}

const mapStateProps = (state) => {
    return {
        secretConversations: state.chatReducer.secretConversations,
        curUser: state.authReducer.curUser
    }
};

const mapDispatchToProps = (dispatch) => ({
    getAllConversationsAction: () => dispatch(getAllConversationsAction()),
    changeChatStateAction: (updatedFields) => dispatch(changeChatStateAction(updatedFields))
});

export default connect(mapStateProps, mapDispatchToProps)(SecretConversationsList);
