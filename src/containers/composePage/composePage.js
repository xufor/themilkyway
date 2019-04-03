import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import './style.css';

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'A line of text in a paragraph.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
});

class ComposePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: initialValue
        };
    }

    onChange = ({ value }) => {
        this.setState({ value })
    };

    onKeyDown = (event) => {
        console.log(event.key);
    };

    render() {
        return (
            <div id={'m-box-compose-pg'}>
                <Editor value={this.state.value} onChange={this.onChange} onKeyDown={this.onKeyDown}/>
            </div>
        )
    };
}


export default ComposePage;

