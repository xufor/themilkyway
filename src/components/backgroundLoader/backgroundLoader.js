import React, { Component } from 'react';
import { backgroundLinks } from '../../strings';
import './style.css';


class BackgroundLoader extends Component {

    componentDidMount() {
        // when the screen mapper changes the state this will be called
        let { bno } = this.props;
        let x = document.getElementById('backgroundLoader');
        let y = new Image();
        y.onload = function () {
            x.style.background = `url('${this.src}')`;
            x.style.backgroundSize = `cover`;
            x.style.animation = `fadeIn 0.15s 1 forwards`;
            x.style.backgroundRepeat = 'no-repeat';
        };
        y.src = backgroundLinks[bno];
    }

    render() {
        return (
            <React.Fragment>
                <div id={'backgroundLoader'} className={'dn db-ns'}/>
                <div id={'backgroundLoaderX'} className={'db dn-ns'}/>
            </React.Fragment>
        );
    };
}

export default BackgroundLoader;