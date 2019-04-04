import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';
import './style.css';

class ComposePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
    }

    onChange = (editorState) => {
        this.setState({editorState});
    };

    render() {
        return (
            <Editor editorState={this.state.editorState} onChange={this.onChange} />
        )
    };
}


export default ComposePage;

