import React, {Component} from 'react';
import * as Toaster from '../../../../utils/Toaster'
import connect from 'react-redux/es/connect/connect'
import { signUpAction } from "../../../../actions/actionCreator";
import * as Validator from '../../../../utils/Validator'
import InputField from '../../../../components/InputField/InputField'
import SelectField from '../../../../components/SelectField/SelectField'
import DatePicker from '../../../../components/DatePicker/DatePicker'
import './SignUp.sass';
import { genderArray, educationArray,
    intentionArray, childrenArray,
    civilStatusArray, piercingsArray,
    religionArray, smokerArray,
    tattoosArray } from '../../../../constants';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isHiden: true,

            user: {
                email: "kostya@gmail.com",
                password: '1qaz2w3e4r',
                firstName: 'Alex',
                lastName: 'Gagarin',
                gender: 'man',
                birthDate: '1988-01-05',
                intention: 'sex',
                education: 'Basic',
                civilStatus: 'Single',
                religion: 'Christianity',
                children: 'No',
                piercings: 'Yes',
                smoker: 'No',
                tattoos: 'Yes',
                work: 'Programmer',
                city: 'Kiyev'
            },
            acceptTerms: false,
            regFormNumber: 1
        };
        this.onBirthDateChange = this.onBirthDateChange.bind(this)
        this.onFieldChange = this.onFieldChange.bind(this)
    }

    isSignUpDataValid() {
        if (!Validator.email(this.state.user.email)) {
            Toaster.showError('Email is invalid');
            return false;
        } else if (!Validator.password(this.state.user.password)) {
            Toaster.showError('Password length must be 8-12 symbols');
            return false;
        } else if (!Validator.notEmpty(this.state.user.firstName)) {
            Toaster.showError('First name invalid');
            return false;
        } else if (!Validator.notEmpty(this.state.user.lastName)) {
            Toaster.showError('Last name invalid');
            return false;
        } else if (!Validator.olderThan(this.state.user.birthDate, 18)) {
            Toaster.showError('You must be at least 18 years old');
            return false;
        } else if (!Validator.isInCollection(this.state.user.gender, genderArray)) {
            Toaster.showError('Incorrect gender value');
            return false;
        } else if (!Validator.isInCollection(this.state.user.education, educationArray)) {
            Toaster.showError('Incorrect education value');
            return false;
        } else if (!Validator.isInCollection(this.state.user.intention, intentionArray)) {
            Toaster.showError('Incorrect intention value');
            return false;
        } else if (!Validator.isInCollection(this.state.user.religion, religionArray)) {
            Toaster.showError('Incorrect religion value');
            return false;
        } else if (!Validator.isInCollection(this.state.user.civilStatus, civilStatusArray)) {
            Toaster.showError('Incorrect civil status value');
            return false;
        } else if (!Validator.isInCollection(this.state.user.children, childrenArray)) {
            Toaster.showError('Incorrect children value');
            return false;
        } else if (!Validator.isInCollection(this.state.user.piercings, piercingsArray)) {
            Toaster.showError('Incorrect piercings value');
            return false;
        } else if (!Validator.isInCollection(this.state.user.smoker, smokerArray)) {
            Toaster.showError('Incorrect smoker value');
            return false;
        } else if (!Validator.isInCollection(this.state.user.tattoos, tattoosArray)) {
            Toaster.showError('Incorrect tattoos value');
            return false;
        } else if (!Validator.notEmpty(this.state.user.work)) {
            Toaster.showError('Incorrect work value');
            return false;
        } else if (!Validator.notEmpty(this.state.user.city)) {
            Toaster.showError('Incorrect city value');
            return false;
        } else if (!this.state.acceptTerms) {
            Toaster.showError('You must accept the terms');
            return false;
        }
        return true;
    }

    onSignUpClicked() {
        if(!this.isSignUpDataValid())
            return;

        this.props.signUpAction(this.state.user, this.props.history);
    }

    onNextFormClicked() {
        this.setState({ regFormNumber: 2 })
    }

    onFieldChange(e) {
        if(e.target.type === 'checkbox') {
            return this.setState({ acceptTerms: e.target.checked })
        } else {
            this.setState( { user: { ...this.state.user, [e.target.name]: e.target.value } });
        }
    }

    onBirthDateChange(date) {
        if(date) {
            this.setState( { user: { ...this.state.user, birthDate: date } });
        }
    }

    render() {

        return (
            <div className="SignUp">
                { this.state.regFormNumber === 1 ? this.renderFirstForm() : this.renderSecondForm() }
                <div className="regFooter">
                    <div className="checkBox">
                        <input type="checkbox" id="cbReg"
                               onChange={(e) => this.onFieldChange(e)}/>
                        <label htmlFor="cbReg"
                               className="cbText">I accept Terms of use</label>
                    </div>
                    { this.state.regFormNumber === 1
                        ? <a className="btnNextForm" onClick={() => this.onNextFormClicked()}>Next</a>
                        : <a className="btnSignUp" onClick={() => this.onSignUpClicked()}>Sign Up</a>
                    }
                </div>
            </div>
        )
    }

    renderFirstForm() {
        const { onFieldChange, onBirthDateChange, state } = this;
        const { firstName, lastName, email, password, gender, birthDate, education, intention } = state.user;
        return (
            <div className="UserDataForm">
                <div className="row">
                    <InputField value={firstName} title={'First name'} color={'white'} type={'text'}
                                name={'firstName'} onChange={onFieldChange}/>
                    <InputField value={lastName} title={'Last name'} color={'white'} type={'text'}
                                name={'lastName'} onChange={onFieldChange}/>
                </div>
                <div className="row">
                    <InputField value={email} title={'Email'} color={'white'} type={'email'}
                                name={'email'} onChange={onFieldChange}/>
                    <InputField value={password} title={'Password'} color={'white'} type={'password'}
                                name={'password'} onChange={onFieldChange}/>
                </div>
                <div className="row">
                    <SelectField value={gender} title={'Gender'} color={'white'}
                                 array={genderArray} name={'gender'} onChange={onFieldChange}/>
                    <DatePicker value={birthDate} title={'Birth date'}
                                onChange={onBirthDateChange} color={'white'}/>
                </div>
                <div className="row">
                    <SelectField value={education} title={'Education'} color={'white'}
                                 array={educationArray} name={'education'} onChange={onFieldChange}/>
                    <SelectField value={intention} title={'Intention'} color={'white'}
                                 array={intentionArray} name={'intention'} onChange={onFieldChange}/>
                </div>
            </div>
        )
    }

    renderSecondForm() {
        const { onFieldChange, state } = this;
        const { civilStatus, religion, children, piercings, smoker, tattoos, work, city } = state.user;
        return (
            <div className="UserDataForm">
                <div className="row">
                    <InputField value={work} title={'Work'} color={'white'} type={'text'}
                                name={'work'} onChange={onFieldChange}/>
                    <InputField value={city} title={'City'} color={'white'} type={'text'}
                                name={'city'} onChange={onFieldChange}/>
                </div>
                <div className="row">
                    <SelectField value={civilStatus} title={'Civil status'} color={'white'}
                                 array={civilStatusArray} name={'civilStatus'} onChange={onFieldChange}/>
                    <SelectField value={religion} title={'Religion'} color={'white'}
                                 array={religionArray} name={'religion'} onChange={onFieldChange}/>
                </div>
                <div className="row">
                    <SelectField value={children} title={'Children'} color={'white'}
                                 array={childrenArray} name={'children'} onChange={onFieldChange}/>
                    <SelectField value={piercings} title={'Piercings'} color={'white'}
                                 array={piercingsArray} name={'piercings'} onChange={onFieldChange}/>
                </div>
                <div className="row">
                    <SelectField value={smoker} title={'Smoker'} color={'white'}
                                 array={smokerArray} name={'smoker'} onChange={onFieldChange}/>
                    <SelectField value={tattoos} title={'Tattoos'} color={'white'}
                                 array={tattoosArray} name={'tattoos'} onChange={onFieldChange}/>
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
    signUpAction: (signUpData, history) => dispatch(signUpAction(signUpData, history))
});

export default connect(mapStateProps, mapDispatchToProps)(SignUp);
