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
        // making a new instance of the editor
        this.quill = new Quill(this.editor.current, options);

        // this will restrict the copyable content to be only plain text
        this.quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
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

    // will convert ciphered story into quill readable format
    breaker = (cipher) => {
        let split = cipher.split('*/para/*'), final = '';
        for(let i=0; i<split.length; i++) {
            split[i] = split[i].split('*/newline/*')
        }
        for(let i=0; i<split.length; i++) {
            for(let j=0; j<split[i].length; j++) {
                if(split[i][j] === '')
                    final += '\n';
                else
                    final += split[i][j] + '\n';
            }
        }
        return final;
    };

    componentDidUpdate() {
        let { defaultValue } = this.props;
        if(defaultValue) {
            // first clear then insert
            this.quill.setText('\n');
            this.quill.insertText(0, this.breaker(defaultValue))
        }
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