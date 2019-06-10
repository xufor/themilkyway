import React, { Component } from 'react';
import { fetchUserCredentials } from '../../actions/fetchCredsAction';
import { messageBoxViewAction } from '../../actions/messageBoxViewAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from  'react-router-dom';
import { displayLoader } from '../../common';
import './style.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    componentDidUpdate() {
        if (this.props.credentials.data !== undefined) {
          setTimeout(()=> {
              this.props.history.push('/');
          }, 1000);
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

    onClickSignIn = () => {
        let actionPacket = {
            email: this.state.email,
            password: this.state.password,
            history: this.props.history
        };
        this.props.fetchUserCredentials(actionPacket);
        this.props.messageBoxViewAction('enabled');
        setTimeout(() => {
            this.props.messageBoxViewAction('disabled')
        }, 5000)
    };

    render() {
        const { boxState } = this.props;
        return (
            <div>
                {
                    (boxState !== 'disabled')
                        ? displayLoader('Contacting International Space Station!', 'wait-and-leave')
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