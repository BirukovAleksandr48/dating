import React, {Component} from 'react';
import * as Toaster from '../../../../utils/Toaster';
import './MessageForm.sass';

class MessageForm extends Component {

    render() {
        const { messageText, onMessageChange, onMessageSend } = this.props;
        return (
            <div className="MessageForm">
                <textarea className={'message-text'}
                          value={messageText}
                          onChange={(e) => onMessageChange(e)}/>
                <input className={'message-send'}
                       type={'button'}
                       value={'Send'}
                       onClick={() => this.onMessageSendClicked(messageText, onMessageSend)}/>
            </div>
        )
    }

    onMessageSendClicked(messageText, onMessageSend) {
        if (messageText.length === 0) {
            return Toaster.showError('Message can`t be empty');
        }
        onMessageSend(messageText)
    }

}

export default MessageForm;
