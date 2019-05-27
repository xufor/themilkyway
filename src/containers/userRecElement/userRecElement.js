import React, { Component } from 'react';
import dummy from '../../assets/dummy.png';
import Skeleton from 'react-loading-skeleton';
import './style.css';

class UserRecElement extends Component {
    render() {
        let { mode } = this.props;
        if(mode === 'links-arrived') {
            return (
                <div className={'recBoxUserImageWrapper'}>
                    <img className={'userImgInRecBox'} src={dummy} alt={`altYetNotDecided`}/>
                </div>
            );
        }
        else if (mode === 'links-not-arrived') {
            return (
                <div className={'recBoxUserImageWrapper'}>
                    <Skeleton circle={true} height={70} width={70} />
                </div>
            );
        }
    };
}


export default UserRecElement;

