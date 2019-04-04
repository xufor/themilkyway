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
                <div id={'e-wrap-compose-pg'} className={'shadow-4'}>
                    <div id={'t-e-compose-pg'}>
                        <div>Title:</div>
                        <input/>
                    </div>
                    <div id={'s-e-compose-pg'}>
                        <div>Summary:</div>
                        <input/>
                    </div>
                    <TextEditor/>
                </div>
                <PageFooter/>
            </div>
        )
    };
}


export default ComposePage;

