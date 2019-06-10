import React, { Component } from 'react';
import UserRecList from '../userRecList/userRecList';
import ButtonSlider from '../../components/buttonSlider/buttonSlider';
import './style.css';

class UserRecBox extends Component {
    render() {
        return (
            <div id={'recBoxWrapper'} className={'shadow-4'}>
                <ButtonSlider
                    targetComponent={UserRecList}
                    def={250}
                    dur={0.5}
                />
            </div>
        )
    };
}

export default UserRecBox;

