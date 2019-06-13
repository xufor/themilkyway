import React, { Component } from 'react';

class StoryParagraph extends Component {
    render() {
        let { text } = this.props;
        return <p>{text}</p>;
    };
}

export default StoryParagraph;