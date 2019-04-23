import React, { Component } from 'react';
import Loader from '../../utils/Loader'
import connect from 'react-redux/es/connect/connect'
import { getAllConversationsAction, changeChatStateAction} from "../../actions/actionCreator";
import _ from 'lodash'
import './Chat.sass'
import ConversationsList from "./components/ConversationsList/ConversationsList";
import Conversation from "./components/Conversation/Conversation";
import SecretConversationsList from "./components/SecretConversationsList/SecretConversationsList";
import SecretConversation from "./components/SecretConversation/SecretConversation";

class Chat extends Component {

    componentWillMount() {
        this.props.getAllConversationsAction();
    }

    render() {
        const { chatMode, chatScreen, isHidden } = this.props;

        let component = <Loader/>;
        if(chatScreen)
        if(chatMode === 'people') {
            if(chatScreen === 'conversations') {
                component = <ConversationsList  {...this.props} />
            } else {
                component = <Conversation {...this.props} />
            }
        } else if(chatMode === 'advert') {
            if(chatScreen === 'conversations') {
                component = <SecretConversationsList  {...this.props} />
            } else {
                component = <SecretConversation {...this.props} />
            }
        }
        if(isHidden)
            return null;
        else
            return(
                <div className={'Chat'}>
                    <div className={'tabs'}>
                        <input className={chatMode === 'people'?'selected':''} type={'button'} value={'People'} onClick={() => this.setChatMode('people')}/>
                        <input className={chatMode === 'advert'?'selected':''} type={'button'} value={'Advert'} onClick={() => this.setChatMode('advert')}/>
                    </div>
                    {component}
                </div>
            )
    }

    setChatMode(mode) {
        this.props.changeChatStateAction({mode, screen: 'conversations'});
    }
}

const mapStateProps = (state) => {
    return {
        chatMode: state.chatReducer.mode,
        chatScreen: state.chatReducer.screen,
        messages: state.chatReducer.messages,
        isHidden: state.chatReducer.isHidden,
        conversations: state.chatReducer.conversations
    }
};

const mapDispatchToProps = (dispatch) => ({
    getAllConversationsAction: () => dispatch(getAllConversationsAction()),
    changeChatStateAction: (updatedFields) => dispatch(changeChatStateAction(updatedFields))
});

export default connect(mapStateProps, mapDispatchToProps)(Chat);
