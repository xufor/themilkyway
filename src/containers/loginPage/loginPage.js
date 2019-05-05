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
        //Handles the displaying of loader animation
        this.setState({ loaderFlag: 1});
        setTimeout(() => {
            if(this.props.credentials.data === undefined) //Solves the memory leak problem
                this.setState({ loaderFlag: 0});
        }, 3000);
        //Handles the displaying of loader animation
    };

    render() {
        const { loaderFlag } = this.state;
        return (
            <div>
                { displayLoader(loaderFlag, 'Checking if its really you!') }
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
    return bindActionCreators({ fetchUserCredentials }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials
    }
};

export default connect(mapStateToProps, mapActionToProps)(LoginPage);