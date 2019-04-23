import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect'
import {getAllConversationsAction, changeChatStateAction} from "../../../../actions/actionCreator";
import _ from 'lodash'
import './ConversationsList.sass'
import {getPictureUrl} from "../../../../utils/functions";


class ConversationsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: ''
        }
    }

    componentWillMount() {
        this.props.getAllConversationsAction();
    }

    onConversationClicked(cid) {
        this.props.changeChatStateAction({screen: 'messages', cid});
    }

    onBackClicked() {
        this.props.changeChatStateAction({isHidden: true});
    }

    generateConversationItems(conversations) {
        return _.map(conversations, (conversation, key) => {
            const { _id, secondUser, text } = conversation;
            const name = `${secondUser.firstName} ${secondUser.lastName}`;

            return (
                <div className={'ConversationItem'}
                     key={key}
                     onClick={() => this.onConversationClicked(_id)}>
                    <div className={'avatar'}
                         style={{backgroundImage: `url(${getPictureUrl(secondUser.profilePicture)})`}}/>
                    <div className={'body'}>
                        <span className={'name'}>{name}</span>
                        <span className={'message'}>{text}</span>
                    </div>
                </div>
            )
        })
    }

    render() {
        const { conversations } = this.props;
        let { filter } = this.state;
        filter = filter.toLowerCase();

        let items = [];
        for(let i in conversations) {
            const conv = conversations[i];
            const { firstName, lastName } = conv.secondUser;
            if(firstName.toLowerCase().indexOf(filter) !== -1 || lastName.toLowerCase().indexOf(filter) !== -1){
                items.push(conv)
            }
        }
        items = this.generateConversationItems(items);
        return(
            <div className={'ConversationsList'}>
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
                    {items}
                </div>
            </div>
        )
    }
    onFilterChanged(e) {
        this.setState({ filter: e.target.value })
    }
}

const mapStateProps = (state) => {
    return {
        conversations: state.chatReducer.conversations
    }
};

const mapDispatchToProps = (dispatch) => ({
    getAllConversationsAction: () => dispatch(getAllConversationsAction()),
    changeChatStateAction: (updatedFields) => dispatch(changeChatStateAction(updatedFields))
});

export default connect(mapStateProps, mapDispatchToProps)(ConversationsList);
