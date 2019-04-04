import React, { Component } from 'react';
import TextEditor from '../textEditor/textEditor';
import PageFooter from '../../components/pageFooter/pageFooter';
import TopMostBar from '../topMostBar/topMostBar';
import GreetBox from '../greetBox/greetBox';

import './style.css';

class ComposePage extends Component {
    render() {
        return (
            <div id={'m-b-compose-pg'}>
                <TopMostBar calledFrom={'composePage'}/>
                <GreetBox calledFrom={'composePage'}/>
                <TextEditor/>
                <PageFooter/>
            </div>
        )
    };
}


export default ComposePage;

