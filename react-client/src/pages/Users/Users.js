import React, { Component } from 'react';
import './Users.sass';
import Loader from '../../utils/Loader'
import connect from 'react-redux/es/connect/connect'
import User from './components/User/User'
import { getUsersAction } from "../../actions/actionCreator";

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: this.props.location.search
        }
    }

    renderUser () {
        const users = this.props.users;
        if(users.length === 0) {
            return (
                <div className="no-users">
                    <div className="no-users-image"/>
                    <span className="no-users-text">Users not found</span>
                </div>
            )
        }
        const onItemClicked = (uid) => {
            this.props.history.push('/users/' + uid)
        };
        return users.map( (user) =>
            <div className="user-item"
                 key={ user.id }
                 onClick={ () => onItemClicked(user.id) }>
                <User user={ user }/>
            </div>
        )
    }

    render () {

            if(!this.props.isFetching) {
                return (
                    <div className='Users'>
                        { this.renderUser() }
                    </div>
                )
            } else {
                return (<Loader/>)
            }

    }

    componentDidMount() {
        this.props.getUsersAction(this.state.query);
    }

}

const mapStateProps = (state) => {
    return {
        isFetching: state.userReducer.isFetching,
        error: state.userReducer.error,
        users: state.userReducer.users
    }
};
const mapDispatchToProps = (dispatch) => ({
    getUsersAction: (query) => dispatch(getUsersAction(query))
});

export default connect(mapStateProps, mapDispatchToProps)(Users);
