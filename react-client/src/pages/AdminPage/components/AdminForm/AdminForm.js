import React, {Component} from 'react';
import './AdminForm.sass';
import {
    changeUserStateAction,
    deleteUserAction,
    getCurrentUserAction,
    getUsersAction,
    updateUserAction
} from "../../../../actions/actionCreator";
import connect from "react-redux/es/connect/connect";
import Loader from "../../../../utils/Loader";
import InputField from "../../../../components/InputField/InputField";
import * as Toaster from "../../../../utils/Toaster";
import Modal from "react-responsive-modal";
import AcceptForm from "../../../../components/AcceptForm/AcceptForm";

class AdminForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roleOptions: ['user', 'moderator', 'admin'],
            filter: '',
            isSaveModalOpen: false,
            isDelModalOpen: false,
            manipulatedUser: null
        };
        this.onFilterChange = this.onFilterChange.bind(this);
        this.closeSaveModal = this.closeSaveModal.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.closeDelModal = this.closeDelModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    onFieldChanged(id, field, event) {
        if(event.target.type === 'checkbox') {
            this.props.changeUserStateAction(id, field, event.target.checked)
        } else {
            this.props.changeUserStateAction(id, field, event.target.value)
        }
    }

    saveUser() {
        const { manipulatedUser: user } = this.state;
        this.setState({ isSaveModalOpen: false, manipulatedUser: null })
        if(!user.isChanged) {
            return Toaster.showError('Nothing to save');
        }

        const updatedFields = {
            isBaned: user.isBaned
        };
        if(this.props.curUser.role === 'admin')
            updatedFields.role = user.role;

        this.props.updateUserAction(user.id, updatedFields);
    }

    deleteUser() {
        const { manipulatedUser } = this.state;
        this.setState({ isDelModalOpen: false, manipulatedUser: null });
        this.props.deleteUserAction(manipulatedUser.id);
    }

    onUserClicked(id) {
        this.props.history.push('/users/' + id);
    }

    ifDisabled(user) {
        const curUser = this.props.curUser;
        if(user.isChanged)
            return false;
        return user.id === curUser.id ||
            user.role === 'admin' ||
            (curUser.role === 'moderator' && user.role === 'moderator')
    }

    onFilterChange(e) {
        this.setState({ filter: e.target.value })
    }

    onEditClicked(id) {
        this.props.history.push('/edit/' + id);
    }

    openSaveModal(user) {
        this.setState({ isSaveModalOpen: true, manipulatedUser: user })
    }

    closeSaveModal() {
        this.setState({ isSaveModalOpen: false, manipulatedUser: null })
    }

    openDelModal(user) {
        this.setState({ isDelModalOpen: true, manipulatedUser: user })
    }

    closeDelModal() {
        this.setState({ isDelModalOpen: false, manipulatedUser: null })
    }

    renderRows() {
        const users = this.props.users;
        const roleOptions = this.state.roleOptions.map((value, key) => {
            return <option key={ key }>{ value }</option>
        });

        return users.map((user, key) => {
            if(user.email.indexOf(this.state.filter) !== -1) {
                const isDisabledItem = this.ifDisabled(user);
                const isDisabledCol = this.props.curUser.role === 'moderator';
                const rowClass = isDisabledItem ? 'row disabled' : 'row';
                return (
                    <tr key={key} className={rowClass}>
                        <td>{key + 1}</td>
                        <td className="uEmail">
                            <a className="link-user-profile" onClick={() => this.onUserClicked(user.id)}>
                                {user.email}
                            </a>
                        </td>
                        <td>
                            <select value={user.role}
                                    disabled={isDisabledItem || isDisabledCol}
                                    onChange={(e) => this.onFieldChanged(user.id, 'role', e)}>
                                {roleOptions}
                            </select>
                        </td>
                        <td>
                            <input type="checkbox"
                                   checked={user.isBaned}
                                   className="cb"
                                   disabled={isDisabledItem}
                                   onChange={(e) => this.onFieldChanged(user.id, 'isBaned', e)}/>
                        </td>
                        <td>
                            <button className="save"
                                    disabled={isDisabledItem}
                                    onClick={() => this.openSaveModal(user)}>Save changes</button>
                        </td>
                        <td>
                            <button className="edit"
                                    disabled={isDisabledItem}
                                    onClick={() => this.onEditClicked(user.id)}>Edit user</button>
                        </td>
                        <td>
                            <button className="delete"
                                    disabled={isDisabledItem}
                                    onClick={() => this.openDelModal(user)}>Delete user
                            </button>
                        </td>
                    </tr>
                )
            }
        })
    }

    renderLoader() {
        return <Loader/>
    }

    render() {
        if(this.props.users.length) {
            const rows = this.renderRows();
            return (
                <div className="AdminForm">

                    <div className={'admin-filter'}>
                        <InputField type={'text'} color={'black'} placeholder={'email'}
                                    name={'firstName'} onChange={this.onFilterChange} size={'small'}/>
                    </div>

                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Role</th>
                            <th>Baned</th>
                            <th>Save changes</th>
                            <th>Edit user</th>
                            <th>Delete user</th>
                        </tr>
                        </thead>
                        <tbody>
                        { rows }
                        </tbody>
                    </table>
                    <Modal open={this.state.isSaveModalOpen} onClose={this.closeSaveModal}>
                        <AcceptForm text={'Are you sure that you want save changes?'}
                                    onAccept={this.saveUser}
                                    onReject={this.closeSaveModal}/>
                    </Modal>
                    <Modal open={this.state.isDelModalOpen} onClose={this.closeDelModal}>
                        <AcceptForm text={'Are you sure that you want delete user?'}
                                    onAccept={this.deleteUser}
                                    onReject={this.closeDelModal}/>
                    </Modal>
                </div>
            )
        } else {
            return this.renderLoader();
        }
    }

    componentDidMount() {
        this.props.getUsersAction()
    }
}

const mapStateProps = (state, router) => {
    return {
        isFetching: state.userReducer.isFetching,
        error: state.userReducer.error,
        users: state.userReducer.users
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUsersAction: (query) => dispatch(getUsersAction(query)),
    updateUserAction: (userId, updatedFields) => dispatch(updateUserAction(userId, updatedFields)),
    deleteUserAction: (userId) => dispatch(deleteUserAction(userId)),
    changeUserStateAction: (userId, field, value) => dispatch(changeUserStateAction(userId, field, value))
});

export default connect(mapStateProps, mapDispatchToProps)(AdminForm);
