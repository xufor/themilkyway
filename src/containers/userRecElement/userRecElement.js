import React, { Component } from 'react';
import './style.css';

class UserRecElement extends Component {
    render() {
        let { linkPassedToChildElement } = this.props;
        return (
            <div id={'recBoxUserImageWrapper'}><img id={'userImgInRecBox'} src={linkPassedToChildElement} alt={`altYetNotDecided`}/></div>
        );
    };
}


export default UserRecElement;

