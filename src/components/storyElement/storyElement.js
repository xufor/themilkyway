import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';

import RippleButton from '../rippleButton/rippleButton';
import './style.css';

class StoryElement extends Component {
    deleteAndEditButtonsGen = () => {
        let { mode, editListener, deleteListener } = this.props;
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
        let { data } = this.props;
        return (
            <div id={'m-b-st-element'} className={'shadow-4'}>
                {   (data)?
                    <div className={'t-st-element'}>{data.title}</div>
                    : <Skeleton/>
                }
                {   (data)?
                    <div className={'n-st-element'}>{`by ${data.name}`}</div>
                    : <Skeleton/>
                }
                {   (data)?
                    <p className={'sm-st-element'}>{data.summary}</p>
                    : <Skeleton/>
                }
                {this.deleteAndEditButtonsGen()}
            </div>
        );
    };
}


export default StoryElement;