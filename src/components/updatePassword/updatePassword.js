import React, { Component } from 'react';
import LoadingBar from 'react-redux-loading-bar'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import BackgroundLoader from '../backgroundLoader/backgroundLoader';
import RippleButton from '../rippleButton/rippleButton';
import HeadingBar from '../headingBar/headingBar';
import { CANNOT_BE_EMPTY, PASS_TOO_LONG } from '../loginPage/loginPage';
import { updatePassword } from '../../actions/updatePasswordAction';
import './style.css';
import {ARE_YOU_SURE} from "../composePage/composePage";

const DO_NOT_MATCH = 'Passwords in both fields must be same.';

class UpdatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            second: ''
        };
    }

    firstChange = (event) => {
        this.setState({
            first: event.target.value
        });
    };

    secondChange = (event) => {
        this.setState({
            second: event.target.value
        });
    };

    onClickReset = () => {
        const { first, second } = this.state;
        if(!this.props.isPending) {
            if(first === '' || second === '')
                toastr.info('Cannot be empty', CANNOT_BE_EMPTY);
            else if(first.length > 72)
                toastr.info('Too long', PASS_TOO_LONG);
            else if(first !== second)
                toastr.info('Passwords do not match', DO_NOT_MATCH);
            else {
                toastr.confirm(ARE_YOU_SURE, { onOk: () => this.props.updatePassword(first, this.props.match.params.token)});
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
                    <div id={'bx-upd-pg'} className={'w-90 w-40-m w-20-l mt2 mt5-ns mb4 bg-transparent ba-ns b--white'}>
                        <div id={'b-h-upd-pg'}>Set New Password</div>
                        <div id={'i-l-upd-pg'} className={'ml3-ns'}>New Password</div>
                        <input
                            onChange={this.firstChange}
                            className={'inputBox w-100 w-90-ns'}
                            type={'password'}
                            required
                        />
                        <div id={'i-l-upd-pg'} className={'ml3-ns'}>Confirm Password</div>
                        <input
                            onChange={this.secondChange}
                            className={'inputBox w-100 w-90-ns'}
                            type={'password'}
                            required
                        />
                        <span>
                            <RippleButton
                                name={'Submit'}
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
    return bindActionCreators({ updatePassword }, dispatch);
};

export default connect(null, mapActionToProps)(UpdatePassword);