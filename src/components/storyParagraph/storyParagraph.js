import React, { Component } from 'react';

class StoryParagraph extends Component {
    render() {
        let { text } = this.props;
        return <p style={{margin: 0}}>{text}</p>;
    };
}

export default StoryParagraph;