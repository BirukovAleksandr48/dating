import React, {Component} from 'react';
import './AcceptForm.sass';

class AcceptForm extends Component {

    render() {
        const { text, onAccept, onReject } = this.props;
        return (
            <div className="AcceptForm">
                <span className={'text'}>{text}</span>
                <div className={'buttons'}>
                    <input className={'reject'}
                           type={'button'}
                           value={'No'}
                           onClick={() => onReject()}/>
                    <input className={'accept'}
                           type={'button'}
                           value={'Yes'}
                           onClick={() => onAccept()}/>
                </div>
            </div>
        )
    }
}

export default AcceptForm;
