import React, { Component } from 'react'
import '../css/loader.css';

class Loader extends Component {
    render() {
        return (
            <div className={'line-scale-pulse-out'} id={'loader'}>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        );
    };
}

export default Loader;
