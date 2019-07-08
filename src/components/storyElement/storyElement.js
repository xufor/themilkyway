import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

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
                {
                    (data)?
                    <div
                        className={'t-st-element'}>
                        <Link to={`/story/${data.sid}`}>
                            {data.title}
                        </Link>
                    </div>
                    : <div className={'t-st-element'}><Skeleton height={20}/></div>
                }
                {   (data)?
                    <div className={'n-st-element'}>{`by `}
                        <Link to={`/profile/${data.uid}`}>{data.name}</Link>
                    </div>
                    : <div className={'t-st-element'}><Skeleton height={20}/></div>
                }
                {   (data)?
                    <p className={'sm-st-element'}>{data.summary}</p>
                    : <p className={'sm-st-element'}><Skeleton height={50}/></p>
                }
                {this.deleteAndEditButtonsGen()}
            </div>
        );
    };
}


export default StoryElement;