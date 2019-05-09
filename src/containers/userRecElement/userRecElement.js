import React, { Component } from 'react';
import dummy from '../../assets/dummy.png';
import './style.css';

class UserRecElement extends Component {
    render() {
        return (
            <div className={'recBoxUserImageWrapper'}>
                <img className={'userImgInRecBox'} src={dummy} alt={`altYetNotDecided`}/>
            </div>
        );
    };
}


export default UserRecElement;

