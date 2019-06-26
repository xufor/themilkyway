import React, { Component } from 'react';
import { fetchUserCredentials } from '../../actions/fetchCredsAction';
import { messageBoxViewAction } from '../../actions/messageBoxViewAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from  'react-router-dom';
import { displayLoader } from '../../common';
import './style.css';

const ACCEPTABLE_RESPONSE_MESSAGE = 'Signed in successfully.';

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
        this.checkResponseMessage()
    }

    componentDidUpdate() {
        //this will send user to homepage if he is signed in just now
        this.checkResponseMessage()
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
        this.props.messageBoxViewAction('enabled');
        setTimeout(() => {
            this.props.messageBoxViewAction('disabled')
        }, 30000)
    };

    render() {
        const { boxState } = this.props;
        return (
            <div>
                {
                    (boxState !== 'disabled')
                        ? displayLoader('Checking if we know you! This can take time.', 'wait-and-leave')
                        : undefined
                }
                <div id={'loginPageBackground'}>
                    <div id={'loginBox'}>
                        <div className={'boxHeading'}>Login</div>
                        <div id={'inputLabelLgBx'}>Email</div>
                        <input onChange={this.onEmailChange} className={'inputBox'} type={'email'} required/>
                        <div id={'inputLabelLgBx'}>Password</div>
                        <input onChange={this.onPasswordChange} className={'inputBox'} type={'password'} required/>
                        <button onClick={this.onClickSignIn} id={'loginButton'} className={'grow'}>Login</button>
                        <Link to={'/register'} id={'registerInstead'} className={'grow'}>Don't have an account?</Link>
                     </div>
                </div>
            </div>
        );
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ fetchUserCredentials, messageBoxViewAction }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials,
        boxState: state.messageBoxState
    }
};

export default connect(mapStateToProps, mapActionToProps)(LoginPage);