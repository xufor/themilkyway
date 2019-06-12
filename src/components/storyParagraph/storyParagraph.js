import React, { Component } from 'react';

import './style.css';

class StoryParagraph extends Component {
    render() {
        let { text } = this.props;
        return <p>{text}</p>;
    };
}

export default StoryParagraph;