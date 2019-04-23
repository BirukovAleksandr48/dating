import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect'
import './EditProfile.sass';

import {getUserByIdAction, updateUserAction, uploadUserAvatarAction } from "../../actions/actionCreator";
import {
    intentionArray,
    educationArray,
    genderArray,
    civilStatusArray,
    religionArray,
    childrenArray, piercingsArray, smokerArray, tattoosArray
} from '../../constants'
import { isUserDataInvalid } from "../../utils/userValidate";

import InputField from "../../components/InputField/InputField";
import SelectField from "../../components/SelectField/SelectField";
import DatePicker from "../../components/DatePicker/DatePicker";
import Loader from "../../utils/Loader";
import * as Toaster from "../../utils/Toaster";
import Modal from "react-responsive-modal";
import AcceptForm from "../../components/AcceptForm/AcceptForm";

class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAnyFieldChanged: false,
            isSaveModalOpen: false,
        };
        this.onBirthDateChange = this.onBirthDateChange.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
        this.closeSaveModal = this.closeSaveModal.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    componentDidMount() {
        const { getUserByIdAction, match, history, curUser } = this.props;
        console.log('curUser.id === parseInt(match.params.id) || curUser.role === \'admin\'',
            curUser.role)
        if(curUser.id === parseInt(match.params.id) || curUser.role === 'admin') {
            getUserByIdAction(match.params.id)
        } else {
            history.goBack();
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.user)
            this.setState({ user: { ...nextProps.user } })
    }

    render() {
        const { match, curUser } = this.props;
        if(curUser.id === parseInt(match.params.id) || curUser.role === 'admin') {
            if(this.state.user && !this.props.isFetching) {
                return this.renderEditForm()
            } else {
                return this.renderLoader()
            }
        } else {
            return null
        }
    }

    renderEditForm() {
        const { firstName, lastName, gender, birthDate, education, intention,
        work, civilStatus, tattoos, smoker, piercings, religion, children, city} = this.state.user;
        const btnSaveClass = this.state.isAnyFieldChanged ? 'btnSave' : 'btnSave inactive';

        return (
            <div className="EditProfile">
                <div className="edit">
                    <div className="row">
                        <InputField value={firstName} title={'First name'} type={'text'} color={'black'}
                                    name={'firstName'} onChange={this.onFieldChange} size={'small'}/>
                        <InputField value={lastName} title={'Last name'} type={'text'} color={'black'}
                                    name={'lastName'} onChange={this.onFieldChange} size={'small'}/>
                    </div>
                    <div className="row">
                        <SelectField value={gender} title={'Gender'}  color={'black'} size={'small'}
                                     array={genderArray} name={'gender'} onChange={this.onFieldChange}/>
                        <DatePicker value={birthDate} onChange={this.onBirthDateChange}
                                    title={'Birth date'} color={'black'} size={'small'}/>
                    </div>
                    <div className="row">
                        <SelectField value={education} title={'Education'} color={'black'} size={'small'}
                                     array={educationArray} name={'education'} onChange={this.onFieldChange}/>
                        <SelectField value={intention} title={'Intention'} color={'black'} size={'small'}
                                     array={intentionArray} name={'intention'} onChange={this.onFieldChange}/>
                    </div>
                    <div className="row">
                        <InputField value={work} title={'Work'} color={'black'} type={'text'} size={'small'}
                                    name={'work'} onChange={this.onFieldChange}/>
                        <InputField value={city} title={'City'} color={'black'} type={'text'} size={'small'}
                                    name={'city'} onChange={this.onFieldChange}/>
                    </div>
                    <div className="row">
                        <SelectField value={civilStatus} title={'Civil status'} color={'black'} size={'small'}
                                     array={civilStatusArray} name={'civilStatus'} onChange={this.onFieldChange}/>
                        <SelectField value={religion} title={'Religion'} color={'black'} size={'small'}
                                     array={religionArray} name={'religion'} onChange={this.onFieldChange}/>
                    </div>
                    <div className="row">
                        <SelectField value={children} title={'Children'} color={'black'} size={'small'}
                                     array={childrenArray} name={'children'} onChange={this.onFieldChange}/>
                        <SelectField value={piercings} title={'Piercings'} color={'black'} size={'small'}
                                     array={piercingsArray} name={'piercings'} onChange={this.onFieldChange}/>
                    </div>
                    <div className="row">
                        <SelectField value={smoker} title={'Smoker'} color={'black'} size={'small'}
                                     array={smokerArray} name={'smoker'} onChange={this.onFieldChange}/>
                        <SelectField value={tattoos} title={'Tattoos'} color={'black'} size={'small'}
                                     array={tattoosArray} name={'tattoos'} onChange={this.onFieldChange}/>
                    </div>
                    <div className="row">
                        <input type="file" name="myImage" accept="image/x-png,image/gif,image/jpeg" id="photo" className="input-file" onChange={(e) => this.onUpdateAvatarClicked(e)}/>
                        <label htmlFor="photo" className="btnSave">Update avatar</label>
                        <a className={btnSaveClass} onClick={() => this.openSaveModal()}>Save changes</a>
                    </div>
                </div>
                <Modal open={this.state.isSaveModalOpen} onClose={this.closeSaveModal}>
                    <AcceptForm text={'Are you sure that you want save changes?'}
                                onAccept={this.saveUser}
                                onReject={this.closeSaveModal}/>
                </Modal>
            </div>
        )
    }

    openSaveModal() {
        this.setState({ isSaveModalOpen: true })
    }

    closeSaveModal() {
        this.setState({ isSaveModalOpen: false })
    }

    renderLoader() {
        return (
            <div className="EditProfile">
                <Loader/>
            </div>
        )
    }

    onBirthDateChange (date) {
        if(date && date !== this.state.user.birthDate) {
            this.setState(state => { return { user: { ...state.user, birthDate: date }, isAnyFieldChanged: true } })
        }
    }

    onFieldChange(e) {
        const newUserState = {
            ...this.state.user,
            [e.target.name]: e.target.value
        };
        this.setState({ user: newUserState, isAnyFieldChanged: true })
    }

    saveUser() {
        const result = isUserDataInvalid(this.state.user);
        if(result) {
            this.setState({ isSaveModalOpen: false });
            return Toaster.showError(result);
        }

        const updatedFields = {
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            gender: this.state.user.gender,
            birthDate: this.state.user.birthDate,
            intention: this.state.user.intention,
            education: this.state.user.education
        };
        this.props.updateUserAction(this.props.match.params.id, updatedFields);
        this.setState({ isAnyFieldChanged: false, isSaveModalOpen: false });
    }

    onUpdateAvatarClicked(e) {
        const maxFileSize = 5242880;
        const image = e.target.files[0]
        if(!image)
            return;
        if(image.size >= maxFileSize)
            Toaster.showError('Maximum file size is 5Mb')
        else if (image.type.indexOf('image/') !== 0)
            Toaster.showError('The selected file`s type must be an image')
        else
            this.props.uploadUserAvatarAction(this.props.match.params.id, e.target.files[0])
    }
}

const mapStateProps = (state, router) => {
    const user = state.userReducer.users.find(u => u.id === Number(router.match.params.id));
    return {
        user,
        curUser: state.authReducer.curUser
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUserByIdAction: (userId) => dispatch(getUserByIdAction(userId)),
    updateUserAction: (userId, updatedFields) => dispatch(updateUserAction(userId, updatedFields)),
    uploadUserAvatarAction: (userId, updatedFields) => dispatch(uploadUserAvatarAction(userId, updatedFields)),
});

export default connect(mapStateProps, mapDispatchToProps)(EditProfile);
