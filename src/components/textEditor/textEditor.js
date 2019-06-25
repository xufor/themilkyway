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
            readOnly: false,
            theme: 'snow'
        };
        let quill = new Quill(this.editor.current, options);

        // this will restrict the copyable content to be only plain text
        quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
            let ops = [];
            delta.ops.forEach(op => {
                if (op.insert && typeof op.insert === 'string') {
                    ops.push({
                        insert: op.insert
                    })
                }
            });
            delta.ops = ops;
            return delta
        })
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