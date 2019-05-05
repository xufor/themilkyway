import React, { Component } from 'react'
import './style.css';

class LoaderAnimation extends Component {
    render() {
        const { message } = this.props;
        return (
            <div id={'animationWrapper'}>
                <div id={'message'}>{message}</div>
                <div className={'line-scale'} id={'loader'}>
                    <div className={'ldr1'}/>
                    <div className={'ldr2'}/>
                    <div className={'ldr3'}/>
                    <div className={'ldr4'}/>
                    <div className={'ldr5'}/>
                </div>
            </div>
        );
    };
}

export default LoaderAnimation;
