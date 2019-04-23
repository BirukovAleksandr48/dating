import React, { Component } from 'react';
import './UserProfile.sass';
import Loader from '../../utils/Loader'
import connect from 'react-redux/es/connect/connect'
import {
    deletePhotoByIdAction,
    getPhotosAction,
    getUserByIdAction,
    uploadPhotoAction,
    createConversationAction,
    createMessageAction
} from "../../actions/actionCreator";
import { getPictureUrl, getAge } from "../../utils/functions";
import * as Toaster from "../../utils/Toaster";
import GalleryItem from "./components/GalleryItem/GalleryItem";
import Modal from "react-responsive-modal";
import MessageForm from "../../components/Chat/components/MessageForm/MessageForm";
import AcceptForm from "../../components/AcceptForm/AcceptForm";
import {images} from "../../images";

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMesModalOpen: false,
            isDelModalOpen: false,
            messageText: '',
            delPhotoId: null
        };
        this.onItemClicked = this.onItemClicked.bind(this);
        this.onSendMessageClicked = this.onSendMessageClicked.bind(this);
        this.onMessageTextChanged = this.onMessageTextChanged.bind(this);
        this.onCloseMesModalClicked = this.onCloseMesModalClicked.bind(this);

        this.onCloseDelModalClicked = this.onCloseDelModalClicked.bind(this);
        this.onOpenDelModalClicked = this.onOpenDelModalClicked.bind(this);

        this.deletePhoto = this.deletePhoto.bind(this);
    }

    onUploadClicked(e) {
        const maxFileSize = 5242880;
        const image = e.target.files[0]
        if(!image)
            return;
        if(image.size >= maxFileSize)
            Toaster.showError('Maximum file size is 5Mb')
        else if (image.type.indexOf('image/') !== 0)
            Toaster.showError('The selected file`s type must be an image')
        else
            this.props.uploadPhotoAction(e.target.files[0], this.props.match.params.id);
    }

    onOpenMessageModalClicked() {
        this.setState({ isMesModalOpen: true });
    }

    onCloseMesModalClicked() {
        this.setState({ isMesModalOpen: false });
    }

    onMessageTextChanged(e) {
        this.setState({ messageText: e.target.value })
    }

    onSendMessageClicked(messageText) {
        if(!messageText.length) {
            Toaster.showError('Message is empty');
            return;
        }
        const { conversation, user } = this.props;
        if(conversation) {
            this.props.createMessageAction({ cid: conversation._id, text: messageText });
        } else {
            this.props.createConversationAction(user, messageText)
        }
        this.setState({ isMesModalOpen: false, messageText: '' });
    }

    renderUser () {
        const { user, curUser } = this.props;
        const isMineProfile = curUser.id === user.id;
        return(
            <>
                <div className={'left-block'}>
                    <div className="avatar"
                         style={ { backgroundImage: `url(${getPictureUrl(user.profilePicture, user.gender)})` } }/>
                    {!isMineProfile && <input className={'btn-send-message'}
                                              type={'button'}
                                              value={'Send message'}
                                              onClick={() => this.onOpenMessageModalClicked()}/>
                    }
                </div>
                <div className={'right-block'}>
                    <span className="name">
                        {user.firstName} {user.lastName}
                    </span>
                    <span className="status">
                        Hi, I'm {user.firstName}, I live in Nunoa, and I am {getAge(user.birthDate)} years old.
                        I do not have children and I'm looking for a {user.intention}
                    </span>
                    <div className={'full-info'}>
                        <span className="table-title">More about me:</span>
                        <table>
                            <tbody>
                            <tr>
                                <td>Civil status: {user.civilStatus}</td>
                                <td>Education: {user.education}</td>
                            </tr>
                            <tr>
                                <td>Religion: {user.religion}</td>
                                <td>Tattoos: {user.tattoos}</td>
                            </tr>
                            <tr>
                                <td>Children: {user.children}</td>
                                <td>Work: {user.work}</td>
                            </tr>
                            <tr>
                                <td>Piercings: {user.piercings}</td>
                                <td>City: {user.city}</td>
                            </tr>
                            <tr>
                                <td>Smoker: {user.smoker}</td>
                                <td>Intention: {user.intention}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal open={this.state.isMesModalOpen} onClose={this.onCloseMesModalClicked}>
                    <MessageForm messageText={this.state.messageText}
                                 onMessageChange={this.onMessageTextChanged}
                                 onMessageSend={this.onSendMessageClicked} />
                </Modal>
            </>
        )
    }

    onOpenDelModalClicked(id) {
        this.setState({ isDelModalOpen: true, delPhotoId: id })
    }

    onCloseDelModalClicked() {
        this.setState({ isDelModalOpen: false, delPhotoId: null })
    }

    deletePhoto() {
        const { delPhotoId } = this.state;
        this.props.deletePhotoByIdAction(delPhotoId);
        this.setState({ isDelModalOpen: false, delPhotoId: null })
    }

    onItemClicked(id) {
        this.props.history.push('/photo/' + id)
    }

    renderAlbum() {
        const { photos, user, curUser } = this.props;
        const couldDelete = curUser.id === user.id ||
            (curUser.role === 'admin' && user.role !== 'admin');

        if(photos.length === 0) {
            return (
                <div className="no-photo">
                    <div className="no-photo-image"/>
                    <span className="no-photo-text">{user.firstName} {user.lastName} doesn`t have any photos</span>
                </div>
            )
        }

        return (
            <div className="gallery">
                { photos.map( (photo, key) =>
                    <GalleryItem key={key}
                                 photo={photo}
                                 onItemClicked={this.onItemClicked}
                                 onItemDelete={this.onOpenDelModalClicked}
                                 couldDelete={couldDelete}/>
                    )
                }
                <Modal open={this.state.isDelModalOpen} onClose={this.onCloseDelModalClicked}>
                    <AcceptForm text={'Are you sure that you want delete this photo?'}
                                onAccept={this.deletePhoto}
                                onReject={this.onCloseDelModalClicked}/>
                </Modal>
            </div>
        )
    }

    render() {
        const { curUser, user, isFetching, photos } = this.props;
        if(!isFetching && user) {
            const isMineProfile = curUser.id === user.id;
            return (
                <div className={'UserProfile'}>
                    <div className="user-info">
                        { this.renderUser() }
                    </div>
                    <div className={'user-album-header'}>
                        <span className={'album-header-text'}>Gallery</span>
                        {isMineProfile && (
                                <>
                                    <input type="file" id="photo" className="input-file" onChange={(e) => this.onUploadClicked(e)}/>
                                    <label htmlFor="photo" className={'btn-upload'}>+ Add Photo</label>
                                </>
                            )
                        }

                    </div>
                    <div className="user-album">
                        { photos ? this.renderAlbum() : <Loader/>}
                    </div>
                </div>
            )
        } else {
            return (<Loader/>)
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getUserByIdAction(id);
        this.props.getPhotosAction(id);
    }
}

const mapStateProps = (state, router) => {
    const user = state.userReducer.users.find(u => u.id === parseInt(router.match.params.id));
    const conversations = state.chatReducer.conversations;
    let conversation = null;
    if(user)
        conversation = conversations.find(i => i.participants.includes(user.id));

    return {
        error: state.userReducer.error,
        photos: state.photoReducer.photos,
        curUser: state.authReducer.curUser,
        user,
        conversation
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUserByIdAction: (userId) => dispatch(getUserByIdAction(userId)),
    getPhotosAction: (userId) => dispatch(getPhotosAction(userId)),
    uploadPhotoAction: (selectedFile, userId) => dispatch(uploadPhotoAction(selectedFile, userId)),
    deletePhotoByIdAction: (photoId) => dispatch(deletePhotoByIdAction(photoId)),
    createMessageAction: (message) => dispatch(createMessageAction(message)),
    createConversationAction: (recipient, messageText) => dispatch(createConversationAction(recipient, messageText))
});

export default connect(mapStateProps, mapDispatchToProps)(UserProfile);
