import React, { Component } from 'react'
import '../css/loaderAnimation.css';

class LoaderAnimation extends Component {
    render() {
        return (
            <div className={'line-scale'} id={'loader'}>
                <div id={'ldr1'}/>
                <div id={'ldr2'}/>
                <div id={'ldr3'}/>
                <div id={'ldr4'}/>
                <div id={'ldr5'}/>
            </div>
        );
    };
}

export default LoaderAnimation;
