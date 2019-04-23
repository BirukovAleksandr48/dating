import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect'
import { loginAction } from "../../../actions/actionCreator";
import './HomeHeader.sass';
import * as Validator from "../../../utils/Validator";
import * as Toaster from "../../../utils/Toaster";

class HomeHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isHiden: true,
            email: 'justin@gmail.com',
            password: '1qaz2w3e4r'
        }
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    isLoginDataValid() {
        if (!Validator.email(this.state.email)) {
            Toaster.showError('Email is invalid');
            return false;
        } else if (!Validator.password(this.state.password)) {
            Toaster.showError('Password length must be 8-12 symbols');
            return false;
        }
        return true;
    }

    onLoginClicked() {
        if(!this.isLoginDataValid())
            return;

        this.props.loginAction(
            {
                email: this.state.email,
                password: this.state.password
            },
            this.props.history
        );
    }
    toggleIsHiden() {
        this.setState({ isHiden: !this.state.isHiden })
    }

    render() {
        let loginMobClass = 'loginMobile ';
        if(this.state.isHiden)
            loginMobClass += 'isHiden';

        return (
            <div className="HomeHeader">
                <div className="headerContent">
                    <div className="logotype">
                        <div className="logo"/>
                        <div className="logoText">Find your Ideal Couple</div>
                    </div>
                    <div className="loginContainer">
                        <span className="loginTitle">If you already have a Profile</span>
                        <div className="inputs">
                            <input value={this.state.email}
                                   onChange={(e) => this.onEmailChange(e)}
                                   className="login"
                                   type="text"/>
                            <input value={this.state.password}
                                   onChange={(e) => this.onPasswordChange(e)}
                                   className="password"
                                   type="password"/>
                            <a className="btnLogin" onClick={() => this.onLoginClicked()}>Enter</a>
                        </div>
                    </div>
                    <a className="btnHaveAcc" onClick={() => this.toggleIsHiden()}>Do you already have a profile</a>
                    <div className={loginMobClass}>
                        <input value={this.state.email}
                               onChange={(e) => this.onEmailChange(e)}
                               className="login"
                               type="email"/>
                        <input value={this.state.password}
                               onChange={(e) => this.onPasswordChange(e)}
                               className="password"
                               type="password" />
                        <a className="btnLogin" onClick={() => this.onLoginClicked()}>Enter</a>
                        <a className="forgotPass">Did you forget your password?</a>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateProps = (state) => {
    return {
        error: state.authReducer.error
    }
};

const mapDispatchToProps = (dispatch) => ({
    loginAction: (loginData, history) => dispatch(loginAction(loginData, history))
});

export default connect(mapStateProps, mapDispatchToProps)(HomeHeader);
