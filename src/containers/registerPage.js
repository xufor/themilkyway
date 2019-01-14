import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/registerPage.css';

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
        if(this.state.email === '' || this.state.email === '' || this.state.email === '')
        {
            alert("Please fill all the fields with a valid entry.")
        } else {
            this.props.history.push('./home');
        }
    };

    render() {
        return (
            <div className='registerPageBackground'>
                <div className='registerBox'>
                    <div className='boxHeading'>Register</div>
                    <div className='inputLabelRgBx'>Name</div>
                    <input onChange={this.onNameChange} className='inputBox' type='text'/>
                    <div className='inputLabelRgBx'>Email</div>
                    <input onChange={this.onEmailChange} className='inputBox' type='email'/>
                    <div className='inputLabelRgBx'>Password</div>
                    <input onChange={this.onPasswordChange} className='inputBox' type='password'/>
                    <button onClick={() => this.onClickRegister()} className='registerButton grow'>Register</button>
                    <Link to={'/login'} className='loginInstead grow'>Already have an account?</Link>
                </div>
            </div>
        );
    }
}

export default RegisterPage;