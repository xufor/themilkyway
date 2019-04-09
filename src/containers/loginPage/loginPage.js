import React, { Component } from 'react';
import { fetchUserCredentials } from '../../actions/fetchCredsAction';
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
            loaderFlag: 0,
        }
    }

    componentDidUpdate() {
        if (this.props.credentials.verifiedFlag === true) {
          this.props.history.push('/home');
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
        this.setState({ loaderFlag: 1});
        setTimeout(() => {
            this.setState({ loaderFlag: 0});
        }, 5000);
    };

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                { displayLoader(this.state.loaderFlag, 'Checking if its really you!') }
                <div id='loginPageBackground'>
                    <div id='loginBox'>
                        <div className='boxHeading'>Login</div>
                        <div id='inputLabelLgBx'>Email</div>
                        <input onChange={this.onEmailChange} className='inputBox' type='email' required/>
                        <div id='inputLabelLgBx'>Password</div>
                        <input onChange={this.onPasswordChange} className='inputBox' type='password' required/>
                        <button onClick={() => this.onClickSignIn()} id='loginButton' className='grow'>Login</button>
                        <Link to={'/register'} id='registerInstead' className='grow'>Don't have an account?</Link>
                     </div>
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