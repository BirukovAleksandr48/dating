import React, { Component } from 'react';
import * as Toaster from '../../../../utils/Toaster'
import connect from 'react-redux/es/connect/connect'
import { createUserAction } from "../../../../actions/actionCreator";
import * as Validator from '../../../../utils/Validator'
import DatePicker from '../../../../components/DatePicker/DatePicker'
import InputField from '../../../../components/InputField/InputField'
import SelectField from '../../../../components/SelectField/SelectField'
import './CreateUserForm.sass';

class CreateUserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: 'kostyaAnd@gmail.com',
            password: '1qaz2w3e4r',
            firstName: 'Alex',
            lastName: 'Gagarin',
            gender: 'man',
            birthDate: '1988-01-05',
            intention: 'sex',
            education: 'Basic',

            genderArray: ['', 'man', 'woman'],
            educationArray: ['', 'Basic', 'Technique', 'University', 'Post degree'],
            intentionArray: ['', 'sex', 'friendship', 'communication']
        };
        this.onBirthDateChange = this.onBirthDateChange.bind(this)
        this.onFieldChange = this.onFieldChange.bind(this)
    }

    isUserDataValid() {
        if (!Validator.email(this.state.email)) {
            Toaster.showError('Email is invalid');
            return false;
        } else if (!Validator.password(this.state.password)) {
            Toaster.showError('Password length must be 8-12 symbols');
            return false;
        } else if (!Validator.notEmpty(this.state.firstName)) {
            Toaster.showError('First name invalid');
            return false;
        } else if (!Validator.notEmpty(this.state.lastName)) {
            Toaster.showError('Last name invalid');
            return false;
        } else if (!Validator.olderThan(this.state.birthDate, 18)) {
            Toaster.showError('You must be at least 18 years old');
            return false;
        } else if (!Validator.isInCollection(this.state.gender, this.state.genderArray)) {
            Toaster.showError('Incorrect gender value');
            return false;
        } else if (!Validator.isInCollection(this.state.education, this.state.educationArray)) {
            Toaster.showError('Incorrect education value');
            return false;
        } else if (!Validator.isInCollection(this.state.intention, this.state.intentionArray)) {
            Toaster.showError('Incorrect intention value');
            return false;
        }
        return true;
    }

    onCreateClicked() {
        if(!this.isUserDataValid())
            return;

        const userData = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            birthDate: this.state.birthDate,
            intention: this.state.intention,
            education: this.state.education
        };
        this.props.createUserAction(userData)
    }

    onFieldChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onBirthDateChange (date) {
        if(date) {
            this.setState({ birthDate: date })
        }
    }

    render() {
        const { firstName, lastName, email, password, gender, intention, education, birthDate } = this.state;
        return (
            <div className="CreateUserForm">
                <div className="edit">
                    <div className="row">
                        <InputField value={firstName} title={'First name'} type={'text'} color={'black'}
                                    name={'firstName'} onChange={this.onFieldChange} size={'small'}/>
                        <InputField value={lastName} title={'Last name'} type={'text'} color={'black'}
                                    name={'lastName'} onChange={this.onFieldChange} size={'small'}/>
                    </div>
                    <div className="row">
                        <InputField value={email} title={'Email'} color={'black'} type={'email'}
                                    name={'email'} onChange={this.onFieldChange} size={'small'}/>
                        <InputField value={password} title={'Password'} color={'black'} type={'password'}
                                    name={'password'} onChange={this.onFieldChange} size={'small'}/>
                    </div>
                    <div className="row">
                        <SelectField value={gender} title={'Gender'}  color={'black'} size={'small'}
                                     array={this.state.genderArray} name={'gender'} onChange={this.onFieldChange}/>
                        <DatePicker value={birthDate} onChange={this.onBirthDateChange}
                                    title={'Birth date'} color={'black'} size={'small'}/>
                    </div>
                    <div className="row">
                        <SelectField value={education} title={'Education'} color={'black'} size={'small'}
                                     array={this.state.educationArray} name={'education'} onChange={this.onFieldChange}/>
                        <SelectField value={intention} title={'Intention'} color={'black'} size={'small'}
                                     array={this.state.intentionArray} name={'intention'} onChange={this.onFieldChange}/>
                    </div>
                    <div className="row">
                        <a className={'btnSave'} onClick={() => this.onCreateClicked()}>Create user</a>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateProps = (state) => {
    return {  }
};

const mapDispatchToProps = (dispatch) => ({
    createUserAction: (userData) => dispatch(createUserAction(userData))
});

export default connect(mapStateProps, mapDispatchToProps)(CreateUserForm);
