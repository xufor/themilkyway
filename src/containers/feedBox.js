import React, { Component } from 'react';
import { sampleStory } from "../strings";
import '../css/feedBox.css';

class FeedBox extends Component {
    render() {
        return (
            <div id={'boxWrapper'}>
                <p>{ sampleStory }</p>
            </div>
        );
    }
}

export default FeedBox;