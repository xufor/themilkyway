import React, { Component } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './style.css';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.editor = React.createRef();
    }

    componentDidMount() {
        const toolbarOptions = [
            ['bold', 'italic'],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'align': []}],
        ];
        const options = {
            debug: '',
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: 'Compose an epic...',
            readOnly: false,
            theme: 'snow'
        };
        new Quill(this.editor.current, options);
    }

    render() {
        return (
            <div id={'m-b-txt-editor'}>
                <div id={'e-b-txt-editor'} ref={this.editor}/>
            </div>
        );
    }
}

export default TextEditor;