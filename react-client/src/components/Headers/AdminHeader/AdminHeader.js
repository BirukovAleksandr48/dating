import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect'
import './AdminHeader.sass';
import { getPictureUrl } from "../../../utils/functions";
import Loader from "../../../utils/Loader";

class AdminHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mode: 'CREATE USER'
        }
    }

    onModeChangeClicked() {
        this.setState(state => {
            if(state.mode === 'CREATE USER')
                return { mode: 'MANAGE USERS' }
            else
                return { mode: 'CREATE USER' }
        })
        this.props.onModeChange();
    }

    onBackClicked() {
        this.props.history.goBack()
    }

    onUserClicked() {
        this.props.history.push('/users/' + this.props.curUser.id)
    }

    render() {
        const curUser = this.props.curUser;
        if(curUser) {
            return (
                <div className="AdminHeader">
                    <div className="headerContent">
                        <a className="btnHeader" onClick={() => this.onBackClicked()}>BACK</a>
                        <a className="btnHeader" onClick={() => this.onModeChangeClicked()}>{ this.state.mode }</a>
                        <div className="user" onClick={() => this.onUserClicked()}>
                            <div className="avatar"
                                 style={{backgroundImage: `url(${getPictureUrl(curUser.profilePicture)})`}}/>
                            <span className="name">{curUser.email}</span>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default AdminHeader;
