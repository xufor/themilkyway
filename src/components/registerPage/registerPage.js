import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { validate } from 'email-validator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import LoadingBar from 'react-redux-loading-bar';

import { initiateRegistration } from '../../actions/registerAction';
import RippleButton from '../rippleButton/rippleButton';
import BackgroundLoader from '../backgroundLoader/backgroundLoader';
import HeadingBar from '../headingBar/headingBar';
import './style.css';

import {
    CANNOT_BE_EMPTY,
    NOT_AN_EMAIL,
    PASS_TOO_LONG,
    EMAIL_TOO_LONG,
} from '../loginPage/loginPage';

export const NAME_TOO_LONG = 'The length of name cannot be greater than 80 characters.';
export const SUCCESSFULLY_REGISTERED = 'Please check your inbox to confirm your account.';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    onNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    onClickRegister = () => {
        if(!this.props.isPending) {
            if(this.state.email === '' || this.state.password === '' || this.state.name === '')
                toastr.info('Cannot be empty', CANNOT_BE_EMPTY);
            else if(!validate(this.state.email)) {
                toastr.info('Invalid Email', NOT_AN_EMAIL);
            } else if(this.state.password.length > 72) {
                toastr.info('Too Long', PASS_TOO_LONG)
            } else if(this.state.email.length > 100) {
                toastr.info('Too Long', EMAIL_TOO_LONG)
            } else if (this.state.name.length > 80) {
                toastr.info('Too Long', NAME_TOO_LONG)
            }
            else {
                let actionPacket = {
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
                };
                this.props.initiateRegistration(actionPacket);
            }
        }
    };

    render() {
        return (
            <React.Fragment>
                <BackgroundLoader bno={1}/>
                <LoadingBar
                    showFastActions
                    style={{ backgroundColor: '#448AFF', height: '4px', zIndex: 1000 }}
                />
                <div id={'m-b-register-pg'}>
                    <HeadingBar mode={'login'}/>
                    <div
                        id={'registerBox'}
                        className={'w-90 w-40-m w-20-l mt2 mt5-ns mb4 bg-transparent ba-ns b--white'}
                    >
                        <div className={'boxHeading  f2 f1-ns white'}>Register</div>
                        <div id={'inputLabelRgBx'} className={'ml3-ns'}>Name</div>
                        <input
                            onChange={this.onNameChange}
                            className={'inputBox w-90-ns w-100'}
                            type={'text'}
                        />
                        <div id={'inputLabelRgBx'} className={'ml3-ns'}>Email</div>
                        <input
                            onChange={this.onEmailChange}
                            className={'inputBox w-90-ns w-100'}
                            type={'email'}
                        />
                        <div id={'inputLabelRgBx'} className={'ml3-ns'}>Password</div>
                        <input
                            onChange={this.onPasswordChange}
                            className={'inputBox w-90-ns w-100'}
                            type={'password'}
                        />
                        <RippleButton
                            name={'Register'}
                            listener={this.onClickRegister}
                        />
                        <Link to={'/'} id={'loginInstead'} className={'grow mb3'}>Already have an account?</Link>
                     </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ initiateRegistration }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        isPending: state.isPending
    }
};

export default connect(mapStateToProps, mapActionToProps)(RegisterPage);