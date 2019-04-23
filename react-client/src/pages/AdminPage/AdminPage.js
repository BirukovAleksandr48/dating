import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect'
import './AdminPage.sass';
import { getCurrentUserAction } from "../../actions/actionCreator";

import AdminHeader from "../../components/Headers/AdminHeader/AdminHeader";
import AdminForm from './components/AdminForm/AdminForm'
import CreateUserForm from './components/CreateUserForm/CreateUserForm'

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCreateUserMode: false
        };
        this.onModeChange = this.onModeChange.bind(this)
    }

    componentDidMount() {
        this.props.getCurrentUserAction()
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const { curUser } = nextProps;
        if(curUser && curUser.role === 'user') {
            this.props.history.goBack();
            return false
        }
        return true
    }

    render() {
        const { isCreateUserMode } = this.state;
        const content = isCreateUserMode ? <CreateUserForm/> : <AdminForm {...this.props}/>;
        const { curUser } = this.props;

        if(curUser && curUser.role !== 'user')
            return(
                <div className={'AdminPage'}>
                    <AdminHeader {...this.props} onModeChange={this.onModeChange}/>
                    { content }
                </div>
            );
        else
            return null
    }

    onModeChange() {
        this.setState(state => {
            return { isCreateUserMode: !state.isCreateUserMode }
        })
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

export default connect(mapStateProps, mapDispatchToProps)(AdminPage);
