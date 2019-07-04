import React, { Component } from 'react';

import BackgroundLoader from '../backgroundLoader/backgroundLoader';
import RippleButton from '../rippleButton/rippleButton';
import './style.css';

class WelcomePage extends Component {
    onClick = (choice) => {
        if(choice === 'l')
            this.props.history.push('/login');
        else if(choice === 'r')
            this.props.history.push('/register');
    };

    render() {
        return(
            <div id='m-b-welcome-pg'>
                <BackgroundLoader bno={3}/>
                <div id={'t-h-welcome-pg'}/>
                <div id='w-t-welcome-pg'>
                    <div id='l-welcome-pg' className='tc'>The Milky Way</div>
                    <div id={'s-welcome-pg'}>A Community where words matter! </div>
                        <div id='b-welcome-pg'>
                            <RippleButton
                                name={'Login'}
                                listener={() => this.onClick('l')}
                            />
                            <RippleButton
                                name={'Register'}
                                listener={() => this.onClick('r')}
                            />
                        </div>
                    </div>
                <div id={'b-h-welcome-pg'}/>
            </div>
        );
    }
}

export default WelcomePage;