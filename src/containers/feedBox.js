import React, { Component } from 'react';
import { sampleStory } from "../strings";
import '../css/feedBox.css';

class FeedBox extends Component {
    constructor(props) {
        super(props);
        this.box = React.createRef();
    }

    render() {
        return (
            <div id={'boxWrapper'} ref={this.box}>
                <p>{ sampleStory }</p>
            </div>
        );
    }
}

export default FeedBox;