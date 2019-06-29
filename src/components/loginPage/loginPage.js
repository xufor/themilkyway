import React, { Component } from 'react';
import LoadingBar from 'react-redux-loading-bar'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from  'react-router-dom';
import { toastr } from 'react-redux-toastr';
import { validate } from 'email-validator';

import BackgroundLoader from '../backgroundLoader/backgroundLoader';
import RippleButton from '../rippleButton/rippleButton';
import HeadingBar from '../headingBar/headingBar';
import { fetchUserCredentials } from '../../actions/fetchCredsAction';
import { disableToast } from '../../actions/disableToastAction';
import { INCORRECT_PASSWORD } from '../../reducers/showToastReducer';
import { NO_ACCOUNT } from '../../reducers/showToastReducer';
import './style.css';

export const ACCEPTABLE_RESPONSE_MESSAGE = 'Signed in successfully.';
export const NOT_AN_EMAIL = 'The email address is invalid.';
export const CANNOT_REACH_SERVER = 'Cannot connect to the server.';
export const CANNOT_BE_EMPTY = 'All the fields are required.';
export const PASS_TOO_LONG = 'The length of password cannot be greater than 72 characters.';
export const EMAIL_TOO_LONG = 'The length of email cannot be greater than 100 characters.';

/*
> When component mounts a check for already logged in is made.
> When the component mounts isPending and showToast are initially false and disabled
> If someone violates the necessary conditions to sign in, no requests are made to server
> If there is a pending request then no new checks or requests will be made
> If someone signs in with correct credentials he/she logs in
> If not then toasts are shown with appropriate message.
> If request is pending the isPending state is set to true
> If request gets rejected the responses will set the showToast reducer with some identifier
> Since the state updates the componentDidUpdate method is fired
> If the identifier in showToast state matches a particular toast is shown
> Simultaneously the showToast is disabled to get ready for next toast
*/

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    checkResponseMessage = () => {
        let { message } = this.props.credentials;
        if (message !== undefined && message === ACCEPTABLE_RESPONSE_MESSAGE) {
            setTimeout(() => {
                this.props.history.push('/home');
            }, 300);
        }
    };

    componentDidMount() {
        // this will send user to homepage if he is already signed in
        this.checkResponseMessage();
    }

    componentDidUpdate() {
        // this will send user to homepage if he is signed in just now
        this.checkResponseMessage();
        // this will check if toast has to be loaded or not
        this.checkForToastLoading();
        // this sets toast back to disabled if it is not already disabled
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
        if(!this.props.isPending) {
            if(this.state.email === '' || this.state.password === '')
                toastr.info('Cannot be empty', CANNOT_BE_EMPTY);
            else if(!validate(this.state.email)) {
                toastr.info('Invalid Email', NOT_AN_EMAIL);
            } else if(this.state.password.length > 72) {
                toastr.info('Too Long', PASS_TOO_LONG)
            } else if(this.state.email.length > 100) {
                toastr.info('Too Long', EMAIL_TOO_LONG)
            } else {
                let actionPacket = {
                    email: this.state.email,
                    password: this.state.password,
                };
                this.props.fetchUserCredentials(actionPacket);
            }
        }
    };

    checkForToastLoading = () => {
        const { showToast } = this.props;
        if(showToast === 'nt-er')
            toastr.error('Network Error', CANNOT_REACH_SERVER);
        else if(showToast === 'in-pw')
            toastr.info('Incorrect Password', INCORRECT_PASSWORD);
        else if(showToast === 'no-ac')
            toastr.info('No Such Account', NO_ACCOUNT);
    };

    render() {
        return (
            <React.Fragment>
                <BackgroundLoader bno={3}/>
                <LoadingBar
                    showFastActions
                    style={{ backgroundColor: '#448AFF', height: '4px', zIndex: 1000 }}
                />
                <div id={'m-b-login-pg'}>
                    <HeadingBar mode={'register'}/>
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
            </React.Fragment>
        );
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({fetchUserCredentials, disableToast}, dispatch);
};

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials,
        showToast: state.showToast,
        isPending: state.isPending
    }
};

export default connect(mapStateToProps, mapActionToProps)(LoginPage);