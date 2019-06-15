import React, { Component } from 'react';

import RippleButton from '../rippleButton/rippleButton';
import './style.css';

class StoryElement extends Component {
    deleteAndEditButtonsGen = () => {
        let {mode, editListener, deleteListener} = this.props;
        if(mode === 'with-buttons') {
            return (
                <React.Fragment>
                    <RippleButton
                        name={'Edit'}
                        listener={editListener}
                    />
                    <RippleButton
                        name={'Delete'}
                        listener={deleteListener}
                    />
                </React.Fragment>
            );
        } else if(mode === 'no-buttons') {
            return undefined;
        }
    };

    render() {
        let { name, summary, title} = this.props;
        return (
            <div id={'m-b-st-element'} className={'shadow-4'}>
                <div className={'t-st-element'}>{title}</div>
                <div className={'n-st-element'}>{`by ${name}`}</div>
                <p className={'sm-st-element'}>{summary}</p>
                {this.deleteAndEditButtonsGen()}
            </div>
        );
    };
}


export default StoryElement;