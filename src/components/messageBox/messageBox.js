import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { messageBoxViewAction } from '../../actions/messageBoxViewAction';
import { connect} from 'react-redux';

import RippleButton from '../rippleButton/rippleButton';
import './style.css';


class MessageBox extends Component {
    onClickConfirmationEvents = () => {
        const { confirmListener } = this.props;
        this.props.messageBoxViewAction('disabled');
        confirmListener();
    };

    decideAndLeaveModeGen = () => {
        const { mode } = this.props;

        if(mode === 'decide-and-leave')
        return (
            <div id={'d-l-b-m-box'}>
                <div id={'d-b-m-box'}>
                    <RippleButton
                        name={'Confirm'}
                        listener={this.onClickConfirmationEvents}
                    />
                </div>
                <div id={'l-b-m-box'}>
                    <RippleButton
                        name={'Cancel'}
                        listener={this.onClickConfirmOrCancel}
                    />
                </div>
            </div>
        )
    };

    waitAndLeaveModeGen = () => {
        const { mode } = this.props;
        if(mode === 'wait-and-leave') {
            return (
                <div id={'l-m-box'}>
                    <div className={'line-scale'} id={'l-w-m-box'}>
                        <div className={'ldr1'}/>
                        <div className={'ldr2'}/>
                        <div className={'ldr3'}/>
                        <div className={'ldr4'}/>
                        <div className={'ldr5'}/>
                    </div>
                </div>
            )
        }
    };

    onClickConfirmOrCancel = () => {
        this.props.messageBoxViewAction('disabled')
    };

    closeAndLeaveModeGen = () => {
        const { mode } = this.props;
        if(mode === 'close-and-leave') {
            return (
                <div id={'c-b-m-box'}>
                    <RippleButton
                        name={'Close'}
                        listener={this.onClickConfirmOrCancel}
                    />
                </div>
            )
        }
    };

    render() {
        const { message } = this.props;
        return (
            <div id={'m-box-wrapper'}>
                <div id={'m-m-box'}>{message || 'Some error is causing this!'}</div>
                {this.waitAndLeaveModeGen()}
                {this.closeAndLeaveModeGen()}
                {this.decideAndLeaveModeGen()}
            </div>
        );
    };
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators({ messageBoxViewAction }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        boxState: state.messageBoxState
    };
};

export default connect(mapStateToProps, mapActionToProps)(MessageBox);
