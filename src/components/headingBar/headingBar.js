import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import galaxyPic from '../../assets/galaxyPic.png';
import './style.css';

class HeadingBar extends Component {
    render() {
        return (
            <div
                id={'m-b-hd-bar'}
                className={'justify-center flex mb3 bb bw2 b--white shadow-5'}
            >
                <img
                    alt={'lg'}
                    id={'i-hd-bar'}
                    src={galaxyPic}
                    className={'h2'}
                />
                <div
                    id={'l-hd-bar'}
                    className={'f2 mr0-ns mr3'}
                >
                    The Milky Way
                </div>
                <div className={'emptySpace dn db-ns'}/>
                <Link to={(this.props.mode === 'login')?'/':'register'}>
                    <span className={'dn db-ns'}>
                        {this.props.mode.slice(0,1).toUpperCase() + this.props.mode.slice(1)}
                    </span>
                </Link>
            </div>
        );
    }
}

export default HeadingBar;