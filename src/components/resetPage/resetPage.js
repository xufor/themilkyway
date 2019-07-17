import React, { Component } from 'react';
import LoadingBar from 'react-redux-loading-bar'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { validate } from 'email-validator';

import BackgroundLoader from '../backgroundLoader/backgroundLoader';
import RippleButton from '../rippleButton/rippleButton';
import HeadingBar from '../headingBar/headingBar';
import { CANNOT_BE_EMPTY, NOT_AN_EMAIL } from '../loginPage/loginPage';
import { requestResetPassword } from '../../actions/resetPasswordAction';
import './style.css';

class ResetPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
    }

    onEmailChange = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    onClickReset = () => {
        if(!this.props.isPending) {
            if(this.state.email === '')
                toastr.info('Cannot be empty', CANNOT_BE_EMPTY);
            else if(!validate(this.state.email))
                toastr.info('Invalid Email', NOT_AN_EMAIL);
            else {
                this.props.requestResetPassword(this.state.email);
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
                <div id={'m-b-login-pg'}>
                    <HeadingBar mode={'login'}/>
                    <div id={'bx-rst-pg'} className={'mt6-ns mt2'}>
                        <div id={'b-h-rst-pg'}>Reset Password</div>
                        <div id={'i-l-rst-pg'}>Email</div>
                        <input
                            onChange={this.onEmailChange}
                            className={'inputBox w-100 w-90-ns'}
                            type={'email'}
                            required
                        />
                        <span>
                            <RippleButton
                                name={'Reset'}
                                listener={this.onClickReset}
                            />
                        </span>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ requestResetPassword }, dispatch);
};

export default connect(null, mapActionToProps)(ResetPage);