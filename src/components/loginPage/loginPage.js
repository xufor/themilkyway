import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from  'react-router-dom';
import { toastr } from 'react-redux-toastr';

import { fetchUserCredentials } from '../../actions/fetchCredsAction';
import { disableToast } from '../../actions/disableToastAction';
import RippleButton from '../rippleButton/rippleButton'
import { displayLoader } from '../../common';
import { INCORRECT_PASSWORD } from '../../reducers/showToastReducer';
import { NO_ACCOUNT } from '../../reducers/showToastReducer';
import './style.css';

const ACCEPTABLE_RESPONSE_MESSAGE = 'Signed in successfully.';
const WHILE_SIGNING_IN_MESSAGE = 'Checking if we know you! This can take time.';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    checkResponseMessage = () => {
        let message = this.props.credentials.message;
        if (message !== undefined && message === ACCEPTABLE_RESPONSE_MESSAGE) {
            setTimeout(() => {
                this.props.history.push('/home');
            }, 1000);
        }
    };

    componentDidMount() {
        //this will send user to homepage if he is already signed in
        this.checkResponseMessage();
    }

    componentDidUpdate() {
        //this will send user to homepage if he is signed in just now
        this.checkResponseMessage();
        //this will check if toast has to be loaded or not
        this.checkForToastLoading();
        //this set toast back to disabled if it is not already disabled
        if(this.props.showToast !== 'disabled')
            this.props.disableToast()
    }

    componentWillUnmount() {
        this.props.disableToast();
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
    onClickSignIn = () => {
        let actionPacket = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.fetchUserCredentials(actionPacket);
    };

    checkForMessageBoxLoading = () => {
        const { msgBoxState } = this.props;
        if(msgBoxState === 'enabled')
            return displayLoader( WHILE_SIGNING_IN_MESSAGE, 'wait-and-leave')
    };

    checkForToastLoading = () => {
        const { showToast } = this.props;
        if(showToast === 'invalid-email')
            toastr.info('Invalid Email', 'The provided email doesn\'t seem to be an email!');
        else if(showToast === 'network-error')
            toastr.error('Network Error', 'Please check your internet connection.');
        else if(showToast === 'incorrect-password')
            toastr.info('Incorrect Password', INCORRECT_PASSWORD);
        else if(showToast === 'no-account')
            toastr.info('No Account found', NO_ACCOUNT);
    };

    render() {
        return (
            <div>
                {this.checkForMessageBoxLoading()}
                <div id={'loginPageBackground'}>
                    <div id={'loginBox'}>
                        <div className={'boxHeading'}>Login</div>
                        <div id={'inputLabelLgBx'}>Email</div>
                        <input
                            onChange={this.onEmailChange}
                            className={'inputBox'}
                            type={'email'}
                            required
                        />
                        <div id={'inputLabelLgBx'}>Password</div>
                        <input
                            onChange={this.onPasswordChange}
                            className={'inputBox'}
                            type={'password'}
                            required
                        />
                        <RippleButton
                            name={'Login'}
                            listener={this.onClickSignIn}
                        />
                        <Link
                            to={'/register'}
                            id={'registerInstead'}
                            className={'grow'}
                        >
                            Don't have an account?
                        </Link>
                     </div>
                </div>
            </div>
        );
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ fetchUserCredentials, disableToast }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials,
        msgBoxState: state.messageBoxState,
        showToast: state.showToast
    }
};

export default connect(mapStateToProps, mapActionToProps)(LoginPage);