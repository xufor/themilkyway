import React, { Component } from 'react';
import { fetchUserCredentials } from '../actions/fetchCredsAction.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from  'react-router-dom';
import '../css/loginPage.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidUpdate() {
        if (this.props.credentials.verifiedFlag === true) {
          this.props.history.push('./home');
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
    };

    render() {
        return (
            <div className='loginPageBackground'>
                <div className='loginBox'>
                    <div className='boxHeading'>Login</div>
                    <div className='inputLabelLgBx'>Email</div>
                    <input onChange={this.onEmailChange} className='inputBox' type='email' required/>
                    <div className='inputLabelLgBx'>Password</div>
                    <input onChange={this.onPasswordChange} className='inputBox' type='password' required/>
                    <button onClick={() => this.onClickSignIn()} className='loginButton grow'>Login</button>
                    <Link to='/register' className='registerInstead grow'>Don't have an account?</Link>
                </div>
            </div>
        );
    }
}

const mapActionToProps = (dispatch) => {
	return bindActionCreators({ fetchUserCredentials }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials
    }
};

export default connect(mapStateToProps, mapActionToProps)(LoginPage);