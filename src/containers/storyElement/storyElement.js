import React, { Component } from 'react';
import './style.css';

class StoryElement extends Component {
    render() {
        let { name, summary, title } = this.props;
        return (
            <div id={'m-b-st-element'} className={'shadow-5'}>
                <div className={'t-st-element'}>{title}</div>
                <div className={'n-st-element'}>{`by ${name}`}</div>
                <p className={'sm-st-element'}>{summary}</p>
            </div>
        );
    };
}


export default StoryElement;