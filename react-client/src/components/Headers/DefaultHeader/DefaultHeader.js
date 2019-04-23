import React, {Component} from 'react';
import './DefaultHeader.sass'

import { getPictureUrl } from "../../../utils/functions";
import {
    getUsersAction,
    logoutAction,
    getUserByIdAction,
    getPhotosAction,
    changeChatStateAction
} from "../../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";

class DefaultHeader extends Component {

    constructor(props) {
        super(props)
        console.log('DefaultHeader props', props)
    }

    onLogoClicked() {
        this.props.getUsersAction();
        this.props.history.push('/users');
    }

    onLogoutClicked() {
        this.props.logoutAction(this.props.history);
    }

    onMessengerClick() {
        this.props.changeChatStateAction({ isHidden: false });
    }

    onMyProfileClicked() {
        this.props.history.push('/users/' + this.props.curUser.id);
        this.props.getUserByIdAction(this.props.curUser.id);
        this.props.getPhotosAction(this.props.curUser.id);
    }

    onEditProfileClicked() {
        this.props.history.push('/edit/' + this.props.curUser.id);
    }

    onAdminClick() {
        this.props.history.push('/admin');
    }
    onAdvertsClicked() {
        this.props.history.push('/advert');
    }
    render() {
        const curUser = this.props.curUser;
        return (
            <div className="DefaultHeader">
                <div className="headerContent">
                    <div className="logotype" onClick={() => this.onLogoClicked()}>
                        <div className="logo"/>
                    </div>
                    <div className="current-user">
                        <div className="dropdown-menu">
                            <div className="dropdown-btn">
                                <span className="title">configuration</span>
                                <div className="icon"/>
                            </div>
                            <div className="dropdown-content">
                                <a onClick={() => this.onMyProfileClicked()}>My profile</a>
                                <a onClick={() => this.onEditProfileClicked()}>Edit profile</a>
                                <a onClick={() => this.onAdvertsClicked()}>Adverts</a>
                                <a onClick={() => this.onMessengerClick()}>Messenger</a>
                                {
                                    curUser.role !== 'user' &&
                                    <a onClick={() => this.onAdminClick()}>Admin panel</a>
                                }
                                <a onClick={() => this.onLogoutClicked()}>Logout</a>
                            </div>
                        </div>
                        <div className="avatar"
                             onClick={() => this.onMyProfileClicked()}
                             style ={ { backgroundImage: `url(${getPictureUrl(curUser.profilePicture, curUser.gender)})`}}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateProps = (state) => {
    return {
        isFetching: state.authReducer.isFetching,
        error: state.authReducer.error,
        curUser: state.authReducer.curUser
    }
};

const mapDispatchToProps = (dispatch) => ({
    logoutAction: (history) => dispatch(logoutAction(history)),
    getUsersAction: (query) => dispatch(getUsersAction(query)),
    getUserByIdAction: (userId) => dispatch(getUserByIdAction(userId)),
    getPhotosAction: (userId) => dispatch(getPhotosAction(userId)),
    changeChatStateAction: (updatedFields) => dispatch(changeChatStateAction(updatedFields))
});

export default connect(mapStateProps, mapDispatchToProps)(DefaultHeader);
