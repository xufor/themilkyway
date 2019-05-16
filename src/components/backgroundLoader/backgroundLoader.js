import React, { Component } from 'react';
import { backgroundLinks } from '../../strings';
import dummy from '../../assets/dummy.png';
import './style.css';

class BackgroundLoader extends Component {
    componentDidMount() {
        let { bno } = this.props;
        let x = document.getElementById('back-loader-img');
        let y = new Image();
        y.onload = function () {
            x.src = this.src;
        };
        y.src = backgroundLinks[bno];
    }

    render() {
        return (
            <div id={'backgroundLoader'}>
                <img
                    alt={'uni-ldr'}
                    src={dummy}
                    id={'back-loader-img'}
                />
            </div>
        );
    };
}

export default BackgroundLoader;