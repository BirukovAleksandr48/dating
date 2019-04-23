import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect'
import './AdvertPage.sass';

import AdvertForm from "./components/AdvertForm/AdvertForm";
import Modal from "react-responsive-modal";
import {addAdvertAction, deleteAdvertAction, getAdvertAction, updateAdvertAction} from "../../actions/actionCreator";
import AdvertItem from "./components/AdvertItem/AdvertItem";
import { socketController } from "../../api/ws/wsService";
import MessageForm from "../../components/Chat/components/MessageForm/MessageForm";
import * as Toaster from "../../utils/Toaster";
import AcceptForm from "../../components/AcceptForm/AcceptForm";

class AdvertPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            advertFilter: '',
            // for advert modal:
            isAdvertModalOpen: false,
            isDelModalOpen: false,
            delAdvertId: null,
            modalType: null,
            advert: {
                title: '',
                text: '',
                color: '#f7d271'
            },
            // for message modal
            isMessageModalOpen: false,
            messageText: '',
            repliedAdvert: null
        };

        // for advert modal
        this.closeAdvertModal = this.closeAdvertModal.bind(this);
        this.onAdvertFieldChange = this.onAdvertFieldChange.bind(this);
        this.onAdvertColorChange = this.onAdvertColorChange.bind(this);
        this.onReplyClicked = this.onReplyClicked.bind(this);
        this.onAdvertEdit = this.onAdvertEdit.bind(this);
        this.onAdvertCreate = this.onAdvertCreate.bind(this);

        // for message modal
        this.closeMessageModal = this.closeMessageModal.bind(this);
        this.onSendMessageClicked = this.onSendMessageClicked.bind(this);
        this.onMessageChanged = this.onMessageChanged.bind(this);

        //for del modal
        this.openDelModal = this.openDelModal.bind(this);
        this.closeDelModal = this.closeDelModal.bind(this);
        this.deleteAdvert = this.deleteAdvert.bind(this);
    }

    componentDidMount() {
       this.props.getAdvertAction(this.props.location.search)
    }

    renderAdvertList(adverts) {

        if(adverts.length === 0) {
            return (
                <div className={'advert-list-empty'}>
                    <div className="no-advert-icon"/>
                    <span className="no-advert-text">Advert list is empty</span>
                </div>
            )
        }

        const columns = [];
        for(let i = 0; i < 3; i++)
            columns[i] = [];
        const { curUser } = this.props;
        for(let i = 0; i < adverts.length; i = i + 3) {
            for(let j = 0; j < 3; j++) {
                const advert = adverts[i+j];
                if(advert) {
                    const isAuthor = curUser.id === advert.userId;
                    const isAdmin = curUser.role === 'admin';
                    columns[j].push(
                        <AdvertItem key={i + j}
                                    advert={advert}
                                    onReplyClicked={this.onReplyClicked}
                                    onDeleteClicked={this.openDelModal}
                                    onEditClicked={() => this.openModalEdit(advert)}
                                    isAuthor={isAuthor}
                                    isAdmin={isAdmin}/>
                    );
                }
            }
        }
        return (
            <div className={'advert-list'}>
                    <div className={'column'}>{columns[0]}</div>
                    <div className={'column'}>{columns[1]}</div>
                    <div className={'column'}>{columns[2]}</div>
            </div>
        );
    }

    render() {
        const { adverts } = this.props;
        const { isAdvertModalOpen, modalType, advert,
            advertFilter, isMessageModalOpen, messageText, isDelModalOpen, delAdvertId } = this.state;
        const advertList = this.renderAdvertList(adverts);
        const resultFunc = modalType === 'create' ? this.onAdvertCreate : this.onAdvertEdit;
        const btnText = modalType === 'create' ? 'Create' : 'Edit';

        return (
            <div className={'AdvertPage'}>
                <div className={'advert-control-panel'}>
                    <input type={'text'}
                           className={'advert-find-input'}
                           value={advertFilter}
                           onChange={(e) => this.onFindTextChanged(e)}/>
                    <input type={'button'}
                           className={'advert-find-btn'}
                           value={'Find'}
                           onClick={() => this.findAdvertsClicked()}/>
                    <input type={'button'}
                           className={'advert-add-btn'}
                           value={'Add advert'}
                           onClick={() => this.openAdvertModalCreate()}/>
                </div>
                { advertList }
                <Modal open={isAdvertModalOpen} onClose={this.closeAdvertModal}>
                    <AdvertForm advert={advert}
                                onAdvertChange={this.onAdvertFieldChange}
                                onAdvertColorChange={this.onAdvertColorChange}
                                onResultSend={resultFunc}
                                resultBtnText={btnText}/>
                </Modal>
                <Modal open={isMessageModalOpen} onClose={this.closeMessageModal}>
                    <MessageForm messageText={messageText}
                                 onMessageChange={this.onMessageChanged}
                                 onMessageSend={this.onSendMessageClicked} />
                </Modal>
                <Modal open={isDelModalOpen} onClose={this.closeDelModal}>
                    <AcceptForm text={'Are you sure that you want delete this advert?'}
                                onAccept={this.deleteAdvert}
                                onReject={this.closeDelModal}/>
                </Modal>
            </div>
        )
    }

    openDelModal(id) {
        this.setState({ isDelModalOpen: true, delAdvertId: id })
    }

    closeDelModal() {
        this.setState({ isDelModalOpen: false, delAdvertId: null })
    }

    deleteAdvert() {
        const { delAdvertId: id } = this.state;
        this.props.deleteAdvertAction(id);
        this.setState({ isDelModalOpen: false, delAdvertId: null })
    }

    onReplyClicked(id) {
        this.setState({ isMessageModalOpen: true, repliedAdvert: id });
    }

    closeMessageModal() {
        this.setState({ isMessageModalOpen: false });
    }

    onMessageChanged(e) {
        this.setState({ messageText: e.target.value })
    }

    onSendMessageClicked() {
        const { curUser } = this.props;
        const { repliedAdvert, messageText } = this.state;

        socketController.replyOnAdvert(curUser.id, repliedAdvert, messageText);
        this.setState({ isMessageModalOpen: false, messageText: '' });
    }

    onFindTextChanged(e) {
        this.setState({ advertFilter: e.target.value})
    }

    findAdvertsClicked() {
        const filter = `?filter=${this.state.advertFilter}`;
        this.props.getAdvertAction(filter);
        this.props.history.push('advert' + filter)
    }

    openAdvertModalCreate() {
        this.setState({ isAdvertModalOpen: true, modalType: 'create' })
    }

    openModalEdit(advert) {
        this.setState({ isAdvertModalOpen: true, modalType: 'edit', advert })
    }

    closeAdvertModal() {
        this.setState({ isAdvertModalOpen: false, modalType: null })
    }

    onAdvertColorChange(color) {
        const newAdvertState = {
            ...this.state.advert,
            color
        };
        this.setState({ advert: newAdvertState })
    }

    onAdvertFieldChange(e) {
        const newAdvertState = {
            ...this.state.advert,
            [e.target.name]: e.target.value
        };
        this.setState({ advert: newAdvertState })
    }

    onAdvertCreate() {
        const { title, text, color } = this.state.advert;

        this.props.addAdvertAction({ title, text, color });
        this.setState( {
            advert: {
                title: '',
                text: '',
                color: '#f7d271'
            },
            isAdvertModalOpen: false,
            modalType: null
        })
    }

    onAdvertEdit() {
        const { id, title, text, color } = this.state.advert;
        this.props.updateAdvertAction(id, { title, text, color } )
        this.setState( {
            advert: {
                title: '',
                text: '',
                color: '#f7d271'
            },
            isAdvertModalOpen: false,
            modalType: null
        })
    }
}

const mapStateProps = (state) => {
    return {
        adverts: state.advertReducer.adverts,
        curUser: state.authReducer.curUser
    }
};

const mapDispatchToProps = (dispatch) => ({
    getAdvertAction: (query) => dispatch(getAdvertAction(query)),
    addAdvertAction: (advert) => dispatch(addAdvertAction(advert)),
    deleteAdvertAction: (advertId) => dispatch(deleteAdvertAction(advertId)),
    updateAdvertAction: (advertId, advert) => dispatch(updateAdvertAction(advertId, advert))
});

export default connect(mapStateProps, mapDispatchToProps)(AdvertPage);
