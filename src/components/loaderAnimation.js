import React, { Component } from 'react'
import '../css/loaderAnimation.css';

class LoaderAnimation extends Component {
    componentDidMount() {
        console.log(this.props.messages);
    }

    render() {
        return (
            <div id={'animationWrapper'}>
                <div id={'message'}>{this.props.message}</div>
                <div className={'line-scale'} id={'loader'}>
                    <div id={'ldr1'}/>
                    <div id={'ldr2'}/>
                    <div id={'ldr3'}/>
                    <div id={'ldr4'}/>
                    <div id={'ldr5'}/>
                </div>
            </div>
        );
    };
}

export default LoaderAnimation;
