import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import galaxyPic from '../../assets/galaxyPic.png';
import './style.css';

class HeadingBar extends Component {
    render() {
        return (
            <div id={'m-b-hd-bar'}>
                <img
                    alt={'lg'}
                    id={'i-hd-bar'}
                    src={galaxyPic}
                />
                <div
                    id={'l-hd-bar'}
                >
                    The Milky Way
                </div>
                <div className={'emptySpace'}/>
                <Link to={(this.props.mode === 'login')?'/':'register'}>
                        {this.props.mode.slice(0,1).toUpperCase() + this.props.mode.slice(1)}
                </Link>
            </div>
        );
    }
}

export default HeadingBar;