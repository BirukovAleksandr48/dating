import React, {Component} from 'react';
import {Route} from "react-router-dom";

import './DefaultLayout.sass'

import connect from "react-redux/es/connect/connect";
import { getCurrentUserAction } from '../actions/actionCreator'

import DefaultHeader from "../components/Headers/DefaultHeader/DefaultHeader";
import SideBar from "../components/SideBar/SideBar";
import Loader from "../utils/Loader";
import Chat from "../components/Chat/Chat";
import {socketController} from "../api/ws/wsService";

class DefaultLayout extends Component {

    render() {
        const {component: Component, curUser, withoutSidebar } = this.props;

        if(curUser) {
            return (
                <Route
                    render={props => (
                        <div className={'Page'}>
                            <DefaultHeader {...props}/>
                            <div className={'Page-body'}>
                                { !withoutSidebar && <SideBar {...props}/> }
                                <Component {...props} />
                            </div>
                            <Chat {...props} />
                        </div>
                    )}
                />
            )
        } else {
            return(<Loader/>)
        }
    }

    componentDidMount() {
        this.props.getCurrentUserAction();
    }

    componentWillUnmount() {
        const { curUser } = this.props;
        if(curUser)
            socketController.unsubscribe(curUser.id);
    }

}

const mapStateProps = (state) => {
    return {
        curUser: state.authReducer.curUser
    }
};
const mapDispatchToProps = (dispatch) => ({
    getCurrentUserAction: () => dispatch(getCurrentUserAction())
});

export default connect(mapStateProps, mapDispatchToProps)(DefaultLayout);
