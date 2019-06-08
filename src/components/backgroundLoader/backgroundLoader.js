import React, { Component } from 'react';
import { backgroundLinks } from '../../strings';
import './style.css';


class BackgroundLoader extends Component {
    componentDidMount() {
        let { bno } = this.props;
        let x = document.getElementById('backgroundLoader');
        let y = new Image();
        y.onload = function () {
            x.style.background = `url("${this.src}")`;
            x.style.backgroundSize = `cover`;
            x.style.animation = `fadeIn 1.3s 1 forwards`;
            x.style.backgroundRepeat = 'no-repeat';
            x.style.backgroundAttachment = 'fixed';
        };
        y.src = backgroundLinks[bno];
    }

    render() {
        return (
            <div id={'backgroundLoader'}/>
        );
    };
}

export default BackgroundLoader;